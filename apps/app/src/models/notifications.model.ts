import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";
import { AccountNotificationResponse } from "../protobuf/account-notification_pb";

export interface NotificationsState {
  accountNotifications: AccountNotificationResponse[];
  pagination: number;
  hasMoreNotifications: boolean;
  scrollPosition: number | undefined;
  isLoading: boolean;
}

export class NotificationsModel extends Model {
  constructor() {
    super(
      createStore(
        { name: "notifications" },
        withProps<NotificationsState>({
          accountNotifications: [],
          pagination: 1,
          hasMoreNotifications: true,
          scrollPosition: 0,
          isLoading: false,
        }),
      ),
    );
  }

  public get accountNotifications(): AccountNotificationResponse[] {
    return this.store.getValue().accountNotifications;
  }

  public set accountNotifications(value: AccountNotificationResponse[]) {
    if (JSON.stringify(this.accountNotifications) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, accountNotifications: value }));
    }
  }

  public get pagination(): number {
    return this.store.getValue().pagination;
  }

  public set pagination(value: number) {
    if (this.pagination !== value) {
      this.store.update((state) => ({ ...state, pagination: value }));
    }
  }

  public get hasMoreNotifications(): boolean {
    return this.store.getValue().hasMoreNotifications;
  }

  public set hasMoreNotifications(value: boolean) {
    if (this.hasMoreNotifications !== value) {
      this.store.update((state) => ({ ...state, hasMoreNotifications: value }));
    }
  }

  public get scrollPosition(): number | undefined {
    return this.store.getValue().scrollPosition;
  }

  public set scrollPosition(value: number | undefined) {
    if (this.scrollPosition !== value) {
      this.store.update((state) => ({ ...state, scrollPosition: value }));
    }
  }

  public get isLoading(): boolean {
    return this.store.getValue().isLoading;
  }

  public set isLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.store.update((state) => ({ ...state, isLoading: value }));
    }
  }
}
