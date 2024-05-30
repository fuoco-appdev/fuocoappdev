import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import {
    ChatPrivateResponse,
    ChatResponse,
    CreatePrivateChatRequest,
    UpdatePrivateChatRequest,
} from '../protobuf/chat_pb.js';
import { AccountProps } from './account.service.ts';
import MeiliSearchService from './meilisearch.service.ts';
import SupabaseService from './supabase.service.ts';

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

export interface User extends AccountProps {
    customer?: object;
}

export interface ChatDocument extends ChatProps {
    private?: ChatPrivateProps;
    users?: User[];
}

class ChatService {
    private readonly _meiliIndexName: string;
    constructor() {
        this._meiliIndexName = 'chat';

        MeiliSearchService.getIndexAsync(this._meiliIndexName).then(
            async (response: any) => {
                if (!response) {
                    await MeiliSearchService.createIndexAsync(this._meiliIndexName);
                }

                await MeiliSearchService.updateSettingsAsync(
                    this._meiliIndexName,
                    {
                        searchableAttributes: ['*'],
                        displayedAttributes: ['*'],
                        filterableAttributes: ['private'],
                        sortableAttributes: ['created_at', 'updated_at']
                    }
                );
            }
        );
    }

    public async addDocumentAsync(account: ChatProps): Promise<void> {
        // const customer = (await MedusaService.getCustomerAsync(
        //     account?.customer_id ?? ''
        // )) as any;
        // if (!customer) {
        //     return;
        // }

        // customer['orders'] = null;
        // const metadata = JSON.parse(account.metadata);
        // const geo = metadata?.['geo'];
        // const document = {
        //     ...account,
        //     customer: customer,
        //     _geo: {
        //         lat: geo?.lat ?? 0,
        //         lng: geo?.lng ?? 0,
        //     },
        // };
        // await MeiliSearchService.addDocumentAsync(this._meiliIndexName, document);
    }

    public async updateDocumentAsync(account: ChatProps): Promise<void> {
        // const customer = (await MedusaService.getCustomerAsync(
        //     account?.customer_id ?? ''
        // )) as any;
        // if (!customer) {
        //     return;
        // }

        // customer['orders'] = null;
        // const metadata = JSON.parse(account.metadata);
        // const geo = metadata?.['geo'];
        // const document = {
        //     ...account,
        //     customer: customer,
        //     _geo: {
        //         lat: geo?.lat ?? 0,
        //         lng: geo?.lng ?? 0,
        //     },
        // };
        // await MeiliSearchService.updateDocumentAsync(
        //     this._meiliIndexName,
        //     document
        // );
    }

    public async deleteDocumentAsync(account: ChatProps): Promise<void> {
        await MeiliSearchService.deleteDocumentAsync(
            this._meiliIndexName,
            account?.id ?? ''
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

    public async findPrivateChatAsync(id: string): Promise<ChatProps | null> {
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

    public async deleteAsync(supabaseId: string): Promise<void> {
        const { error } = await SupabaseService.client
            .from('account')
            .delete()
            .match({ supabase_id: supabaseId });

        if (error) {
            console.error(error);
        }
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
}

export default new ChatService();
