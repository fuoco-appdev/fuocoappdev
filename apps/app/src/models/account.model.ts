import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';
import { Customer, Order, Address, CustomerGroup } from '@medusajs/medusa';
import {
  ProfileFormErrors,
  ProfileFormValues,
} from '../components/account-profile-form.component';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { RoutePathsType } from '../route-paths';
import { User } from '@supabase/supabase-js';
import { ProductLikesMetadataResponse } from '../protobuf/core_pb';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

export interface AccountState {
  user: User | null;
  account: core.Account | undefined;
  customer: Customer | undefined;
  customerGroup: CustomerGroup | undefined;
  isCustomerGroupLoading: boolean;
  profileForm: ProfileFormValues;
  profileFormErrors: ProfileFormErrors;
  errorStrings: ProfileFormErrors;
  profileUrl: string | undefined;
  username: string;
  orders: Order[];
  orderPagination: number;
  hasMoreOrders: boolean;
  shippingForm: AddressFormValues;
  shippingFormErrors: AddressFormErrors;
  addressErrorStrings: AddressFormErrors;
  selectedAddress: Address | undefined;
  editShippingForm: AddressFormValues;
  editShippingFormErrors: AddressFormErrors;
  areOrdersLoading: boolean;
  activeTabId: string;
  prevTabIndex: number;
  activeTabIndex: number;
  ordersScrollPosition: number | undefined;
  isCreateCustomerLoading: boolean;
  hasMoreLikes: boolean;
  likesScrollPosition: number | undefined;
  likedProducts: PricedProduct[];
  productLikesMetadata: ProductLikesMetadataResponse[];
  likedProductPagination: number;
  areLikedProductsLoading: boolean;
  selectedLikedProduct: PricedProduct | undefined;
  selectedProductLikes: ProductLikesMetadataResponse | undefined;
}

