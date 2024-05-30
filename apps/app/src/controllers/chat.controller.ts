/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { ChatModel, ChatTabs } from '../models/chat.model';

class ChatController extends Controller {
    private readonly _model: ChatModel;
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
        this.initializeAsync(renderCount);
    }

    public override async load(_renderCount: number): Promise<void> { }

    public override disposeInitialization(_renderCount: number): void { }

    public override disposeLoad(_renderCount: number): void { }

    public updateSearchInput(value: string): void {
        this._model.searchInput = value;
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
        await this.requestChatsAsync(this._model.searchInput, 'loading', offset, this._limit);
    }

    private async requestChatsAsync(
        query: string,
        loadType: 'loading' | 'reloading',
        offset: number = 0,
        limit: number = 10
    ): Promise<void> {
        if (loadType === 'loading') {
            this._model.areChatsLoading = true;
        }
        else if (loadType === 'reloading') {
            this._model.areChatsReloading = true;
        }



        if (loadType === 'loading') {
            this._model.areChatsLoading = false;
        }
        else if (loadType === 'reloading') {
            this._model.areChatsReloading = false;
        }
    }

    private async initializeAsync(_renderCount: number): Promise<void> { }
}

export default new ChatController();
