/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel, ProfileFormErrorStrings } from '../models/account.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';
import SupabaseService from '../services/supabase.service';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import ProductLikesService from '../services/product-likes.service';
import { StorePostCustomersReq, Customer, Address } from '@medusajs/medusa';
import WindowController from './window.controller';
import {
  ProfileFormErrors,
  ProfileFormValues,
} from '../components/account-profile-form.component';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { RoutePathsType } from '../route-paths';
import { LanguageInfo } from '@fuoco.appdev/core-ui';
import { select } from '@ngneat/elf';
import HomeController from './home.controller';
import { HomeLocalState } from '../models/home.model';
import Cookies from 'js-cookie';
import { ProductLikesMetadataResponse } from '../protobuf/core_pb';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import StoreController from './store.controller';
import CartController from './cart.controller';
import AccountFollowersService from '../services/account-followers.service';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private readonly _limit: number;
  private _usernameTimerId: NodeJS.Timeout | number | undefined;
  private _addFriendsTimerId: NodeJS.Timeout | number | undefined;
  private _activeAccountSubscription: Subscription | undefined;
  private _userSubscription: Subscription | undefined;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _s3Subscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
    this._limit = 10;
    this.onAuthStateChangedAsync = this.onAuthStateChangedAsync.bind(this);
    this.onActiveAccountChangedAsync =
      this.onActiveAccountChangedAsync.bind(this);
    this.onActiveUserChangedAsync = this.onActiveUserChangedAsync.bind(this);
    this.uploadAvatarAsync = this.uploadAvatarAsync.bind(this);
    this.onSelectedInventoryLocationIdChangedAsync =
      this.onSelectedInventoryLocationIdChangedAsync.bind(this);
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._medusaAccessTokenSubscription =
      MedusaService.accessTokenObservable.subscribe({
        next: (value: string | undefined) => {
          if (!value) {
            this.resetMedusaModel();
            this.initializeAsync(renderCount);
          }
        },
      });
  }

  public override dispose(renderCount: number): void {
    clearTimeout(this._usernameTimerId as number | undefined);
    this._s3Subscription?.unsubscribe();
    this._accountSubscription?.unsubscribe();
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
    this._activeAccountSubscription?.unsubscribe();
    this._userSubscription?.unsubscribe();
  }

  public loadLikedProducts(): void {
    if (this._model.likedProducts.length > 0) {
      return;
    }

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: (account: core.AccountResponse | null) => {
          if (!account) {
            return;
          }

          this.requestLikedProductsAsync();
        },
      });
  }

  public loadOrders(): void {
    if (this._model.orders.length > 0) {
      return;
    }

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: (account: core.AccountResponse | null) => {
          if (!account) {
            return;
          }

          this.requestOrdersAsync();
        },
      });
  }

  public loadFollowRequestsAndFriendsAccounts(): void {
    if (this._model.followRequestAccounts.length > 0) {
      return;
    }

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: async (account: core.AccountResponse | null) => {
          if (!account) {
            return;
          }

          await this.addFriendsSearchAsync(
            this._model.addFriendsInput,
            0,
            this._limit
          );
          await this.requestFollowerRequestsAsync(account.id, 0, 100);
        },
      });
  }

  public async onNextOrderScrollAsync(): Promise<void> {
    if (this._model.areOrdersLoading) {
      return;
    }

    this._model.orderPagination = this._model.orderPagination + 1;

    const offset = this._limit * (this._model.orderPagination - 1);
    await this.requestOrdersAsync(offset, this._limit);
  }

  public async onNextLikedProductScrollAsync(): Promise<void> {
    if (this._model.areLikedProductsLoading) {
      return;
    }

    this._model.likedProductPagination = this._model.likedProductPagination + 1;
    const offset = this._limit * (this._model.likedProductPagination - 1);
    await this.requestLikedProductsAsync(offset, this._limit);
  }

  public async onNextAddFriendsScrollAsync(): Promise<void> {
    if (this._model.areAddFriendsLoading) {
      return;
    }

    this._model.addFriendsPagination = this._model.addFriendsPagination + 1;
    const offset = this._limit * (this._model.addFriendsPagination - 1);
    await this.addFriendsSearchAsync(
      this._model.addFriendsInput,
      offset,
      this._limit
    );
  }

  public updateProfile(value: ProfileFormValues): void {
    this._model.profileForm = { ...this._model.profileForm, ...value };
  }

  public updateProfileErrors(value: ProfileFormErrors): void {
    this._model.profileFormErrors = value;
  }

  public updateErrorStrings(value: ProfileFormErrorStrings): void {
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

    switch (value) {
      case RoutePathsType.AccountLikes:
        this._model.activeTabIndex = 1;
        this._model.activeTabId = value;
        break;
      case RoutePathsType.AccountOrderHistory:
        this._model.activeTabIndex = 2;
        this._model.activeTabId = value;
        break;
      case RoutePathsType.AccountAddresses:
        this._model.activeTabIndex = 3;
        this._model.activeTabId = value;
        break;
      default:
        break;
    }
  }

  public updateOrdersScrollPosition(value: number | undefined) {
    this._model.ordersScrollPosition = value;
  }

  public updateLikesScrollPosition(value: number | undefined) {
    this._model.likesScrollPosition = value;
  }

  public updateSelectedLikedProduct(value: PricedProduct | undefined): void {
    this._model.selectedLikedProduct = value;
  }

  public updateSelectedProductLikes(
    value: ProductLikesMetadataResponse | undefined
  ): void {
    this._model.selectedProductLikes = value;
  }

  public updateIsAvatarUploadLoading(value: boolean): void {
    this._model.isAvatarUploadLoading = value;
  }

  public updateAddFriendsInput(value: string): void {
    this._model.addFriendsInput = value;
    this._model.addFriendsPagination = 1;
    this._model.addFriendAccounts = [];
    this._model.hasMoreAddFriends = true;

    clearTimeout(this._addFriendsTimerId as number | undefined);
    this._addFriendsTimerId = setTimeout(() => {
      this.addFriendsSearchAsync(value, 0, this._limit);
    }, 750);
  }

  public updateAddFriendsScrollPosition(value: number | undefined): void {
    this._model.addFriendsScrollPosition = value;
  }

  public async confirmFollowRequestAsync(
    accountId: string,
    followerId: string
  ): Promise<void> {
    try {
      const followerRequestResponse =
        await AccountFollowersService.requestConfirmAsync({
          accountId: accountId,
          followerId: followerId,
        });

      if (followerRequestResponse) {
        const followRequestAccountFollowers = {
          ...this._model.followRequestAccountFollowers,
        };
        followRequestAccountFollowers[accountId] = followerRequestResponse;
        this._model.followRequestAccountFollowers =
          followRequestAccountFollowers;

        const index = this._model.followRequestAccounts.findIndex(
          (value) => value.id === accountId
        );
        const followRequestAccounts = this._model.followRequestAccounts;
        followRequestAccounts.splice(index, 1);
        this._model.followRequestAccounts = followRequestAccounts;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async removeFollowRequestAsync(
    accountId: string,
    followerId: string
  ): Promise<void> {
    try {
      const follower = await AccountFollowersService.requestRemoveAsync({
        accountId: accountId,
        followerId: followerId,
      });
      if (follower) {
        const accountFollowers = {
          ...this._model.followRequestAccountFollowers,
        };
        accountFollowers[follower.accountId] = follower;
        this._model.followRequestAccountFollowers = accountFollowers;

        const index = this._model.followRequestAccounts.findIndex(
          (value) => value.id === accountId
        );
        const followRequestAccounts = this._model.followRequestAccounts;
        followRequestAccounts.splice(index, 1);
        this._model.followRequestAccounts = followRequestAccounts;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async requestFollowerRequestsAsync(
    accountId: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && this._model.areFollowRequestAccountsLoading) {
      return;
    }

    try {
      const requestedFollowersResponse =
        await AccountFollowersService.requestFollowerRequestsAsync({
          accountId: accountId,
          limit: this._limit,
          offset: 0,
        });

      if (
        !requestedFollowersResponse?.followers ||
        requestedFollowersResponse.followers.length <= 0
      ) {
        this._model.areFollowRequestAccountsLoading = false;
        return;
      }

      const followRequestAccountFollowers = {
        ...this._model.followRequestAccountFollowers,
      };
      for (const follower of requestedFollowersResponse.followers) {
        followRequestAccountFollowers[follower.accountId] = follower;
      }
      this._model.followRequestAccountFollowers = followRequestAccountFollowers;
    } catch (error: any) {
      console.error(error);
    }

    try {
      const accountIds = Object.values(
        this._model.followRequestAccountFollowers
      ).map((value) => value.accountId);
      const accountsResponse = await AccountService.requestAccountsAsync(
        accountIds
      );
      if (!accountsResponse.accounts || accountsResponse.accounts.length <= 0) {
        this._model.areFollowRequestAccountsLoading = false;
        return;
      }

      if (offset > 0) {
        const followRequestAccounts = this._model.followRequestAccounts;
        this._model.followRequestAccounts = followRequestAccounts.concat(
          accountsResponse.accounts
        );
      } else {
        this._model.followRequestAccounts = accountsResponse.accounts;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const customerIds = this._model.followRequestAccounts.map(
        (value) => value.customerId
      );
      const customersResponse = await MedusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      if (customersResponse) {
        const followRequestCustomers = {
          ...this._model.followRequestCustomers,
        };
        for (const customer of customersResponse) {
          followRequestCustomers[customer.id] = customer;
        }

        this._model.followRequestCustomers = followRequestCustomers;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areFollowRequestAccountsLoading = false;
  }

  public async addFriendsSearchAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && this._model.areAddFriendsLoading) {
      return;
    }

    this._model.areAddFriendsLoading = true;

    try {
      const accountsResponse = await AccountService.requestLikeAsync({
        queryUsername: query,
        accountId: this._model.account?.id ?? '',
        offset: offset,
        limit: limit,
      });

      if (!accountsResponse.accounts || accountsResponse.accounts.length <= 0) {
        this._model.hasMoreAddFriends = false;
        this._model.areAddFriendsLoading = false;
        return;
      }

      if (accountsResponse.accounts.length < limit) {
        this._model.hasMoreAddFriends = false;
      } else {
        this._model.hasMoreAddFriends = true;
      }

      if (offset > 0) {
        const addFriendsAccount = this._model.addFriendAccounts;
        this._model.addFriendAccounts = addFriendsAccount.concat(
          accountsResponse.accounts
        );
      } else {
        this._model.addFriendAccounts = accountsResponse.accounts;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const otherAccountIds = this._model.addFriendAccounts.map(
        (value) => value.id
      );
      const followerResponse =
        await AccountFollowersService.requestFollowersAsync({
          accountId: this._model.account?.id ?? '',
          otherAccountIds: otherAccountIds,
        });

      const addFriendsAccountFollowers = {
        ...this._model.addFriendAccountFollowers,
      };
      for (const follower of followerResponse?.followers ?? []) {
        addFriendsAccountFollowers[follower.followerId] = follower;
        this._model.addFriendAccountFollowers = addFriendsAccountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const customerIds = this._model.addFriendAccounts.map(
        (value) => value.customerId
      );
      const customersResponse = await MedusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      if (customersResponse) {
        const addFriendCustomers = { ...this._model.addFriendCustomers };
        for (const customer of customersResponse) {
          addFriendCustomers[customer.id] = customer;
        }

        this._model.addFriendCustomers = addFriendCustomers;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areAddFriendsLoading = false;
  }

  public checkIfUsernameExists(value: string): void {
    clearTimeout(this._usernameTimerId as number | undefined);
    this._usernameTimerId = setTimeout(() => {
      const promise = new Promise<void>(async (resolve, reject) => {
        try {
          this._model.profileFormErrors = await this.getUsernameErrorsAsync(
            value,
            this._model.profileFormErrors,
            true
          );
          resolve();
        } catch (error: any) {
          console.error(error);
          reject(error);
        }
      });
      promise.then();
    }, 750);
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

  public async getProfileFormErrorsAsync(
    form: ProfileFormValues,
    strict: boolean = false
  ): Promise<ProfileFormErrors | undefined> {
    let errors: ProfileFormErrors = {};

    errors = await this.getUsernameErrorsAsync(
      form.username ?? '',
      errors,
      strict
    );

    if (!form.firstName || form.firstName?.length <= 0) {
      errors.firstName = this._model.errorStrings.empty;
    }

    if (!form.lastName || form.lastName?.length <= 0) {
      errors.lastName = this._model.errorStrings.empty;
    }

    if (!form.phoneNumber || form.phoneNumber?.length <= 0) {
      errors.phoneNumber = this._model.errorStrings.empty;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  }

  public async completeProfileAsync(): Promise<void> {
    const errors = await this.getProfileFormErrorsAsync(
      this._model.profileForm,
      true
    );
    if (errors) {
      this._model.profileFormErrors = errors;
      return;
    }

    if (!SupabaseService.user) {
      return;
    }

    try {
      this._model.isCreateCustomerLoading = true;
      this._model.customer =
        await MedusaService.requestUpdateCustomerAccountAsync({
          email: SupabaseService.user.email,
          first_name: this._model.profileForm.firstName ?? '',
          last_name: this._model.profileForm.lastName ?? '',
          phone: this._model.profileForm.phoneNumber,
        });

      if (!this._model.customer) {
        this._model.isCreateCustomerLoading = false;
        throw new Error('No customer created');
      }

      this._model.account = await AccountService.requestUpdateActiveAsync({
        customerId: this._model.customer?.id,
        status: 'Complete',
        languageCode: WindowController.model.languageInfo?.isoCode,
        username: this._model.profileForm.username ?? '',
      });
      this._model.isCreateCustomerLoading = false;
    } catch (error: any) {
      this._model.isCreateCustomerLoading = false;
      console.error(error);
    }
  }

  public async updateGeneralInfoAsync(
    form: ProfileFormValues
  ): Promise<boolean> {
    if (!this._model.customer || !this._model.account) {
      return false;
    }

    this._model.isUpdateGeneralInfoLoading = true;
    const errors = await this.getProfileFormErrorsAsync(form, true);
    if (errors) {
      this.updateProfileErrors(errors);
      this._model.isUpdateGeneralInfoLoading = false;
      return false;
    }

    try {
      const customerResponse = await MedusaService.medusa?.customers.update({
        first_name: form.firstName ?? '',
        last_name: form.lastName ?? '',
        phone: form.phoneNumber,
      });
      this._model.customer = customerResponse?.customer as Customer;

      this._model.account = await AccountService.requestUpdateActiveAsync({
        username: this._model.profileForm.username ?? '',
      });
    } catch (error: any) {
      console.error(error);
    }

    this._model.isUpdateGeneralInfoLoading = false;

    return true;
  }

  public async uploadAvatarAsync(index: number, blob: Blob): Promise<void> {
    this._model.isAvatarUploadLoading = true;

    try {
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
    } catch (error: any) {
      console.error(error);
    }

    this._model.isAvatarUploadLoading = false;
  }

  public async addAddressAsync(addressForm: AddressFormValues): Promise<void> {
    const customerResponse =
      await MedusaService.medusa?.customers.addresses.addAddress({
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
    this._model.customer = customerResponse?.customer as Customer;
    this._model.shippingForm = {};
  }

  public async deleteAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const customerResponse =
      await MedusaService.medusa?.customers.addresses.deleteAddress(id);
    this._model.customer = customerResponse?.customer as Customer;
    this._model.selectedAddress = undefined;
  }

  public async updateAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const customerResponse =
      await MedusaService.medusa?.customers.addresses.updateAddress(id, {
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
    this._model.customer = customerResponse?.customer as Customer;
    this._model.editShippingForm = {};
  }

  public async logoutAsync(): Promise<void> {
    try {
      await SupabaseService.signoutAsync();
    } catch (error: any) {
      console.error(error);
    }
  }

  public async deleteAsync(): Promise<void> {
    try {
      await AccountService.requestActiveDeleteAsync();
      AccountService.clearActiveAccount();
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateAccountLanguageAsync(
    code: string,
    info: LanguageInfo
  ): Promise<void> {
    if (this._model.account?.languageCode !== code) {
      this._model.account = await AccountService.requestUpdateActiveAsync({
        languageCode: code,
      });
      WindowController.updateLanguageInfo(code, info);
    }
  }

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse
  ): void {
    let productLikesMetadata = { ...this._model.productLikesMetadata };
    productLikesMetadata[id] = metadata;

    if (!metadata.didAccountLike) {
      delete productLikesMetadata[id];
    }

    this._model.productLikesMetadata = productLikesMetadata;
    this.requestLikedProductsAsync(0, this._limit);
  }

  public async requestFollowAsync(id: string): Promise<void> {
    if (!this._model.account) {
      return;
    }

    try {
      const follower = await AccountFollowersService.requestAddAsync({
        accountId: this._model.account.id,
        followerId: id,
      });
      if (follower) {
        const accountFollowers = { ...this._model.addFriendAccountFollowers };
        accountFollowers[follower.followerId] = follower;
        this._model.addFriendAccountFollowers = accountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async requestUnfollowAsync(id: string): Promise<void> {
    if (!this._model.account) {
      return;
    }

    try {
      const follower = await AccountFollowersService.requestRemoveAsync({
        accountId: this._model.account.id,
        followerId: id,
      });
      if (follower) {
        const accountFollowers = { ...this._model.addFriendAccountFollowers };
        accountFollowers[follower.followerId] = follower;
        this._model.addFriendAccountFollowers = accountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  private async getUsernameErrorsAsync(
    username: string,
    errors: ProfileFormErrors,
    strict: boolean = false
  ): Promise<ProfileFormErrors> {
    let errorsCopy = { ...errors };
    if (!username || username?.length <= 0) {
      errorsCopy.username = this._model.errorStrings?.empty;
      return errorsCopy;
    }

    if (username.indexOf(' ') !== -1) {
      errorsCopy.username = this._model.errorStrings?.spaces;
      return errorsCopy;
    }

    if (strict && this._model.account?.username !== username) {
      const exists = await this.requestDoesUsernameExistAsync(username);
      if (exists) {
        errorsCopy.username = this._model.errorStrings?.exists;
        return errorsCopy;
      }
    }

    return errorsCopy;
  }

  private async requestOrdersAsync(
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (this._model.areOrdersLoading || !this._model.customer) {
      return;
    }

    this._model.areOrdersLoading = true;

    try {
      const orders = await MedusaService.requestOrdersAsync(
        this._model.customer.id,
        {
          offset: offset,
          limit: limit,
        }
      );

      if (!orders || orders.length <= 0) {
        this._model.hasMoreOrders = false;
        this._model.areOrdersLoading = false;
        return;
      }

      if (orders.length < limit) {
        this._model.hasMoreOrders = false;
      } else {
        this._model.hasMoreOrders = true;
      }

      if (offset <= 0) {
        this._model.orders = [];
      }

      this._model.orders = this._model.orders.concat(orders);
    } catch (error: any) {
      console.error(error);
      this._model.hasMoreOrders = false;
      this._model.areOrdersLoading = false;
    }

    this._model.areOrdersLoading = false;
  }

  private async requestDoesUsernameExistAsync(
    username: string
  ): Promise<boolean> {
    if (!this._model.account) {
      return false;
    }

    const response = await AccountService.requestExistsAsync(username);
    return response.exists;
  }

  private async requestLikedProductsAsync(
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (this._model.areLikedProductsLoading || !this._model.account) {
      return;
    }

    this._model.areLikedProductsLoading = true;

    let productIds: string[] = [];
    try {
      const productLikesMetadataResponse =
        await ProductLikesService.requestAccountLikesMetadataAsync({
          accountId: this._model.account.id,
          offset: offset,
          limit: limit,
        });

      if (
        !productLikesMetadataResponse.metadata ||
        productLikesMetadataResponse.metadata.length <= 0
      ) {
        this._model.hasMoreLikes = false;
        this._model.areLikedProductsLoading = false;
        return;
      }

      if (productLikesMetadataResponse.metadata.length < limit) {
        this._model.hasMoreLikes = false;
      } else {
        this._model.hasMoreLikes = true;
      }

      const productLikesMetadata = { ...this._model.productLikesMetadata };
      for (const metadata of productLikesMetadataResponse.metadata) {
        productLikesMetadata[metadata.productId] = metadata;
      }
      this._model.productLikesMetadata = productLikesMetadata;

      productIds = productLikesMetadataResponse.metadata.map(
        (value) => value.productId
      );
    } catch (error: any) {
      console.error(error);
      this._model.areLikedProductsLoading = false;
      this._model.hasMoreLikes = false;
    }

    if (productIds.length <= 0) {
      this._model.areLikedProductsLoading = false;
      this._model.hasMoreLikes = false;
      this._model.productLikesMetadata = {};
      this._model.likedProducts = [];
      return;
    }

    try {
      const { selectedRegion, selectedSalesChannel } = StoreController.model;
      const { cart } = CartController.model;
      const productsResponse = await MedusaService.medusa?.products.list({
        id: productIds,
        sales_channel_id: [selectedSalesChannel?.id ?? ''],
        ...(selectedRegion && {
          region_id: selectedRegion.id,
          currency_code: selectedRegion.currency_code,
        }),
        ...(cart && { cart_id: cart.id }),
      });
      const products = productsResponse?.products ?? [];
      products.sort((a, b) => {
        const currentId = a['id'] ?? '';
        const nextId = b['id'] ?? '';

        if (productIds.indexOf(currentId) > productIds.indexOf(nextId)) {
          return 1;
        } else {
          return -1;
        }
      });
      for (let i = 0; i < products.length; i++) {
        for (const variant of products[i].variants) {
          const price = variant.prices?.find(
            (value) => value.region_id === selectedRegion?.id
          );
          if (!price) {
            products.splice(i, 1);
          }
        }
      }

      if (offset > 0) {
        this._model.likedProducts = this._model.likedProducts.concat(products);
      } else {
        this._model.likedProducts = products;
      }
    } catch (error: any) {
      console.error(error);
      this._model.areLikedProductsLoading = false;
      this._model.hasMoreLikes = false;
    }

    this._model.areLikedProductsLoading = false;
  }

  private async requestLikeCountAsync(accountId: string): Promise<void> {
    try {
      const response = await ProductLikesService.requestCountMetadataAsync(
        accountId
      );
      this._model.likeCount = response.likeCount;
    } catch (error: any) {
      console.error(error);
    }
  }

  private async requestFollowerCountMetadataAsync(
    accountId: string
  ): Promise<void> {
    try {
      const response = await AccountFollowersService.requestCountMetadataAsync(
        accountId
      );
      this._model.followerCount = response.followersCount;
      this._model.followingCount = response.followingCount;
    } catch (error: any) {
      console.error(error);
    }
  }

  private resetMedusaModel(): void {
    this._model.user = null;
    this._model.account = undefined;
    this._model.customer = undefined;
    this._model.customerGroup = undefined;
    this._model.isCustomerGroupLoading = false;
    this._model.profileForm = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
    this._model.profileFormErrors = {};
    this._model.errorStrings = {};
    this._model.profileUrl = undefined;
    this._model.username = '';
    this._model.orders = [];
    this._model.orderPagination = 1;
    this._model.hasMoreOrders = false;
    this._model.shippingForm = {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartments: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
      phoneNumber: '',
    };
    this._model.shippingFormErrors = {};
    this._model.addressErrorStrings = {};
    this._model.selectedAddress = undefined;
    this._model.editShippingForm = {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartments: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
      phoneNumber: '',
    };
    this._model.areOrdersLoading = false;
    this._model.editShippingFormErrors = {};
    this._model.activeTabId = RoutePathsType.AccountLikes;
    this._model.prevTabIndex = 0;
    this._model.activeTabIndex = 0;
    this._model.ordersScrollPosition = undefined;
    this._model.isCreateCustomerLoading = false;
    this._model.isUpdateGeneralInfoLoading = false;
    this._model.addFriendAccounts = [];
    this._model.addFriendsInput = '';
    this._model.addFriendsPagination = 1;
    this._model.addFriendsScrollPosition = undefined;
    this._model.addFriendAccountFollowers = {};
    this._model.followRequestAccounts = [];
    this._model.followRequestAccountFollowers = {};
    this._model.followRequestCustomers = {};
    this._model.likeCount = undefined;
    this._model.followerCount = undefined;
    this._model.followingCount = undefined;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._activeAccountSubscription?.unsubscribe();
    this._activeAccountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: this.onActiveAccountChangedAsync,
      });

    this._userSubscription?.unsubscribe();
    this._userSubscription = SupabaseService.userObservable.subscribe({
      next: this.onActiveUserChangedAsync,
    });

    SupabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChangedAsync
    );
  }

  private async onActiveAccountChangedAsync(
    value: core.AccountResponse | null
  ): Promise<void> {
    if (
      !value ||
      JSON.stringify(this._model.account) === JSON.stringify(value)
    ) {
      return;
    }

    try {
      this._model.customer = await MedusaService.requestCustomerAccountAsync(
        value.supabaseId ?? ''
      );

      this._selectedInventoryLocationIdSubscription?.unsubscribe();
      this._selectedInventoryLocationIdSubscription =
        HomeController.model?.localStore
          ?.pipe(
            select((model: HomeLocalState) => model.selectedInventoryLocationId)
          )
          .subscribe({
            next: this.onSelectedInventoryLocationIdChangedAsync,
          });
    } catch (error: any) {
      console.error(error);
    }

    this.requestFollowerCountMetadataAsync(value.id);
    this.requestLikeCountAsync(value.id);

    if (
      value?.languageCode &&
      value?.languageCode !== WindowController.model.languageCode
    ) {
      WindowController.updateLanguageCode(value.languageCode);
    }

    this._s3Subscription?.unsubscribe();
    this._s3Subscription = BucketService.s3Observable.subscribe(async (s3) => {
      if (!s3) {
        return;
      }

      if (value?.profileUrl && value.profileUrl.length > 0) {
        try {
          this._model.profileUrl = await BucketService.getPublicUrlAsync(
            core.StorageFolderType.Avatars,
            value.profileUrl
          );
        } catch (error: any) {
          console.error(error);
        }
      }
    });

    this._model.profileForm = {
      firstName: this._model.customer?.first_name,
      lastName: this._model.customer?.last_name,
      phoneNumber: this._model.customer?.phone,
      username: value?.username,
    };

    const errors = await this.getProfileFormErrorsAsync(
      this._model.profileForm
    );
    if (errors && this._model.account?.status === 'Complete') {
      try {
        this._model.account = await AccountService.requestUpdateActiveAsync({
          status: 'Incomplete',
        });
      } catch (error: any) {
        console.error(error);
      }
    } else {
      this._model.account = value;
    }
  }

  private async onActiveUserChangedAsync(value: User | null): Promise<void> {
    if (!value || JSON.stringify(this._model.user) === JSON.stringify(value)) {
      return;
    }

    this._model.user = value;
  }

  private async onSelectedInventoryLocationIdChangedAsync(
    id: string | undefined
  ): Promise<void> {
    if (
      !MedusaService.accessToken ||
      !id ||
      this._model.isCreateCustomerLoading
    ) {
      return;
    }

    if (
      this._model.customerGroup &&
      this._model.customerGroup.metadata['sales_location_id'] === id
    ) {
      return;
    }

    try {
      this._model.isCustomerGroupLoading = true;
      this._model.customerGroup = await MedusaService.requestCustomerGroupAsync(
        id
      );
      this._model.customerGroup =
        await MedusaService.requestAddCustomerToGroupAsync({
          customerGroupId: this._model.customerGroup?.id ?? '',
          customerId: this._model.customer?.id ?? '',
        });
      this._model.isCreateCustomerLoading = false;
    } catch (error: any) {
      console.error(error);
    }
  }

  private async onAuthStateChangedAsync(
    event: AuthChangeEvent,
    session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_OUT') {
      await MedusaService.deleteSessionAsync();
    }
  }
}

export default new AccountController();
