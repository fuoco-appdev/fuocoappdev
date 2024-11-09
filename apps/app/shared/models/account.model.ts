import { HttpTypes } from '@medusajs/types';
import { User } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { AccountFollowerResponse } from '../protobuf/account-follower_pb';
import { AccountResponse } from '../protobuf/account_pb';
import { InterestResponse } from '../protobuf/interest_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { Geocoding, GeocodingFeature } from '../services/mapbox.service';
import { StoreOptions } from '../store-options';

export interface AddressFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  apartments?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  region?: string;
  phoneNumber?: string;
}

export interface AddressFormValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  apartments?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
  phoneNumber?: string;
}

export interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  birthday?: string;
  sex?: string;
  phoneNumber?: string;
}

export interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  username?: string;
  birthday?: string;
  sex?: 'male' | 'female';
  phoneNumber?: string;
}

export interface AccountDocument {
  id?: string;
  customer_id?: string;
  supabase_id?: string;
  profile_url?: string;
  status?: string;
  updated_at?: string;
  language_code?: string;
  username?: string;
  birthday?: string;
  sex?: string;
  about_me?: string;
  interests?: string[];
  metadata?: string;
  customer?: Partial<HttpTypes.StoreCustomer>;
}

export interface AccountPresence {
  account_id: string;
  last_seen: string;
  is_online: boolean;
}

export interface ProfileFormErrorStrings {
  empty?: string;
  exists?: string;
  spaces?: string;
}

