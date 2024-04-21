import { Product } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { AccountFollowerResponse } from '../protobuf/account-follower_pb';
import { AccountResponse } from '../protobuf/account_pb';
import {
  CustomerMetadataResponse,
  CustomerResponse,
} from '../protobuf/customer_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { AccountDocument } from './account.model';

export interface AccountPublicState {
  accountId: string | undefined;
  account: AccountResponse | undefined;
  customerMetadata: CustomerMetadataResponse | undefined;
  accountFollower: AccountFollowerResponse | undefined;
  showFollowButton: boolean | undefined;
  profileUrl: string | undefined;
  username: string;
  activeTabId: string;
  prevTabIndex: number;
  activeTabIndex: number;
  hasMoreLikes: boolean;
  likesScrollPosition: number | undefined;
  likedProducts: Product[];
  productLikesMetadata: Record<string, ProductLikesMetadataResponse>;
  likedProductPagination: number;
  areLikedProductsLoading: boolean;
  selectedLikedProduct: PricedProduct | undefined;
  selectedProductLikes: ProductLikesMetadataResponse | undefined;
  activeStatusTabId: string;
  prevStatusTabIndex: number;
  activeStatusTabIndex: number;
  followersInput: string;
  followersPagination: number;
  hasMoreFollowers: boolean;
  areFollowersLoading: boolean;
  followerAccounts: AccountDocument[];
  followerScrollPosition: number | undefined;
  followerAccountFollowers: Record<string, AccountFollowerResponse>;
  followingInput: string;
  followingPagination: number;
  hasMoreFollowing: boolean;
  areFollowingLoading: boolean;
  followingAccounts: AccountDocument[];
  followingScrollPosition: number | undefined;
  followingAccountFollowers: Record<string, AccountFollowerResponse>;
  likeCount: number | undefined;
  followerCount: number | undefined;
  followingCount: number | undefined;
}

