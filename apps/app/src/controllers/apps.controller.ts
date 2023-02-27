/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AppsModel } from '../models/apps.model';
import CustomerService from '../services/customer.service';
import AppService from '../services/app.service';
import * as core from '../protobuf/core_pb';

class AppsController extends Controller {
  private readonly _model: AppsModel;
  private _userSubscription: Subscription | undefined;
  private _userAppsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AppsModel();

    this.onActiveCustomerChangedAsync =
      this.onActiveCustomerChangedAsync.bind(this);
    this.onUserAppsChanged = this.onUserAppsChanged.bind(this);
  }

  public get model(): AppsModel {
    return this._model;
  }

  public initialize(): void {
    this._userSubscription = CustomerService.activeCustomerObservable.subscribe(
      {
        next: this.onActiveCustomerChangedAsync,
      }
    );
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

  private async onActiveCustomerChangedAsync(
    customer: core.Customer | null
  ): Promise<void> {
    if (!customer) {
      return;
    }

    await AppService.requestAllFromUserAsync(customer.id);
  }

  private onUserAppsChanged(apps: core.App[]): void {
    this._model.apps = apps;
  }
}

export default new AppsController();
