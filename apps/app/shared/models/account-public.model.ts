import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { AccountFollowerResponse } from '../protobuf/account-follower_pb';
import { AccountResponse } from '../protobuf/account_pb';
import { CustomerMetadataResponse } from '../protobuf/customer_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { StoreOptions } from '../store-options';
import { AccountDocument } from './account.model';

export class AccountPublicModel extends Model {
  @observable
  public accountId: string | undefined;
  @observable
  public account: AccountResponse | undefined;
  @observable
  public customerMetadata: CustomerMetadataResponse | undefined;
  @observable
  public accountFollower: AccountFollowerResponse | undefined;
  @observable
  public showFollowButton: boolean | undefined;
  @observable
  public profileUrl: string | undefined;
  @observable
  public username: string;
  @observable
  public activeTabId: string;
  @observable
  public prevTabIndex: number;
  @observable
  public activeTabIndex: number;
  @observable
  public hasMoreLikes: boolean;
  @observable
  public likesScrollPosition: number | undefined;
  @observable
  public likedProducts: HttpTypes.StoreProduct[];
  @observable
  public productLikesMetadata: Record<string, ProductLikesMetadataResponse>;
  @observable
  public likedProductPagination: number;
  @observable
  public areLikedProductsLoading: boolean;
  @observable
  public selectedLikedProduct: HttpTypes.StoreProduct | undefined;
  @observable
  public selectedProductLikes: ProductLikesMetadataResponse | undefined;
  @observable
  public activeStatusTabId: string;
  @observable
  public prevStatusTabIndex: number;
  @observable
  public activeStatusTabIndex: number;
  @observable
  public followersFollowingInput: string;
  @observable
  public followersPagination: number;
  @observable
  public hasMoreFollowers: boolean;
  @observable
  public areFollowersLoading: boolean;
  @observable
  public areFollowersReloading: boolean;
  @observable
  public followerAccounts: AccountDocument[];
  @observable
  public followerScrollPosition: number | undefined;
  @observable
  public followerAccountFollowers: Record<string, AccountFollowerResponse>;
  @observable
  public followingPagination: number;
  @observable
  public hasMoreFollowing: boolean;
  @observable
  public areFollowingLoading: boolean;
  @observable
  public areFollowingReloading: boolean;
  @observable
  public followingAccounts: AccountDocument[];
  @observable
  public followingScrollPosition: number | undefined;
  @observable
  public followingAccountFollowers: Record<string, AccountFollowerResponse>;
  @observable
  public likeCount: number | undefined;
  @observable
  public followerCount: number | undefined;
  @observable
  public followingCount: number | undefined;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    this.accountId = undefined;
    this.account = undefined;
    this.customerMetadata = undefined;
    this.accountFollower = undefined;
    this.showFollowButton = undefined;
    this.profileUrl = undefined;
    this.username = '';
    this.activeTabId = '/account/:id/likes';
    this.prevTabIndex = 0;
    this.activeTabIndex = 0;
    this.hasMoreLikes = true;
    this.likesScrollPosition = undefined;
    this.likedProducts = [];
    this.productLikesMetadata = {};
    this.likedProductPagination = 1;
    this.areLikedProductsLoading = false;
    this.selectedLikedProduct = undefined;
    this.selectedProductLikes = undefined;
    this.activeStatusTabId = '/account/status/:id/followers';
    this.prevStatusTabIndex = 0;
    this.activeStatusTabIndex = 0;
    this.followersFollowingInput = '';
    this.followersPagination = 1;
    this.hasMoreFollowers = true;
    this.areFollowersReloading = false;
    this.areFollowersLoading = false;
    this.followerAccounts = [];
    this.followerScrollPosition = undefined;
    this.followerAccountFollowers = {};
    this.followingPagination = 1;
    this.hasMoreFollowing = true;
    this.areFollowingReloading = false;
    this.areFollowingLoading = false;
    this.followingAccounts = [];
    this.followingScrollPosition = undefined;
    this.followingAccountFollowers = {};
    this.likeCount = undefined;
    this.followerCount = undefined;
    this.followingCount = undefined;
  }

  public updateAccountId(value: string | undefined) {
    if (this.accountId !== value) {
      this.accountId = value;
    }
  }

  public updateProfileUrl(value: string | undefined) {
    if (this.profileUrl !== value) {
      this.profileUrl = value;
    }
  }

  public updateCustomerMetadata(value: CustomerMetadataResponse | undefined) {
    if (JSON.stringify(this.customerMetadata) !== JSON.stringify(value)) {
      this.customerMetadata = value;
    }
  }

  public updateAccountFollower(value: AccountFollowerResponse | undefined) {
    if (JSON.stringify(this.accountFollower) !== JSON.stringify(value)) {
      this.accountFollower = value;
    }
  }

  public updateShowFollowButton(value: boolean | undefined) {
    if (this.showFollowButton !== value) {
      this.showFollowButton = value;
    }
  }

  public updateAccount(value: AccountResponse | undefined) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      this.account = value;
    }
  }

  public updateUsername(value: string) {
    if (this.username !== value) {
      this.username = value;
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

  public updateActiveStatusTabId(value: string) {
    if (this.activeStatusTabId !== value) {
      this.activeStatusTabId = value;
    }
  }

  public updatePrevStatusTabIndex(value: number) {
    if (this.prevStatusTabIndex !== value) {
      this.prevStatusTabIndex = value;
    }
  }

  public updateActiveStatusTabIndex(value: number) {
    if (this.activeStatusTabIndex !== value) {
      this.activeStatusTabIndex = value;
    }
  }

  public updateFollowingPagination(value: number) {
    if (this.followingPagination !== value) {
      this.followingPagination = value;
    }
  }

  public updateHasMoreFollowing(value: boolean) {
    if (this.hasMoreFollowing !== value) {
      this.hasMoreFollowing = value;
    }
  }

  public updateAreFollowingReloading(value: boolean) {
    if (this.areFollowingReloading !== value) {
      this.areFollowingReloading = value;
    }
  }

  public updateAreFollowingLoading(value: boolean) {
    if (this.areFollowingLoading !== value) {
      this.areFollowingLoading = value;
    }
  }

  public updateFollowingAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.followingAccounts) !== JSON.stringify(value)) {
      this.followingAccounts = value;
    }
  }

  public updateFollowingScrollPosition(value: number | undefined) {
    if (this.followingScrollPosition !== value) {
      this.followingScrollPosition = value;
    }
  }

  public updateFollowersFollowingInput(value: string) {
    if (this.followersFollowingInput !== value) {
      this.followersFollowingInput = value;
    }
  }

  public updateFollowersPagination(value: number) {
    if (this.followersPagination !== value) {
      this.followersPagination = value;
    }
  }

  public updateHasMoreFollowers(value: boolean) {
    if (this.hasMoreFollowers !== value) {
      this.hasMoreFollowers = value;
    }
  }

  public updateAreFollowersReloading(value: boolean) {
    if (this.areFollowersReloading !== value) {
      this.areFollowersReloading = value;
    }
  }

  public updateAreFollowersLoading(value: boolean) {
    if (this.areFollowersLoading !== value) {
      this.areFollowersLoading = value;
    }
  }

  public updateFollowerAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.followerAccounts) !== JSON.stringify(value)) {
      this.followerAccounts = value;
    }
  }

  public updateFollowerScrollPosition(value: number | undefined) {
    if (this.followerScrollPosition !== value) {
      this.followerScrollPosition = value;
    }
  }

  public updateFollowerAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (
      JSON.stringify(this.followerAccountFollowers) !== JSON.stringify(value)
    ) {
      this.followerAccountFollowers = value;
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
}
