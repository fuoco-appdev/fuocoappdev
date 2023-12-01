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

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private readonly _limit: number;
  private _activeAccountSubscription: Subscription | undefined;
  private _userSubscription: Subscription | undefined;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

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
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
    this._activeAccountSubscription?.unsubscribe();
    this._userSubscription?.unsubscribe();
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
      case RoutePathsType.AccountLikes:
        this._model.activeTabIndex = 1;
        break;
      case RoutePathsType.AccountOrderHistory:
        this._model.activeTabIndex = 2;
        break;
      case RoutePathsType.AccountAddresses:
        this._model.activeTabIndex = 3;
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
      });
      this._model.isCreateCustomerLoading = false;
    } catch (error: any) {
      this._model.isCreateCustomerLoading = false;
      console.error(error);
    }
  }

  public async updateCustomerAsync(form: ProfileFormValues): Promise<void> {
    if (!this._model.customer) {
      return;
    }

    try {
      const customerResponse = await MedusaService.medusa?.customers.update({
        first_name: form.firstName ?? '',
        last_name: form.lastName ?? '',
        phone: form.phoneNumber,
      });
      this._model.customer = customerResponse?.customer as Customer;
    } catch (error: any) {
      console.error(error);
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
      SupabaseService.clear();
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
    const metadataIndex = this._model.productLikesMetadata.findIndex(
      (value) => value.productId === id
    );
    let productLikesMetadata = [...this._model.productLikesMetadata];
    if (!metadata.didAccountLike) {
      productLikesMetadata.splice(metadataIndex, 1);
    }

    this._model.productLikesMetadata = productLikesMetadata;
    this.requestLikedProductsAsync(0, this._limit);
  }

  private async requestOrdersAsync(
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (this._model.areOrdersLoading || !this._model.customer) {
      return;
    }

    this._model.areOrdersLoading = true;

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
    this._model.areOrdersLoading = false;
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

      if (offset > 0) {
        const productLikesMetadata = this._model.productLikesMetadata;
        this._model.productLikesMetadata = productLikesMetadata.concat(
          productLikesMetadataResponse.metadata
        );
      } else {
        this._model.productLikesMetadata =
          productLikesMetadataResponse.metadata;
      }

      productIds = productLikesMetadataResponse.metadata.map(
        (value) => value.productId
      );
    } catch (error: any) {
      console.error(error);
    }

    if (productIds.length <= 0) {
      this._model.areLikedProductsLoading = false;
      this._model.hasMoreLikes = false;
      this._model.productLikesMetadata = [];
      this._model.likedProducts = [];
      return;
    }

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

    this._model.areLikedProductsLoading = false;
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
    value: core.Account | null
  ): Promise<void> {
    if (!value) {
      return;
    }

    this._model.account = value;
    if (
      value?.languageCode &&
      value?.languageCode !== WindowController.model.languageCode
    ) {
      WindowController.updateLanguageCode(value.languageCode);
    }
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
      this._model.customer = await MedusaService.requestCustomerAccountAsync(
        value?.id ?? ''
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

      this._model.profileForm = {
        firstName: this._model.customer?.first_name,
        lastName: this._model.customer?.last_name,
        phoneNumber: this._model.customer?.phone,
      };

      await this.requestLikedProductsAsync();
      await this.requestOrdersAsync();

      this._model.user = value;
    } catch (error: any) {
      console.error(error);
    }
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
