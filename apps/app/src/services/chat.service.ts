import axios from 'axios';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';
import {
    ChatMessageResponse,
    ChatMessagesResponse,
    ChatResponse,
    CreatePrivateChatRequest,
    LastChatMessagesRequest,
} from '../protobuf/chat_pb';
import { Service } from '../service';
import SupabaseService from './supabase.service';

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

    public decryptMessage(
        encryptedMessage: string,
        nonce: string,
        publicKey: string,
        secretKey: string
    ): string | null {
        const decryptedMessage = nacl.box.open(
            util.decodeUTF8(encryptedMessage),
            util.decodeUTF8(nonce),
            util.decodeUTF8(publicKey),
            util.decodeUTF8(secretKey)
        );
        if (!decryptedMessage) {
            return null;
        }
        return util.encodeUTF8(decryptedMessage);
    }

    public encryptMessage(
        decryptedMessage: string,
        publicKey: string,
        secretKey: string
    ): { encryptedMessage: string; nonce: string } | null {
        const nonce = nacl.randomBytes(nacl.box.nonceLength);
        const encryptedMessage = nacl.box(
            util.decodeUTF8(decryptedMessage),
            nonce,
            util.decodeUTF8(publicKey),
            util.decodeUTF8(secretKey)
        );
        if (!encryptedMessage) {
            return null;
        }

        return {
            encryptedMessage: util.encodeUTF8(encryptedMessage),
            nonce: util.encodeUTF8(nonce),
        };
    }
}

export default new ChatService();
