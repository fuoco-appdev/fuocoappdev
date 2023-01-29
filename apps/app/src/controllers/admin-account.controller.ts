/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AdminAccountModel } from '../models/admin-account.model';
import UserService from '../services/user.service';
import * as core from '../protobuf/core_pb';
import AuthService from '../services/auth.service';

class AdminAccountController extends Controller {
  private readonly _model: AdminAccountModel;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AdminAccountModel();
  }

  public get model(): AdminAccountModel {
    return this._model;
  }

  public initialize(): void {
    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: (user: core.User | null) => {
        if (user?.role !== core.UserRole.ADMIN) {
          return;
        }

        this._model.emailAddress = user?.email ?? '';
        this._model.language = user?.language ?? '';
        this._model.isEmailAddressDisabled =
          AuthService.user?.app_metadata !== undefined;
        this._model.updatedEmailAddress = this._model.emailAddress;
        this._model.updatedLanguage = this._model.language;
      },
    });
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
  }

  public updateEmailAddress(value: string): void {
    this._model.updatedEmailAddress = value;
    this.updateSave();
  }

  public updateLanguage(value: string): void {
    this._model.updatedLanguage = value;
    this.updateSave();
  }

  public updateIsSaveDisabled(value: boolean): void {
    this._model.isSaveDisabled = value;
  }

  public async saveAsync(): Promise<void> {
    await UserService.requestUpdateActiveAsync({
      email: this._model.updatedEmailAddress,
      language: this._model.updatedLanguage,
    });

    this._model.isSaveDisabled = true;
  }

  private updateSave(): void {
    if (
      this._model.emailAddress !== this._model.updatedEmailAddress ||
      this._model.language !== this._model.updatedLanguage
    ) {
      this._model.isSaveDisabled = false;
      return;
    }

    this._model.isSaveDisabled = true;
  }
}

export default new AdminAccountController();
