/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AdminAppsModel } from '../models/admin-apps.model';
import UserService from '../services/user.service';
import AppService from '../services/app.service';
import * as core from '../protobuf/core_pb';

class AdminAppsController extends Controller {
  private readonly _model: AdminAppsModel;
  private _userSubscription: Subscription | undefined;
  private _appsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AdminAppsModel();

    this.onActiveUserChangedAsync = this.onActiveUserChangedAsync.bind(this);
    this.onAppsChanged = this.onAppsChanged.bind(this);
  }

  public get model(): AdminAppsModel {
    return this._model;
  }

  public initialize(): void {
    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: this.onActiveUserChangedAsync,
    });
    this._appsSubscription = AppService.appsObservable.subscribe({
      next: this.onAppsChanged,
    });
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
    this._appsSubscription?.unsubscribe();
  }

  public async createAppAsync(): Promise<void> {
    await AppService.requestCreateAsync();
  }

  public async uploadAvatarAsync(appId: string, blob: Blob): Promise<void> {
    await AppService.requestUploadAvatarAsync(appId, blob);
  }

  private async onActiveUserChangedAsync(
    user: core.User | null
  ): Promise<void> {
    if (user?.role !== core.UserRole.ADMIN) {
      return;
    }

    await AppService.requestAllAsync();
  }

  private onAppsChanged(apps: core.App[]): void {
    this._model.apps = apps;
  }
}

export default new AdminAppsController();
