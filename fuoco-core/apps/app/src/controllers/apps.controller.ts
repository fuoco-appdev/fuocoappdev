/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AppsModel } from '../models/apps.model';
import UserService from '../services/user.service';
import AppService from '../services/app.service';
import * as core from '../protobuf/core_pb';

class AppsController extends Controller {
  private readonly _model: AppsModel;
  private _userSubscription: Subscription | undefined;
  private _userAppsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AppsModel();

    this.onActiveUserChangedAsync = this.onActiveUserChangedAsync.bind(this);
    this.onUserAppsChanged = this.onUserAppsChanged.bind(this);
  }

  public get model(): AppsModel {
    return this._model;
  }

  public initialize(): void {
    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: this.onActiveUserChangedAsync,
    });
    this._userAppsSubscription = AppService.userAppsObservable.subscribe({
      next: this.onUserAppsChanged,
    });
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
    this._userAppsSubscription?.unsubscribe();
  }

  public async uploadAvatarAsync(appId: string, blob: Blob): Promise<void> {
    await AppService.uploadAvatarAsync(appId, blob);
  }

  public async uploadCoverImagesAsync(
    appId: string,
    blobs: Blob[]
  ): Promise<void> {
    await AppService.uploadCoverImagesAsync(appId, blobs);
  }

  private async onActiveUserChangedAsync(
    user: core.User | null
  ): Promise<void> {
    if (user?.role !== core.UserRole.USER) {
      return;
    }

    await AppService.requestAllFromUserAsync(user.id);
  }

  private onUserAppsChanged(apps: core.App[]): void {
    this._model.apps = apps;
  }
}

export default new AppsController();
