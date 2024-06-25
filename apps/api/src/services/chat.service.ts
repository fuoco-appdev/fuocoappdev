import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import { Redis } from 'https://deno.land/x/redis@v0.32.3/mod.ts';
import * as tweetnaclBox from 'https://deno.land/x/tweetnacl_deno@v1.0.3/src/box.ts';
import {
    ChatAccountSubscriptionIdsResponse,
    ChatMessageResponse,
    ChatMessagesRequest,
    ChatMessagesResponse,
    ChatPrivateResponse,
    ChatPrivateSubscriptionRequest,
    ChatResponse,
    ChatSeenMessageResponse,
    ChatSubscriptionRequest,
    ChatSubscriptionResponse,
    ChatSubscriptionsRequest,
    ChatSubscriptionsResponse,
    CreatePrivateChatRequest,
    LastChatMessagesRequest,
    UpdatePrivateChatRequest
} from '../protobuf/chat_pb.js';
import AccountService, { AccountProps } from './account.service.ts';
import CryptoService from './crypto.service.ts';
import MedusaService, { CustomerProps } from './medusa.service.ts';
import MeiliSearchService from './meilisearch.service.ts';
import RedisService, { RedisIndexKey } from './redis.service.ts';
import SupabaseService from './supabase.service.ts';

enum RedisChatIndexKey {
    Created = 'chat:indexing:created',
    Loaded = 'chat:indexing:loaded',
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

export interface ChatSubscriptionProps {
    id?: string;
    chat_id?: string;
    requested_at?: string;
    account_id?: string;
    joined_at?: string;
    public_key?: string;
    private_key?: string;
}

export interface ChatMessageProps {
    id?: string;
    created_at?: string;
    text?: string;
    nonce?: string;
    chat_id?: string;
    account_id?: string;
    link?: string;
    video_url?: string[];
    photo_url?: string[];
    file_url?: string[];
    reply_to?: string;
}

export interface ChatDocument extends ChatProps {
    tags?: string[];
    private?: ChatPrivateProps;
}

class ChatService {
    private readonly _meiliIndexName: string;
    private readonly _indexLimit: number;

    constructor() {
        this._meiliIndexName = 'chat';
        this._indexLimit = 100;

        this.onRedisConnection = this.onRedisConnection.bind(this);
        this.onIndexingComplete = this.onIndexingComplete.bind(this);

        RedisService.addConnectionCallback(this.onRedisConnection);
        RedisService.addIndexingCompleteCallback(this.onIndexingComplete);
    }

    public async indexDocumentsAsync(data: {
        limit: number;
        offset: number;
    }): Promise<void> {
        let documents: ChatDocument[] = [];
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
        const privateTypeChats: Record<string, ChatProps> = {};
        for (const chat of chats) {
            if (!chat.id) {
                continue;
            }

            if (chat.type === 'private') {
                privateTypeChats[chat.id] = chat;
            }
        }

        const privateChatIds = Object.keys(privateTypeChats);
        if (privateChatIds.length > 0) {
            const privateChats =
                (await this.findPrivateChatsByIdAsync(privateChatIds)) ?? [];
            const privateDocuments = await this.createPrivateChatDocumentsAsync(
                privateTypeChats,
                privateChats
            );
            documents = documents.concat(privateDocuments);
        }

        await MeiliSearchService.addDocumentsAsync(this._meiliIndexName, documents);
        await RedisService.popIndexAsync();
    }

    public async addPrivateDocumentAsync(
        chatPrivate: ChatPrivateProps
    ): Promise<void> {
        try {
            const document = await this.createPrivateChatDocumentAsync(chatPrivate);
            await MeiliSearchService.addDocumentsAsync(this._meiliIndexName, [
                document,
            ]);
        } catch (error: any) {
            console.error(error);
            return;
        }
    }

    public async updatePrivateDocumentAsync(
        chatPrivate: ChatPrivateProps
    ): Promise<void> {
        try {
            const document = await this.createPrivateChatDocumentAsync(chatPrivate);
            await MeiliSearchService.updateDocumentsAsync(this._meiliIndexName, [
                document,
            ]);
        } catch (error: any) {
            console.error(error);
            return;
        }
    }

