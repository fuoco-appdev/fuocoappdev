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

export interface AccountPublicState {
  accountId: string | undefined;
  account: core.AccountResponse | undefined;
  customerMetadata: core.CustomerMetadataResponse | undefined;
  accountFollower: core.AccountFollowerResponse | undefined;
  showFollowButton: boolean;
  profileUrl: string | undefined;
  username: string;
  activeTabId: string;
  prevTabIndex: number;
  activeTabIndex: number;
  hasMoreLikes: boolean;
  likesScrollPosition: number | undefined;
  likedProducts: PricedProduct[];
  productLikesMetadata: Record<string, ProductLikesMetadataResponse>;
  likedProductPagination: number;
  areLikedProductsLoading: boolean;
  selectedLikedProduct: PricedProduct | undefined;
  selectedProductLikes: ProductLikesMetadataResponse | undefined;
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
          showFollowButton: false,
          profileUrl: undefined,
          username: '',
          activeTabId: '/account/likes',
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

  public get customerMetadata(): core.CustomerMetadataResponse | undefined {
    return this.store.getValue().customerMetadata;
  }

  public set customerMetadata(
    value: core.CustomerMetadataResponse | undefined
  ) {
    if (JSON.stringify(this.customerMetadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customerMetadata: value }));
    }
  }

  public get accountFollower(): core.AccountFollowerResponse | undefined {
    return this.store.getValue().accountFollower;
  }

  public set accountFollower(value: core.AccountFollowerResponse | undefined) {
    if (JSON.stringify(this.accountFollower) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, accountFollower: value }));
    }
  }

  public get showFollowButton(): boolean {
    return this.store.getValue().showFollowButton;
  }

  public set showFollowButton(value: boolean) {
    if (this.showFollowButton !== value) {
      this.store.update((state) => ({ ...state, showFollowButton: value }));
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

  public get likedProducts(): PricedProduct[] {
    return this.store?.getValue().likedProducts;
  }

  public set likedProducts(value: PricedProduct[]) {
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
}
