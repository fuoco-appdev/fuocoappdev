import { RealtimeChannel } from '@supabase/realtime-js';
import axios from 'axios';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';
import {
    ChatAccountSubscriptionIdsResponse,
    ChatMessageResponse,
    ChatMessagesRequest,
    ChatMessagesResponse,
    ChatPrivateSubscriptionRequest,
    ChatResponse,
    ChatSeenMessageResponse,
    ChatSeenMessagesRequest,
    ChatSeenMessagesResponse,
    ChatSubscriptionResponse,
    ChatSubscriptionsRequest,
    ChatSubscriptionsResponse,
    CreatePrivateChatRequest,
    LastChatMessagesRequest
} from '../protobuf/chat_pb';
import { Service } from '../service';
import SupabaseService from './supabase.service';

export interface ChatSubscription {
    chatId: string;
    accountId: string;
    publicKey: string;
    privateKey: string;
    requestAt?: string;
    joinedAt?: string;
}

class ChatService extends Service {
    constructor() {
        super();
    }

    public async requestCreatePrivateChatAsync(props: {
        accountIds: string[];
    }): Promise<ChatResponse | null> {
        const session = await SupabaseService.requestSessionAsync();
        const privateChatRequest = new CreatePrivateChatRequest({
            accountIds: props.accountIds,
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/create-private`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: privateChatRequest.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatResponse = ChatResponse.fromBinary(arrayBuffer);

        return chatResponse;
    }

    public async requestLastMessagesAsync(props: {
        chatIds: string[];
    }): Promise<ChatMessageResponse[] | null> {
        const session = await SupabaseService.requestSessionAsync();
        const lastChatMessagesRequest = new LastChatMessagesRequest({
            chatIds: props.chatIds,
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/last-messages`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: lastChatMessagesRequest.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatMessagesResponse = ChatMessagesResponse.fromBinary(arrayBuffer);

        return chatMessagesResponse.messages;
    }

    public async requestMessagesAsync(props: {
        chatId: string;
        limit: number;
        offset: number;
        ignoredSubscriptionIds: string[];
    }): Promise<ChatMessagesResponse | null> {
        const session = await SupabaseService.requestSessionAsync();
        const chatMessagesRequest = new ChatMessagesRequest({
            chatId: props.chatId,
            limit: props.limit,
            offset: props.offset,
            ignoredSubscriptionIds: props.ignoredSubscriptionIds
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/messages`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: chatMessagesRequest.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatMessagesResponse = ChatMessagesResponse.fromBinary(arrayBuffer);
        return chatMessagesResponse;
    }


    public async requestPrivateSubscriptionAsync(props: {
        chatId: string;
        activeAccountId: string;
        otherAccountId: string;
    }): Promise<ChatSubscriptionResponse> {
        const session = await SupabaseService.requestSessionAsync();
        const chatPrivateSubscriptionsRequest = new ChatPrivateSubscriptionRequest({
            chatId: props.chatId,
            activeAccountId: props.activeAccountId,
            otherAccountId: props.otherAccountId
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/request-private-subscription`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: chatPrivateSubscriptionsRequest.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatSubscriptionResponse = ChatSubscriptionResponse.fromBinary(arrayBuffer);
        return chatSubscriptionResponse;
    }

    public async requestSubscriptionsAsync(props: {
        chatIds: string[];
        accountIds: string[];
    }): Promise<ChatSubscriptionResponse[]> {
        const session = await SupabaseService.requestSessionAsync();
        const chatSubscriptionsRequest = new ChatSubscriptionsRequest({
            chatIds: props.chatIds,
            accountIds: props.accountIds
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/subscriptions`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: chatSubscriptionsRequest.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatSubscriptionsResponse = ChatSubscriptionsResponse.fromBinary(arrayBuffer);
        return chatSubscriptionsResponse.subscriptions;
    }

    public async requestAccountSubscriptionIdsAsync(accountId: string): Promise<string[]> {
        const session = await SupabaseService.requestSessionAsync();
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/subscriptions/ids/${accountId}`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: '',
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatAccountSubscriptionIdsResponse = ChatAccountSubscriptionIdsResponse.fromBinary(arrayBuffer);
        return chatAccountSubscriptionIdsResponse.chatIds;
    }

    public async requestSeenByMessagesAsync(messageIds: string[]): Promise<ChatSeenMessageResponse[]> {
        const session = await SupabaseService.requestSessionAsync();
        const request = new ChatSeenMessagesRequest({
            messageIds: messageIds
        });
        const response = await axios({
            method: 'post',
            url: `${this.endpointUrl}/chat/seen-by`,
            headers: {
                ...this.headers,
                'Session-Token': `${session?.access_token}`,
            },
            data: request.toBinary(),
            responseType: 'arraybuffer',
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatSeenMessageResponse = ChatSeenMessagesResponse.fromBinary(arrayBuffer);
        return chatSeenMessageResponse.seenMessages;
    }


    public async requestUpsertMessageAsync(subscription: ChatSubscription, props: {
        text?: string;
        link?: string;
        videoUrl?: string[];
        photoUrl?: string[];
        fileUrl?: string[];
        replyTo?: string;
    }): Promise<void> {
        const nonce = this.createNonce();
        const nonceBase64 = util.encodeBase64(nonce);
        const text = props.text ? this.encryptMessage(props.text, subscription.publicKey, subscription.privateKey, nonce) : undefined;
        const link = props.link ? this.encryptMessage(props.link, subscription.publicKey, subscription.privateKey, nonce) : undefined;
        const videoUrls: string[] | undefined = props.videoUrl?.map((value) => this.encryptMessage(value, subscription.publicKey, subscription.privateKey, nonce)) ?? undefined;
        const photoUrls: string[] | undefined = props.photoUrl?.map((value) => this.encryptMessage(value, subscription.publicKey, subscription.privateKey, nonce)) ?? undefined;
        const fileUrls: string[] | undefined = props.fileUrl?.map((value) => this.encryptMessage(value, subscription.publicKey, subscription.privateKey, nonce)) ?? undefined;

        const response = await SupabaseService.supabaseClient
            ?.from('chat_message')
            .upsert({
                account_id: subscription.accountId,
                chat_id: subscription.chatId,
                text: text,
                link: link,
                video_url: videoUrls,
                photo_url: photoUrls,
                file_url: fileUrls,
                reply_to: props.replyTo,
                nonce: nonceBase64
            })
            .select();

        if (response?.error) {
            console.error("Can't upsert chat message:", response.error);
        }
    }

    public async requestInsertSeenMessageAsync(props: {
        chatId: string;
        accountId: string;
        messageId: string;
    }): Promise<void> {

        const existingResponse = await SupabaseService.supabaseClient?.from('chat_seen_messages')
            .select()
            .eq('message_id', props.messageId)
            .eq('account_id', props.accountId);

        if (existingResponse?.error) {
            console.error('Error checking for existing record:', existingResponse?.error)
            return
        }

        if (!existingResponse?.data || existingResponse?.data.length > 0) {
            return;
        }

        const date = new Date(Date.now());
        const response = await SupabaseService.supabaseClient
            ?.from('chat_seen_messages')
            .insert([{
                chat_id: props.chatId,
                account_id: props.accountId,
                message_id: props.messageId,
                seen_at: date.toUTCString()
            }])
            .select();

        if (response?.error) {
            console.error("Can't upsert chat seen message:", response.error);
        }
    }

    public subscribeToChats(chatIds: string[], onPayload: (payload: Record<string, any>) => void): RealtimeChannel | undefined {
        return SupabaseService.supabaseClient?.channel('chat-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'chat',
                    filter: `id=in.(${chatIds.join(',')})`
                },
                onPayload,
            )
            .subscribe();
    }

    public subscribeToMessages(chatIds: string[], onPayload: (payload: Record<string, any>) => void): RealtimeChannel | undefined {
        return SupabaseService.supabaseClient?.channel('chat-message-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'chat_message',
                    filter: `chat_id=in.(${chatIds.join(',')})`
                },
                onPayload,
            )
            .subscribe();
    }

    public subscribeToSeenMessage(chatIds: string[], onPayload: (payload: Record<string, any>) => void): RealtimeChannel | undefined {
        return SupabaseService.supabaseClient?.channel('chat-seen-message-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'chat_seen_messages',
                    filter: `chat_id=in.(${chatIds.join(',')})`
                },
                onPayload,
            )
            .subscribe();
    }

    public decryptMessage(
        encryptedMessage: string,
        nonce: string,
        publicKey: string,
        secretKey: string
    ): string | undefined {
        const decryptedMessage = nacl.box.open(
            util.decodeBase64(encryptedMessage),
            util.decodeBase64(nonce),
            util.decodeBase64(publicKey),
            util.decodeBase64(secretKey)
        );
        if (!decryptedMessage) {
            return undefined;
        }

        return util.encodeUTF8(decryptedMessage);
    }

    public encryptMessage(
        decryptedMessage: string,
        publicKey: string,
        secretKey: string,
        nonce: Uint8Array
    ): string {
        const encryptedMessage = nacl.box(
            util.decodeUTF8(decryptedMessage),
            nonce,
            util.decodeBase64(publicKey),
            util.decodeBase64(secretKey)
        );

        return util.encodeBase64(encryptedMessage);
    }

    private createNonce(): Uint8Array {
        return nacl.randomBytes(nacl.box.nonceLength);
    }
}

export default new ChatService();