    public async deletePrivateDocumentAsync(
        privateChat: ChatPrivateProps
    ): Promise<void> {
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
            .in('id', ids);

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findPrivateChatsByIdAsync(
        ids: string[]
    ): Promise<ChatPrivateProps[] | null> {
        const { data, error } = await SupabaseService.client
            .from('chat_privates')
            .select()
            .in('chat_id', ids);

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    }

    public async findPrivateChatAsync(
        id: string
    ): Promise<ChatPrivateProps | null> {
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
            type: 'private',
        };
        const chatDataResponse = await SupabaseService.client
            .from('chat')
            .insert([chatDataProps])
            .select();

        if (chatDataResponse.error) {
            console.error(chatDataResponse.error);
            return null;
        }

        const chatData =
            chatDataResponse.data.length > 0 ? chatDataResponse.data[0] : null;

        const chatPrivateResponse = new ChatPrivateResponse();
        const chatPrivateDataProps: ChatPrivateProps = {
            chat_id: chatData?.id,
            account_ids: accountIds,
        };
        const chatPrivateDataResponse = await SupabaseService.client
            .from('chat_privates')
            .insert([chatPrivateDataProps])
            .select();

        if (chatPrivateDataResponse.error) {
            console.error(chatPrivateDataResponse.error);
            return null;
        }

        const chatPrivateData =
            chatPrivateDataResponse.data.length > 0
                ? chatPrivateDataResponse.data[0]
                : null;
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
            account_ids: accountIds,
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

        const chatPrivateData =
            chatPrivateDataResponse.data.length > 0
                ? chatPrivateDataResponse.data[0]
                : null;
        chatPrivateResponse.setChatId(chatPrivateData?.id);
        chatPrivateResponse.setAccountIdsList(chatPrivateData?.account_ids);

        const date = new Date(Date.now());
        const chatDataProps: ChatProps = {
            updated_at: date.toUTCString(),
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

        const chatData =
            chatDataResponse.data.length > 0 ? chatDataResponse.data[0] : null;
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

    public async getLastChatMessagesAsync(
        request: InstanceType<typeof LastChatMessagesRequest>
    ): Promise<InstanceType<typeof ChatMessagesResponse>> {
        const response = new ChatMessagesResponse();
        const chatIds = request.getChatIdsList();
        const chatMessagesData = await SupabaseService.client
            .from('chat_message')
            .select(
                '*, chat_seen_messages:id(*)'
            )
            .in('chat_id', chatIds)
            .order('created_at', { ascending: true });

        if (chatMessagesData.error) {
            console.error(chatMessagesData.error);
            return response;
        }

        const messages: Partial<ChatMessageProps>[] | null = (chatMessagesData.data as Partial<ChatMessageProps>[] | null) ?? [];
        for (const messageData of messages) {
            const message = new ChatMessageResponse();
            message.setId(messageData.id);
            message.setChatId(messageData.chat_id);
            message.setAccountId(messageData.account_id);
            message.setCreatedAt(messageData.created_at);
            message.setNonce(messageData.nonce);
            message.setReplyTo(messageData.reply_to);
            const encryptedText = await CryptoService.encryptAsync(messageData.text) ?? '';
            const encryptedLink = await CryptoService.encryptAsync(messageData.link) ?? '';
            const encryptedVideoUrls: string[] = messageData.video_url ? messageData.video_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            const encryptedPhotoUrls: string[] = messageData.photo_url ? messageData.photo_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            const encryptedFileUrls: string[] = messageData.file_url ? messageData.file_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            message.setTextEncrypted(encryptedText);
            message.setLinkEncrypted(encryptedLink);
            message.setVideoUrlEncryptedList(encryptedVideoUrls);
            message.setPhotoUrlEncryptedList(encryptedPhotoUrls);
            message.setFileUrlEncryptedList(encryptedFileUrls);

            for (const seenMessage of messageData.seen_by ?? []) {
                const chatSeenMessageResponse = new ChatSeenMessageResponse();
                chatSeenMessageResponse.setMessageId(seenMessage.message_id);
                chatSeenMessageResponse.setAccountId(seenMessage.account_id);
                chatSeenMessageResponse.setChatId(seenMessage.chat_id);
                chatSeenMessageResponse.setSeenAt(seenMessage.seen_at);
                message.addSeenBy(chatSeenMessageResponse);
            }

            response.addMessages(message);
        }

        return response;
    }

    public async getChatMessagesAsync(
        request: InstanceType<typeof ChatMessagesRequest>
    ): Promise<InstanceType<typeof ChatMessagesResponse>> {
        const response = new ChatMessagesResponse();
        const chatId = request.getChatId();
        const limit = request.getLimit();
        const offset = request.getOffset();
        const chatMessagesData = await SupabaseService.client
            .from('chat_message')
            .select(
                '*, chat_seen_messages:id(*)'
            )
            .eq('chat_id', chatId)
            .limit(limit)
            .range(offset, offset + limit)
            .order('created_at', { ascending: true });

        if (chatMessagesData.error) {
            console.error(chatMessagesData.error);
            return response;
        }

        const messages: Partial<ChatMessageProps>[] | null = (chatMessagesData.data as Partial<ChatMessageProps>[] | null) ?? [];
        for (const messageData of messages) {
            const message = new ChatMessageResponse();
            message.setId(messageData.id);
            message.setChatId(messageData.chat_id);
            message.setAccountId(messageData.account_id);
            message.setCreatedAt(messageData.created_at);
            message.setNonce(messageData.nonce);
            message.setReplyTo(messageData.reply_to);
            const encryptedText = await CryptoService.encryptAsync(messageData.text) ?? '';
            const encryptedLink = await CryptoService.encryptAsync(messageData.link) ?? '';
            const encryptedVideoUrls: string[] = messageData.video_url ? messageData.video_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            const encryptedPhotoUrls: string[] = messageData.photo_url ? messageData.photo_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            const encryptedFileUrls: string[] = messageData.file_url ? messageData.file_url.map(async (value: string) => await CryptoService.encryptAsync(value) ?? '') : [];
            message.setTextEncrypted(encryptedText);
            message.setLinkEncrypted(encryptedLink);
            message.setVideoUrlEncryptedList(encryptedVideoUrls);
            message.setPhotoUrlEncryptedList(encryptedPhotoUrls);
            message.setFileUrlEncryptedList(encryptedFileUrls);

            for (const seenMessage of messageData.seen_by ?? []) {
                const chatSeenMessageResponse = new ChatSeenMessageResponse();
                chatSeenMessageResponse.setMessageId(seenMessage.message_id);
                chatSeenMessageResponse.setAccountId(seenMessage.account_id);
                chatSeenMessageResponse.setChatId(seenMessage.chat_id);
                chatSeenMessageResponse.setSeenAt(seenMessage.seen_at);
                message.addSeenBy(chatSeenMessageResponse);
            }

            response.addMessages(message);
        }

        return response;
    }

    public async requestSubscriptionsAsync(
        request: InstanceType<typeof ChatSubscriptionsRequest>
    ): Promise<InstanceType<typeof ChatSubscriptionsResponse> | null> {
        const response = new ChatSubscriptionsResponse();
        const chatIds = request.getChatIdsList();
        const accountIds = request.getAccountIdsList();
        const chatSubscriptions = await SupabaseService.client
            .from('chat_subscription')
            .select()
            .in('chat_id', chatIds)
            .in('account_id', accountIds);

        if (chatSubscriptions.error) {
            console.error(chatSubscriptions.error);
            return null;
        }

        for (const data of chatSubscriptions.data as ChatSubscriptionProps[]) {
            const subscription = new ChatSubscriptionResponse();
            const encryptedPrivateKey =
                data.private_key &&
                await CryptoService.encryptAsync(data.private_key);
            const encryptedPublicKey =
                data.public_key &&
                await CryptoService.encryptAsync(data.public_key);
            data.id && subscription.setId(data.id);
            data.chat_id && subscription.setChatId(data.chat_id);
            data.account_id && subscription.setAccountId(data.account_id);
            data.joined_at && subscription.setJoinedAt(data.joined_at);
            data.requested_at && subscription.setRequestAt(data.requested_at);
            encryptedPrivateKey && subscription.setPrivateKeyEncrypted(encryptedPrivateKey);
            encryptedPublicKey && subscription.setPublicKeyEncrypted(encryptedPublicKey);
            response.addSubscriptions(subscription);
        }

        return response;
    }

    public async requestAccountSubscriptionIdsAsync(
        accountId: string
    ): Promise<InstanceType<typeof ChatAccountSubscriptionIdsResponse> | null> {
        const response = new ChatAccountSubscriptionIdsResponse();
        const chatSubscriptions = await SupabaseService.client
            .from('chat_subscription')
            .select('chat_id')
            .eq('account_id', accountId);

        if (chatSubscriptions.error) {
            console.error(chatSubscriptions.error);
            return null;
        }

        const subscriptions = chatSubscriptions.data as ChatSubscriptionProps[] ?? [];
        for (const data of subscriptions) {
            if (!data.chat_id) {
                continue;
            }
            response.addChatIds(data.chat_id);
        }

        return response;
    }

    public async requestPrivateSubscriptionAsync(
        request: InstanceType<typeof ChatPrivateSubscriptionRequest>
    ): Promise<InstanceType<typeof ChatSubscriptionResponse> | null> {
        const chatId = request.getChatId();
        const activeAccountId = request.getActiveAccountId();
        const otherAccountId = request.getOtherAccountId();

        const chat = await this.findChatAsync(chatId);
        if (!chat) {
            return null;
        }

        const activeAccountExistingSubscription = await this.findChatSubscriptionAsync({
            chatId: chatId,
            accountId: activeAccountId,
        });
        const otherAccountExistingSubscription = await this.findChatSubscriptionAsync({
            chatId: chatId,
            accountId: otherAccountId,
        });

        const date = new Date(Date.now());
        if (otherAccountExistingSubscription) {
            otherAccountExistingSubscription.joined_at = date.toUTCString();
            const response = await this.upsertChatSubscriptionAsync(otherAccountExistingSubscription);
            if (!response) {
                console.error('Cannot update subscription');
            }
        }
        else {
            const { publicKey, secretKey } = tweetnaclBox.box_keyPair();
            const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
            const privateKeyBase64 = Buffer.from(secretKey).toString('base64');
            const chatSubscriptionProps: ChatSubscriptionProps = {
                chat_id: chatId,
                joined_at: date.toUTCString(),
                account_id: otherAccountId,
                private_key: privateKeyBase64,
                public_key: publicKeyBase64,
            };
            const response = await this.upsertChatSubscriptionAsync(chatSubscriptionProps);
            if (!response) {
                console.error('Cannot update subscription');
            }
        }

        if (activeAccountExistingSubscription) {
            activeAccountExistingSubscription.requested_at = date.toUTCString();
            return await this.upsertChatSubscriptionAsync(activeAccountExistingSubscription);
        }

        const { publicKey, secretKey } = tweetnaclBox.box_keyPair();
        const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
        const privateKeyBase64 = Buffer.from(secretKey).toString('base64');
        const chatSubscriptionProps: ChatSubscriptionProps = {
            chat_id: chatId,
            requested_at: date.toUTCString(),
            account_id: activeAccountId,
            private_key: privateKeyBase64,
            public_key: publicKeyBase64
        };
        return await this.upsertChatSubscriptionAsync(chatSubscriptionProps);
    }

    public async requestSubscriptionAsync(
        request: InstanceType<typeof ChatSubscriptionRequest>
    ): Promise<InstanceType<typeof ChatSubscriptionResponse> | null> {
        const chatId = request.getChatId();
        const accountId = request.getAccountId();

        const chat = await this.findChatAsync(chatId);
        if (!chat) {
            return null;
        }

        const existingSubscription = await this.findChatSubscriptionAsync({
            chatId: chatId,
            accountId: accountId,
        });

        const date = new Date(Date.now());
        if (existingSubscription) {
            existingSubscription.requested_at = date.toUTCString();
            return await this.upsertChatSubscriptionAsync(existingSubscription);
        }

        const { publicKey, secretKey } = tweetnaclBox.box_keyPair();
        const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
        const privateKeyBase64 = Buffer.from(secretKey).toString('base64');
        const chatSubscriptionProps: ChatSubscriptionProps = {
            chat_id: chatId,
            requested_at: date.toUTCString(),
            account_id: accountId,
            private_key: privateKeyBase64,
            public_key: publicKeyBase64
        };
        return await this.upsertChatSubscriptionAsync(chatSubscriptionProps);
    }

    public async joinSubscriptionAsync(
        request: InstanceType<typeof ChatSubscriptionRequest>
    ): Promise<InstanceType<typeof ChatSubscriptionResponse> | null> {
        const chatId = request.getChatId();
        const accountId = request.getAccountId();

        const chat = await this.findChatAsync(chatId);
        if (!chat) {
            return null;
        }

        const existingSubscription = await this.findChatSubscriptionAsync({
            chatId: chatId,
            accountId: accountId,
        });

        const date = new Date(Date.now());
        if (existingSubscription) {
            existingSubscription.joined_at = date.toUTCString();
            return await this.upsertChatSubscriptionAsync(existingSubscription);
        }

        const { publicKey, secretKey } = tweetnaclBox.box_keyPair();
        const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
        const privateKeyBase64 = Buffer.from(secretKey).toString('base64');
        const chatSubscriptionProps: ChatSubscriptionProps = {
            chat_id: chatId,
            joined_at: date.toUTCString(),
            account_id: accountId,
            private_key: privateKeyBase64,
            public_key: publicKeyBase64
        };
        return await this.upsertChatSubscriptionAsync(chatSubscriptionProps);
    }

    public async removeSubscriptionAsync(
        request: InstanceType<typeof ChatSubscriptionRequest>
    ): Promise<InstanceType<typeof ChatSubscriptionResponse> | null> {
        const response = new ChatSubscriptionResponse();
        const chatId = request.getChatId();
        const accountId = request.getAccountId();

        const existingSubscription = await this.findChatSubscriptionAsync({
            chatId: chatId,
            accountId: accountId,
        });

        if (existingSubscription) {
            const chatSubscriptionResponse = await SupabaseService.client
                .from('chat_subscription')
                .delete()
                .eq('chat_id', chatId)
                .eq('account_id', accountId)
                .select();

            if (chatSubscriptionResponse.error) {
                console.error(chatSubscriptionResponse.error);
                return null;
            }

            return response;
        }

        return null;
    }

    private async upsertChatSubscriptionAsync(props: ChatSubscriptionProps): Promise<InstanceType<typeof ChatSubscriptionResponse> | null> {
        const response = new ChatSubscriptionResponse();
        const chatSubscriptionResponse = await SupabaseService.client
            .from('chat_subscription')
            .upsert(props)
            .select();

        if (chatSubscriptionResponse.error) {
            console.error(chatSubscriptionResponse.error);
            return null;
        }

        const subscription: ChatSubscriptionProps | null =
            chatSubscriptionResponse.data.length
                ? chatSubscriptionResponse.data[0]
                : null;
        const encryptedPrivateKey =
            subscription?.private_key &&
            await CryptoService.encryptAsync(subscription.private_key);
        const encryptedPublicKey =
            subscription?.public_key &&
            await CryptoService.encryptAsync(subscription.public_key);
        subscription?.id && response.setId(subscription.id);
        subscription?.chat_id && response.setChatId(subscription.chat_id);
        subscription?.account_id &&
            response.setAccountId(subscription.account_id);
        subscription?.joined_at && response.setJoinedAt(subscription.joined_at);
        subscription?.requested_at &&
            response.setRequestAt(subscription.requested_at);
        encryptedPrivateKey &&
            response.setPrivateKeyEncrypted(encryptedPrivateKey);
        encryptedPublicKey && response.setPublicKeyEncrypted(encryptedPublicKey);
        return response;
    }

    private async createPrivateChatDocumentAsync(
        chatPrivate: ChatPrivateProps
    ): Promise<ChatDocument> {
        const chat = await this.findChatAsync(chatPrivate?.chat_id ?? '');
        const document: ChatDocument = { ...chat, private: chatPrivate };

        const tags: string[] = [];
        const accounts =
            (await AccountService.findAccountsByIdAsync(
                chatPrivate?.account_ids ?? []
            )) ?? [];
        const customerIds = accounts.map((value) => value.customer_id ?? '');
        const customers = await MedusaService.getCustomersByIdAsync(customerIds);
        const customerRecord: Record<string, CustomerProps> = {};
        customers?.map((value) => (customerRecord[value.id] = value));

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

    private async createPrivateChatDocumentsAsync(
        chats: Record<string, ChatProps>,
        chatPrivates: ChatPrivateProps[]
    ): Promise<ChatDocument[]> {
        const documents: ChatDocument[] = [];
        const accountRecord: Record<string, AccountProps | null> = {};
        const customerRecord: Record<string, CustomerProps | null> = {};
        for (const chatPrivate of chatPrivates) {
            for (const id of chatPrivate.account_ids ?? []) {
                accountRecord[id] = null;
            }
        }
        const accounts =
            (await AccountService.findAccountsByIdAsync(
                Object.keys(accountRecord)
            )) ?? [];
        const customerIds = accounts.map((value) => value.customer_id ?? '');
        const customers = await MedusaService.getCustomersByIdAsync(customerIds);
        customers?.map((value) => (customerRecord[value.id] = value));

        for (const chatPrivate of chatPrivates) {
            const chat = chats[chatPrivate.chat_id ?? ''];
            const document: ChatDocument = { ...chat, private: chatPrivate };
            const tags: string[] = [];

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
            documents.push(document);
        }

        return documents;
    }

    private async findPrivateChatByAccountsAsync(
        account_ids: string[]
    ): Promise<ChatProps | null> {
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

    private async findChatSubscriptionAsync(props: {
        chatId: string;
        accountId: string;
    }): Promise<ChatSubscriptionProps | null> {
        const { data, error } = await SupabaseService.client
            .from('chat_subscription')
            .select()
            .match({ chat_id: props.chatId, account_id: props.accountId });

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
            await MeiliSearchService.updateSettingsAsync(this._meiliIndexName, {
                searchableAttributes: ['*'],
                displayedAttributes: ['*'],
                filterableAttributes: ['private'],
                sortableAttributes: ['created_at', 'updated_at'],
            });
            await RedisService.setAsync(RedisChatIndexKey.Created, 'true');
        }

        const indexLoaded = await RedisService.getAsync(RedisChatIndexKey.Loaded);
        if (indexLoaded) {
            return;
        }

        const queueLength = await RedisService.lLenAsync(RedisIndexKey.Queue);
        if (queueLength !== undefined && queueLength <= 0) {
            await this.queueIndexDocumentsAsync();
        }

        await RedisService.popIndexAsync();
    }

    private async onIndexingComplete(): Promise<void> {
        await RedisService.setAsync(RedisChatIndexKey.Loaded, 'true');
    }

    private async queueIndexDocumentsAsync(): Promise<void> {
        const chatResponse = await SupabaseService.client
            .from('chat')
            .select('', { count: 'exact' });

        if (chatResponse.error) {
            console.error(chatResponse.error);
            return;
        }

        const count = chatResponse?.count ?? 0;
        for (let i = 0; i < count; i += this._indexLimit) {
            await RedisService.rPushAsync(
                RedisIndexKey.Queue,
                JSON.stringify({
                    pathname: 'chat/indexing',
                    data: { limit: this._indexLimit, offset: i },
                })
            );
        }
    }
}

export default new ChatService();