export class AccountPublicModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'account-public' },
        withProps<AccountPublicState>({
          accountId: undefined,
          account: undefined,
          customerMetadata: undefined,
          accountFollower: undefined,
          showFollowButton: undefined,
          profileUrl: undefined,
          username: '',
          activeTabId: '/account/:id/likes',
          prevTabIndex: 0,
          activeTabIndex: 0,
          hasMoreLikes: true,
          likesScrollPosition: undefined,
          likedProducts: [],
          productLikesMetadata: {},
          likedProductPagination: 1,
          areLikedProductsLoading: false,
          selectedLikedProduct: undefined,
          selectedProductLikes: undefined,
          activeStatusTabId: '/account/status/:id/followers',
          prevStatusTabIndex: 0,
          activeStatusTabIndex: 0,
          followersInput: '',
          followersPagination: 1,
          hasMoreFollowers: true,
          areFollowersLoading: false,
          followerAccounts: [],
          followerScrollPosition: undefined,
          followerAccountFollowers: {},
          followingInput: '',
          followingPagination: 1,
          hasMoreFollowing: true,
          areFollowingLoading: false,
          followingAccounts: [],
          followingScrollPosition: undefined,
          followingAccountFollowers: {},
          likeCount: undefined,
          followerCount: undefined,
          followingCount: undefined,
        })
      )
    );
  }

  public get accountId(): string | undefined {
    return this.store.getValue().accountId;
  }

  public set accountId(value: string | undefined) {
    if (this.accountId !== value) {
      this.store.update((state) => ({ ...state, accountId: value }));
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

  public get customerMetadata(): CustomerMetadataResponse | undefined {
    return this.store.getValue().customerMetadata;
  }

  public set customerMetadata(value: CustomerMetadataResponse | undefined) {
    if (JSON.stringify(this.customerMetadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customerMetadata: value }));
    }
  }

  public get accountFollower(): AccountFollowerResponse | undefined {
    return this.store.getValue().accountFollower;
  }

  public set accountFollower(value: AccountFollowerResponse | undefined) {
    if (JSON.stringify(this.accountFollower) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, accountFollower: value }));
    }
  }

  public get showFollowButton(): boolean | undefined {
    return this.store.getValue().showFollowButton;
  }

  public set showFollowButton(value: boolean | undefined) {
    if (this.showFollowButton !== value) {
      this.store.update((state) => ({ ...state, showFollowButton: value }));
    }
  }

  public get account(): AccountResponse | undefined {
    return this.store.getValue().account;
  }

  public set account(value: AccountResponse | undefined) {
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
    value: Record<string, ProductLikesMetadataResponse>
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
    value: ProductLikesMetadataResponse | undefined
  ) {
    if (JSON.stringify(this.selectedProductLikes) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedProductLikes: value }));
    }
  }

  public get activeStatusTabId(): string {
    return this.store.getValue().activeStatusTabId;
  }

  public set activeStatusTabId(value: string) {
    if (this.activeStatusTabId !== value) {
      this.store.update((state) => ({
        ...state,
        activeStatusTabId: value,
      }));
    }
  }

  public get prevStatusTabIndex(): number {
    return this.store.getValue().prevStatusTabIndex;
  }

  public set prevStatusTabIndex(value: number) {
    if (this.prevStatusTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        prevStatusTabIndex: value,
      }));
    }
  }

  public get activeStatusTabIndex(): number {
    return this.store.getValue().activeStatusTabIndex;
  }

  public set activeStatusTabIndex(value: number) {
    if (this.activeStatusTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        activeStatusTabIndex: value,
      }));
    }
  }

  public get followingInput(): string {
    return this.store?.getValue().followingInput;
  }

  public set followingInput(value: string) {
    if (this.followingInput !== value) {
      this.store?.update((state) => ({
        ...state,
        followingInput: value,
      }));
    }
  }

  public get followingPagination(): number {
    return this.store.getValue().followingPagination;
  }

  public set followingPagination(value: number) {
    if (this.followingPagination !== value) {
      this.store.update((state) => ({
        ...state,
        followingPagination: value,
      }));
    }
  }

  public get hasMoreFollowing(): boolean {
    return this.store?.getValue().hasMoreFollowing;
  }

  public set hasMoreFollowing(value: boolean) {
    if (this.hasMoreFollowing !== value) {
      this.store?.update((state) => ({ ...state, hasMoreFollowing: value }));
    }
  }

  public get areFollowingLoading(): boolean {
    return this.store?.getValue().areFollowingLoading;
  }

  public set areFollowingLoading(value: boolean) {
    if (this.areFollowingLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        areFollowingLoading: value,
      }));
    }
  }

  public get followingAccounts(): AccountDocument[] {
    return this.store?.getValue().followingAccounts;
  }

  public set followingAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.followingAccounts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        followingAccounts: value,
      }));
    }
  }

  public get followingCustomers(): Record<string, CustomerResponse> {
    return this.store?.getValue().followingCustomers;
  }

  public set followingCustomers(value: Record<string, CustomerResponse>) {
    if (JSON.stringify(this.followingCustomers) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        followingCustomers: value,
      }));
    }
  }

  public get followingScrollPosition(): number | undefined {
    return this.store.getValue().followingScrollPosition;
  }

  public set followingScrollPosition(value: number | undefined) {
    if (this.followingScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        followingScrollPosition: value,
      }));
    }
  }

  public get followingAccountFollowers(): Record<
    string,
    AccountFollowerResponse
  > {
    return this.store.getValue().followingAccountFollowers;
  }

  public set followingAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (
      JSON.stringify(this.followingAccountFollowers) !== JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        followingAccountFollowers: value,
      }));
    }
  }

  public get followersInput(): string {
    return this.store?.getValue().followersInput;
  }

  public set followersInput(value: string) {
    if (this.followersInput !== value) {
      this.store?.update((state) => ({
        ...state,
        followersInput: value,
      }));
    }
  }

  public get followersPagination(): number {
    return this.store.getValue().followersPagination;
  }

  public set followersPagination(value: number) {
    if (this.followersPagination !== value) {
      this.store.update((state) => ({
        ...state,
        followersPagination: value,
      }));
    }
  }

  public get hasMoreFollowers(): boolean {
    return this.store?.getValue().hasMoreFollowers;
  }

  public set hasMoreFollowers(value: boolean) {
    if (this.hasMoreFollowers !== value) {
      this.store?.update((state) => ({ ...state, hasMoreFollowers: value }));
    }
  }

  public get areFollowersLoading(): boolean {
    return this.store?.getValue().areFollowersLoading;
  }

  public set areFollowersLoading(value: boolean) {
    if (this.areFollowersLoading !== value) {
      this.store?.update((state) => ({
        ...state,
        areFollowersLoading: value,
      }));
    }
  }

  public get followerAccounts(): AccountDocument[] {
    return this.store?.getValue().followerAccounts;
  }

  public set followerAccounts(value: AccountDocument[]) {
    if (JSON.stringify(this.followerAccounts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        followerAccounts: value,
      }));
    }
  }

  public get followerScrollPosition(): number | undefined {
    return this.store.getValue().followerScrollPosition;
  }

  public set followerScrollPosition(value: number | undefined) {
    if (this.followerScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        followerScrollPosition: value,
      }));
    }
  }

  public get followerAccountFollowers(): Record<
    string,
    AccountFollowerResponse
  > {
    return this.store.getValue().followerAccountFollowers;
  }

  public set followerAccountFollowers(
    value: Record<string, AccountFollowerResponse>
  ) {
    if (
      JSON.stringify(this.followerAccountFollowers) !== JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        followerAccountFollowers: value,
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
