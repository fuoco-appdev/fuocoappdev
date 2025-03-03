/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from 'meilisearch';
import { Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { AccountDocument, AccountPresence } from '../models/account.model';
import {
  Chat,
  ChatDocument,
  ChatMessage,
  ChatModel,
  ChatSeenMessage,
  ChatTabs,
  DecryptedChatMessage,
  DecryptedChatMessages,
} from '../models/chat.model';
import { AccountResponse } from '../protobuf/account_pb';
import AccountService from '../services/account.service';
import ChatService, { ChatSubscription } from '../services/chat.service';
import CryptoService from '../services/crypto.service';
import MeiliSearchService from '../services/meilisearch.service';
import { StoreOptions } from '../store-options';
import AccountController from './account.controller';

export default class ChatController extends Controller {
  private readonly _model: ChatModel;
  private _activeAccountDisposer: Lambda | undefined;
  private _chatIndex: Index<Record<string, any>> | undefined;
  private _accountIndex: Index<Record<string, any>> | undefined;
  private _chatTimerId: NodeJS.Timeout | number | undefined;
  private _accountsTimerId: NodeJS.Timeout | number | undefined;
  private _limit: number;

  constructor(
    private readonly _container: DIContainer<{
      AccountService: AccountService;
      MeiliSearchService: MeiliSearchService;
      AccountController: AccountController;
      ChatService: ChatService;
      CryptoService: CryptoService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new ChatModel(this._storeOptions);
    this._limit = 20;

    this.onActiveAccountChangedAsync =
      this.onActiveAccountChangedAsync.bind(this);
  }

  public get model(): ChatModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    const meiliSearchService = this._container.get('MeiliSearchService');
    const accountController = this._container.get('AccountController');
    const accountService = this._container.get('AccountService');
    this._chatIndex = meiliSearchService.client?.index('chat');
    this._accountIndex = meiliSearchService.client?.index('account');

    this.initializeAsync(renderCount);
    this._activeAccountDisposer = observe(
      accountService,
      'activeAccount',
      (value) => {
        const activeAccount = value.newValue;
        if (
          value.newValue !== null &&
          accountController.model.account?.id !== value.newValue.id
        ) {
          this.onActiveAccountChangedAsync(activeAccount);
        }
      }
    );
  }

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    clearTimeout(this._accountsTimerId as number | undefined);
    clearTimeout(this._chatTimerId as number | undefined);
    this._activeAccountDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public async loadChatsAsync(): Promise<void> {
    if (this._model.searchInput.length > 0) {
      await this.searchChatsAsync(
        this._model.searchInput,
        'loading',
        0,
        this._limit,
        true
      );
    } else {
      await this.requestChatsAsync('loading', 0, this._limit);
    }
  }

  public async reloadChatsAsync(): Promise<void> {
    if (this._model.searchInput.length > 0) {
      await this.searchChatsAsync(
        this._model.searchInput,
        'reloading',
        0,
        this._limit,
        true
      );
    } else {
      await this.requestChatsAsync('reloading', 0, this._limit);
    }
  }

  public async loadSearchedAccountsAsync(): Promise<void> {
    await this.searchAccountsAsync(
      this._model.searchAccountsInput,
      0,
      this._limit,
      true
    );
  }

  public async loadChatAsync(id: string): Promise<void> {
    this._model.isSelectedChatLoading = true;
    this._model.messageInput = '';

    await when(() => this._model.chats.length > 0);
    const chats = this._model.chats;
    if (!chats) {
      return;
    }

    const cachedChat = this._model.chats.find((value) => value.id === id);
    if (!cachedChat) {
      try {
        const chat = await this.requestChatAsync(id);
        if (!chat) {
          return;
        }

        this._model.selectedChat = chat;
      } catch (error: any) {
        console.error(error);
      }
    } else {
      this._model.selectedChat = cachedChat;
    }

    const missingAccountIds: string[] = [];
    if (this._model.selectedChat?.type === 'private') {
      for (const id of this._model.selectedChat.private?.account_ids ?? []) {
        if (Object.keys(this._model.accounts).includes(id)) {
          continue;
        }

        missingAccountIds.push(id);
      }
    }

    if (missingAccountIds.length > 0) {
      try {
        const accountDocuments = await this._accountIndex?.getDocuments({
          limit: missingAccountIds.length,
          filter: `id IN [${missingAccountIds.join(', ')}]`,
        });
        const accountResults = accountDocuments?.results as AccountDocument[];
        const accounts = { ...this._model.accounts };
        for (const account of accountResults) {
          if (!account.id) {
            continue;
          }

          accounts[account.id] = account;
        }

        this._model.accounts = accounts;
      } catch (error: any) {
        console.error(error);
      }

      const accountService = this._container.get('AccountService');
      try {
        const accountPresenceResponse =
          await accountService.requestPresenceAsync({
            accountIds: missingAccountIds,
          });
        const accountPresence = { ...this._model.accountPresence };
        for (const presence of accountPresenceResponse) {
          accountPresence[presence.accountId] = {
            account_id: presence.accountId,
            last_seen: presence.lastSeen,
            is_online: presence.isOnline,
          };
        }

        this._model.accountPresence = accountPresence;
      } catch (error: any) {
        console.error(error);
      }
    }

    const chatMessages: DecryptedChatMessages = Object.keys(
      this._model.messages
    ).includes(id)
      ? this._model.messages[id]
      : {
          messages: [],
          offset: 0,
          hasMore: true,
        };
    try {
      await this.requestChatMessagesAsync(id, chatMessages);
    } catch (error: any) {
      console.error(error);
    }

    this._model.isSelectedChatLoading = false;
  }

  public async updateSeenMessageOfOtherAccountAsync(
    chatMessages: DecryptedChatMessages
  ): Promise<void> {
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    const messagesReverse = [...chatMessages.messages].reverse();
    const firstAccountMessage = messagesReverse.find(
      (value) => value.accountId !== account?.id
    );
    if (!firstAccountMessage) {
      return;
    }

    try {
      await chatService.requestInsertSeenMessageAsync({
        chatId: firstAccountMessage.chatId ?? '',
        accountId: account.id,
        messageId: firstAccountMessage.id ?? '',
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  public updateSearchInput(value: string): void {
    this._model.searchInput = value;
    this._model.chats = [];

    clearTimeout(this._chatTimerId as number | undefined);
    this._chatTimerId = setTimeout(() => {
      if (value.length > 0) {
        this.searchChatsAsync(value, 'loading', 0, this._limit);
      } else {
        this.requestChatsAsync('loading', 0, this._limit);
      }
    }, 750);
  }

  public updateSearchAccountsInput(value: string): void {
    this._model.searchAccountsInput = value;
    this._model.searchedAccounts = [];

    clearTimeout(this._accountsTimerId as number | undefined);
    this._accountsTimerId = setTimeout(() => {
      this.searchAccountsAsync(value, 0, this._limit);
    }, 750);
  }

  public async updateSelectedTabAsync(value: ChatTabs): Promise<void> {
    this._model.selectedTab = value;
  }

  public updateMessageInput(value: string): void {
    this._model.messageInput = value;
  }

  public updateAccountPresence(value: AccountPresence): void {
    const accountPresence = { ...this._model.accountPresence };
    accountPresence[value.account_id] = value;
    this._model.accountPresence = accountPresence;
  }

  public async updateSeenMessageOfActiveAccountAsync(
    message: DecryptedChatMessage
  ): Promise<void> {
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    try {
      await chatService.requestInsertSeenMessageAsync({
        chatId: message.chatId ?? '',
        accountId: account.id,
        messageId: message.id ?? '',
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  public async submitMessageAsync(): Promise<void> {
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    const cryptoService = this._container.get('CryptoService');
    const chat = this._model.selectedChat;
    if (!chat || !chat.id) {
      return;
    }

    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    const chatAccountSubscriptions = this._model.chatSubscriptions[chat.id];
    let subscription = Object.keys(chatAccountSubscriptions).includes(
      account.id
    )
      ? chatAccountSubscriptions[account.id]
      : null;
    if (!subscription && chat.type === 'private') {
      const otherAccountId = chat.private?.account_ids?.find(
        (value) => value !== account.id
      );
      if (!otherAccountId) {
        return;
      }

      const newSubscription = await chatService.requestPrivateSubscriptionAsync(
        {
          chatId: chat.id,
          activeAccountId: account.id,
          otherAccountId: otherAccountId,
        }
      );
      const chatSubscriptions = { ...this._model.chatSubscriptions };
      const publicKey = await cryptoService.decryptAsync(
        newSubscription.publicKeyEncrypted
      );
      const privateKey = await cryptoService.decryptAsync(
        newSubscription.privateKeyEncrypted
      );
      chatSubscriptions[chat.id][newSubscription.accountId] = {
        chatId: newSubscription.chatId,
        requestAt: newSubscription.requestAt,
        accountId: newSubscription.accountId,
        joinedAt: newSubscription.joinedAt,
        publicKey: publicKey,
        privateKey: privateKey,
      };
      this._model.chatSubscriptions = chatSubscriptions;

      subscription = chatSubscriptions[chat.id][newSubscription.accountId];
    }

    if (!subscription) {
      return;
    }

    await chatService.requestUpsertMessageAsync(subscription, {
      text:
        this._model.messageInput.length > 0
          ? this._model.messageInput
          : undefined,
      link: undefined,
      videoUrl: undefined,
      photoUrl: undefined,
    });

    this._model.messageInput = '';
  }

  public async onChatsNextScrollAsync(): Promise<void> {
    if (this._model.areChatsLoading) {
      return;
    }

    this._model.chatsPagination = this._model.chatsPagination + 1;

    const offset = this._limit * (this._model.chatsPagination - 1);
    if (this._model.searchInput.length > 0) {
      await this.searchChatsAsync(
        this._model.searchInput,
        'loading',
        offset,
        this._limit
      );
    } else {
      await this.requestChatsAsync('loading', offset, this._limit);
    }
  }

  public async onMessagesNextScrollAsync(): Promise<void> {
    if (this._model.areMessagesLoading) {
      return;
    }

    const chatId = this._model.selectedChat?.id ?? '';
    const chatMessages: DecryptedChatMessages = Object.keys(
      this._model.messages
    ).includes(chatId)
      ? this._model.messages[chatId]
      : {
          messages: [],
          offset: 0,
          hasMore: true,
        };
    chatMessages.offset += this._limit + 1;

    await this.requestChatMessagesAsync(chatId, chatMessages);
  }

  public async onChatChangedAsync(payload: Record<string, any>): Promise<void> {
    const newChat = payload['new'] as Chat | undefined;
    if (!newChat) {
      return;
    }

    if (this._model.searchInput.length > 0) {
      return;
    }

    clearTimeout(this._chatTimerId as number | undefined);
    this._chatTimerId = setTimeout(async () => {
      if (!newChat.id) {
        return;
      }

      const chat = await this.requestChatAsync(newChat.id);
      if (!chat) {
        return;
      }

      const chats = [...this._model.chats];
      const existingChatIndex = chats.findIndex(
        (value) => value.id === chat?.id
      );
      if (existingChatIndex > -1) {
        chats.splice(existingChatIndex, 1);
      }

      chats.unshift(chat);
      this._model.chats = chats;
    }, 2000);
  }

  public async onSeenMessageChangedAsync(
    payload: Record<string, any>
  ): Promise<void> {
    const newSeenMessage = payload['new'];
    if (!newSeenMessage || !newSeenMessage.chat_id) {
      return;
    }

    const seenBy = { ...this._model.seenBy };
    const result: ChatSeenMessage = {
      messageId: newSeenMessage.message_id,
      seenAt: newSeenMessage.seen_at,
      accountId: newSeenMessage.account_id,
      chatId: newSeenMessage.chat_id,
    };
    if (Object.keys(seenBy).includes(result.messageId ?? '')) {
      const existingSeenBy = seenBy[result.messageId ?? ''].find(
        (value) => value.accountId === result.accountId
      );
      if (!existingSeenBy) {
        seenBy[result.messageId ?? ''].push(result);
      }
    } else {
      seenBy[result.messageId ?? ''] = [result];
    }

    this._model.seenBy = seenBy;
  }

  public async onMessageChangedAsync(
    payload: Record<string, any>
  ): Promise<void> {
    const newMessage = payload['new'] as ChatMessage | undefined;
    if (!newMessage) {
      return;
    }

    const id = newMessage.id ?? '';
    const createdAt = newMessage.created_at ?? '';
    const text = newMessage.text ?? '';
    const nonce = newMessage.nonce ?? '';
    const chatId = newMessage.chat_id ?? '';
    const accountId = newMessage.account_id ?? '';
    const link = newMessage.link ?? '';
    const videoUrl = newMessage.video_url ?? [];
    const photoUrl = newMessage.photo_url ?? [];
    const fileUrl = newMessage.file_url ?? [];
    const replyTo = newMessage.reply_to ?? '';
    if (
      !Object.keys(this._model.chatSubscriptions).includes(chatId) ||
      !Object.keys(this._model.chatSubscriptions[chatId]).includes(accountId)
    ) {
      const chatSubscriptions = { ...this._model.chatSubscriptions };
      this._model.chatSubscriptions = await this.requestChatSubscriptionsAsync(
        [chatId],
        [accountId],
        chatSubscriptions
      );
    }

    const subscriptions = this._model.chatSubscriptions[chatId];
    const messages: Record<string, DecryptedChatMessages> = {
      ...this._model.messages,
    };
    const lastChatMessages: Record<string, DecryptedChatMessage | undefined> = {
      ...this._model.lastChatMessages,
    };
    const decryptedChatMessage =
      (await this.decryptChatMessageAsync(
        {
          id: id,
          createdAt: createdAt,
          nonce: nonce,
          chatId: chatId,
          accountId: accountId,
          text: text,
          link: link,
          videoUrl: videoUrl,
          photoUrl: photoUrl,
          fileUrl: fileUrl,
          replyTo,
        },
        subscriptions
      )) ?? undefined;

    if (!decryptedChatMessage) {
      return;
    }

    lastChatMessages[chatId] = decryptedChatMessage;
    if (!Object.keys(messages).includes(chatId)) {
      messages[chatId] = {
        messages: [decryptedChatMessage],
        offset: 1,
        hasMore: true,
      };
    } else {
      messages[chatId].messages.push(decryptedChatMessage);
      messages[chatId].offset += 1;
    }

    this._model.lastChatMessages = lastChatMessages;
    this._model.messages = messages;
  }

  public async searchChatsAsync(
    query: string,
    loadType: 'loading' | 'reloading',
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (
      !force &&
      (this._model.areChatsLoading || this._model.areChatsReloading)
    ) {
      return;
    }

    if (loadType === 'loading') {
      this._model.areChatsLoading = true;
    } else if (loadType === 'reloading') {
      this._model.areChatsReloading = true;
    }

    const accountController = this._container.get('AccountController');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    const filterValue = `private EXISTS AND private.account_ids = ${account?.id}`;
    let missingAccountIds: string[] = [];
    let chatIds: string[] = [];
    try {
      const result = await this._chatIndex?.search(query, {
        filter: [filterValue],
        offset: offset,
        limit: limit,
      });
      const hits = result?.hits as ChatDocument[];
      if (hits && hits.length <= 0 && offset <= 0) {
        this._model.chats = [];
      }

      if (hits && hits.length <= 0) {
        this._model.areChatsLoading = false;
        return;
      }

      const accountIds = Object.keys(this._model.accounts);
      for (const chat of hits) {
        if (chat.type === 'private') {
          missingAccountIds =
            chat.private?.account_ids?.filter(
              (value) => !accountIds.includes(value)
            ) ?? [];
        }
      }

      if (offset > 0) {
        const chats = this._model.chats;
        this._model.chats = chats.concat(hits);
      } else {
        this._model.chats = hits;
      }

      chatIds = hits.map((value) => value.id ?? '');
    } catch (error: any) {
      console.error(error);
    }

    if (missingAccountIds.length > 0) {
      try {
        const accountDocuments = await this._accountIndex?.getDocuments({
          limit: missingAccountIds.length,
          filter: `id IN [${missingAccountIds.join(', ')}]`,
        });
        const accountResults = accountDocuments?.results as AccountDocument[];
        const accounts = { ...this._model.accounts };
        for (const account of accountResults) {
          if (!account.id) {
            continue;
          }

          accounts[account.id] = account;
        }
        this._model.accounts = accounts;
      } catch (error: any) {
        console.error(error);
      }

      const accountService = this._container.get('AccountService');
      try {
        const accountPresenceResponse =
          await accountService.requestPresenceAsync({
            accountIds: missingAccountIds,
          });
        const accountPresence = { ...this._model.accountPresence };
        for (const presence of accountPresenceResponse) {
          accountPresence[presence.accountId] = {
            account_id: presence.accountId,
            last_seen: presence.lastSeen,
            is_online: presence.isOnline,
          };
        }

        this._model.accountPresence = accountPresence;
      } catch (error: any) {
        console.error(error);
      }
    }

    const chatSubscriptions = { ...this._model.chatSubscriptions };
    const missingChatIds: string[] = [];
    for (const chatId of chatIds) {
      if (Object.keys(chatSubscriptions).includes(chatId)) {
        if (!Object.keys(chatSubscriptions[chatId]).includes(account.id)) {
          missingChatIds.push(chatId);
        }
        continue;
      }

      chatSubscriptions[chatId] = {};
      missingChatIds.push(chatId);
    }

    if (missingChatIds.length > 0) {
      this._model.chatSubscriptions = await this.requestChatSubscriptionsAsync(
        missingChatIds,
        missingAccountIds,
        chatSubscriptions
      );
    }

    if (loadType === 'loading') {
      this._model.areChatsLoading = false;
    } else if (loadType === 'reloading') {
      this._model.areChatsReloading = false;
    }
  }

  public async searchAccountsAsync(
    query: string,
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (!force && this._model.areAccountsLoading) {
      return;
    }

    this._model.areAccountsLoading = true;

    const accountController = this._container.get('AccountController');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    const filterValue = `id != ${account?.id}`;
    try {
      const result = await this._accountIndex?.search(query, {
        filter: [filterValue],
        offset: offset,
        limit: limit,
      });
      const hits = result?.hits as AccountDocument[];
      if (hits && hits.length <= 0 && offset <= 0) {
        this._model.searchedAccounts = [];
      }

      if (hits && hits.length <= 0) {
        this._model.areAccountsLoading = false;
        return;
      }

      if (offset > 0) {
        const accounts = this._model.searchedAccounts;
        this._model.searchedAccounts = accounts.concat(hits);
      } else {
        this._model.searchedAccounts = hits;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areAccountsLoading = false;
  }

  public async createPrivateMessageAsync(
    otherAccount: AccountDocument
  ): Promise<void> {
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    try {
      await when(() => accountController.model.account !== undefined);
      const account = accountController.model.account;
      const accountIds = [account?.id ?? '', otherAccount.id ?? ''];
      const chatResponse = await chatService.requestCreatePrivateChatAsync({
        accountIds: accountIds,
      });
      if (!chatResponse) {
        return;
      }

      await this.reloadChatsAsync();
    } catch (error: any) {
      console.error(error);
    }
  }

  private async requestChatMessagesAsync(
    id: string,
    chatMessages: DecryptedChatMessages
  ): Promise<void> {
    this._model.areMessagesLoading = true;

    let subscriptions = Object.keys(this._model.chatSubscriptions).includes(id)
      ? this._model.chatSubscriptions[id]
      : {};
    const accountIds = Object.keys(subscriptions);
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    const cryptoService = this._container.get('CryptoService');
    try {
      const messagesResponse = await chatService.requestMessagesAsync({
        chatId: id,
        limit: this._limit,
        offset: chatMessages.offset,
        ignoredSubscriptionIds: accountIds,
      });

      if (
        messagesResponse?.messages &&
        messagesResponse.messages.length <= 0 &&
        chatMessages.offset <= 0
      ) {
        chatMessages.messages = [];
      }

      if (
        messagesResponse?.messages &&
        messagesResponse.messages.length < this._limit &&
        chatMessages.hasMore
      ) {
        chatMessages.hasMore = false;
      }

      if (messagesResponse?.messages && messagesResponse.messages.length <= 0) {
        this._model.areMessagesLoading = false;
        chatMessages.hasMore = false;

        const messages = { ...this._model.messages };
        messages[id] = chatMessages;
        this._model.messages = messages;
        return;
      }

      if (
        messagesResponse?.messages &&
        messagesResponse.messages.length >= this._limit &&
        !chatMessages.hasMore
      ) {
        chatMessages.hasMore = true;
      }

      const decryptedMessages: DecryptedChatMessage[] = [];
      if (
        messagesResponse?.subscriptions &&
        messagesResponse.subscriptions.length > 0
      ) {
        for (const subscription of messagesResponse?.subscriptions) {
          const publicKey = await cryptoService.decryptAsync(
            subscription.publicKeyEncrypted
          );
          const privateKey = await cryptoService.decryptAsync(
            subscription.privateKeyEncrypted
          );
          subscriptions[subscription.accountId] = {
            chatId: subscription.chatId,
            requestAt: subscription.requestAt,
            accountId: subscription.accountId,
            joinedAt: subscription.joinedAt,
            publicKey: publicKey,
            privateKey: privateKey,
          };
        }

        const chatSubscriptions = { ...this._model.chatSubscriptions };
        chatSubscriptions[id] = subscriptions;
        this._model.chatSubscriptions = chatSubscriptions;
      }

      for (const message of messagesResponse?.messages ?? []) {
        const decryptedMessage = await this.decryptChatMessageWithCryptoAsync(
          {
            id: message.id,
            createdAt: message.createdAt,
            accountId: message.accountId,
            chatId: message.chatId,
            nonce: message.nonce,
            textEncrypted: message.textEncrypted,
            linkEncrypted: message.linkEncrypted,
            videoUrlEncrypted: message.videoUrlEncrypted,
            photoUrlEncrypted: message.photoUrlEncrypted,
            fileUrlEncrypted: message.fileUrlEncrypted,
            replyTo: message.replyTo,
          },
          subscriptions
        );
        if (!decryptedMessage) {
          continue;
        }

        decryptedMessages?.push(decryptedMessage);
      }

      if (chatMessages.offset > 0) {
        chatMessages.messages = [
          ...decryptedMessages,
          ...chatMessages.messages,
        ];
      } else {
        chatMessages.messages = decryptedMessages;
      }

      const messages = { ...this._model.messages };
      messages[id] = chatMessages;
      this._model.messages = messages;
    } catch (error: any) {
      console.error(error);
    }

    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    const seenBy: Record<string, ChatSeenMessage[]> = {};
    const messageIds = this._model.messages[id].messages.map(
      (value) => value.id ?? ''
    );
    try {
      const seenByMessagesResponse =
        await chatService.requestSeenByMessagesAsync(messageIds);
      for (const seenByMessage of seenByMessagesResponse) {
        if (Object.keys(seenBy).includes(seenByMessage.messageId)) {
          seenBy[seenByMessage.messageId].push({
            messageId: seenByMessage.messageId,
            seenAt: seenByMessage.seenAt,
            accountId: seenByMessage.accountId,
            chatId: seenByMessage.chatId,
          });
          continue;
        }
        seenBy[seenByMessage.messageId] = [
          {
            messageId: seenByMessage.messageId,
            seenAt: seenByMessage.seenAt,
            accountId: seenByMessage.accountId,
            chatId: seenByMessage.chatId,
          },
        ];
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.seenBy = { ...this._model.seenBy, ...seenBy };
    this._model.areMessagesLoading = false;
  }

  private async requestChatsAsync(
    loadType: 'loading' | 'reloading',
    offset = 0,
    limit = 10
  ): Promise<void> {
    if (loadType === 'loading') {
      this._model.areChatsLoading = true;
    } else if (loadType === 'reloading') {
      this._model.areChatsReloading = true;
    }

    const accountController = this._container.get('AccountController');
    const accountService = this._container.get('AccountService');
    const chatService = this._container.get('ChatService');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    const filterValue = `private EXISTS AND private.account_ids = ${account?.id}`;
    let missingAccountIds: string[] = [];
    let chatIds: string[] = [];
    try {
      const result = await this._chatIndex?.search('', {
        filter: [filterValue],
        sort: ['updated_at:desc'],
        offset: offset,
        limit: limit,
      });
      const results = result?.hits as ChatDocument[];
      if (results && results.length <= 0 && offset <= 0) {
        this._model.chats = [];
      }

      if (results && results.length <= 0) {
        this._model.areChatsLoading = false;
        return;
      }

      const accountIds = Object.keys(this._model.accounts);
      for (const chat of results) {
        if (chat.type === 'private') {
          missingAccountIds =
            chat.private?.account_ids?.filter(
              (value) => !accountIds.includes(value)
            ) ?? [];
        }
      }

      if (offset > 0) {
        const chats = this._model.chats;
        this._model.chats = chats.concat(results);
      } else {
        this._model.chats = results;
      }

      chatIds = results.map((value) => value.id ?? '');
    } catch (error: any) {
      console.error(error);
    }

    if (missingAccountIds.length > 0) {
      try {
        const accountDocuments = await this._accountIndex?.getDocuments({
          limit: missingAccountIds.length,
          filter: `id IN [${missingAccountIds.join(', ')}]`,
        });
        const accountResults = accountDocuments?.results as AccountDocument[];
        const accounts = { ...this._model.accounts };
        for (const account of accountResults) {
          if (!account.id) {
            continue;
          }

          accounts[account.id] = account;
        }
        this._model.accounts = accounts;
      } catch (error: any) {
        console.error(error);
      }

      try {
        const accountPresenceResponse =
          await accountService.requestPresenceAsync({
            accountIds: missingAccountIds,
          });
        const accountPresence = { ...this._model.accountPresence };
        for (const presence of accountPresenceResponse) {
          accountPresence[presence.accountId] = {
            account_id: presence.accountId,
            last_seen: presence.lastSeen,
            is_online: presence.isOnline,
          };
        }

        this._model.accountPresence = accountPresence;
      } catch (error: any) {
        console.error(error);
      }
    }

    const chatSubscriptions = { ...this._model.chatSubscriptions };
    const missingChatIds: string[] = [];
    for (const chatId of chatIds) {
      if (Object.keys(chatSubscriptions).includes(chatId)) {
        if (!Object.keys(chatSubscriptions[chatId]).includes(account.id)) {
          missingChatIds.push(chatId);
        }
        continue;
      }

      chatSubscriptions[chatId] = {};
      missingChatIds.push(chatId);
    }

    if (missingChatIds.length > 0) {
      this._model.chatSubscriptions = await this.requestChatSubscriptionsAsync(
        missingChatIds,
        missingAccountIds,
        chatSubscriptions
      );
    }

    try {
      const lastChatMessagesResponse =
        await chatService.requestLastMessagesAsync({
          chatIds: chatIds,
        });
      const lastChatMessages: Record<string, DecryptedChatMessage | undefined> =
        { ...this._model.lastChatMessages };
      for (const lastChatMessageResponse of lastChatMessagesResponse ?? []) {
        if (
          !Object.keys(this._model.chatSubscriptions).includes(
            lastChatMessageResponse.chatId
          )
        ) {
          continue;
        }

        const subscription =
          this._model.chatSubscriptions[lastChatMessageResponse.chatId ?? ''];
        lastChatMessages[lastChatMessageResponse.chatId] =
          (await this.decryptChatMessageWithCryptoAsync(
            {
              id: lastChatMessageResponse.id,
              createdAt: lastChatMessageResponse.createdAt,
              nonce: lastChatMessageResponse.nonce,
              chatId: lastChatMessageResponse.chatId,
              accountId: lastChatMessageResponse.accountId,
              textEncrypted: lastChatMessageResponse.textEncrypted,
              linkEncrypted: lastChatMessageResponse.linkEncrypted,
              videoUrlEncrypted: lastChatMessageResponse.videoUrlEncrypted,
              photoUrlEncrypted: lastChatMessageResponse.photoUrlEncrypted,
              fileUrlEncrypted: lastChatMessageResponse.fileUrlEncrypted,
              replyTo: lastChatMessageResponse.replyTo,
            },
            subscription
          )) ?? undefined;
      }

      this._model.lastChatMessages = lastChatMessages;
    } catch (error: any) {
      console.error(error);
    }

    if (loadType === 'loading') {
      this._model.areChatsLoading = false;
    } else if (loadType === 'reloading') {
      this._model.areChatsReloading = false;
    }
  }

  private async requestChatSubscriptionsAsync(
    chatIds: string[],
    accountIds: string[],
    subscriptions: Record<string, Record<string, ChatSubscription>>
  ): Promise<Record<string, Record<string, ChatSubscription>>> {
    const chatService = this._container.get('ChatService');
    const cryptoService = this._container.get('CryptoService');
    try {
      const chatSubscriptionsResponse =
        await chatService.requestSubscriptionsAsync({
          chatIds: chatIds,
          accountIds: accountIds,
        });
      for (const subscription of chatSubscriptionsResponse) {
        const publicKey = await cryptoService.decryptAsync(
          subscription.publicKeyEncrypted
        );
        const privateKey = await cryptoService.decryptAsync(
          subscription.privateKeyEncrypted
        );
        subscriptions[subscription.chatId][subscription.accountId] = {
          chatId: subscription.chatId,
          requestAt: subscription.requestAt,
          accountId: subscription.accountId,
          joinedAt: subscription.joinedAt,
          publicKey: publicKey,
          privateKey: privateKey,
        };
      }
    } catch (error: any) {
      console.error(error);
    }

    return subscriptions;
  }

  private async decryptChatMessageAsync(
    message: {
      id: string;
      createdAt: string;
      nonce: string;
      chatId: string;
      accountId: string;
      text?: string;
      link?: string;
      videoUrl?: string[];
      photoUrl?: string[];
      fileUrl?: string[];
      replyTo?: string;
    },
    chatSubscriptions: Record<string, ChatSubscription>
  ): Promise<DecryptedChatMessage | null> {
    if (!Object.keys(chatSubscriptions).includes(message.accountId)) {
      return null;
    }

    const chatService = this._container.get('ChatService');
    const chatSubscription = chatSubscriptions[message.accountId];
    const text = message.text
      ? chatService.decryptMessage(
          message.text,
          message.nonce,
          chatSubscription.publicKey ?? '',
          chatSubscription.privateKey ?? ''
        )
      : undefined;
    const link = message.link
      ? chatService.decryptMessage(
          message.link,
          message.nonce,
          chatSubscription.publicKey ?? '',
          chatSubscription.privateKey ?? ''
        )
      : undefined;
    const videoUrl: string[] | undefined =
      message.videoUrl && message.videoUrl.length > 0
        ? message.videoUrl.map(
            (value) =>
              chatService.decryptMessage(
                value,
                message.nonce,
                chatSubscription.publicKey ?? '',
                chatSubscription.privateKey ?? ''
              ) ?? ''
          )
        : undefined;
    const photoUrl: string[] | undefined =
      message.photoUrl && message.photoUrl.length > 0
        ? message.photoUrl.map(
            (value) =>
              chatService.decryptMessage(
                value,
                message.nonce,
                chatSubscription.publicKey ?? '',
                chatSubscription.privateKey ?? ''
              ) ?? ''
          )
        : undefined;
    const fileUrl: string[] | undefined =
      message.fileUrl && message.fileUrl.length > 0
        ? message.fileUrl.map(
            (value) =>
              chatService.decryptMessage(
                value,
                message.nonce,
                chatSubscription.publicKey ?? '',
                chatSubscription.privateKey ?? ''
              ) ?? ''
          )
        : undefined;
    return {
      id: message.id,
      createdAt: message.createdAt,
      accountId: message.accountId,
      chatId: message.chatId,
      text: text,
      link: link,
      videoUrl: videoUrl,
      photoUrl: photoUrl,
      fileUrl: fileUrl,
      replyTo: message.replyTo,
    };
  }

  private async decryptChatMessageWithCryptoAsync(
    message: {
      id: string;
      createdAt: string;
      nonce: string;
      chatId: string;
      accountId: string;
      textEncrypted?: string;
      linkEncrypted?: string;
      videoUrlEncrypted?: string[];
      photoUrlEncrypted?: string[];
      fileUrlEncrypted?: string[];
      replyTo?: string;
    },
    chatSubscriptions: Record<string, ChatSubscription>
  ): Promise<DecryptedChatMessage | null> {
    const cryptoService = this._container.get('CryptoService');
    const textCryptoDecrypted = message.textEncrypted
      ? await cryptoService.decryptAsync(message.textEncrypted)
      : undefined;
    const linkCrytoDecrypted = message.linkEncrypted
      ? await cryptoService.decryptAsync(message.linkEncrypted)
      : undefined;
    const videoUrlCryptoDecrypted: string[] = [];
    for (const encryptedValue of message.videoUrlEncrypted ?? []) {
      const decryptedValue = await cryptoService.decryptAsync(encryptedValue);
      videoUrlCryptoDecrypted?.push(decryptedValue);
    }
    const photoUrlCryptoDecrypted: string[] = [];
    for (const encryptedValue of message.photoUrlEncrypted ?? []) {
      const decryptedValue = await cryptoService.decryptAsync(encryptedValue);
      photoUrlCryptoDecrypted?.push(decryptedValue);
    }
    const fileUrlCryptoDecrypted: string[] = [];
    for (const encryptedValue of message.fileUrlEncrypted ?? []) {
      const decryptedValue = await cryptoService.decryptAsync(encryptedValue);
      fileUrlCryptoDecrypted?.push(decryptedValue);
    }

    return await this.decryptChatMessageAsync(
      {
        id: message.id,
        createdAt: message.createdAt,
        chatId: message.chatId,
        accountId: message.accountId,
        nonce: message.nonce,
        text: textCryptoDecrypted,
        link: linkCrytoDecrypted,
        videoUrl: videoUrlCryptoDecrypted,
        photoUrl: photoUrlCryptoDecrypted,
        fileUrl: fileUrlCryptoDecrypted,
        replyTo: message.replyTo,
      },
      chatSubscriptions
    );
  }

  private async requestChatAsync(id: string): Promise<ChatDocument | null> {
    const accountController = this._container.get('AccountController');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    try {
      const result = await this._chatIndex?.getDocument(id);
      const chat = result as ChatDocument;
      if (chat.type === 'private') {
        if (!chat.private?.account_ids?.includes(account?.id ?? '')) {
          return null;
        }
      }
      return chat;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  private async requestChatIdsAsync(): Promise<void> {
    const accountController = this._container.get('AccountController');
    const chatService = this._container.get('ChatService');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;

    if (!account?.id) {
      return;
    }

    const chatSubscriptions = { ...this._model.chatSubscriptions };
    const chatIds = await chatService.requestAccountSubscriptionIdsAsync(
      account.id
    );
    for (const id of chatIds) {
      chatSubscriptions[id] = {};
    }

    this._model.chatSubscriptions = chatSubscriptions;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private async onActiveAccountChangedAsync(
    value: AccountResponse | null
  ): Promise<void> {
    if (!value) {
      return;
    }

    await this.requestChatIdsAsync();
  }
}
