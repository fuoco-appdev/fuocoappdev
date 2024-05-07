/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { ChatModel, ChatTabs } from "../models/chat.model";

class ChatController extends Controller {
    private readonly _model: ChatModel;

    constructor() {
        super();

        this._model = new ChatModel();
    }

    public get model(): ChatModel {
        return this._model;
    }

    public override initialize(renderCount: number): void {
        this.initializeAsync(renderCount);
    }

    public override async load(_renderCount: number): Promise<void> {

    }

    public override disposeInitialization(_renderCount: number): void {

    }

    public override disposeLoad(_renderCount: number): void { }

    public updateSearchInput(value: string): void {
        this._model.searchInput = value;
    }

    public async updateSelectedTabAsync(value: ChatTabs): Promise<void> {
        this._model.selectedTab = value;
    }

    private async initializeAsync(_renderCount: number): Promise<void> {

    }
}

export default new ChatController();
