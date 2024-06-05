import { IRequest } from 'https://deno.land/x/axiod@0.26.2/interfaces.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import { Redis } from 'https://deno.land/x/redis@v0.32.3/mod.ts';
import {
    ChatPrivateResponse,
    ChatResponse,
    CreatePrivateChatRequest,
    UpdatePrivateChatRequest,
} from '../protobuf/chat_pb.js';
import AccountService from './account.service.ts';
import MedusaService, { CustomerProps } from './medusa.service.ts';
import MeiliSearchService from './meilisearch.service.ts';
import RedisService from './redis.service.ts';
import SupabaseService from './supabase.service.ts';

enum RedisChatIndexKey {
    Default = 'chat:queue:indexing',
    Created = 'chat:queue:indexing:created',
    Loaded = 'chat:queue:indexing:loaded'
}

export interface ChatProps {
    id?: string;
    created_at?: string;
    type?: string;
    updated_at?: string;
}

export interface ChatPrivateProps {
    chat_id?: string;
    account_ids?: string[];
}

export interface ChatDocument extends ChatProps {
    tags?: string[];
}

class ChatService {
    private readonly _meiliIndexName: string;
    private readonly _apiUrl: string;
    private readonly _indexLimit: number;

    constructor() {
        this._meiliIndexName = 'chat';
        this._apiUrl = Deno.env.get('API_URL') ?? 'http://localhost:9001';
        this._indexLimit = 100;

        this.onRedisConnection = this.onRedisConnection.bind(this);

        RedisService.addConnectionCallback(this.onRedisConnection);
    }

    public async indexDocumentsAsync(data: { limit: number, offset: number }): Promise<void> {
        const chatResponse = await SupabaseService.client
            .from('chat')
            .select()
            .limit(data.limit)
            .range(data.offset, data.offset + data.limit);

        if (chatResponse.error) {
            console.error(chatResponse.error);
            return;
        }

        const chats = chatResponse.data as ChatProps[];
        const privateChatIds: string[] = [];
        for (const chat of chats) {
            if (chat.type === 'private') {
                privateChatIds.push(chat.id ?? '');
            }
        }

        const privateChats = await this.findPrivateChatsByIdAsync(privateChatIds);
        console.log(privateChats);

        //await MeiliSearchService.addDocumentsAsync(this._meiliIndexName, documents);

        // const queueData = await RedisService.lPopAsync(RedisChatIndexKey.Default) as string | undefined;
        // if (!queueData) {
        //     //await RedisService.setAsync(RedisChatIndexKey.Loaded, 'true');
        // }

        // await this.publishAccountIndexing(queueData);
    }

    public async addPrivateDocumentAsync(chatPrivate: ChatPrivateProps): Promise<void> {
        try {
            const document = await this.createPrivateChatDocumentAsync(chatPrivate);
            await MeiliSearchService.addDocumentsAsync(this._meiliIndexName, [document]);
        }
        catch (error: any) {
            console.error(error);
            return;
        }
    }

    public async updatePrivateDocumentAsync(chatPrivate: ChatPrivateProps): Promise<void> {
        try {
            const document = await this.createPrivateChatDocumentAsync(chatPrivate);
            await MeiliSearchService.updateDocumentsAsync(this._meiliIndexName, [document]);
        }
        catch (error: any) {
            console.error(error);
            return;
        }
    }

    public async deletePrivateDocumentAsync(privateChat: ChatPrivateProps): Promise<void> {
        await MeiliSearchService.deleteDocumentAsync(
            this._meiliIndexName,
            privateChat?.chat_id ?? ''
        );
    }

    public async findChatAsync(id: string): Promise<ChatProps | null> {
        const { data, error } = await SupabaseService.client
            .from('chat')
            .select()
            .match({ id: id });

        if (error) {
            console.error(error);
            return null;
        }

        return data.length > 0 ? data[0] : null;
    }

