import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";

export enum ChatTabs {
    Messages = 'messages',
    Requests = 'requests'
}

export interface ChatState {
    searchInput: string;
    selectedTab: ChatTabs;
    hasMoreMessageChannels: boolean;
    areMessageChannelsLoading: boolean;
}

export class ChatModel extends Model {
    constructor() {
        super(
            createStore(
                { name: "cart" },
                withProps<ChatState>({
                    searchInput: '',
                    selectedTab: ChatTabs.Messages,
                    hasMoreMessageChannels: true,
                    areMessageChannelsLoading: false
                }),
            ),
        );
    }

    public get searchInput(): string {
        return this.store.getValue().searchInput;
    }

    public set searchInput(value: string) {
        if (this.searchInput !== value) {
            this.store.update((state) => ({ ...state, searchInput: value }));
        }
    }

    public get selectedTab(): ChatTabs {
        return this.store.getValue().selectedTab;
    }

    public set selectedTab(value: ChatTabs) {
        if (this.selectedTab !== value) {
            this.store.update((state) => ({ ...state, selectedTab: value }));
        }
    }
}
