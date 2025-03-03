import { RealtimeChannel } from '@supabase/realtime-js';
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
  LastChatMessagesRequest,
} from '../protobuf/chat_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export interface ChatSubscription {
  chatId: string;
  accountId: string;
  publicKey: string;
  privateKey: string;
  requestAt?: string;
  joinedAt?: string;
}

export default class ChatService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _logflareService: LogflareService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestCreatePrivateChatAsync(
    props: {
      accountIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const privateChatRequest = new CreatePrivateChatRequest({
        accountIds: props.accountIds,
      });
      const response = await fetch(`${this.endpointUrl}/chat/create-private`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: privateChatRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatResponse = ChatResponse.fromBinary(arrayBuffer);

      return chatResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCreatePrivateChatAsync(
          props,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestLastMessagesAsync(
    props: {
      chatIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatMessageResponse[] | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const lastChatMessagesRequest = new LastChatMessagesRequest({
        chatIds: props.chatIds,
      });
      const response = await fetch(`${this.endpointUrl}/chat/last-messages`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: lastChatMessagesRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatMessagesResponse = ChatMessagesResponse.fromBinary(arrayBuffer);

      return chatMessagesResponse.messages;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestLastMessagesAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestMessagesAsync(
    props: {
      chatId: string;
      limit: number;
      offset: number;
      ignoredSubscriptionIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatMessagesResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const chatMessagesRequest = new ChatMessagesRequest({
        chatId: props.chatId,
        limit: props.limit,
        offset: props.offset,
        ignoredSubscriptionIds: props.ignoredSubscriptionIds,
      });
      const response = await fetch(`${this.endpointUrl}/chat/messages`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: chatMessagesRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatMessagesResponse = ChatMessagesResponse.fromBinary(arrayBuffer);
      return chatMessagesResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestMessagesAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestPrivateSubscriptionAsync(
    props: {
      chatId: string;
      activeAccountId: string;
      otherAccountId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatSubscriptionResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const chatPrivateSubscriptionsRequest =
        new ChatPrivateSubscriptionRequest({
          chatId: props.chatId,
          activeAccountId: props.activeAccountId,
          otherAccountId: props.otherAccountId,
        });
      const response = await fetch(
        `${this.endpointUrl}/chat/request-private-subscription`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: chatPrivateSubscriptionsRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatSubscriptionResponse =
        ChatSubscriptionResponse.fromBinary(arrayBuffer);
      return chatSubscriptionResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestPrivateSubscriptionAsync(
          props,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestSubscriptionsAsync(
    props: {
      chatIds: string[];
      accountIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatSubscriptionResponse[]> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const chatSubscriptionsRequest = new ChatSubscriptionsRequest({
        chatIds: props.chatIds,
        accountIds: props.accountIds,
      });
      const response = await fetch(`${this.endpointUrl}/chat/subscriptions`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: chatSubscriptionsRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatSubscriptionsResponse =
        ChatSubscriptionsResponse.fromBinary(arrayBuffer);
      return chatSubscriptionsResponse.subscriptions;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSubscriptionsAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestAccountSubscriptionIdsAsync(
    accountId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<string[]> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const response = await fetch(
        `${this.endpointUrl}/chat/subscriptions/ids/${accountId}`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: '',
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatAccountSubscriptionIdsResponse =
        ChatAccountSubscriptionIdsResponse.fromBinary(arrayBuffer);
      return chatAccountSubscriptionIdsResponse.chatIds;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAccountSubscriptionIdsAsync(
          accountId,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestSeenByMessagesAsync(
    messageIds: string[],
    retries = 3,
    retryDelay = 1000
  ): Promise<ChatSeenMessageResponse[]> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const request = new ChatSeenMessagesRequest({
        messageIds: messageIds,
      });
      const response = await fetch(`${this.endpointUrl}/chat/seen-by`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: request.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const chatSeenMessageResponse =
        ChatSeenMessagesResponse.fromBinary(arrayBuffer);
      return chatSeenMessageResponse.seenMessages;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSeenByMessagesAsync(
          messageIds,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestUpsertMessageAsync(
    subscription: ChatSubscription,
    props: {
      text?: string;
      link?: string;
      videoUrl?: string[];
      photoUrl?: string[];
      fileUrl?: string[];
      replyTo?: string;
    }
  ): Promise<void> {
    const nonce = this.createNonce();
    const nonceBase64 = util.encodeBase64(nonce);
    const text = props.text
      ? this.encryptMessage(
          props.text,
          subscription.publicKey,
          subscription.privateKey,
          nonce
        )
      : undefined;
    const link = props.link
      ? this.encryptMessage(
          props.link,
          subscription.publicKey,
          subscription.privateKey,
          nonce
        )
      : undefined;
    const videoUrls: string[] | undefined =
      props.videoUrl?.map((value) =>
        this.encryptMessage(
          value,
          subscription.publicKey,
          subscription.privateKey,
          nonce
        )
      ) ?? undefined;
    const photoUrls: string[] | undefined =
      props.photoUrl?.map((value) =>
        this.encryptMessage(
          value,
          subscription.publicKey,
          subscription.privateKey,
          nonce
        )
      ) ?? undefined;
    const fileUrls: string[] | undefined =
      props.fileUrl?.map((value) =>
        this.encryptMessage(
          value,
          subscription.publicKey,
          subscription.privateKey,
          nonce
        )
      ) ?? undefined;

    const response = await this._supabaseService.supabaseClient
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
        nonce: nonceBase64,
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
    const existingResponse = await this._supabaseService.supabaseClient
      ?.from('chat_seen_messages')
      .select()
      .eq('message_id', props.messageId)
      .eq('account_id', props.accountId);

    if (existingResponse?.error) {
      console.error(
        'Error checking for existing record:',
        existingResponse?.error
      );
      return;
    }

    if (!existingResponse?.data || existingResponse?.data.length > 0) {
      return;
    }

    const date = new Date(Date.now());
    const response = await this._supabaseService.supabaseClient
      ?.from('chat_seen_messages')
      .insert([
        {
          chat_id: props.chatId,
          account_id: props.accountId,
          message_id: props.messageId,
          seen_at: date.toUTCString(),
        },
      ])
      .select();

    if (response?.error) {
      console.error("Can't upsert chat seen message:", response.error);
    }
  }

  public subscribeToChats(
    chatIds: string[],
    onPayload: (payload: Record<string, any>) => void
  ): RealtimeChannel | undefined {
    return this._supabaseService.supabaseClient
      ?.channel('chat-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat',
          filter: `id=in.(${chatIds.join(',')})`,
        },
        onPayload
      )
      .subscribe();
  }

  public subscribeToMessages(
    chatIds: string[],
    onPayload: (payload: Record<string, any>) => void
  ): RealtimeChannel | undefined {
    return this._supabaseService.supabaseClient
      ?.channel('chat-message-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_message',
          filter: `chat_id=in.(${chatIds.join(',')})`,
        },
        onPayload
      )
      .subscribe();
  }

  public subscribeToSeenMessage(
    chatIds: string[],
    onPayload: (payload: Record<string, any>) => void
  ): RealtimeChannel | undefined {
    return this._supabaseService.supabaseClient
      ?.channel('chat-seen-message-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_seen_messages',
          filter: `chat_id=in.(${chatIds.join(',')})`,
        },
        onPayload
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
