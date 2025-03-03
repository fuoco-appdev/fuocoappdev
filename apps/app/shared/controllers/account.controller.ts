/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpTypes } from '@medusajs/types';
import { Session, UserResponse } from '@supabase/supabase-js';
import mime from 'mime';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import OpenWebuiService from 'shared/services/open-webui.service';
import { v4 as uuidv4 } from 'uuid';
import {
  AddressFormErrors,
  AddressFormValues,
  CollectionFormErrors,
  CollectionFormErrorStrings,
  CollectionFormValues,
  ProfileFormErrors,
  ProfileFormValues,
} from '../../shared/models/account.model';
import { Controller } from '../controller';
import {
  AccountDocument,
  AccountModel,
  ProfileFormErrorStrings,
} from '../models/account.model';
import { AccountResponse } from '../protobuf/account_pb';
import { CollectionResponse } from '../protobuf/collection_pb';
import { StorageFolderType } from '../protobuf/common_pb';
import { InterestResponse } from '../protobuf/interest_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { RoutePathsType } from '../route-paths-type';
import AccountFollowersService from '../services/account-followers.service';
import AccountService from '../services/account.service';
import BucketService from '../services/bucket.service';
import CryptoService from '../services/crypto.service';
import InterestService from '../services/interest.service';
import MedusaService from '../services/medusa.service';
import ProductLikesService from '../services/product-likes.service';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class AccountController extends Controller {
  private readonly _model: AccountModel;
  private readonly _limit: number;
  private _usernameTimerId: NodeJS.Timeout | number | undefined;
  private _addFriendsTimerId: NodeJS.Timeout | number | undefined;
  private _addFriendsGeocodingTimerId: NodeJS.Timeout | number | undefined;
  private _addInterestTimerId: NodeJS.Timeout | number | undefined;
  private _activeAccountDisposer: Lambda | undefined;
  private _collectionsDisposer: Lambda | undefined;
  private _sessionDisposer: Lambda | undefined;
  private _selectedInventoryLocationIdDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;
  private _accountDisposer: Lambda | undefined;
  private _loadedAccountDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      MedusaService: MedusaService;
      AccountService: AccountService;
      SupabaseService: SupabaseService;
      AccountFollowersService: AccountFollowersService;
      InterestService: InterestService;
      ProductLikesService: ProductLikesService;
      BucketService: BucketService;
      OpenWebuiService: OpenWebuiService;
      CryptoService: CryptoService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new AccountModel(this._storeOptions);
    this._limit = 10;

    this.uploadAvatarAsync = this.uploadAvatarAsync.bind(this);
    this.onSessionChangedAsync = this.onSessionChangedAsync.bind(this);
    this.onSelectedInventoryLocationIdChangedAsync =
      this.onSelectedInventoryLocationIdChangedAsync.bind(this);
    this.onActiveAccountChangedAsync =
      this.onActiveAccountChangedAsync.bind(this);
    this.onCollectionsChangedAsync = this.onCollectionsChangedAsync.bind(this);
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    const accountService = this._container.get('AccountService');
    this._accountDisposer = observe(
      accountService,
      'activeAccount',
      this.onActiveAccountChangedAsync
    );

    this._collectionsDisposer = observe(
      this._model,
      'collections',
      this.onCollectionsChangedAsync
    );
  }

  public override async load(_renderCount: number): Promise<void> {}

  public override disposeInitialization(_renderCount: number): void {
    clearTimeout(this._addInterestTimerId as number | undefined);
    clearTimeout(this._addFriendsGeocodingTimerId as number | undefined);
    clearTimeout(this._addFriendsTimerId as number | undefined);
    clearTimeout(this._usernameTimerId as number | undefined);
    this._loadedAccountDisposer?.();
    this._accountDisposer?.();
    this._medusaAccessTokenDisposer?.();
    this._selectedInventoryLocationIdDisposer?.();
    this._collectionsDisposer?.();
    this._activeAccountDisposer?.();
    this._sessionDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public reloadLikedProducts(): void {
    this.requestLikedProductsAsync('reloading');
  }

  public loadLikedProducts(): void {
    this.requestLikedProductsAsync('loading');
  }

  public reloadOrders(): void {
    this.requestOrdersAsync('reloading');
  }

  public loadOrders(): void {
    this.requestOrdersAsync('loading');
  }

  public async onNextOrderScrollAsync(): Promise<void> {
    if (this._model.areOrdersLoading) {
      return;
    }

    this._model.orderPagination = this._model.orderPagination + 1;

    const offset = this._limit * (this._model.orderPagination - 1);
    await this.requestOrdersAsync('loading', offset, this._limit);
  }

  public async onNextLikedProductScrollAsync(): Promise<void> {
    if (this._model.areLikedProductsLoading) {
      return;
    }

    this._model.likedProductPagination = this._model.likedProductPagination + 1;
    const offset = this._limit * (this._model.likedProductPagination - 1);
    await this.requestLikedProductsAsync('loading', offset, this._limit);
  }

  public updateProfile(value: ProfileFormValues): void {
    this._model.updateProfileForm({ ...this._model.profileForm, ...value });
  }

  public updateProfileFormErrors(value: ProfileFormErrors): void {
    this._model.updateProfileFormErrors(value);
  }

  public updateCollectionFormErrors(value: CollectionFormErrors): void {
    this._model.updateCollectionFormErrors(value);
  }

  public updateProfileFormErrorStrings(value: ProfileFormErrorStrings): void {
    this._model.updateProfileFormErrorStrings(value);
  }

  public updateCollectionFormErrorStrings(
    value: CollectionFormErrorStrings
  ): void {
    this._model.updateCollectionFormErrorStrings(value);
  }

  public updateShippingAddress(value: AddressFormValues): void {
    this._model.updateShippingForm({ ...this._model.shippingForm, ...value });
  }

  public updateShippingAddressErrors(value: AddressFormErrors): void {
    this._model.updateShippingFormErrors(value);
  }

  public updateAddressErrorStrings(value: AddressFormErrors): void {
    this._model.updateAddressErrorStrings(value);
  }

  public updateSelectedAddress(
    value: HttpTypes.AdminCustomerAddress | undefined
  ): void {
    this._model.updateSelectedAddress(value);
  }

  public updateEditShippingAddress(value: AddressFormValues): void {
    this._model.updateEditShippingForm({
      ...this._model.editShippingForm,
      ...value,
    });
  }

  public updateEditShippingAddressErrors(value: AddressFormErrors): void {
    this._model.updateEditShippingFormErrors(value);
  }

  public updateActiveTabId(value: string): void {
    this._model.updatePrevTabIndex(this._model.activeTabIndex);

    switch (value) {
      case RoutePathsType.AccountLikes:
        this._model.updateActiveTabIndex(1);
        this._model.updateActiveTabId(value);
        break;
      case RoutePathsType.AccountOrderHistory:
        this._model.updateActiveTabIndex(2);
        this._model.updateActiveTabId(value);
        break;
      case RoutePathsType.AccountAddresses:
        this._model.updateActiveTabIndex(3);
        this._model.updateActiveTabId(value);
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

  public updateSelectedLikedProduct(
    value: HttpTypes.StoreProduct | undefined
  ): void {
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

  public updateAddFriendsScrollPosition(value: number | undefined): void {
    this._model.addFriendsScrollPosition = value;
  }

  public updateAddInterestInput(value: string): void {
    this._model.addInterestInput = value;

    clearTimeout(this._addInterestTimerId as number | undefined);
    this._addInterestTimerId = setTimeout(() => {
      this.addInterestsSearchAsync(value, 0, 50);
    }, 750);
  }

  public incrementLikeCount(): void {
    this._model.likeCount = (this._model.likeCount ?? 0) + 1;
  }

  public decrementLikeCount(): void {
    this._model.likeCount = (this._model.likeCount ?? 0) - 1;
  }

  public async confirmFollowRequestAsync(
    accountId: string,
    followerId: string
  ): Promise<void> {
    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    try {
      const followerRequestResponse =
        await accountFollowersService.requestConfirmAsync({
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
    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    try {
      const follower = await accountFollowersService.requestRemoveAsync({
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
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (!force && this._model.areFollowRequestAccountsLoading) {
      return;
    }

    let followRequestAccounts: AccountDocument[] = [];
    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    try {
      const requestedFollowersResponse =
        await accountFollowersService.requestFollowerRequestsAsync({
          accountId: accountId,
          limit: limit,
          offset: offset,
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

    const accountService = this._container.get('AccountService');
    try {
      const accountIds = Object.values(
        this._model.followRequestAccountFollowers
      ).map((value) => value.accountId);
      const accountsResponse = await accountService.requestAccountsAsync(
        accountIds
      );
      if (!accountsResponse.accounts || accountsResponse.accounts.length <= 0) {
        this._model.areFollowRequestAccountsLoading = false;
        return;
      }
      const documents = accountsResponse.accounts.map(
        (protobuf) =>
          ({
            id: protobuf.id,
            customer_id: protobuf.customerId,
            supabase_id: protobuf.supabaseId,
            profile_url: protobuf.profileUrl,
            status: protobuf.status,
            updated_at: protobuf.updateAt,
            username: protobuf.username,
            birthday: protobuf.birthday,
            metadata: protobuf.metadata,
          } as AccountDocument)
      );
      if (offset > 0) {
        followRequestAccounts = followRequestAccounts.concat(documents);
      } else {
        followRequestAccounts = documents;
      }
    } catch (error: any) {
      console.error(error);
    }

    const medusaService = this._container.get('MedusaService');
    try {
      const customerIds: string[] = followRequestAccounts.map(
        (value) => value.customer_id ?? ''
      );
      const customersResponse = await medusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      for (let i = 0; i < followRequestAccounts.length; i++) {
        const customerId = followRequestAccounts[i].customer_id;
        const customer = customersResponse?.find(
          (value) => value.id === customerId
        );
        followRequestAccounts[i].customer = {
          email: customer?.email,
          first_name: customer?.firstName,
          last_name: customer?.lastName,
          billing_address_id: customer?.billingAddressId,
          phone: customer?.phone,
          has_account: customer?.hasAccount,
          metadata: customer?.metadata,
        } as Partial<HttpTypes.StoreCustomer>;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.followRequestAccounts = followRequestAccounts;
    this._model.areFollowRequestAccountsLoading = false;
  }

  public updateSelectedInterest(interest: InterestResponse): void {
    const selectedInterests = this._model.selectedInterests;
    if (Object.keys(selectedInterests).includes(interest.id)) {
      delete selectedInterests[interest.id];
    } else {
      selectedInterests[interest.id] = interest;
    }

    this._model.selectedInterests = selectedInterests;

    const searchedInterests = this._model.searchedInterests;
    this._model.searchedInterests = [];
    this._model.searchedInterests = searchedInterests;
  }

  public async addInterestsCreateAsync(name: string): Promise<void> {
    if (name.length <= 0) {
      return;
    }

    const interestService = this._container.get('InterestService');
    const formattedQuery = name.toLowerCase();
    try {
      const interestResponse = await interestService.requestCreateAsync(
        formattedQuery
      );
      this._model.searchedInterests = this._model.searchedInterests.concat([
        interestResponse,
      ]);

      this.updateSelectedInterest(interestResponse);
      this._model.creatableInterest = undefined;
    } catch (error: any) {
      console.error(error);
    }
  }

  public async addInterestsSearchAsync(
    query: string,
    offset = 0,
    limit = 50,
    force = false
  ): Promise<void> {
    if (!force && this._model.areAddInterestsLoading) {
      return;
    }

    this._model.areAddInterestsLoading = true;

    const formattedQuery = query.toLowerCase();
    const interestService = this._container.get('InterestService');
    try {
      const interestsResponse = await interestService.requestSearchAsync({
        query: formattedQuery,
        offset: offset,
        limit: limit,
      });

      this._model.searchedInterests = interestsResponse.interests;

      const existingInterest = this._model.searchedInterests.find(
        (value) => value.name === formattedQuery
      );
      if (!existingInterest) {
        this._model.creatableInterest = query;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areAddInterestsLoading = false;
  }

  public checkIfUsernameExists(value: string): void {
    clearTimeout(this._usernameTimerId as number | undefined);
    this._usernameTimerId = setTimeout(async () => {
      try {
        this._model.profileFormErrors = await this.getUsernameErrorsAsync(
          value,
          this._model.profileFormErrors,
          true
        );
      } catch (error: any) {
        console.error(error);
      }
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
    strict = false,
    include: string[] = [
      'firstName',
      'lastName',
      'username',
      'birthday',
      'sex',
      'phoneNumber',
    ]
  ): Promise<ProfileFormErrors | undefined> {
    let errors: ProfileFormErrors = {};

    if (include.includes('username')) {
      errors = await this.getUsernameErrorsAsync(
        form.username ?? '',
        errors,
        strict
      );
    }

    if (
      include.includes('firstName') &&
      (!form.firstName || form.firstName?.length <= 0)
    ) {
      errors.firstName = this._model.profileFormErrorStrings.empty;
    }

    if (
      include.includes('lastName') &&
      (!form.lastName || form.lastName?.length <= 0)
    ) {
      errors.lastName = this._model.profileFormErrorStrings.empty;
    }

    if (include.includes('birthday') && !form.birthday) {
      errors.birthday = this._model.profileFormErrorStrings.empty;
    }

    if (
      include.includes('phoneNumber') &&
      (!form.phoneNumber || form.phoneNumber?.length <= 0)
    ) {
      errors.phoneNumber = this._model.profileFormErrorStrings.empty;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  }

  public async getCollectionFormErrorsAsync(
    form: CollectionFormValues
  ): Promise<CollectionFormErrors | undefined> {
    const errors: CollectionFormErrors = {};

    if (!form.name || form.name?.length <= 0) {
      errors.name = this._model.collectionFormErrorStrings.empty;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  }

  public async completeProfileAsync(
    onError?: (error: any) => void
  ): Promise<void> {
    const errors = await this.getProfileFormErrorsAsync(
      this._model.profileForm,
      true
    );
    if (errors) {
      this._model.updateProfileFormErrors(errors);
      console.error(new Error('Profile form has some errors.'));
      return;
    }

    const supabaseService = this._container.get('SupabaseService');
    const userResponse = await supabaseService.supabaseClient?.auth.getUser();
    if (!userResponse?.data.user) {
      console.error(new Error('No supabase user'));
      return;
    }

    const medusaService = this._container.get('MedusaService');
    try {
      this._model.updateIsCreateCustomerLoading(true);
      const customer = await medusaService.requestUpdateAdminCustomerAsync({
        email: userResponse.data.user?.email,
        first_name: this._model.profileForm.firstName ?? '',
        last_name: this._model.profileForm.lastName ?? '',
        phone: this._model.profileForm.phoneNumber,
      });
      if (!customer) {
        return;
      }

      this._model.updateCustomer(customer);

      if (!this._model.customer) {
        this._model.updateIsCreateCustomerLoading(false);
        throw new Error('No customer created');
      }

      this._model.updateIsCreateCustomerLoading(false);
    } catch (error: any) {
      this._model.updateIsCreateCustomerLoading(false);
      console.error(error);
      onError?.(error);
      return;
    }

    let account = this._model.account;
    const metadata = account?.metadata ? JSON.parse(account.metadata) : {};
    if (!metadata['open_webui']) {
      const openWebuiUserData = await this.createOpenWebuiUser(
        userResponse,
        onError
      );
      if (!openWebuiUserData) {
        console.warn("Couldn't create open web ui user");
        return;
      }

      metadata['open_webui'] = openWebuiUserData;
    }

    try {
      const accountService = this._container.get('AccountService');
      account = await accountService.requestUpdateActiveAsync({
        customerId: this._model.customer?.id,
        status: 'Complete',
        username: this._model.profileForm.username ?? '',
        birthday: this._model.profileForm.birthday,
        metadata: JSON.stringify(metadata),
      });
      this._model.updateAccount(account);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateGeneralInfoAsync(
    form: ProfileFormValues
  ): Promise<boolean> {
    if (!this._model.customer || !this._model.account) {
      return false;
    }

    this._model.updateIsUpdateGeneralInfoLoading(true);
    const errors = await this.getProfileFormErrorsAsync(form, true);
    if (errors) {
      this.updateProfileFormErrors(errors);
      this._model.updateIsUpdateGeneralInfoLoading(false);
      return false;
    }

    const medusaService = this._container.get('MedusaService');
    try {
      const customer = await medusaService.requestUpdateAdminCustomerAsync({
        first_name: form.firstName ?? '',
        last_name: form.lastName ?? '',
        phone: form.phoneNumber,
      });
      this._model.customer = customer;

      const accountService = this._container.get('AccountService');
      this._model.account = await accountService.requestUpdateActiveAsync({
        username: this._model.profileForm.username ?? '',
        birthday: this._model.profileForm.birthday,
      });
    } catch (error: any) {
      console.error(error);
    }

    this._model.updateIsUpdateGeneralInfoLoading(false);

    return true;
  }

  public async updatePersonalInfoAsync(
    form: ProfileFormValues
  ): Promise<boolean> {
    if (!this._model.customer || !this._model.account) {
      return false;
    }

    this._model.isUpdatePersonalInfoLoading = true;
    const errors = await this.getProfileFormErrorsAsync(form, true, [
      'birthday',
      'phoneNumber',
    ]);
    if (errors) {
      this.updateProfileFormErrors(errors);
      this._model.isUpdatePersonalInfoLoading = false;
      return false;
    }

    const medusaService = this._container.get('MedusaService');
    try {
      const customer = await medusaService.requestUpdateAdminCustomerAsync({
        phone: form.phoneNumber,
      });
      this._model.customer = customer;

      const accountService = this._container.get('AccountService');
      this._model.account = await accountService.requestUpdateActiveAsync({
        birthday: this._model.profileForm.birthday,
      });
    } catch (error: any) {
      console.error(error);
    }

    this._model.isUpdatePersonalInfoLoading = false;

    return true;
  }

  public async uploadAvatarAsync(_index: number, blob: Blob): Promise<void> {
    this._model.isAvatarUploadLoading = true;

    const bucketService = this._container.get('BucketService');
    const accountService = this._container.get('AccountService');
    try {
      const extension = mime.getExtension(blob.type);
      const newFile = `public/${uuidv4()}.${extension}`;
      if (this._model.account?.profileUrl) {
        await bucketService.removeAsync(
          StorageFolderType.Avatars,
          this._model.account?.profileUrl
        );
      }
      await bucketService.uploadPublicAsync(
        StorageFolderType.Avatars,
        newFile,
        blob
      );
      this._model.account = await accountService.requestUpdateActiveAsync({
        profileUrl: newFile,
      });
    } catch (error: any) {
      console.error(error);
    }

    this._model.isAvatarUploadLoading = false;
  }

  public async addAddressAsync(addressForm: AddressFormValues): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const customer = await medusaService.requestAdminCustomerCreateAddressAsync(
      {
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
      }
    );
    this._model.customer = customer;
    this._model.shippingForm = {};
  }

  public async deleteAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const medusaService = this._container.get('MedusaService');
    const supabaseService = this._container.get('SupabaseService');
    await medusaService.requestStoreCustomerRemoveAddress(id);
    const session = await supabaseService.requestSessionAsync();
    const customer = await medusaService.requestAdminCustomerAsync(
      session?.user.id ?? ''
    );
    this._model.updateCustomer(customer);
    this._model.updateSelectedAddress(undefined);
  }

  public async updateAddressAsync(id: string | undefined): Promise<void> {
    if (!id) {
      return;
    }

    const medusaService = this._container.get('MedusaService');
    const customer = await medusaService.requestAdminCustomerUpdateAddress(id, {
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
    this._model.updateCustomer(customer);
    this._model.updateEditShippingForm({});
  }

  public async logoutAsync(): Promise<void> {
    const supabaseService = this._container.get('SupabaseService');
    try {
      await supabaseService.signoutAsync();
    } catch (error: any) {
      console.error(error);
    }
  }

  public async deleteAsync(): Promise<void> {
    const accountService = this._container.get('AccountService');
    try {
      await accountService.requestActiveDeleteAsync();
      accountService.clearActiveAccount();
    } catch (error: any) {
      console.error(error);
    }
  }

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse
  ): void {
    const productLikesMetadata = { ...this._model.productLikesMetadata };
    productLikesMetadata[id] = metadata;

    if (!metadata.didAccountLike) {
      delete productLikesMetadata[id];
    }

    this._model.productLikesMetadata = productLikesMetadata;
    this.requestLikedProductsAsync('loading', 0, this._limit);
  }

  public async requestFollowAsync(id: string): Promise<void> {
    if (!this._model.account) {
      return;
    }

    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    try {
      const follower = await accountFollowersService.requestAddAsync({
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

    const accountFollowersService = this._container.get(
      'AccountFollowersService'
    );
    try {
      const follower = await accountFollowersService.requestRemoveAsync({
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

  public async updateGeolocation(coords: {
    latitude: number;
    longitude: number;
  }): Promise<void> {
    const accountService = this._container.get('AccountService');
    await when(() => this._model.account !== undefined);
    const account = this._model.account;
    const metadata = account?.metadata ? JSON.parse(account.metadata) : {};
    metadata['geo'] = {
      lat: coords.latitude,
      lng: coords.longitude,
    };
    await accountService.requestUpdateActiveAsync({
      metadata: JSON.stringify(metadata),
    });
  }

  public async onSessionChangedAsync(
    value: IValueDidChange<Session | null>
  ): Promise<void> {}

  public async handleSessionChangedAsync(
    session: Session | null
  ): Promise<void> {
    if (
      !session ||
      JSON.stringify(this._model.user) === JSON.stringify(session)
    ) {
      return;
    }

    this._model.updateUser(session.user);
  }

  private async createOpenWebuiUser(
    supabaseUser: UserResponse,
    onError?: (error: any) => void
  ): Promise<{ id: string; encrypted_password: string } | undefined> {
    const openWebuiService = this._container.get('OpenWebuiService');
    const cryptoService = this._container.get('CryptoService');
    try {
      const generatedPassword = uuidv4();
      const encryptedPassword = await cryptoService.encryptAsync(
        generatedPassword
      );
      const openWebuiUser = await openWebuiService.requestAddUserAsync(
        `${this._model.profileForm.firstName} ${this._model.profileForm.lastName}`,
        supabaseUser.data.user?.email ?? '',
        generatedPassword
      );
      this._model.updateOpenWebuiUser(openWebuiUser);
      return {
        id: openWebuiUser.id ?? '',
        encrypted_password: encryptedPassword,
      };
    } catch (error: any) {
      console.error(error);
      onError?.(error);
      return undefined;
    }
  }

  private async getUsernameErrorsAsync(
    username: string,
    errors: ProfileFormErrors,
    strict = false
  ): Promise<ProfileFormErrors> {
    const errorsCopy = { ...errors };
    if (!username || username?.length <= 0) {
      errorsCopy.username = this._model.profileFormErrorStrings?.empty;
      return errorsCopy;
    }

    if (username.indexOf(' ') !== -1) {
      errorsCopy.username = this._model.profileFormErrorStrings?.spaces;
      return errorsCopy;
    }

    if (strict && this._model.account?.username !== username) {
      const exists = await this.requestDoesUsernameExistAsync(username);
      if (exists) {
        errorsCopy.username = this._model.profileFormErrorStrings?.exists;
        return errorsCopy;
      }
    }

    return errorsCopy;
  }

  private async onActiveAccountChangedAsync(
    value: IValueDidChange<AccountResponse | null>
  ): Promise<void> {
    const account = value.newValue;
    if (!account) {
      return;
    }

    this._model.updateAccount(account);

    const medusaService = this._container.get('MedusaService');
    const bucketService = this._container.get('BucketService');
    const openWebuiService = this._container.get('OpenWebuiService');
    const cryptoService = this._container.get('CryptoService');
    const supabaseService = this._container.get('SupabaseService');
    try {
      const customer = await medusaService.requestAdminCustomerAsync(
        account.supabaseId ?? ''
      );
      this._model.updateCustomer(customer);
    } catch (error: any) {
      console.warn(error);
    }

    const metadata = account?.metadata ? JSON.parse(account.metadata) : {};
    const openWebuiData = metadata['open_webui'];
    if (!this._model.openWebuiUser && openWebuiData) {
      const ecryptedPassword = openWebuiData['encrypted_password'];
      const password = await cryptoService.decryptAsync(ecryptedPassword);
      try {
        const openWebuiUser = await openWebuiService.requestSigninAsync(
          supabaseService.user?.email ?? '',
          password
        );
        this._model.updateOpenWebuiUser(openWebuiUser);
      } catch (error: any) {
        console.error(error);
      }
    }

    const s3 = bucketService.s3;
    if (s3) {
      if (account?.profileUrl && account.profileUrl.length > 0) {
        try {
          const publicUrl = await bucketService.getPublicUrlAsync(
            StorageFolderType.Avatars,
            account.profileUrl
          );
          this._model.updateProfileUrl(publicUrl);
        } catch (error: any) {
          console.error(error);
        }
      }
    }

    this._model.updateProfileForm({
      firstName: this._model.customer?.first_name ?? undefined,
      lastName: this._model.customer?.last_name ?? undefined,
      phoneNumber: this._model.customer?.phone ?? undefined,
      username: account?.username,
      birthday:
        account?.birthday && account.birthday.length > 0
          ? account?.birthday
          : undefined,
    });

    const errors = await this.getProfileFormErrorsAsync(
      this._model.profileForm,
      false,
      ['firstName', 'lastName', 'username', 'birthday', 'phoneNumber']
    );

    const accountService = this._container.get('AccountService');
    if (errors && this._model.account?.status === 'Complete') {
      try {
        const account = await accountService.requestUpdateActiveAsync({
          status: 'Incomplete',
        });
        this._model.updateAccount(account);
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async onCollectionsChangedAsync(
    value: IValueDidChange<Record<string, CollectionResponse>>
  ): Promise<void> {
    console.log(value);
  }

  private async requestOrdersAsync(
    loadType: 'loading' | 'reloading',
    offset = 0,
    limit = 10
  ): Promise<void> {
    if (this._model.areOrdersLoading || this._model.areOrdersReloading) {
      return;
    }

    if (loadType === 'loading') {
      this._model.areOrdersLoading = true;
    } else if (loadType === 'reloading') {
      this._model.areOrdersReloading = true;
    }

    await when(() => this._model.customer !== undefined);
    const customer = this._model.customer;
    if (!customer) {
      return;
    }
    const medusaService = this._container.get('MedusaService');
    try {
      const orders = await medusaService.requestOrdersAsync(customer.id, {
        offset: offset,
        limit: limit,
      });

      if (!orders || orders.length <= 0) {
        this._model.hasMoreOrders = false;
        this._model.areOrdersReloading = false;
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
      this._model.areOrdersReloading = false;
      this._model.areOrdersLoading = false;
    }

    if (loadType === 'loading') {
      this._model.areOrdersLoading = false;
    } else if (loadType === 'reloading') {
      this._model.areOrdersReloading = false;
    }
  }

  private async requestDoesUsernameExistAsync(
    username: string
  ): Promise<boolean> {
    if (!this._model.account) {
      return false;
    }

    const accountService = this._container.get('AccountService');
    const response = await accountService.requestExistsAsync(username);
    return response.exists;
  }

  private async requestLikedProductsAsync(
    loadType: 'loading' | 'reloading',
    offset = 0,
    limit = 10
  ): Promise<void> {
    if (
      this._model.areLikedProductsLoading ||
      this._model.areLikedProductsReloading
    ) {
      return;
    }

    if (loadType === 'loading') {
      this._model.areLikedProductsLoading = true;
    } else if (loadType === 'reloading') {
      this._model.areLikedProductsReloading = true;
    }

    await when(() => this._model.account !== undefined);
    const account = this._model.account;
    if (!account) {
      return;
    }

    let productIds: string[] = [];
    const productLikesService = this._container.get('ProductLikesService');
    try {
      const productLikesMetadataResponse =
        await productLikesService.requestAccountLikesMetadataAsync({
          accountId: account.id,
          offset: offset,
          limit: limit,
        });

      if (
        !productLikesMetadataResponse.metadata ||
        productLikesMetadataResponse.metadata.length <= 0
      ) {
        this._model.hasMoreLikes = false;
        this._model.areLikedProductsLoading = false;
        this._model.areLikedProductsReloading = false;
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
      this._model.areLikedProductsReloading = false;
      this._model.hasMoreLikes = false;
    }

    if (productIds.length <= 0) {
      this._model.areLikedProductsLoading = false;
      this._model.areLikedProductsReloading = false;
      this._model.hasMoreLikes = false;
      this._model.productLikesMetadata = {};
      this._model.likedProducts = [];
      return;
    }

    const medusaService = this._container.get('MedusaService');
    try {
      const products = await medusaService.requestStoreProductsAsync(
        productIds
      );
      if (offset > 0) {
        this._model.likedProducts = this._model.likedProducts.concat(products);
      } else {
        this._model.likedProducts = products;
      }
    } catch (error: any) {
      console.error(error);
      this._model.areLikedProductsLoading = false;
      this._model.areLikedProductsReloading = false;
      this._model.hasMoreLikes = false;
    }

    if (loadType === 'loading') {
      this._model.areLikedProductsLoading = false;
    } else if (loadType === 'reloading') {
      this._model.areLikedProductsReloading = false;
    }
  }

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private async onSelectedInventoryLocationIdChangedAsync(
    value: IValueDidChange<string | undefined>
  ): Promise<void> {
    const id = value.newValue;
    const medusaService = this._container.get('MedusaService');
    if (
      !medusaService.accessToken ||
      !id ||
      this._model.isCreateCustomerLoading
    ) {
      return;
    }

    if (
      this._model.customerGroup &&
      this._model.customerGroup.metadata?.['sales_location_id'] === id
    ) {
      return;
    }

    try {
      this._model.isCustomerGroupLoading = true;
      this._model.customerGroup = await medusaService.requestCustomerGroupAsync(
        id
      );
      this._model.customerGroup =
        await medusaService.requestAddCustomerToGroupAsync({
          customerGroupId: this._model.customerGroup?.id ?? '',
          customerId: this._model.customer?.id ?? '',
        });
      this._model.isCreateCustomerLoading = false;
    } catch (error: any) {
      console.error(error);
    }
  }
}
