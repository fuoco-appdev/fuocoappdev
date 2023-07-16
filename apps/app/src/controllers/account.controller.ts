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
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
import { User } from '@supabase/supabase-js';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private _accountSubscription: Subscription | undefined;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
    this.onActiveAccountChangedAsync =
      this.onActiveAccountChangedAsync.bind(this);
    this.onActiveUserChangedAsync = this.onActiveUserChangedAsync.bind(this);
    this.uploadAvatarAsync = this.uploadAvatarAsync.bind(this);
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._accountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: this.onActiveAccountChangedAsync,
      });
    this._userSubscription = SupabaseService.userObservable.subscribe({
      next: this.onActiveUserChangedAsync,
    });
  }

  public override dispose(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
    this._userSubscription?.unsubscribe();
  }

  public async onNextOrderScrollAsync(): Promise<void> {
    this._model.orderPagination = this._model.orderPagination + 1;

    const limit = 10;
    const offset = limit * (this._model.orderPagination - 1);
    await this.requestOrdersAsync(offset, limit);
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

  public updateShippingAddress(value: AddressFormValues): void {
    this._model.shippingForm = { ...this._model.shippingForm, ...value };
  }

  public updateShippingAddressErrors(value: AddressFormErrors): void {
    this._model.shippingFormErrors = value;
  }

  public updateAddressErrorStrings(value: AddressFormErrors): void {
    this._model.addressErrorStrings = value;
  }

  public getAddressFormErrors(
    form: AddressFormValues
  ): AddressFormErrors | undefined {
    const errors: AddressFormErrors = {};

    if (!form.email || form.email?.length <= 0) {
      errors.email = this._model.addressErrorStrings.email;
    }

    if (!form.firstName || form.firstName?.length <= 0) {
      errors.firstName = this._model.addressErrorStrings.firstName;
    }

    if (!form.lastName || form.lastName?.length <= 0) {
      errors.lastName = this._model.addressErrorStrings.lastName;
    }

    if (!form.address || form.address?.length <= 0) {
      errors.address = this._model.addressErrorStrings.address;
    }

    if (!form.postalCode || form.postalCode?.length <= 0) {
      errors.postalCode = this._model.addressErrorStrings.postalCode;
    }

    if (!form.city || form.city?.length <= 0) {
      errors.city = this._model.addressErrorStrings.city;
    }

    if (!form.phoneNumber || form.phoneNumber?.length <= 0) {
      errors.phoneNumber = this._model.addressErrorStrings.phoneNumber;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
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
        if (!customer) {
          throw new Error('No customer created');
        }
      } else {
        customer = await MedusaService.requestUpdateCustomerAsync(customer.id, {
          first_name: this._model.profileForm.firstName ?? '',
          last_name: this._model.profileForm.lastName ?? '',
          phone: this._model.profileForm.phoneNumber,
        });
        if (!customer) {
          throw new Error('No customer updated');
        }
      }

      this._model.account = await AccountService.requestUpdateActiveAsync({
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

  public async uploadAvatarAsync(index: number, blob: Blob): Promise<void> {
    const extension = mime.getExtension(blob.type);
    const newFile = `public/${uuidv4()}.${extension}`;
    if (this._model.account?.profileUrl) {
      await BucketService.removeAsync(
        core.StorageFolderType.Avatars,
        this._model.account?.profileUrl
      );
    }
    await BucketService.uploadPublicAsync(
      core.StorageFolderType.Avatars,
      newFile,
      blob
    );
    this._model.account = await AccountService.requestUpdateActiveAsync({
      profileUrl: newFile,
    });
  }

  public async addAddressAsync(): Promise<void> {
    this._model.shippingForm = {};
  }

  public async deleteAsync(): Promise<void> {
    await AccountService.requestActiveDeleteAsync();
    AccountService.clearActiveAccount();
    SupabaseService.clear();
  }

  private async requestOrdersAsync(
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (!this._model.customer) {
      return;
    }

    const orders = await MedusaService.requestOrdersAsync(
      this._model.customer.id,
      {
        offset: offset,
        limit: limit,
      }
    );

    if (!orders || orders.length <= 0) {
      this._model.hasMoreOrders = false;
      return;
    }

    if (offset <= 0) {
      this._model.orders = [];
      this._model.hasMoreOrders = true;
    }

    this._model.orders = this._model.orders.concat(orders);
  }

  private async onActiveAccountChangedAsync(
    value: core.Account | null
  ): Promise<void> {
    if (!value) {
      return;
    }

    this._model.account = value;
    this._model.profileUrl = await BucketService.getPublicUrlAsync(
      core.StorageFolderType.Avatars,
      value.profileUrl
    );
  }

  private async onActiveUserChangedAsync(value: User | null): Promise<void> {
    if (!value) {
      return;
    }

    this._model.customer = await MedusaService.requestCustomerAsync(
      value?.email ?? ''
    );

    await this.requestOrdersAsync();
  }
}

export default new AccountController();
