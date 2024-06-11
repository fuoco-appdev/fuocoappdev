/* eslint-disable @typescript-eslint/no-empty-function */
import { select } from '@ngneat/elf';
import { Index } from 'meilisearch';
import { filter, firstValueFrom, take } from 'rxjs';
import AccountService from 'src/services/account.service';
import { Controller } from '../controller';
import { AccountDocument, AccountPresence } from '../models/account.model';
import {
    ChatDocument,
    ChatModel,
    ChatSubscription,
    ChatTabs,
    DecryptedChatMessage,
    EncryptedChatMessage,
} from '../models/chat.model';
import { AccountResponse } from '../protobuf/account_pb';
import { ChatMessageResponse } from '../protobuf/chat_pb';
import ChatService from '../services/chat.service';
import MeiliSearchService from '../services/meilisearch.service';
import AccountController from './account.controller';

class ChatController extends Controller {
    private readonly _model: ChatModel;
    private _chatIndex: Index<Record<string, any>> | undefined;
    private _accountIndex: Index<Record<string, any>> | undefined;
    private _chatTimerId: NodeJS.Timeout | number | undefined;
    private _accountsTimerId: NodeJS.Timeout | number | undefined;
    private _limit: number;

    constructor() {
        super();

        this._model = new ChatModel();
        this._limit = 20;
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
    }

    public override disposeLoad(_renderCount: number): void { }

    public async loadChatsAsync(): Promise<void> {
        await this.searchChatsAsync(
            this._model.searchInput,
            'loading',
            0,
            this._limit,
            true
        );
    }

    public async reloadChatsAsync(): Promise<void> {
        await this.searchChatsAsync(
            this._model.searchInput,
            'reloading',
            0,
            this._limit,
            true
        );
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
        const cachedChat = this._model.chats.find((value) => value.id === id);
        if (!cachedChat) {
            try {
                const chat = await this.requestChatAsync(id);
                if (!chat) {
                    return;
                }

                this._model.selectedChat = chat;
            }
            catch (error: any) {
                console.error(error);
            }
        }
        else {
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
                const accountPresenceResponse = await AccountService.requestPresenceAsync({
                    accountIds: missingAccountIds
                });
                const accountPresence = { ...this._model.accountPresence };
                for (const presence of accountPresenceResponse) {
                    accountPresence[presence.accountId] = {
                        account_id: presence.accountId,
                        last_seen: presence.lastSeen,
                        is_online: presence.isOnline
                    }
                }

                this._model.accountPresence = accountPresence;
            }
            catch (error: any) {
                console.error(error);
            }
        }
    }

    public updateSearchInput(value: string): void {
        this._model.searchInput = value;
        this._model.chats = [];

        clearTimeout(this._chatTimerId as number | undefined);
        this._chatTimerId = setTimeout(() => {
            this.searchChatsAsync(value, 'loading', 0, this._limit);
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

    public updateAccountPresence(value: AccountPresence): void {
        const accountPresence = { ...this._model.accountPresence };
        accountPresence[value.account_id] = value;
        this._model.accountPresence = accountPresence;
    }

    public async onChatsNextScrollAsync(): Promise<void> {
        if (this._model.areChatsLoading) {
            return;
        }

        this._model.chatsPagination = this._model.chatsPagination + 1;

        const offset = this._limit * (this._model.chatsPagination - 1);
        await this.searchChatsAsync(
            this._model.searchInput,
            'loading',
            offset,
            this._limit
        );
    }

    public async searchChatsAsync(
        query: string,
        loadType: 'loading' | 'reloading',
        offset = 0,
        limit = 10,
        force = false
    ): Promise<void> {
        if (
            (!force && this._model.areChatsLoading) ||
            this._model.areChatsReloading
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
                const accountPresenceResponse = await AccountService.requestPresenceAsync({
                    accountIds: missingAccountIds
                });
                const accountPresence = { ...this._model.accountPresence };
                for (const presence of accountPresenceResponse) {
                    accountPresence[presence.accountId] = {
                        account_id: presence.accountId,
                        last_seen: presence.lastSeen,
                        is_online: presence.isOnline
                    }
                }

                this._model.accountPresence = accountPresence;
            }
            catch (error: any) {
                console.error(error);
            }
        }

        try {
            const lastChatMessagesResponse =
                await ChatService.requestLastMessagesAsync({
                    chatIds: chatIds,
                });
            const lastChatMessages: Record<string, DecryptedChatMessage | undefined> =
                {};
            for (const lastChatMessageResponse of lastChatMessagesResponse ?? []) {
                if (
                    !Object.keys(this._model.chatSubscriptions).includes(
                        lastChatMessageResponse.chatId
                    )
                ) {
                    continue;
                }

                lastChatMessages[lastChatMessageResponse.id] =
                    this.decryptChatMessage(
                        lastChatMessageResponse,
                        this._model.chatSubscriptions[lastChatMessageResponse.chatId ?? '']
                    ) ?? undefined;
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

    private decryptChatMessage(
        messageResponse: ChatMessageResponse,
        chatSubscriptions: Record<string, ChatSubscription>
    ): DecryptedChatMessage | null {
        if (!Object.keys(chatSubscriptions).includes(messageResponse.accountId)) {
            return null;
        }
        const chatSubscription = chatSubscriptions[messageResponse.accountId];
        const decryptedMessage = ChatService.decryptMessage(
            messageResponse.messageEncrypted,
            messageResponse.nonce,
            chatSubscription.publicKey ?? '',
            chatSubscription.privateKey ?? ''
        );
        return {
            id: messageResponse.id,
            createdAt: messageResponse.createdAt,
            accountId: messageResponse.accountId,
            message: decryptedMessage,
        };
    }

    private encryptChatMessage(
        message: string,
        accountId: string,
        chatSubscriptions: Record<string, ChatSubscription>
    ): EncryptedChatMessage | null {
        if (!Object.keys(chatSubscriptions).includes(accountId)) {
            return null;
        }

        const chatSubscription = chatSubscriptions[accountId];
        const encryptedMessage = ChatService.encryptMessage(
            message,
            chatSubscription.publicKey ?? '',
            chatSubscription.privateKey ?? ''
        );
        return {
            encryptedMessage: encryptedMessage?.encryptedMessage,
            accountId: accountId,
            nonce: encryptedMessage?.nonce,
        };
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
        }
        catch (error: any) {
            console.error(error);
            return null;
        }
    }

    private async requestChatsAsync(
        query: string,
        loadType: 'loading' | 'reloading',
        offset: number = 0,
        limit: number = 10
    ): Promise<void> {
        if (loadType === 'loading') {
            this._model.areChatsLoading = true;
        } else if (loadType === 'reloading') {
            this._model.areChatsReloading = true;
        }

        if (loadType === 'loading') {
            this._model.areChatsLoading = false;
        } else if (loadType === 'reloading') {
            this._model.areChatsReloading = false;
        }
    }

    private async initializeAsync(_renderCount: number): Promise<void> { }
}

export default new ChatController();
