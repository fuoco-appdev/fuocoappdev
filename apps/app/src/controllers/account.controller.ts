/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel } from '../models/account.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';
import SupabaseService from '../services/supabase.service';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import { StorePostCustomersReq, Customer, Address } from '@medusajs/medusa';
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
import { RoutePaths } from '../route-paths';
import { LanguageInfo } from '@fuoco.appdev/core-ui';
import { select } from '@ngneat/elf';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private _activeAccountSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
    this.onActiveAccountChangedAsync =
      this.onActiveAccountChangedAsync.bind(this);
    this.onActiveUserChangedAsync = this.onActiveUserChangedAsync.bind(this);
    this.onAccountChanged = this.onAccountChanged.bind(this);
    this.uploadAvatarAsync = this.uploadAvatarAsync.bind(this);
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._activeAccountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: this.onActiveAccountChangedAsync,
      });
    this._accountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: this.onAccountChanged,
      });
    this._userSubscription = SupabaseService.userObservable.subscribe({
      next: this.onActiveUserChangedAsync,
    });
  }

  public override dispose(renderCount: number): void {
    this._activeAccountSubscription?.unsubscribe();
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

  public updateSelectedAddress(value: Address | undefined): void {
    this._model.selectedAddress = value;
  }

  public updateEditShippingAddress(value: AddressFormValues): void {
    this._model.editShippingForm = {
      ...this._model.editShippingForm,
      ...value,
    };
  }

  public updateEditShippingAddressErrors(value: AddressFormErrors): void {
    this._model.editShippingFormErrors = value;
  }

  public updateActiveTabId(value: string): void {
    this._model.prevTabIndex = this._model.activeTabIndex;
    this._model.activeTabId = value;

    switch (value) {
      case RoutePaths.AccountOrderHistory:
        this._model.activeTabIndex = 1;
        break;
      case RoutePaths.AccountAddresses:
        this._model.activeTabIndex = 2;
        break;
      case RoutePaths.AccountEdit:
        this._model.activeTabIndex = 3;
        break;
      default:
        break;
    }
  }

  public getAddressFormErrors(
    form: AddressFormValues
  ): AddressFormErrors | undefined {
    const errors: AddressFormErrors = {};

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
      this._model.customer = await MedusaService.requestCreateCustomerAsync({
        email: SupabaseService.user.email,
        first_name: this._model.profileForm.firstName ?? '',
        last_name: this._model.profileForm.lastName ?? '',
        phone: this._model.profileForm.phoneNumber,
      });

      if (!this._model.customer) {
        throw new Error('No customer created');
      }

      this._model.account = await AccountService.requestUpdateActiveAsync({
        customerId: this._model.customer?.id,
        status: 'Complete',
        languageCode: WindowController.model.languageInfo?.isoCode,
      });
    } catch (error: any) {
      WindowController.addToast({
        key: `complete-customer-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async updateCustomerAsync(form: ProfileFormValues): Promise<void> {
    if (!this._model.customer) {
      return;
    }

    try {
      const customerResponse = await MedusaService.medusa.customers.update({
        first_name: form.firstName ?? '',
        last_name: form.lastName ?? '',
        phone: form.phoneNumber,
      });
      this._model.customer = customerResponse.customer as Customer;
    } catch (error: any) {
      WindowController.addToast({
        key: `update-customer-${Math.random()}`,
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

  public async addAddressAsync(addressForm: AddressFormValues): Promise<void> {
    const customerResponse =
      await MedusaService.medusa.customers.addresses.addAddress({
        address: {
          first_name: addressForm.firstName ?? '',
          last_name: addressForm.lastName ?? '',
          phone: addressForm.phoneNumber ?? '',
          company: addressForm.company ?? '',
          address_1: addressForm.address ?? '',
          address_2: addressForm.apartments ?? '',
          city: addressForm.city ?? '',
          country_code: addressForm.countryCode ?? '',
          province: addressForm.region ?? '',
          postal_code: addressForm.postalCode ?? '',
          metadata: {},
        },
      });
    this._model.customer = customerResponse.customer as Customer;
    this._model.shippingForm = {};
  }

  public async deleteAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const customerResponse =
      await MedusaService.medusa.customers.addresses.deleteAddress(id);
    this._model.customer = customerResponse.customer as Customer;
    this._model.selectedAddress = undefined;
  }

  public async updateAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const customerResponse =
      await MedusaService.medusa.customers.addresses.updateAddress(id, {
        first_name: this._model.editShippingForm.firstName ?? '',
        last_name: this._model.editShippingForm.lastName ?? '',
        phone: this._model.editShippingForm.phoneNumber ?? '',
        company: this._model.editShippingForm.company ?? '',
        address_1: this._model.editShippingForm.address ?? '',
        address_2: this._model.editShippingForm.apartments ?? '',
        city: this._model.editShippingForm.city ?? '',
        country_code: this._model.editShippingForm.countryCode ?? '',
        province: this._model.editShippingForm.region ?? '',
        postal_code: this._model.editShippingForm.postalCode ?? '',
        metadata: {},
      });
    this._model.customer = customerResponse.customer as Customer;
    this._model.editShippingForm = {};
  }

  public async logoutAsync(): Promise<void> {
    try {
      await MedusaService.medusa.auth.deleteSession();
      await SupabaseService.signoutAsync();
    } catch (error: any) {
      WindowController.addToast({
        key: `logout-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async deleteAsync(): Promise<void> {
    try {
      await AccountService.requestActiveDeleteAsync();
      AccountService.clearActiveAccount();
      SupabaseService.clear();
    } catch (error: any) {
      WindowController.addToast({
        key: `delete-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async updateAccountLanguageAsync(
    code: string,
    info: LanguageInfo
  ): Promise<void> {
    WindowController.updateLanguageInfo(code, info);
    this._model.account = await AccountService.requestUpdateActiveAsync({
      languageCode: code,
    });
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
    if (value.profileUrl && value.profileUrl.length > 0) {
      this._model.profileUrl = await BucketService.getPublicUrlAsync(
        core.StorageFolderType.Avatars,
        value.profileUrl
      );
    }
  }

  private async onActiveUserChangedAsync(value: User | null): Promise<void> {
    if (!value) {
      return;
    }

    try {
      this._model.customer = await MedusaService.requestCustomerAsync(
        value?.id ?? ''
      );

      this._model.profileForm = {
        firstName: this._model.customer?.first_name,
        lastName: this._model.customer?.last_name,
        phoneNumber: this._model.customer?.phone,
      };

      await this.requestOrdersAsync();
    } catch (error: any) {
      WindowController.addToast({
        key: `request-customer-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  private onAccountChanged(value: core.Account | undefined): void {
    if (
      value?.languageCode &&
      value?.languageCode !== WindowController.model.languageCode
    ) {
      console.log(value?.languageCode);
      console.log(WindowController.model.languageCode);
      WindowController.updateLanguageCode(value?.languageCode);
    }
  }
}

export default new AccountController();
