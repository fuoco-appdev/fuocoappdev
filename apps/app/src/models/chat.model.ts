import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";
import { ChatSeenMessageResponse } from "../protobuf/chat_pb";
import { AccountDocument, AccountPresence } from "./account.model";

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
    tags?: string[];
    private?: PrivateChatDocument;
}

export interface DecryptedChatMessage {
    id?: string;
    createdAt?: string;
    accountId?: string;
    message?: string | null;
    seenBy?: ChatSeenMessageResponse[];
}

export interface EncryptedChatMessage {
    encryptedMessage?: string;
    accountId?: string;
    nonce?: string;
}

export interface ChatSubscription {
    chatId?: string;
    requestAt?: string;
    accountId?: string;
    joinedAt?: string;
    publicKey?: string;
    privateKey?: string;
    lastSeenAt?: string;
}

export interface ChatState {
    searchInput: string;
    searchAccountsInput: string;
    areAccountsLoading: boolean;
    searchedAccounts: AccountDocument[];
    selectedTab: ChatTabs;
    hasMoreMessageChannels: boolean;
    areMessageChannelsLoading: boolean;
    chats: ChatDocument[];
    hasMoreChats: boolean;
    areChatsReloading: boolean;
    areChatsLoading: boolean;
    chatsPagination: number;
    accounts: Record<string, AccountDocument>;
    chatSubscriptions: Record<string, Record<string, ChatSubscription>>;
    lastChatMessages: Record<string, DecryptedChatMessage | undefined>;
    selectedChat: ChatDocument | undefined;
    accountPresence: Record<string, AccountPresence>;
    messages: DecryptedChatMessage[],
    hasMoreMessages: boolean;
    areMessagesLoading: boolean;
    messageInput: string;
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
                    chatsPagination: 1,
                    accounts: {},
                    chatSubscriptions: {},
                    lastChatMessages: {},
                    selectedChat: undefined,
                    accountPresence: {},
                    messages: [],
                    hasMoreMessages: true,
                    areMessagesLoading: false,
                    messageInput: ''
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

    public get chats(): ChatDocument[] {
        return this.store.getValue().chats;
    }

    public set chats(value: ChatDocument[]) {
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

    public get accounts(): Record<string, AccountDocument> {
        return this.store.getValue().accounts;
    }

    public set accounts(value: Record<string, AccountDocument>) {
        if (JSON.stringify(this.accounts) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, accounts: value }));
        }
    }

    public get chatSubscriptions(): Record<string, Record<string, ChatSubscription>> {
        return this.store.getValue().chatSubscriptions;
    }

    public set chatSubscriptions(value: Record<string, Record<string, ChatSubscription>>) {
        if (JSON.stringify(this.chatSubscriptions) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, chatSubscriptions: value }));
        }
    }

    public get lastChatMessages(): Record<string, DecryptedChatMessage | undefined> {
        return this.store.getValue().lastChatMessages;
    }

    public set lastChatMessages(value: Record<string, DecryptedChatMessage | undefined>) {
        if (JSON.stringify(this.lastChatMessages) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, lastChatMessages: value }));
        }
    }

    public get selectedChat(): ChatDocument | undefined {
        return this.store.getValue().selectedChat;
    }

    public set selectedChat(value: ChatDocument | undefined) {
        if (JSON.stringify(this.selectedChat) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, selectedChat: value }));
        }
    }

    public get accountPresence(): Record<string, AccountPresence> {
        return this.store.getValue().accountPresence;
    }

    public set accountPresence(value: Record<string, AccountPresence>) {
        if (JSON.stringify(this.accountPresence) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, accountPresence: value }));
        }
    }

    public get messages(): DecryptedChatMessage[] {
        return this.store.getValue().messages;
    }

    public set messages(value: DecryptedChatMessage[]) {
        if (JSON.stringify(this.messages) !== JSON.stringify(value)) {
            this.store.update((state) => ({ ...state, messages: value }));
        }
    }

    public get hasMoreMessages(): boolean {
        return this.store.getValue().hasMoreMessages;
    }

    public set hasMoreMessages(value: boolean) {
        if (this.hasMoreMessages !== value) {
            this.store.update((state) => ({ ...state, hasMoreMessages: value }));
        }
    }

    public get areMessagesLoading(): boolean {
        return this.store.getValue().areMessagesLoading;
    }

    public set areMessagesLoading(value: boolean) {
        if (this.areMessagesLoading !== value) {
            this.store.update((state) => ({ ...state, areMessagesLoading: value }));
        }
    }

    public get messageInput(): string {
        return this.store.getValue().messageInput;
    }

    public set messageInput(value: string) {
        if (this.messageInput !== value) {
            this.store.update((state) => ({ ...state, messageInput: value }));
        }
    }
}
