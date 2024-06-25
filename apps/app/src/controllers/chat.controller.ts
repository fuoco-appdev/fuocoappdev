/* eslint-disable @typescript-eslint/no-empty-function */
import { select } from '@ngneat/elf';
import { Index } from 'meilisearch';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import { Controller } from '../controller';
import { AccountDocument, AccountPresence } from '../models/account.model';
import {
    Chat,
    ChatDocument,
    ChatMessage,
    ChatModel,
    ChatSeenMessage,
    ChatState,
    ChatTabs,
    DecryptedChatMessage,
    DecryptedChatMessages,
} from '../models/chat.model';
import { AccountResponse } from '../protobuf/account_pb';
import AccountService from '../services/account.service';
import ChatService, { ChatSubscription } from '../services/chat.service';
import CryptoService from '../services/crypto.service';
import MeiliSearchService from '../services/meilisearch.service';
import AccountController from './account.controller';

class ChatController extends Controller {
    private readonly _model: ChatModel;
    private _activeAccountSubscription: Subscription | undefined;
    private _chatIndex: Index<Record<string, any>> | undefined;
    private _accountIndex: Index<Record<string, any>> | undefined;
    private _chatTimerId: NodeJS.Timeout | number | undefined;
    private _accountsTimerId: NodeJS.Timeout | number | undefined;
    private _limit: number;

    constructor() {
        super();

        this._model = new ChatModel();
        this._limit = 20;

        this.onActiveAccountChangedAsync =
            this.onActiveAccountChangedAsync.bind(this);
    }

    public get model(): ChatModel {
        return this._model;
    }

    public override initialize(renderCount: number): void {
        this._chatIndex = MeiliSearchService.client?.index('chat');
        this._accountIndex = MeiliSearchService.client?.index('account');

        this.initializeAsync(renderCount);
    }

    public override async load(_renderCount: number): Promise<void> { }

    public override disposeInitialization(_renderCount: number): void {
        clearTimeout(this._accountsTimerId as number | undefined);
        clearTimeout(this._chatTimerId as number | undefined);
        this._activeAccountSubscription?.unsubscribe();
    }

    public override disposeLoad(_renderCount: number): void { }

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

        const chats = await firstValueFrom(this._model.store.pipe(select((model: ChatState) => model.chats), filter((value) => value.length > 0), take(1)));
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