export class AccountModel extends Model {
  @observable
  public user!: User | null;
  @observable
  public account: AccountResponse | undefined;
  @observable
  public customer: HttpTypes.AdminCustomer | undefined;
  @observable
  public customerGroup: HttpTypes.AdminCustomerGroup | undefined;
  @observable
  public isCustomerGroupLoading!: boolean;
  @observable
  public profileForm!: ProfileFormValues;
  @observable
  public profileFormErrors!: ProfileFormErrors;
  @observable
  public errorStrings!: ProfileFormErrorStrings;
  @observable
  public profileUrl: string | undefined;
  @observable
  public username!: string;
  @observable
  public orders!: HttpTypes.StoreOrder[];
  @observable
  public orderPagination!: number;
  @observable
  public hasMoreOrders!: boolean;
  @observable
  public shippingForm!: AddressFormValues;
  @observable
  public shippingFormErrors!: AddressFormErrors;
  @observable
  public addressErrorStrings!: AddressFormErrors;
  @observable
  public selectedAddress: HttpTypes.AdminCustomerAddress | undefined;
  @observable
  public editShippingForm!: AddressFormValues;
  @observable
  public editShippingFormErrors!: AddressFormErrors;
  @observable
  public areOrdersReloading!: boolean;
  @observable
  public areOrdersLoading!: boolean;
  @observable
  public activeTabId!: string;
  @observable
  public prevTabIndex!: number;
  @observable
  public activeTabIndex!: number;
  @observable
  public ordersScrollPosition: number | undefined;
  @observable
  public isCreateCustomerLoading!: boolean;
  @observable
  public isUpdateGeneralInfoLoading!: boolean;
  @observable
  public hasMoreLikes!: boolean;
  @observable
  public likesScrollPosition: number | undefined;
  @observable
  public likedProducts!: HttpTypes.StoreProduct[];
  @observable
  public productLikesMetadata!: Record<string, ProductLikesMetadataResponse>;
  @observable
  public likedProductPagination!: number;
  @observable
  public areLikedProductsReloading!: boolean;
  @observable
  public areLikedProductsLoading!: boolean;
  @observable
  public selectedLikedProduct: HttpTypes.StoreProduct | undefined;
  @observable
  public selectedProductLikes: ProductLikesMetadataResponse | undefined;
  @observable
  public isAvatarUploadLoading!: boolean;
  @observable
  public addFriendsSearchInput!: string;
  @observable
  public addFriendsLocationInput!: string;
  @observable
  public addFriendsLocationGeocoding: Geocoding | undefined;
  @observable
  public addFriendsLocationFeature: GeocodingFeature | undefined;
  @observable
  public addFriendsLocationCoordinates!: {
    lat: number;
    lng: number;
  };
  @observable
  public addFriendsRadiusMeters!: number;
  @observable
  public addFriendsSex!: 'any' | 'male' | 'female';
  @observable
  public addFriendsPagination!: number;
  @observable
  public hasMoreAddFriends!: boolean;
  @observable
  public areAddFriendsReloading!: boolean;
  @observable
  public areAddFriendsLoading!: boolean;
  @observable
  public addFriendAccounts!: AccountDocument[];
  @observable
  public addFriendsScrollPosition: number | undefined;
  @observable
  public addFriendAccountFollowers!: Record<string, AccountFollowerResponse>;
  @observable
  public areFollowRequestAccountsLoading!: boolean;
  @observable
  public followRequestAccounts!: AccountDocument[];
  @observable
  public followRequestAccountFollowers!: Record<
    string,
    AccountFollowerResponse
  >;
  @observable
  public likeCount: number | undefined;
  @observable
  public followerCount: number | undefined;
  @observable
  public followingCount: number | undefined;
  @observable
  public addInterestInput!: string;
  @observable
  public areAddInterestsLoading!: boolean;
  @observable
  public searchedInterests!: InterestResponse[];
  @observable
  public creatableInterest: string | undefined;
  @observable
  public selectedInterests!: Record<string, InterestResponse>;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.user = null;
      this.account = undefined;
      this.customer = undefined;
      this.customerGroup = undefined;
      this.isCustomerGroupLoading = false;
      this.profileForm = {
        firstName: '',
        lastName: '',
        username: '',
      };
      this.profileFormErrors = {};
      this.errorStrings = {};
      this.profileUrl = undefined;
      this.username = '';
      this.orders = [];
      this.orderPagination = 1;
      this.hasMoreOrders = true;
      this.shippingForm = {
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
      this.shippingFormErrors = {};
      this.addressErrorStrings = {};
      this.selectedAddress = undefined;
      this.editShippingForm = {
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
      this.areOrdersReloading = false;
      this.areOrdersLoading = false;
      this.editShippingFormErrors = {};
      this.activeTabId = '/account/likes';
      this.prevTabIndex = 0;
      this.activeTabIndex = 0;
      this.ordersScrollPosition = undefined;
      this.isCreateCustomerLoading = false;
      this.isUpdateGeneralInfoLoading = false;
      this.hasMoreLikes = true;
      this.likesScrollPosition = undefined;
      this.likedProducts = [];
      this.productLikesMetadata = {};
      this.likedProductPagination = 1;
      this.areLikedProductsReloading = false;
      this.areLikedProductsLoading = false;
      this.selectedLikedProduct = undefined;
      this.selectedProductLikes = undefined;
      this.isAvatarUploadLoading = false;
      this.addFriendsSearchInput = '';
      this.addFriendsLocationInput = '';
      this.addFriendsLocationGeocoding = undefined;
      this.addFriendsLocationFeature = undefined;
      this.addFriendsLocationCoordinates = {
        lat: 0,
        lng: 0,
      };
      this.addFriendsRadiusMeters = 100000;
      this.addFriendsSex = 'any';
      this.addFriendsPagination = 1;
      this.hasMoreAddFriends = true;
      this.areAddFriendsReloading = false;
      this.areAddFriendsLoading = false;
      this.addFriendAccounts = [];
      this.addFriendsScrollPosition = undefined;
      this.addFriendAccountFollowers = {};
      this.areFollowRequestAccountsLoading = false;
      this.followRequestAccounts = [];
      this.followRequestAccountFollowers = {};
      this.likeCount = undefined;
      this.followerCount = undefined;
      this.followingCount = undefined;
      this.addInterestInput = '';
      this.areAddInterestsLoading = false;
      this.searchedInterests = [];
      this.creatableInterest = undefined;
      this.selectedInterests = {};
    });
  }

  public updateUser(value: User | null) {
    if (JSON.stringify(this.user) !== JSON.stringify(value)) {
      runInAction(() => (this.user = value));
    }
  }

  public updateProfileForm(value: ProfileFormValues) {
    if (JSON.stringify(this.profileForm) !== JSON.stringify(value)) {
      runInAction(() => (this.profileForm = value));
    }
  }

  public updateProfileFormErrors(value: ProfileFormErrors) {
    if (JSON.stringify(this.profileFormErrors) !== JSON.stringify(value)) {
      runInAction(() => (this.profileFormErrors = value));
    }
  }

  public updateErrorStrings(value: ProfileFormErrorStrings) {
    if (JSON.stringify(this.errorStrings) !== JSON.stringify(value)) {
      runInAction(() => (this.errorStrings = value));
    }
  }

  public updateProfileUrl(value: string | undefined) {
    if (this.profileUrl !== value) {
      runInAction(() => (this.profileUrl = value));
    }
  }

  public updateCustomer(value: HttpTypes.AdminCustomer | undefined) {
    if (JSON.stringify(this.customer) !== JSON.stringify(value)) {
      runInAction(() => (this.customer = value));
    }
  }

  public updateCustomerGroup(value: HttpTypes.AdminCustomerGroup | undefined) {
    if (JSON.stringify(this.customerGroup) !== JSON.stringify(value)) {
      runInAction(() => (this.customerGroup = value));
    }
  }

  public updateIsCustomerGroupLoading(value: boolean) {
    if (this.isCustomerGroupLoading !== value) {
      runInAction(() => (this.isCustomerGroupLoading = value));
    }
  }

  public updateIsUpdateGeneralInfoLoading(value: boolean) {
    if (this.isUpdateGeneralInfoLoading !== value) {
      runInAction(() => (this.isUpdateGeneralInfoLoading = value));
    }
  }

  public updateAccount(value: AccountResponse | undefined) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      runInAction(() => (this.account = value));
    }
  }

  public updateUsername(value: string) {
    if (this.username !== value) {
      runInAction(() => (this.username = value));
    }
  }

  public updateOrders(value: HttpTypes.StoreOrder[]) {
    if (JSON.stringify(this.orders) !== JSON.stringify(value)) {
      runInAction(() => (this.orders = value));
    }
  }

  public updateOrderPagination(value: number) {
    if (this.orderPagination !== value) {
      runInAction(() => (this.orderPagination = value));
    }
  }

  public updateHasMoreOrders(value: boolean) {
    if (this.hasMoreOrders !== value) {
      runInAction(() => (this.hasMoreOrders = value));
    }
  }

  public updateShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.shippingForm) !== JSON.stringify(value)) {
      runInAction(() => (this.shippingForm = value));
    }
  }

  public updateShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.shippingFormErrors) !== JSON.stringify(value)) {
      runInAction(() => (this.shippingFormErrors = value));
    }
  }

  public updateAddressErrorStrings(value: AddressFormErrors) {
    if (JSON.stringify(this.addressErrorStrings) !== JSON.stringify(value)) {
      runInAction(() => (this.addressErrorStrings = value));
    }
  }

  public updateSelectedAddress(
    value: HttpTypes.AdminCustomerAddress | undefined
  ) {
    if (JSON.stringify(this.selectedAddress) !== JSON.stringify(value)) {
      runInAction(() => (this.selectedAddress = value));
    }
  }

  public updateEditShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.editShippingForm) !== JSON.stringify(value)) {
      this.editShippingForm = value;
    }
  }

  public updateEditShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.editShippingFormErrors) !== JSON.stringify(value)) {
      this.editShippingFormErrors = value;
    }
  }

  public updateActiveTabId(value: string) {
    if (this.activeTabId !== value) {
      this.activeTabId = value;
    }
  }

  public updatePrevTabIndex(value: number) {
    if (this.prevTabIndex !== value) {
      this.prevTabIndex = value;
    }
  }

  public updateActiveTabIndex(value: number) {
    if (this.activeTabIndex !== value) {
      this.activeTabIndex = value;
    }
  }

  public updateAreOrdersReloading(value: boolean) {
    if (this.areOrdersReloading !== value) {
      this.areOrdersReloading = value;
    }
  }

  public updateAreOrdersLoading(value: boolean) {
    if (this.areOrdersLoading !== value) {
      this.areOrdersLoading = value;
    }
  }

  public updateOrdersScrollPosition(value: number | undefined) {
    if (this.ordersScrollPosition !== value) {
      this.ordersScrollPosition = value;
    }
  }

  public updateIsCreateCustomerLoading(value: boolean) {
    if (this.isCreateCustomerLoading !== value) {
      this.isCreateCustomerLoading = value;
    }
  }

  public updateHasMoreLikes(value: boolean) {
    if (this.hasMoreLikes !== value) {
      this.hasMoreLikes = value;
    }
  }

  public updateLikesScrollPosition(value: number | undefined) {
    if (this.likesScrollPosition !== value) {
      this.likesScrollPosition = value;
    }
  }

  public updateLikedProducts(value: HttpTypes.StoreProduct[]) {
    if (JSON.stringify(this.likedProducts) !== JSON.stringify(value)) {
      this.likedProducts = value;
    }
  }

  public updateProductLikesMetadata(
    value: Record<string, ProductLikesMetadataResponse>
  ) {
    if (JSON.stringify(this.productLikesMetadata) !== JSON.stringify(value)) {
      this.productLikesMetadata = value;
    }
  }

  public updateLikedProductPagination(value: number) {
    if (this.likedProductPagination !== value) {
      this.likedProductPagination = value;
    }
  }

  public updateAreLikedProductsReloading(value: boolean) {
    if (this.areLikedProductsReloading !== value) {
      this.areLikedProductsReloading = value;
    }
  }

  public updateAreLikedProductsLoading(value: boolean) {
    if (this.areLikedProductsLoading !== value) {
      this.areLikedProductsLoading = value;
    }
  }

  public updateSelectedLikedProduct(value: HttpTypes.StoreProduct | undefined) {
    if (JSON.stringify(this.selectedLikedProduct) !== JSON.stringify(value)) {
      this.selectedLikedProduct = value;
    }
  }

  public updateSelectedProductLikes(
    value: ProductLikesMetadataResponse | undefined
  ) {
    if (JSON.stringify(this.selectedProductLikes) !== JSON.stringify(value)) {
      this.selectedProductLikes = value;
    }
  }

  public updateIsAvatarUploadLoading(value: boolean) {
    if (this.isAvatarUploadLoading !== value) {
      this.isAvatarUploadLoading = value;
    }
  }

  public updateAddFriendsSearchInput(value: string) {
    if (this.addFriendsSearchInput !== value) {
      this.addFriendsSearchInput = value;
    }
  }

  public updateAddFriendsLocationInput(value: string) {
    if (this.addFriendsLocationInput !== value) {
      this.addFriendsLocationInput = value;
    }
  }

  public updateAddFriendsLocationGeocoding(value: Geocoding | undefined) {
    if (
      JSON.stringify(this.addFriendsLocationGeocoding) !== JSON.stringify(value)
    ) {
      this.addFriendsLocationGeocoding = value;
    }
  }

  public updateAddFriendsLocationFeature(value: GeocodingFeature | undefined) {
    if (
      JSON.stringify(this.addFriendsLocationFeature) !== JSON.stringify(value)
    ) {
      this.addFriendsLocationFeature = value;
    }
  }

  public updateAddFriendsLocationCoordinates(value: {
    lat: number;
    lng: number;
  }) {
    if (
      JSON.stringify(this.addFriendsLocationCoordinates) !==
      JSON.stringify(value)
    ) {
      this.addFriendsLocationCoordinates = value;
    }
  }

  public updateAddFriendsRadiusMeters(value: number) {
    if (this.addFriendsRadiusMeters !== value) {
      this.addFriendsRadiusMeters = value;
    }
  }

  public updateAddFriendsSex(value: 'any' | 'male' | 'female') {
    if (JSON.stringify(this.addFriendsSex) !== JSON.stringify(value)) {
      this.addFriendsSex = value;
    }
  }

  public updateAddFriendsPagination(value: number) {
    if (this.addFriendsPagination !== value) {
      this.addFriendsPagination = value;
    }
  }

  public updateHasMoreAddFriends(value: boolean) {
    if (this.hasMoreAddFriends !== value) {
      this.hasMoreAddFriends = value;
    }
  }

  public updateAreAddFriendsReloading(value: boolean) {
    if (this.areAddFriendsReloading !== value) {
      this.areAddFriendsReloading = value;
    }
  }

  public updateAreAddFriendsLoading(value: boolean) {
    if (this.areAddFriendsLoading !== value) {
      this.areAddFriendsLoading = value;
    }
  }

  public updateAddFriendAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.addFriendAccounts) !== JSON.stringify(value)) {
      this.addFriendAccounts = value;
    }
  }

  public updateAddFriendsScrollPosition(value: number | undefined) {
    if (this.addFriendsScrollPosition !== value) {
      this.addFriendsScrollPosition = value;
    }
  }

  public updateAddFriendAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (
      JSON.stringify(this.addFriendAccountFollowers) !== JSON.stringify(value)
    ) {
      this.addFriendAccountFollowers = value;
    }
  }

  public updateAreFollowRequestAccountsLoading(value: boolean) {
    if (this.areFollowRequestAccountsLoading !== value) {
      this.areFollowRequestAccountsLoading = value;
    }
  }

  public updateFollowRequestAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.followRequestAccounts) !== JSON.stringify(value)) {
      this.followRequestAccounts = value;
    }
  }

  public updateFollowRequestAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (
      JSON.stringify(this.followRequestAccountFollowers) !==
      JSON.stringify(value)
    ) {
      this.followRequestAccountFollowers = value;
    }
  }

  public updateLikeCount(value: number | undefined) {
    if (this.likeCount !== value) {
      this.likeCount = value;
    }
  }

  public updateFollowerCount(value: number | undefined) {
    if (this.followerCount !== value) {
      this.followerCount = value;
    }
  }

  public updateFollowingCount(value: number | undefined) {
    if (this.followingCount !== value) {
      this.followingCount = value;
    }
  }

  public updateAddInterestInput(value: string) {
    if (this.addInterestInput !== value) {
      this.addInterestInput = value;
    }
  }

  public updateAreAddInterestsLoading(value: boolean) {
    if (this.areAddInterestsLoading !== value) {
      this.areAddInterestsLoading = value;
    }
  }

  public updateSearchedInterests(value: InterestResponse[]) {
    if (JSON.stringify(this.searchedInterests) !== JSON.stringify(value)) {
      this.searchedInterests = value;
    }
  }

  public updateCreatableInterest(value: string | undefined) {
    if (this.creatableInterest !== value) {
      this.creatableInterest = value;
    }
  }

  public updateSelectedInterests(value: Record<string, InterestResponse>) {
    if (JSON.stringify(this.selectedInterests) !== JSON.stringify(value)) {
      this.selectedInterests = value;
    }
  }
}
