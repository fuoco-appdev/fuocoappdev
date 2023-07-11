/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel } from '../models/account.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';
import SupabaseService from '../services/supabase.service';
import BucketService from '../services/bucket.service';
import { LanguageCode } from '@fuoco.appdev/core-ui';
import MedusaService from '../services/medusa.service';
import { StorePostCustomersReq, Customer } from '@medusajs/medusa';
import WindowController from './window.controller';
import {
  ProfileFormErrors,
  ProfileFormValues,
} from '../components/account-profile-form.component';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private _accountSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._accountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: (account: core.Account | null) => {
          if (!account) {
            return;
          }

          this._model.account = account;
          this._model.profileUrl =
            BucketService.getPublicUrl(
              core.BucketType.Avatars,
              account.profileUrl
            ) ?? undefined;
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
  }

  public updateProfile(value: ProfileFormValues): void {
    this._model.profileForm = { ...this._model.profileForm, ...value };
  }

  public updateProfileErrors(value: ProfileFormErrors): void {
    this._model.profileFormErrors = value;
  }

  public updateErrorStrings(value: ProfileFormErrors): void {
    this._model.errorStrings = value;
  }

  public getProfileFormErrors(
    form: ProfileFormValues
  ): ProfileFormErrors | undefined {
    const errors: ProfileFormErrors = {};

    if (!form.firstName || form.firstName?.length <= 0) {
      errors.firstName = this._model.errorStrings.firstName;
    }

    if (!form.lastName || form.lastName?.length <= 0) {
      errors.lastName = this._model.errorStrings.lastName;
    }

    if (!form.phoneNumber || form.phoneNumber?.length <= 0) {
      errors.phoneNumber = this._model.errorStrings.phoneNumber;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  }

  public async completeProfileAsync(): Promise<void> {
    if (!SupabaseService.user) {
      return;
    }

    try {
      let customer = await MedusaService.requestCustomerAsync(
        SupabaseService.user.email ?? ''
      );
      if (!customer) {
        customer = await MedusaService.requestCreateCustomerAsync({
          email: SupabaseService.user.email,
          first_name: this._model.profileForm.firstName ?? '',
          last_name: this._model.profileForm.lastName ?? '',
          phone: this._model.profileForm.phoneNumber,
        });
      } else {
        customer = await MedusaService.requestUpdateCustomerAsync(customer.id, {
          first_name: this._model.profileForm.firstName ?? '',
          last_name: this._model.profileForm.lastName ?? '',
          phone: this._model.profileForm.phoneNumber,
        });
      }

      await AccountService.requestUpdateActiveAsync({
        customerId: customer?.id,
        status: 'Complete',
      });
    } catch (error: any) {
      WindowController.addToast({
        key: `create-customer-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async deleteAsync(): Promise<void> {
    await AccountService.requestActiveDeleteAsync();
    AccountService.clearActiveAccount();
    SupabaseService.clear();
  }
}

export default new AccountController();
