/* eslint-disable @typescript-eslint/no-empty-function */
import { select } from '@ngneat/elf';
import { Index } from 'meilisearch';
import { filter, firstValueFrom, take } from 'rxjs';
import { Controller } from '../controller';
import { AccountDocument } from '../models/account.model';
import { ChatModel, ChatTabs } from '../models/chat.model';
import { AccountResponse } from '../protobuf/account_pb';
import ChatService from '../services/chat.service';
import MeiliSearchService from '../services/meilisearch.service';
import AccountController from './account.controller';

class ChatController extends Controller {
    private readonly _model: ChatModel;
    private _accountsIndex: Index<Record<string, any>> | undefined;
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
        this._accountsIndex = MeiliSearchService.client?.index('account');

        this.initializeAsync(renderCount);
    }

    public override async load(_renderCount: number): Promise<void> { }

    public override disposeInitialization(_renderCount: number): void {
        clearTimeout(this._accountsTimerId as number | undefined);
    }

    public override disposeLoad(_renderCount: number): void { }

    public async loadSearchedAccounts(): Promise<void> {
        await this.searchAccountsAsync(
            this._model.searchAccountsInput,
            0,
            this._limit,
            true
        );
    }

    public updateSearchInput(value: string): void {
        this._model.searchInput = value;
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

    public async onChatsNextScrollAsync(): Promise<void> {
        if (this._model.areChatsLoading) {
            return;
        }

        this._model.chatsPagination = this._model.chatsPagination + 1;

        const offset = this._limit * (this._model.chatsPagination - 1);
        await this.requestChatsAsync(
            this._model.searchInput,
            'loading',
            offset,
            this._limit
        );
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
            const result = await this._accountsIndex?.search(query, {
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

            this._model.chats = [chatResponse, ...this._model.chats]
        } catch (error: any) {
            console.error(error);
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