            try {
                const accountPresenceResponse =
                    await AccountService.requestPresenceAsync({
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

        const chatMessages: DecryptedChatMessages = Object.keys(this._model.messages).includes(id) ? this._model.messages[id] : {
            messages: [],
            offset: 0,
            hasMore: true
        };
        await this.requestChatMessagesAsync(id, chatMessages);

        this._model.isSelectedChatLoading = false;
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

    public async submitMessageAsync(): Promise<void> {
        const chat = this._model.selectedChat;
        if (!chat || !chat.id) {
            return;
        }

        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );
        if (!account) {
            return;
        }

        const chatAccountSubscriptions = this._model.chatSubscriptions[chat.id];
        let subscription = Object.keys(chatAccountSubscriptions).includes(account.id) ? chatAccountSubscriptions[account.id] : null;
        if (!subscription && chat.type === 'private') {
            const otherAccountId = chat.private?.account_ids?.find((value) => value !== account.id);
            if (!otherAccountId) {
                return;
            }

            const newSubscription = await ChatService.requestPrivateSubscriptionAsync({
                chatId: chat.id,
                activeAccountId: account.id,
                otherAccountId: otherAccountId
            });
            const chatSubscriptions = { ...this._model.chatSubscriptions };
            const publicKey = await CryptoService.decryptAsync(newSubscription.publicKeyEncrypted);
            const privateKey = await CryptoService.decryptAsync(newSubscription.privateKeyEncrypted);
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

        await ChatService.requestUpsertMessageAsync(subscription, {
            text: this._model.messageInput.length > 0 ? this._model.messageInput : undefined,
            link: undefined,
            videoUrl: undefined,
            photoUrl: undefined
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

        // const offset = this._limit * (this._model.chatsPagination - 1);
        // if (this._model.searchInput.length > 0) {
        //     await this.searchChatsAsync(
        //         this._model.searchInput,
        //         'loading',
        //         offset,
        //         this._limit
        //     );
        // } else {
        //     await this.requestChatsAsync('loading', offset, this._limit);
        // }
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
        const messages: Record<string, DecryptedChatMessages> = { ...this._model.messages };
        const lastChatMessages: Record<string, DecryptedChatMessage | undefined> = { ...this._model.lastChatMessages };
        const decryptedChatMessage = await this.decryptChatMessageAsync(
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
                replyTo
            },
            subscriptions
        ) ?? undefined;

        if (!decryptedChatMessage) {
            return;
        }

        lastChatMessages[chatId] = decryptedChatMessage;
        if (!Object.keys(messages).includes(chatId)) {
            messages[chatId] = {
                messages: [decryptedChatMessage],
                offset: 1,
                hasMore: true
            };
        }
        else {
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

        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );
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

            try {
                const accountPresenceResponse =
                    await AccountService.requestPresenceAsync({
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

        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );
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
        try {
            const account = await firstValueFrom(
                AccountController.model.store.pipe(
                    select((model) => model.account),
                    filter((value) => value !== undefined),
                    take(1)
                )
            );
            const accountIds = [account.id, otherAccount.id];
            const chatResponse = await ChatService.requestCreatePrivateChatAsync({
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

        try {
            const messagesResponse = await ChatService.requestMessagesAsync({
                chatId: id,
                limit: this._limit,
                offset: chatMessages.offset
            });

            if (messagesResponse && messagesResponse.length <= 0 && chatMessages.offset <= 0) {
                chatMessages.messages = [];
            }

            if (messagesResponse && messagesResponse.length < this._limit && chatMessages.hasMore) {
                chatMessages.hasMore = false;
            }

            if (messagesResponse && messagesResponse.length <= 0) {
                this._model.areMessagesLoading = false;
                chatMessages.hasMore = false;
                return;
            }

            if (messagesResponse && messagesResponse.length >= this._limit && !chatMessages.hasMore) {
                chatMessages.hasMore = true;
            }

            const accountIds = messagesResponse?.map((value) => value.accountId) ?? [];
            const decryptedMessages: DecryptedChatMessage[] = [];
            let subscriptions = Object.keys(this._model.chatSubscriptions).includes(id) ? this._model.chatSubscriptions[id] : {};
            const missingAccountIds = Object.keys(accountIds).filter((value) => Object.keys(subscriptions).includes(value));
            if (missingAccountIds.length > 0) {
                this._model.chatSubscriptions = await this.requestChatSubscriptionsAsync(
                    [id],
                    missingAccountIds,
                    this._model.chatSubscriptions
                );
                subscriptions = this._model.chatSubscriptions[id];
            }

            for (const message of messagesResponse ?? []) {
                const decryptedMessage = await this.decryptChatMessageWithCryptoAsync({
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
                    replyTo: message.replyTo
                }, subscriptions);
                if (!decryptedMessage) {
                    continue;
                }

                decryptedMessages?.push(decryptedMessage);
            }

            if (chatMessages.offset > 0) {
                chatMessages.messages = chatMessages.messages.concat(decryptedMessages);
            } else {
                chatMessages.messages = decryptedMessages;
            }

            const messages = { ...this._model.messages };
            messages[id] = chatMessages;
            this._model.messages = messages;
            console.log(messages);
        }
        catch (error: any) {
            console.error(error);
        }

        this._model.areMessagesLoading = false;
    }

    private async requestChatsAsync(
        loadType: 'loading' | 'reloading',
        offset = 0,
        limit = 10,
    ): Promise<void> {
        if (loadType === 'loading') {
            this._model.areChatsLoading = true;
        } else if (loadType === 'reloading') {
            this._model.areChatsReloading = true;
        }

        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );
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
                    await AccountService.requestPresenceAsync({
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
                await ChatService.requestLastMessagesAsync({
                    chatIds: chatIds,
                });
            const lastChatMessages: Record<string, DecryptedChatMessage | undefined> =
                { ...this._model.lastChatMessages };
            const seenBy: Record<string, ChatSeenMessage[]> = { ...this._model.seenBy };
            for (const lastChatMessageResponse of lastChatMessagesResponse ?? []) {
                if (
                    !Object.keys(this._model.chatSubscriptions).includes(
                        lastChatMessageResponse.chatId
                    )
                ) {
                    continue;
                }

                const subscription = this._model.chatSubscriptions[lastChatMessageResponse.chatId ?? ''];
                lastChatMessages[lastChatMessageResponse.chatId] =
                    await this.decryptChatMessageWithCryptoAsync(
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
                            replyTo: lastChatMessageResponse.replyTo
                        },
                        subscription
                    ) ?? undefined;
                seenBy[lastChatMessageResponse.id] = lastChatMessageResponse.seenBy.map((value) => ({
                    messageId: value.messageId,
                    seenAt: value.seenAt,
                    accountId: value.accountId,
                    chatId: value.chatId
                }) as ChatSeenMessage);
            }

            this._model.lastChatMessages = lastChatMessages;
            this._model.seenBy = seenBy;
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
        try {
            const chatSubscriptionsResponse =
                await ChatService.requestSubscriptionsAsync({
                    chatIds: chatIds,
                    accountIds: accountIds,
                });
            for (const subscription of chatSubscriptionsResponse) {
                const publicKey = await CryptoService.decryptAsync(subscription.publicKeyEncrypted);
                const privateKey = await CryptoService.decryptAsync(subscription.privateKeyEncrypted);
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
        chatSubscriptions: Record<string, ChatSubscription>,
    ): Promise<DecryptedChatMessage | null> {
        if (!Object.keys(chatSubscriptions).includes(message.accountId)) {
            return null;
        }

        const chatSubscription = chatSubscriptions[message.accountId];
        const text = message.text ? ChatService.decryptMessage(
            message.text,
            message.nonce,
            chatSubscription.publicKey ?? '',
            chatSubscription.privateKey ?? ''
        )
            : undefined;
        const link = message.link
            ? ChatService.decryptMessage(
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
                        ChatService.decryptMessage(
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
                        ChatService.decryptMessage(
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
                        ChatService.decryptMessage(
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
        chatSubscriptions: Record<string, ChatSubscription>,
    ): Promise<DecryptedChatMessage | null> {
        const textCryptoDecrypted = message.textEncrypted ? await CryptoService.decryptAsync(message.textEncrypted) : undefined;
        const linkCrytoDecrypted = message.linkEncrypted ? await CryptoService.decryptAsync(message.linkEncrypted) : undefined;
        const videoUrlCryptoDecrypted: string[] = [];
        for (const encryptedValue of message.videoUrlEncrypted ?? []) {
            const decryptedValue = await CryptoService.decryptAsync(encryptedValue);
            videoUrlCryptoDecrypted?.push(decryptedValue);
        }
        const photoUrlCryptoDecrypted: string[] = [];
        for (const encryptedValue of message.photoUrlEncrypted ?? []) {
            const decryptedValue = await CryptoService.decryptAsync(encryptedValue);
            photoUrlCryptoDecrypted?.push(decryptedValue);
        }
        const fileUrlCryptoDecrypted: string[] = [];
        for (const encryptedValue of message.fileUrlEncrypted ?? []) {
            const decryptedValue = await CryptoService.decryptAsync(encryptedValue);
            fileUrlCryptoDecrypted?.push(decryptedValue);
        }

        return await this.decryptChatMessageAsync({
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
            replyTo: message.replyTo
        }, chatSubscriptions)
    }

    private async requestChatAsync(id: string): Promise<ChatDocument | null> {
        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );
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
        const account: AccountResponse | undefined = await firstValueFrom(
            AccountController.model.store.pipe(
                select((model) => model.account),
                filter((value) => value !== undefined),
                take(1)
            )
        );

        if (!account?.id) {
            return;
        }

        const chatSubscriptions = { ...this._model.chatSubscriptions };
        const chatIds = await ChatService.requestAccountSubscriptionIdsAsync(
            account.id
        );
        for (const id of chatIds) {
            chatSubscriptions[id] = {};
        }

        this._model.chatSubscriptions = chatSubscriptions;
    }

    private async initializeAsync(_renderCount: number): Promise<void> {
        this._activeAccountSubscription?.unsubscribe();
        this._activeAccountSubscription = AccountService.activeAccountObservable
            .pipe(
                filter((value) => value !== null && AccountController.model.account?.id !== value.id),
            )
            .subscribe({
                next: this.onActiveAccountChangedAsync,
            });
    }

    private async onActiveAccountChangedAsync(
        value: AccountResponse | null
    ): Promise<void> {
        if (!value) {
            return;
        }

        await this.requestChatIdsAsync();
    }
}

export default new ChatController();
