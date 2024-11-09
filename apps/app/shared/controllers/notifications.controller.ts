/* eslint-disable @typescript-eslint/no-empty-function */
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { NotificationsModel } from '../models/notifications.model';
import { AccountNotificationResponse } from '../protobuf/account-notification_pb';
import { AccountResponse } from '../protobuf/account_pb';
import AccountFollowersService from '../services/account-followers.service';
import AccountNotificationService from '../services/account-notification.service';
import { StoreOptions } from '../store-options';
import AccountController from './account.controller';
import WindowController from './window.controller';

export default class NotificationsController extends Controller {
  private readonly _model: NotificationsModel;
  private _loadedAccountDisposer: Lambda | undefined;
  private _limit: number;

  constructor(
    private readonly _container: DIContainer<{
      AccountController: AccountController;
      AccountFollowersService: AccountFollowersService;
      WindowController: WindowController;
      AccountNotificationService: AccountNotificationService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new NotificationsModel(this._storeOptions);
    this._limit = 20;
  }

  public get model(): NotificationsModel {
    return this._model;
  }

  public override initialize = (_renderCount: number): void => {};

  public override load(_renderCount: number): void {
    this.loadAccountNotifications();
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._loadedAccountDisposer?.();
  }

  public loadAccountNotifications(): void {
    this._model.accountNotifications = [];
    this._model.hasMoreNotifications = true;
    this._model.isReloading = false;
    this._model.isLoading = false;
    this._model.pagination = 1;

    const accountController = this._container.get('AccountController');
    this._loadedAccountDisposer?.();
    this._loadedAccountDisposer = observe(
      accountController.model,
      'account',
      async (value: IValueDidChange<AccountResponse | undefined>) => {
        const account = value.newValue;
        if (!account) {
          return;
        }

        await this.requestAccountNotificationsAsync('loading', 0, this._limit);
        await this.requestUpdateSeenAllAsync();
      }
    );
  }

  public updateScrollPosition(value: number | undefined): void {
    this._model.scrollPosition = value;
  }

  public addAccountNotification(notification: Record<string, any>): void {
    const payload = notification['payload'];
    const id = payload['id'] as string;
    const createdAt = payload['created_at'] as string;
    const eventName = payload['event_name'] as string;
    const resourceType = payload['resource_type'] as string;
    const resourceId = payload['resource_id'] as string;
    const accountId = payload['account_id'] as string;
    const data = payload['data'] as string;
    const updatedAt = payload['updated_at'] as string;
    const seen = payload['seen'] as boolean;

    const response = new AccountNotificationResponse({
      id: id,
      createdAt: createdAt,
      eventName: eventName,
      resourceType: resourceType,
      resourceId: resourceId,
      accountId: accountId,
      data: JSON.stringify(data),
      seen: seen,
      ...(updatedAt && { updatedAt: updatedAt }),
    });

    this._model.accountNotifications = [response].concat(
      this._model.accountNotifications
    );
  }

  public async reloadNotificationsAsync(): Promise<void> {
    this._model.hasMoreNotifications = true;
    this._model.isReloading = false;
    this._model.isLoading = false;
    this._model.pagination = 1;

    await this.requestAccountNotificationsAsync('reloading', 0, this._limit);
  }

  public async onNextScrollAsync(): Promise<void> {
    if (this._model.isLoading) {
      return;
    }

    this._model.pagination = this._model.pagination + 1;

    const offset = this._limit * (this._model.pagination - 1);
    await this.requestAccountNotificationsAsync('loading', offset, this._limit);
  }

  public async requestFollowAsync(id: string): Promise<void> {
    const accountController = this._container.get('AccountController');
    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    try {
      const follower = await accountFollowersService.requestAddAsync({
        accountId: account.id,
        followerId: id,
      });
      if (follower) {
        const accountFollowers = { ...this._model.accountFollowers };
        accountFollowers[follower.followerId] = follower;
        this._model.accountFollowers = accountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async requestUnfollowAsync(id: string): Promise<void> {
    const accountController = this._container.get('AccountController');
    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    try {
      const follower = await accountFollowersService.requestRemoveAsync({
        accountId: account.id,
        followerId: id,
      });
      if (follower) {
        const accountFollowers = { ...this._model.accountFollowers };
        accountFollowers[follower.followerId] = follower;
        this._model.accountFollowers = accountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  private async requestUpdateSeenAllAsync(): Promise<void> {
    const accountController = this._container.get('AccountController');
    const windowController = this._container.get('WindowController');
    const accountNotificationService = this._container.get(
      'AccountNotificationService'
    );
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    await accountNotificationService.requestUpdateSeenAsync(account.id);
    windowController.updateNotificationsCount(0);
  }

  private async requestAccountNotificationsAsync(
    loadType: 'loading' | 'reloading',
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (this._model.isLoading || this._model.isReloading) {
      return;
    }

    if (loadType === 'loading') {
      this._model.isLoading = true;
    } else if (loadType === 'reloading') {
      this._model.isReloading = true;
    }

    const accountController = this._container.get('AccountController');
    const accountNotificationService = this._container.get(
      'AccountNotificationService'
    );
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    if (!account) {
      return;
    }

    try {
      const accountNotificationsResponse =
        await accountNotificationService.requestNotificationsAsync({
          accountId: account.id,
          offset: offset,
          limit: limit,
        });

      if (
        !accountNotificationsResponse.notifications ||
        accountNotificationsResponse.notifications.length <= 0
      ) {
        this._model.hasMoreNotifications = false;
        this._model.isLoading = false;
        this._model.isReloading = false;
        return;
      }

      if (accountNotificationsResponse.notifications.length < limit) {
        this._model.hasMoreNotifications = false;
      } else {
        this._model.hasMoreNotifications = true;
      }

      if (offset > 0) {
        this._model.accountNotifications =
          this._model.accountNotifications.concat(
            accountNotificationsResponse.notifications
          );
      } else {
        this._model.accountNotifications =
          accountNotificationsResponse.notifications;
      }
    } catch (error: any) {
      console.error(error);
      this._model.isLoading = false;
      this._model.isReloading = false;
      this._model.hasMoreNotifications = false;
    }

    const accountNotifications = this._model.accountNotifications.filter(
      (value) =>
        value.resourceType === 'account' &&
        !Object.keys(this._model.accountFollowers).includes(value.resourceId)
    );
    let accountFollowerIds = accountNotifications.map(
      (value) => value.resourceId
    );
    accountFollowerIds = accountFollowerIds.filter(
      (value, index) => accountFollowerIds.indexOf(value) === index
    );

    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    if (accountFollowerIds.length > 0) {
      try {
        const followerResponse =
          await accountFollowersService.requestFollowersAsync({
            accountId: account?.id ?? '',
            otherAccountIds: accountFollowerIds,
          });

        const accountFollowers = {
          ...this._model.accountFollowers,
        };
        for (const follower of followerResponse?.followers ?? []) {
          accountFollowers[follower.followerId] = follower;
        }

        this._model.accountFollowers = accountFollowers;
      } catch (error: any) {
        console.error(error);
      }
    }

    if (loadType === 'loading') {
      this._model.isLoading = false;
    } else if (loadType === 'reloading') {
      this._model.isReloading = false;
    }
  }
}
