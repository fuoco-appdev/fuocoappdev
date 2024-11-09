import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { ChatSubscription } from '../services/chat.service';
import { StoreOptions } from '../store-options';
import { AccountDocument, AccountPresence } from './account.model';

export enum ChatTabs {
  Messages = 'messages',
  Requests = 'requests',
}

export interface PrivateChatDocument {
  chat_id?: string;
  account_ids?: string[];
}

export interface Chat {
  id?: string;
  created_at?: string;
  type?: string;
  updated_at?: string;
}

export interface ChatDocument extends Chat {
  tags?: string[];
  private?: PrivateChatDocument;
}

export interface ChatSeenMessage {
  messageId?: string;
  seenAt?: string;
  accountId?: string;
  chatId?: string;
}

export interface DecryptedChatMessage {
  id?: string;
  createdAt?: string;
  accountId?: string;
  chatId?: string;
  text?: string;
  link?: string;
  videoUrl?: string[];
  photoUrl?: string[];
  fileUrl?: string[];
  replyTo?: string;
}

export interface DecryptedChatMessages {
  messages: DecryptedChatMessage[];
  offset: number;
  hasMore: boolean;
}

export interface ChatMessage {
  id?: string;
  created_at?: string;
  text?: string;
  nonce?: string;
  chat_id?: string;
  account_id?: string;
  link?: string;
  video_url?: string[];
  photo_url?: string[];
  file_url?: string[];
  reply_to?: string;
}

export class ChatModel extends Model {
  @observable
  public searchInput: string;
  @observable
  public searchAccountsInput: string;
  @observable
  public areAccountsLoading: boolean;
  @observable
  public searchedAccounts: AccountDocument[];
  @observable
  public selectedTab: ChatTabs;
  @observable
  public hasMoreMessageChannels: boolean;
  @observable
  public areMessageChannelsLoading: boolean;
  @observable
  public chats: ChatDocument[];
  @observable
  public hasMoreChats: boolean;
  @observable
  public areChatsReloading: boolean;
  @observable
  public areChatsLoading: boolean;
  @observable
  public chatsPagination: number;
  @observable
  public accounts: Record<string, AccountDocument>;
  @observable
  public chatSubscriptions: Record<string, Record<string, ChatSubscription>>;
  @observable
  public lastChatMessages: Record<string, DecryptedChatMessage | undefined>;
  @observable
  public isSelectedChatLoading: boolean;
  @observable
  public selectedChat: ChatDocument | undefined;
  @observable
  public accountPresence: Record<string, AccountPresence>;
  @observable
  public messages: Record<string, DecryptedChatMessages>;
  @observable
  public seenBy: Record<string, ChatSeenMessage[]>;
  @observable
  public hasMoreMessages: boolean;
  @observable
  public areMessagesLoading: boolean;
  @observable
  public messageInput: string;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    this.searchInput = '';
    this.searchAccountsInput = '';
    this.areAccountsLoading = false;
    this.searchedAccounts = [];
    this.selectedTab = ChatTabs.Messages;
    this.hasMoreMessageChannels = true;
    this.areMessageChannelsLoading = false;
    this.chats = [];
    this.hasMoreChats = true;
    this.areChatsReloading = false;
    this.areChatsLoading = false;
    this.chatsPagination = 1;
    this.accounts = {};
    this.chatSubscriptions = {};
    this.lastChatMessages = {};
    this.isSelectedChatLoading = false;
    this.selectedChat = undefined;
    this.accountPresence = {};
    this.messages = {};
    this.seenBy = {};
    this.hasMoreMessages = true;
    this.areMessagesLoading = false;
    this.messageInput = '';
  }

  public updateSearchInput(value: string) {
    if (this.searchInput !== value) {
      this.searchInput = value;
    }
  }

  public updateSearchAccountsInput(value: string) {
    if (this.searchAccountsInput !== value) {
      this.searchAccountsInput = value;
    }
  }

  public updateSearchedAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.searchedAccounts) !== JSON.stringify(value)) {
      this.searchedAccounts = value;
    }
  }

  public updateAreAccountsLoading(value: boolean) {
    if (this.areAccountsLoading !== value) {
      this.areAccountsLoading = value;
    }
  }

  public updateSelectedTab(value: ChatTabs) {
    if (this.selectedTab !== value) {
      this.selectedTab = value;
    }
  }

  public updateChats(value: ChatDocument[]) {
    if (JSON.stringify(this.chats) !== JSON.stringify(value)) {
      this.chats = value;
    }
  }

  public updateHasMoreChats(value: boolean) {
    if (this.hasMoreChats !== value) {
      this.hasMoreChats = value;
    }
  }

  public updateAreChatsReloading(value: boolean) {
    if (this.areChatsReloading !== value) {
      this.areChatsReloading = value;
    }
  }

  public updateAreChatsLoading(value: boolean) {
    if (this.areChatsLoading !== value) {
      this.areChatsLoading = value;
    }
  }

  public updateChatsPagination(value: number) {
    if (this.chatsPagination !== value) {
      this.chatsPagination = value;
    }
  }

  public updateAccounts(value: Record<string, AccountDocument>) {
    if (JSON.stringify(this.accounts) !== JSON.stringify(value)) {
      this.accounts = value;
    }
  }

  public updateChatSubscriptions(
    value: Record<string, Record<string, ChatSubscription>>
  ) {
    if (JSON.stringify(this.chatSubscriptions) !== JSON.stringify(value)) {
      this.chatSubscriptions = value;
    }
  }

  public updateLastChatMessages(
    value: Record<string, DecryptedChatMessage | undefined>
  ) {
    if (JSON.stringify(this.lastChatMessages) !== JSON.stringify(value)) {
      this.lastChatMessages = value;
    }
  }

  public updateSeenBy(value: Record<string, ChatSeenMessage[]>) {
    if (JSON.stringify(this.seenBy) !== JSON.stringify(value)) {
      this.seenBy = value;
    }
  }

  public updateIsSelectedChatLoading(value: boolean) {
    if (this.isSelectedChatLoading !== value) {
      this.isSelectedChatLoading = value;
    }
  }

  public updateSelectedChat(value: ChatDocument | undefined) {
    if (JSON.stringify(this.selectedChat) !== JSON.stringify(value)) {
      this.selectedChat = value;
    }
  }

  public updateAccountPresence(value: Record<string, AccountPresence>) {
    if (JSON.stringify(this.accountPresence) !== JSON.stringify(value)) {
      this.accountPresence = value;
    }
  }

  public updateMessages(value: Record<string, DecryptedChatMessages>) {
    if (JSON.stringify(this.messages) !== JSON.stringify(value)) {
      this.messages = value;
    }
  }

  public updateHasMoreMessages(value: boolean) {
    if (this.hasMoreMessages !== value) {
      this.hasMoreMessages = value;
    }
  }

  public updateAreMessagesLoading(value: boolean) {
    if (this.areMessagesLoading !== value) {
      this.areMessagesLoading = value;
    }
  }

  public updateMessageInput(value: string) {
    if (this.messageInput !== value) {
      this.messageInput = value;
    }
  }
}
