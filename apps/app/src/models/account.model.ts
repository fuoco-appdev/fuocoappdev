import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";
import * as core from "../protobuf/core_pb";
import {
  Address,
  Customer,
  CustomerGroup,
  Order,
  Product,
} from "@medusajs/medusa";
import {
  ProfileFormErrors,
  ProfileFormValues,
} from "../components/account-profile-form.component";
import {
  AddressFormErrors,
  AddressFormValues,
} from "../components/address-form.component";
import { RoutePathsType } from "../route-paths";
import { User } from "@supabase/supabase-js";
import { ProductLikesMetadataResponse } from "../protobuf/core_pb";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

export interface ProfileFormErrorStrings {
  empty?: string;
  exists?: string;
  spaces?: string;
}

export interface AccountState {
  user: User | null;
  account: core.AccountResponse | undefined;
  customer: Customer | undefined;
  customerGroup: CustomerGroup | undefined;
  isCustomerGroupLoading: boolean;
  profileForm: ProfileFormValues;
  profileFormErrors: ProfileFormErrors;
  errorStrings: ProfileFormErrorStrings;
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
  isUpdateGeneralInfoLoading: boolean;
  hasMoreLikes: boolean;
  likesScrollPosition: number | undefined;
  likedProducts: Product[];
  productLikesMetadata: Record<string, ProductLikesMetadataResponse>;
  likedProductPagination: number;
  areLikedProductsLoading: boolean;
  selectedLikedProduct: PricedProduct | undefined;
  selectedProductLikes: ProductLikesMetadataResponse | undefined;
  isAvatarUploadLoading: boolean;
  addFriendsInput: string;
  addFriendsPagination: number;
  hasMoreAddFriends: boolean;
  areAddFriendsLoading: boolean;
  addFriendAccounts: core.AccountResponse[];
  addFriendCustomers: Record<string, core.CustomerResponse>;
  addFriendsScrollPosition: number | undefined;
  addFriendAccountFollowers: Record<string, core.AccountFollowerResponse>;
  areFollowRequestAccountsLoading: boolean;
  followRequestAccounts: core.AccountResponse[];
  followRequestCustomers: Record<string, core.CustomerResponse>;
  followRequestAccountFollowers: Record<string, core.AccountFollowerResponse>;
  likeCount: number | undefined;
  followerCount: number | undefined;
  followingCount: number | undefined;
}

