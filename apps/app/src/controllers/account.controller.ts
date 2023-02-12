/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel } from '../models/account.model';
import UserService from '../services/user.service';
import * as core from '../protobuf/core_pb';
import AuthService from '../services/auth.service';
import WindowController from './window.controller';
import SecretsService from '../services/secrets.service';
import { LanguageCode } from '@fuoco.appdev/core-ui';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private _userSubscription: Subscription | undefined;
  private _secretsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
  }

  public get model(): AccountModel {
    return this._model;
  }

  public initialize(): void {
    this._secretsSubscription = SecretsService.secretsObservable.subscribe({
      next: (secrets: core.Secrets | null) => {
        this._model.mapboxAccessToken = secrets?.mapboxAccessToken ?? '';
      },
    });

    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: (user: core.User | null) => {
        this._model.company = user?.company ?? '';
        this._model.emailAddress = user?.email ?? '';
        this._model.phoneNumber = user?.phoneNumber ?? '';
        this._model.location = [
          Number(user?.location?.longitude) ?? 0,
          Number(user?.location?.latitude) ?? 0,
        ];
        this._model.language = user?.language as LanguageCode;
        this._model.isEmailAddressDisabled =
          AuthService.user?.app_metadata !== undefined;
        this._model.isUpdatePasswordDisabled =
          AuthService.user?.app_metadata !== undefined;
        this._model.updatedCompany = this._model.company;
        this._model.updatedEmailAddress = this._model.emailAddress;
        this._model.updatedPhoneNumber = this._model.phoneNumber;
        this._model.updatedLocation = this._model.location;
        this._model.updatedLanguage = this._model.language;
      },
    });
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
  }

  public updateCompany(value: string): void {
    this._model.updatedCompany = value;
    this.updateSave();
  }

  public updateEmailAddress(value: string): void {
    this._model.updatedEmailAddress = value;
    this.updateSave();
  }

  public updatePhoneNumber(value: string): void {
    this._model.updatedPhoneNumber = value;
    this.updateSave();
  }

  public updateLocation(value: string, data: any): void {
    this._model.updatedLocation = data.center;
    this.updateSave();
  }

  public updateLanguage(value: LanguageCode): void {
    this._model.updatedLanguage = value;
    this.updateSave();
  }

  public updateIsSaveDisabled(value: boolean): void {
    this._model.isSaveDisabled = value;
  }

  public updateShowDeleteModal(value: boolean): void {
    this._model.showDeleteModal = value;
  }

  public async saveAsync(): Promise<void> {
    await UserService.requestUpdateActiveAsync({
      company: this._model.updatedCompany,
      phoneNumber: this._model.updatedPhoneNumber,
      location: this._model.updatedLocation,
      language: this._model.updatedLanguage,
    });

    this._model.isSaveDisabled = true;
  }

  public async deleteAsync(): Promise<void> {
    await UserService.requestActiveDeleteAsync();
    UserService.clearActiveUser();
    AuthService.clear();
    WindowController.updateAuthState('USER_DELETED');
  }

  private updateSave(): void {
    if (
      this._model.company !== this._model.updatedCompany ||
      this._model.emailAddress !== this._model.updatedEmailAddress ||
      this._model.phoneNumber !== this._model.updatedPhoneNumber ||
      this._model.location[0] !== this._model.updatedLocation[0] ||
      this._model.location[1] !== this._model.updatedLocation[1] ||
      this._model.language !== this._model.updatedLanguage
    ) {
      this._model.isSaveDisabled = false;
      return;
    }

    this._model.isSaveDisabled = true;
  }
}

export default new AccountController();