export class AccountModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'account' },
        withProps<AccountState>({
          user: null,
          account: undefined,
          customer: undefined,
          customerGroup: undefined,
          isCustomerGroupLoading: false,
          profileForm: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
          },
          profileFormErrors: {},
          errorStrings: {},
          profileUrl: undefined,
          username: '',
          orders: [],
          orderPagination: 1,
          hasMoreOrders: false,
          shippingForm: {
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
          },
          shippingFormErrors: {},
          addressErrorStrings: {},
          selectedAddress: undefined,
          editShippingForm: {
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
          },
          areOrdersLoading: true,
          editShippingFormErrors: {},
          activeTabId: '/account/likes',
          prevTabIndex: 0,
          activeTabIndex: 0,
          ordersScrollPosition: undefined,
          isCreateCustomerLoading: false,
          hasMoreLikes: true,
          likesScrollPosition: undefined,
          likedProducts: [],
          productLikesMetadata: [],
          likedProductPagination: 1,
          areLikedProductsLoading: false,
          selectedLikedProduct: undefined,
          selectedProductLikes: undefined,
        })
      )
    );
  }

  public get user(): User | null {
    return this.store.getValue().user;
  }

  public set user(value: User | null) {
    if (JSON.stringify(this.user) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, user: value }));
    }
  }

  public get profileForm(): ProfileFormValues {
    return this.store.getValue().profileForm;
  }

  public set profileForm(value: ProfileFormValues) {
    if (JSON.stringify(this.profileForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, profileForm: value }));
    }
  }

  public get profileFormErrors(): ProfileFormErrors {
    return this.store.getValue().ProfileFormErrors;
  }

  public set profileFormErrors(value: ProfileFormErrors) {
    if (JSON.stringify(this.profileFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, profileFormErrors: value }));
    }
  }

  public get errorStrings(): ProfileFormErrors {
    return this.store.getValue().errorStrings;
  }

  public set errorStrings(value: ProfileFormErrors) {
    if (JSON.stringify(this.errorStrings) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, errorStrings: value }));
    }
  }

  public get profileUrl(): string | undefined {
    return this.store.getValue().profileUrl;
  }

  public set profileUrl(value: string | undefined) {
    if (this.profileUrl !== value) {
      this.store.update((state) => ({ ...state, profileUrl: value }));
    }
  }

  public get customer(): Customer | undefined {
    return this.store.getValue().customer;
  }

  public set customer(value: Customer | undefined) {
    if (JSON.stringify(this.customer) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customer: value }));
    }
  }

  public get customerGroup(): CustomerGroup | undefined {
    return this.store.getValue().customerGroup;
  }

  public set customerGroup(value: CustomerGroup | undefined) {
    if (JSON.stringify(this.customerGroup) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customerGroup: value }));
    }
  }

  public get isCustomerGroupLoading(): boolean {
    return this.store.getValue().isCustomerGroupLoading;
  }

  public set isCustomerGroupLoading(value: boolean) {
    if (this.isCustomerGroupLoading !== value) {
      this.store.update((state) => ({
        ...state,
        isCustomerGroupLoading: value,
      }));
    }
  }

  public get account(): core.Account | undefined {
    return this.store.getValue().account;
  }

  public set account(value: core.Account | undefined) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, account: value }));
    }
  }

  public get username(): string {
    return this.store.getValue().username;
  }

  public set username(value: string) {
    if (this.username !== value) {
      this.store.update((state) => ({ ...state, username: value }));
    }
  }

  public get orders(): Order[] {
    return this.store.getValue().orders;
  }

  public set orders(value: Order[]) {
    if (JSON.stringify(this.orders) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, orders: value }));
    }
  }

  public get orderPagination(): number {
    return this.store?.getValue().orderPagination;
  }

  public set orderPagination(value: number) {
    if (this.orderPagination !== value) {
      this.store?.update((state) => ({
        ...state,
        orderPagination: value,
      }));
    }
  }

  public get hasMoreOrders(): boolean {
    return this.store?.getValue().hasMoreOrders;
  }

  public set hasMoreOrders(value: boolean) {
    if (this.hasMoreOrders !== value) {
      this.store?.update((state) => ({
        ...state,
        hasMoreOrders: value,
      }));
    }
  }

  public get shippingForm(): AddressFormValues {
    return this.store.getValue().shippingForm;
  }

  public set shippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.shippingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, shippingForm: value }));
    }
  }

  public get shippingFormErrors(): AddressFormErrors {
    return this.store.getValue().shippingFormErrors;
  }

  public set shippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.shippingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, shippingFormErrors: value }));
    }
  }

  public get addressErrorStrings(): AddressFormErrors {
    return this.store.getValue().addressErrorStrings;
  }

  public set addressErrorStrings(value: AddressFormErrors) {
    if (JSON.stringify(this.addressErrorStrings) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, addressErrorStrings: value }));
    }
  }

  public get selectedAddress(): Address | undefined {
    return this.store.getValue().selectedAddress;
  }

  public set selectedAddress(value: Address | undefined) {
    if (JSON.stringify(this.selectedAddress) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedAddress: value }));
    }
  }

  public get editShippingForm(): AddressFormValues {
    return this.store.getValue().editShippingForm;
  }

  public set editShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.editShippingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, editShippingForm: value }));
    }
  }

  public get editShippingFormErrors(): AddressFormErrors {
    return this.store.getValue().editShippingFormErrors;
  }

  public set editShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.editShippingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        editShippingFormErrors: value,
      }));
    }
  }

  public get activeTabId(): string {
    return this.store.getValue().activeTabId;
  }

  public set activeTabId(value: string) {
    if (this.activeTabId !== value) {
      this.store.update((state) => ({
        ...state,
        activeTabId: value,
      }));
    }
  }

  public get prevTabIndex(): number {
    return this.store.getValue().prevTabIndex;
  }

  public set prevTabIndex(value: number) {
    if (this.prevTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        prevTabIndex: value,
      }));
    }
  }

  public get activeTabIndex(): number {
    return this.store.getValue().activeTabIndex;
  }

  public set activeTabIndex(value: number) {
    if (this.activeTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        activeTabIndex: value,
      }));
    }
  }

  public get areOrdersLoading(): boolean {
    return this.store.getValue().areOrdersLoading;
  }

  public set areOrdersLoading(value: boolean) {
    if (this.areOrdersLoading !== value) {
      this.store.update((state) => ({
        ...state,
        areOrdersLoading: value,
      }));
    }
  }

  public get ordersScrollPosition(): number | undefined {
    return this.store.getValue().ordersScrollPosition;
  }

  public set ordersScrollPosition(value: number | undefined) {
    if (this.ordersScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        ordersScrollPosition: value,
      }));
    }
  }

  public get isCreateCustomerLoading(): boolean {
    return this.store?.getValue().isCreateCustomerLoading;
  }

  public set isCreateCustomerLoading(value: boolean) {
    if (this.isCreateCustomerLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        isCreateCustomerLoading: value,
      }));
    }
  }

  public get hasMoreLikes(): boolean {
    return this.store?.getValue().hasMoreLikes;
  }

  public set hasMoreLikes(value: boolean) {
    if (this.hasMoreLikes !== value) {
      this.store?.update((state) => ({ ...state, hasMoreLikes: value }));
    }
  }

  public get likesScrollPosition(): number | undefined {
    return this.store?.getValue().likesScrollPosition;
  }

  public set likesScrollPosition(value: number | undefined) {
    if (this.likesScrollPosition !== value) {
      this.store?.update((state) => ({ ...state, likesScrollPosition: value }));
    }
  }

  public get likedProducts(): PricedProduct[] {
    return this.store?.getValue().likedProducts;
  }

  public set likedProducts(value: PricedProduct[]) {
    if (JSON.stringify(this.likedProducts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({ ...state, likedProducts: value }));
    }
  }

  public get productLikesMetadata(): ProductLikesMetadataResponse[] {
    return this.store?.getValue().productLikesMetadata;
  }

  public set productLikesMetadata(value: ProductLikesMetadataResponse[]) {
    if (JSON.stringify(this.productLikesMetadata) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        productLikesMetadata: value,
      }));
    }
  }

  public get likedProductPagination(): number {
    return this.store?.getValue().likedProductPagination;
  }

  public set likedProductPagination(value: number) {
    if (this.likedProductPagination !== value) {
      this.store?.update((state) => ({
        ...state,
        likedProductPagination: value,
      }));
    }
  }

  public get areLikedProductsLoading(): boolean {
    return this.store?.getValue().areLikedProductsLoading;
  }

  public set areLikedProductsLoading(value: boolean) {
    if (this.areLikedProductsLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        areLikedProductsLoading: value,
      }));
    }
  }

  public get selectedLikedProduct(): PricedProduct | undefined {
    return this.store.getValue().selectedLikedProduct;
  }

  public set selectedLikedProduct(value: PricedProduct | undefined) {
    if (JSON.stringify(this.selectedLikedProduct) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedLikedProduct: value }));
    }
  }

  public get selectedProductLikes(): ProductLikesMetadataResponse | undefined {
    return this.store.getValue().selectedProductLikes;
  }

  public set selectedProductLikes(
    value: ProductLikesMetadataResponse | undefined
  ) {
    if (JSON.stringify(this.selectedProductLikes) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedProductLikes: value }));
    }
  }
}