export class AccountModel extends Model {
  constructor() {
    super(
      createStore(
        { name: "account" },
        withProps<AccountState>({
          user: null,
          account: undefined,
          customer: undefined,
          customerGroup: undefined,
          isCustomerGroupLoading: false,
          profileForm: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
          },
          profileFormErrors: {},
          errorStrings: {},
          profileUrl: undefined,
          username: "",
          orders: [],
          orderPagination: 1,
          hasMoreOrders: true,
          shippingForm: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            address: "",
            apartments: "",
            postalCode: "",
            city: "",
            countryCode: "",
            region: "",
            phoneNumber: "",
          },
          shippingFormErrors: {},
          addressErrorStrings: {},
          selectedAddress: undefined,
          editShippingForm: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            address: "",
            apartments: "",
            postalCode: "",
            city: "",
            countryCode: "",
            region: "",
            phoneNumber: "",
          },
          areOrdersLoading: true,
          editShippingFormErrors: {},
          activeTabId: "/account/likes",
          prevTabIndex: 0,
          activeTabIndex: 0,
          ordersScrollPosition: undefined,
          isCreateCustomerLoading: false,
          isUpdateGeneralInfoLoading: false,
          hasMoreLikes: true,
          likesScrollPosition: undefined,
          likedProducts: [],
          productLikesMetadata: {},
          likedProductPagination: 1,
          areLikedProductsLoading: false,
          selectedLikedProduct: undefined,
          selectedProductLikes: undefined,
          isAvatarUploadLoading: false,
          addFriendsInput: "",
          addFriendsPagination: 1,
          hasMoreAddFriends: true,
          areAddFriendsLoading: false,
          addFriendAccounts: [],
          addFriendCustomers: {},
          addFriendsScrollPosition: undefined,
          addFriendAccountFollowers: {},
          areFollowRequestAccountsLoading: false,
          followRequestAccounts: [],
          followRequestCustomers: {},
          followRequestAccountFollowers: {},
          likeCount: undefined,
          followerCount: undefined,
          followingCount: undefined,
        }),
      ),
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

  public get errorStrings(): ProfileFormErrorStrings {
    return this.store.getValue().errorStrings;
  }

  public set errorStrings(value: ProfileFormErrorStrings) {
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

  public get isUpdateGeneralInfoLoading(): boolean {
    return this.store.getValue().isUpdateGeneralInfoLoading;
  }

  public set isUpdateGeneralInfoLoading(value: boolean) {
    if (this.isUpdateGeneralInfoLoading !== value) {
      this.store.update((state) => ({
        ...state,
        isUpdateGeneralInfoLoading: value,
      }));
    }
  }

  public get account(): core.AccountResponse | undefined {
    return this.store.getValue().account;
  }

  public set account(value: core.AccountResponse | undefined) {
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

  public get likedProducts(): Product[] {
    return this.store?.getValue().likedProducts;
  }

  public set likedProducts(value: Product[]) {
    if (JSON.stringify(this.likedProducts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({ ...state, likedProducts: value }));
    }
  }

  public get productLikesMetadata(): Record<
    string,
    ProductLikesMetadataResponse
  > {
    return this.store?.getValue().productLikesMetadata;
  }

  public set productLikesMetadata(
    value: Record<string, ProductLikesMetadataResponse>,
  ) {
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
    value: ProductLikesMetadataResponse | undefined,
  ) {
    if (JSON.stringify(this.selectedProductLikes) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedProductLikes: value }));
    }
  }

  public get isAvatarUploadLoading(): boolean {
    return this.store?.getValue().isAvatarUploadLoading;
  }

  public set isAvatarUploadLoading(value: boolean) {
    if (this.isAvatarUploadLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        isAvatarUploadLoading: value,
      }));
    }
  }

  public get addFriendsInput(): string {
    return this.store?.getValue().addFriendsInput;
  }

  public set addFriendsInput(value: string) {
    if (this.addFriendsInput !== value) {
      this.store?.update((state) => ({
        ...state,
        addFriendsInput: value,
      }));
    }
  }

  public get addFriendsPagination(): number {
    return this.store.getValue().addFriendsPagination;
  }

  public set addFriendsPagination(value: number) {
    if (this.addFriendsPagination !== value) {
      this.store.update((state) => ({
        ...state,
        addFriendsPagination: value,
      }));
    }
  }

  public get hasMoreAddFriends(): boolean {
    return this.store?.getValue().hasMoreAddFriends;
  }

  public set hasMoreAddFriends(value: boolean) {
    if (this.hasMoreAddFriends !== value) {
      this.store?.update((state) => ({ ...state, hasMoreAddFriends: value }));
    }
  }

  public get areAddFriendsLoading(): boolean {
    return this.store?.getValue().areAddFriendsLoading;
  }

  public set areAddFriendsLoading(value: boolean) {
    if (this.areAddFriendsLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        areAddFriendsLoading: value,
      }));
    }
  }

  public get addFriendAccounts(): core.AccountResponse[] {
    return this.store?.getValue().addFriendAccounts;
  }

  public set addFriendAccounts(value: core.AccountResponse[]) {
    if (JSON.stringify(this.addFriendAccounts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        addFriendAccounts: value,
      }));
    }
  }

  public get addFriendCustomers(): Record<string, core.CustomerResponse> {
    return this.store?.getValue().addFriendCustomers;
  }

  public set addFriendCustomers(value: Record<string, core.CustomerResponse>) {
    if (JSON.stringify(this.addFriendCustomers) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        addFriendCustomers: value,
      }));
    }
  }

  public get addFriendsScrollPosition(): number | undefined {
    return this.store.getValue().addFriendsScrollPosition;
  }

  public set addFriendsScrollPosition(value: number | undefined) {
    if (this.addFriendsScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        addFriendsScrollPosition: value,
      }));
    }
  }

  public get addFriendAccountFollowers(): Record<
    string,
    core.AccountFollowerResponse
  > {
    return this.store.getValue().addFriendAccountFollowers;
  }

  public set addFriendAccountFollowers(
    value: Record<string, core.AccountFollowerResponse>,
  ) {
    if (
      JSON.stringify(this.addFriendAccountFollowers) !== JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        addFriendAccountFollowers: value,
      }));
    }
  }

  public get areFollowRequestAccountsLoading(): boolean {
    return this.store?.getValue().areFollowRequestAccountsLoading;
  }

  public set areFollowRequestAccountsLoading(value: boolean) {
    if (this.areFollowRequestAccountsLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        areFollowRequestAccountsLoading: value,
      }));
    }
  }

  public get followRequestAccounts(): core.AccountResponse[] {
    return this.store?.getValue().followRequestAccounts;
  }

  public set followRequestAccounts(value: core.AccountResponse[]) {
    if (JSON.stringify(this.followRequestAccounts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        followRequestAccounts: value,
      }));
    }
  }

  public get followRequestCustomers(): Record<string, core.CustomerResponse> {
    return this.store?.getValue().followRequestCustomers;
  }

  public set followRequestCustomers(
    value: Record<string, core.CustomerResponse>,
  ) {
    if (JSON.stringify(this.followRequestCustomers) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        followRequestCustomers: value,
      }));
    }
  }

  public get followRequestAccountFollowers(): Record<
    string,
    core.AccountFollowerResponse
  > {
    return this.store.getValue().followRequestAccountFollowers;
  }

  public set followRequestAccountFollowers(
    value: Record<string, core.AccountFollowerResponse>,
  ) {
    if (
      JSON.stringify(this.followRequestAccountFollowers) !==
        JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        followRequestAccountFollowers: value,
      }));
    }
  }

  public get likeCount(): number | undefined {
    return this.store.getValue().likeCount;
  }

  public set likeCount(value: number | undefined) {
    if (this.likeCount !== value) {
      this.store.update((state) => ({
        ...state,
        likeCount: value,
      }));
    }
  }

  public get followerCount(): number | undefined {
    return this.store.getValue().followerCount;
  }

  public set followerCount(value: number | undefined) {
    if (this.followerCount !== value) {
      this.store.update((state) => ({
        ...state,
        followerCount: value,
      }));
    }
  }

  public get followingCount(): number | undefined {
    return this.store.getValue().followingCount;
  }

  public set followingCount(value: number | undefined) {
    if (this.followingCount !== value) {
      this.store.update((state) => ({
        ...state,
        followingCount: value,
      }));
    }
  }
}
