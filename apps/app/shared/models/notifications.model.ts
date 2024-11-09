import { observable } from 'mobx';
import { Model } from '../model';
import { AccountFollowerResponse } from '../protobuf/account-follower_pb';
import { AccountNotificationResponse } from '../protobuf/account-notification_pb';
import { StoreOptions } from '../store-options';

export class NotificationsModel extends Model {
  @observable
  public accountNotifications: AccountNotificationResponse[];
  @observable
  public accountFollowers: Record<string, AccountFollowerResponse>;
  @observable
  public pagination: number;
  @observable
  public hasMoreNotifications: boolean;
  @observable
  public scrollPosition: number | undefined;
  @observable
  public isLoading: boolean;
  @observable
  public isReloading: boolean;

  constructor(options?: StoreOptions) {
    super(options);

    this.accountNotifications = [];
    this.accountFollowers = {};
    this.pagination = 1;
    this.hasMoreNotifications = true;
    this.scrollPosition = 0;
    this.isLoading = false;
    this.isReloading = false;
  }

  public updateAccountNotifications(value: AccountNotificationResponse[]) {
    if (JSON.stringify(this.accountNotifications) !== JSON.stringify(value)) {
      this.accountNotifications = value;
    }
  }

  public updateAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (JSON.stringify(this.accountFollowers) !== JSON.stringify(value)) {
      this.accountFollowers = value;
    }
  }

  public updatePagination(value: number) {
    if (this.pagination !== value) {
      this.pagination = value;
    }
  }

  public updateHasMoreNotifications(value: boolean) {
    if (this.hasMoreNotifications !== value) {
      this.hasMoreNotifications = value;
    }
  }

  public updateScrollPosition(value: number | undefined) {
    if (this.scrollPosition !== value) {
      this.scrollPosition = value;
    }
  }

  public updateIsLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.isLoading = value;
    }
  }

  public updateIsReloading(value: boolean) {
    if (this.isReloading !== value) {
      this.isReloading = value;
    }
  }
}