    public async findChatsByIdAsync(ids: string[]): Promise<ChatProps[] | null> {
        const { data, error } = await SupabaseService.client
            .from('chat')
            .select()
            .contains('id', ids);

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findPrivateChatsByIdAsync(ids: string[]): Promise<ChatProps[] | null> {
        const { data, error } = await SupabaseService.client
            .from('chat_privates')
            .select()
            .contains('id', ids);

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findPrivateChatAsync(id: string): Promise<ChatPrivateProps | null> {
        const { data, error } = await SupabaseService.client
            .from('chat_privates')
            .select()
            .match({ id: id });

        if (error) {
            console.error(error);
            return null;
        }

        return data.length > 0 ? data[0] : null;
    }

    public async createPrivateChatAsync(
        request: InstanceType<typeof CreatePrivateChatRequest>
    ): Promise<InstanceType<typeof ChatResponse> | null> {
        const chatResponse = new ChatResponse();
        const accountIds = request.getAccountIdsList();
        const existingChat = await this.findPrivateChatByAccountsAsync(accountIds);
        if (existingChat) {
            throw HttpError.createError(409, 'Chat already exists');
        }

        const chatDataProps: ChatProps = {
            type: 'private'
        };
        const chatDataResponse = await SupabaseService.client
            .from('chat')
            .insert([chatDataProps])
            .select();

        if (chatDataResponse.error) {
            console.error(chatDataResponse.error);
            return null;
        }

        const chatData = chatDataResponse.data.length > 0 ? chatDataResponse.data[0] : null;

        const chatPrivateResponse = new ChatPrivateResponse();
        const chatPrivateDataProps: ChatPrivateProps = {
            chat_id: chatData?.id,
            account_ids: accountIds
        };
        const chatPrivateDataResponse = await SupabaseService.client
            .from('chat_privates')
            .insert([chatPrivateDataProps])
            .select();

        if (chatPrivateDataResponse.error) {
            console.error(chatPrivateDataResponse.error);
            return null;
        }

        const chatPrivateData = chatPrivateDataResponse.data.length > 0 ? chatPrivateDataResponse.data[0] : null;
        chatPrivateResponse.setChatId(chatPrivateData?.id);
        chatPrivateResponse.setAccountIdsList(chatPrivateData?.account_ids);

        chatResponse.setId(chatData?.id);
        chatResponse.setType(chatData?.type);
        chatResponse.setCreatedAt(chatData?.created_at);
        chatResponse.setPrivate(chatPrivateResponse);

        return chatResponse;
    }

    public async updatePrivateChatAsync(
        id: string,
        request: InstanceType<typeof UpdatePrivateChatRequest>
    ): Promise<InstanceType<typeof ChatResponse> | null> {
        const chatPrivateResponse = new ChatPrivateResponse();
        const accountIds = request.getAccountIdsList();
        const chatPrivateDataProps: ChatPrivateProps = {
            account_ids: accountIds
        };
        const chatPrivateDataResponse = await SupabaseService.client
            .from('chat_privates')
            .update(chatPrivateDataProps)
            .match({ chat_id: id })
            .select();

        if (chatPrivateDataResponse.error) {
            console.error(chatPrivateDataResponse.error);
            return null;
        }

        const chatPrivateData = chatPrivateDataResponse.data.length > 0 ? chatPrivateDataResponse.data[0] : null;
        chatPrivateResponse.setChatId(chatPrivateData?.id);
        chatPrivateResponse.setAccountIdsList(chatPrivateData?.account_ids);

        const date = new Date(Date.now());
        const chatDataProps: ChatProps = {
            updated_at: date.toUTCString()
        };
        const chatDataResponse = await SupabaseService.client
            .from('chat')
            .update(chatDataProps)
            .match({ id: id })
            .select();

        if (chatDataResponse.error) {
            console.error(chatDataResponse.error);
            return null;
        }

        const chatData = chatDataResponse.data.length > 0 ? chatDataResponse.data[0] : null;
        const chatResponse = new ChatResponse();
        chatResponse.setId(chatData?.id);
        chatResponse.setCreatedAt(chatData?.created_at);
        chatResponse.setType(chatData?.type);
        chatResponse.setUpdatedAt(chatData?.updated_at);
        chatResponse.setPrivate(chatPrivateResponse);

        return chatResponse;
    }

    public async deleteChatAsync(id: string): Promise<void> {
        const chatResponse = await this.findChatAsync(id);
        if (chatResponse?.type === 'private') {
            const { error } = await SupabaseService.client
                .from('chat_privates')
                .delete()
                .match({ chat_id: id });

            if (error) {
                console.error(error);
            }
        }

        const { error } = await SupabaseService.client
            .from('chat')
            .delete()
            .match({ id: id });

        if (error) {
            console.error(error);
        }
    }

    private async createPrivateChatDocumentAsync(chatPrivate: ChatPrivateProps): Promise<ChatDocument> {
        const chat = await this.findChatAsync(chatPrivate?.chat_id ?? '');
        const document: ChatDocument = { ...chat };

        const tags: string[] = [];
        const accounts = await AccountService.findAccountsByIdAsync(chatPrivate?.account_ids ?? []) ?? [];
        const customerIds = accounts.map((value) => value.customer_id ?? '');
        const customers = await MedusaService.getCustomersByIdAsync(customerIds);
        const customerRecord: Record<string, CustomerProps> = {};
        customers?.map((value) => customerRecord[value.id] = value);

        for (const account of accounts) {
            const customer = customerRecord[account.customer_id ?? ''];
            account.username && tags.push(account.username);

            if (customer) {
                customer.email && tags.push(customer.email);
                customer.first_name && tags.push(customer.first_name);
                customer.last_name && tags.push(customer.last_name);
            }
        }

        document.tags = tags;
        return document;
    }

    private async findPrivateChatByAccountsAsync(account_ids: string[]): Promise<ChatProps | null> {
        const { data, error } = await SupabaseService.client
            .from('chat_privates')
            .select()
            .contains('account_ids', account_ids);

        if (error) {
            console.error(error);
            return null;
        }

        return data.length > 0 ? data[0] : null;
    }

    private async onRedisConnection(redis: Redis): Promise<void> {
        const indexCreated = await RedisService.getAsync(RedisChatIndexKey.Created);
        if (!indexCreated || indexCreated !== 'true') {
            await MeiliSearchService.createIndexAsync(this._meiliIndexName);
            await MeiliSearchService.updateSettingsAsync(
                this._meiliIndexName,
                {
                    searchableAttributes: ['*'],
                    displayedAttributes: ['*'],
                    filterableAttributes: [],
                    sortableAttributes: ['created_at', 'updated_at']
                }
            );
            await RedisService.setAsync(RedisChatIndexKey.Created, 'true');
        }

        const indexLoaded = await RedisService.getAsync(RedisChatIndexKey.Loaded);
        if (indexLoaded) {
            return;
        }

        const queueLength = await RedisService.lLenAsync(RedisChatIndexKey.Default);
        if (queueLength !== undefined && queueLength <= 0) {
            await this.queueIndexDocumentsAsync();
        }

        const queueData = await RedisService.lPopAsync(RedisChatIndexKey.Default) as string | undefined;
        await this.publishAccountIndexing(queueData);
    }

    private async queueIndexDocumentsAsync(): Promise<void> {
        const chatResponse = await SupabaseService.client
            .from('chat')
            .select("", { count: "exact" });

        if (chatResponse.error) {
            console.error(chatResponse.error);
            return;
        }

        const count = chatResponse?.count ?? 0;
        for (let i = 0; i < count; i += this._indexLimit) {
            await RedisService.rPushAsync(RedisChatIndexKey.Default, JSON.stringify({ limit: this._indexLimit, offset: i }));
        }
    }

    private async publishAccountIndexing(data: string | undefined): Promise<void> {
        if (!data) {
            return;
        }

        const axiosConfig = JSON.stringify({
            method: 'post',
            url: `${this._apiUrl}/chat/indexing`,
            data: data,
            headers: {
                'Authorization': `Bearer ${SupabaseService.key}`,
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        } as IRequest);
        await RedisService.publishAsync('axios:request', axiosConfig);
    }
}

export default new ChatService();
