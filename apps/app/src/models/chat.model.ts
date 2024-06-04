import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";
import { ChatResponse } from "../protobuf/chat_pb";
import { AccountDocument } from "./account.model";

export enum ChatTabs {
    Messages = 'messages',
    Requests = 'requests'
}

export interface PrivateChatDocument {
    chat_id?: string;
    account_ids?: string[];
}

export interface ChatDocument {
    id?: string;
    created_at?: string;
    type?: string;
    updated_at?: string;
    accounts?: AccountDocument[];
    private?: PrivateChatDocument;
}

export interface ChatState {
    searchInput: string;
    searchAccountsInput: string;
    areAccountsLoading: boolean;
    searchedAccounts: AccountDocument[];
    selectedTab: ChatTabs;
    hasMoreMessageChannels: boolean;
    areMessageChannelsLoading: boolean;
    chats: ChatResponse[];
    hasMoreChats: boolean;
    areChatsReloading: boolean;
    areChatsLoading: boolean;
    chatsPagination: number;
}

export class ChatModel extends Model {
    constructor() {
        super(
            createStore(
                { name: "cart" },
                withProps<ChatState>({
                    searchInput: '',
                    searchAccountsInput: '',
                    areAccountsLoading: false,
                    searchedAccounts: [],
                    selectedTab: ChatTabs.Messages,
                    hasMoreMessageChannels: true,
                    areMessageChannelsLoading: false,
                    chats: [],
                    hasMoreChats: true,
                    areChatsReloading: false,
                    areChatsLoading: false,
                    chatsPagination: 1
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

    public get searchAccountsInput(): string {
        return this.store.getValue().searchAccountsInput;
    }

    public set searchAccountsInput(value: string) {
        if (this.searchAccountsInput !== value) {
            this.store.update((state) => ({ ...state, searchAccountsInput: value }));
        }
    }

    public get searchedAccounts(): AccountDocument[] {
        return this.store.getValue().searchedAccounts;
    }

    public set searchedAccounts(value: AccountDocument[]) {
        if (JSON.stringify(this.searchedAccounts) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, searchedAccounts: value }));
        }
    }

    public get areAccountsLoading(): boolean {
        return this.store.getValue().areAccountsLoading;
    }

    public set areAccountsLoading(value: boolean) {
        if (this.areAccountsLoading !== value) {
            this.store.update((state) => ({ ...state, areAccountsLoading: value }));
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

    public get chats(): ChatResponse[] {
        return this.store.getValue().chats;
    }

    public set chats(value: ChatResponse[]) {
        if (JSON.stringify(this.chats) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, chats: value }));
        }
    }

    public get hasMoreChats(): boolean {
        return this.store.getValue().hasMoreChats;
    }

    public set hasMoreChats(value: boolean) {
        if (this.hasMoreChats !== value) {
            this.store.update((state) => ({ ...state, hasMoreChats: value }));
        }
    }

    public get areChatsReloading(): boolean {
        return this.store.getValue().areChatsReloading;
    }

    public set areChatsReloading(value: boolean) {
        if (this.areChatsReloading !== value) {
            this.store.update((state) => ({ ...state, areChatsReloading: value }));
        }
    }

    public get areChatsLoading(): boolean {
        return this.store.getValue().areChatsLoading;
    }

    public set areChatsLoading(value: boolean) {
        if (this.areChatsLoading !== value) {
            this.store.update((state) => ({ ...state, areChatsLoading: value }));
        }
    }

    public get chatsPagination(): number {
        return this.store.getValue().chatsPagination;
    }

    public set chatsPagination(value: number) {
        if (this.chatsPagination !== value) {
            this.store.update((state) => ({ ...state, chatsPagination: value }));
        }
    }
}
