/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
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
import { AccountPublicModel } from '../models/account-public.model';
import AccountController from './account.controller';
import { S3 } from 'aws-sdk';

class AccountPublicController extends Controller {
  private readonly _model: AccountPublicModel;
  private readonly _limit: number;
  private _usernameTimerId: NodeJS.Timeout | number | undefined;
  private _followersTimerId: NodeJS.Timeout | number | undefined;
  private _followingTimerId: NodeJS.Timeout | number | undefined;
  private _cartSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _publicAccountIdSubscription: Subscription | undefined;
  private _loadedPublicAccountSubscription: Subscription | undefined;
  private _publicAccountSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _s3Subscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountPublicModel();
    this._limit = 10;
  }

  public get model(): AccountPublicModel {
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
    this._loadedPublicAccountSubscription?.unsubscribe();
    this._publicAccountIdSubscription?.unsubscribe();
    this._accountSubscription?.unsubscribe();
    this._publicAccountSubscription?.unsubscribe();
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._cartSubscription?.unsubscribe();
  }

  public loadLikedProducts(): void {
    if (this._model.likedProducts.length > 0) {
      return;
    }

    this._cartSubscription?.unsubscribe();
    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({
        next: (cart) => {
          if (!cart) {
            return;
          }

          this._loadedPublicAccountSubscription?.unsubscribe();
          this._loadedPublicAccountSubscription = this._model.store
            .pipe(select((model) => model.account))
            .subscribe({
              next: async (publicAccount: core.AccountResponse | null) => {
                if (!publicAccount) {
                  return;
                }

                await this.requestLikedProductsAsync(
                  publicAccount,
                  AccountController.model.account
                );
              },
            });
        },
      });
  }

  public async loadFollowersAsync(): Promise<void> {
    this._model.followerAccounts = [];
    this._model.followerScrollPosition = 0;
    this._model.followersPagination = 1;
    this._model.followerAccountFollowers = {};
    this._model.followerCustomers = {};

    this._loadedPublicAccountSubscription?.unsubscribe();
    this._loadedPublicAccountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: async (publicAccount: core.AccountResponse | null) => {
          if (!publicAccount) {
            return;
          }

          await this.followersSearchAsync(
            this._model.followersInput,
            0,
            this._limit
          );
        },
      });
  }

  public async loadFollowingAsync(): Promise<void> {
    this._model.followingAccounts = [];
    this._model.followingScrollPosition = 0;
    this._model.followingPagination = 1;
    this._model.followingAccountFollowers = {};
    this._model.followingCustomers = {};

    this._loadedPublicAccountSubscription?.unsubscribe();
    this._loadedPublicAccountSubscription = this._model.store
      .pipe(select((model) => model.account))
      .subscribe({
        next: async (publicAccount: core.AccountResponse | null) => {
          if (!publicAccount) {
            return;
          }

          await this.followingSearchAsync(
            this._model.followingInput,
            0,
            this._limit
          );
        },
      });
  }

  public updateAccountId(id: string | undefined): void {
    if (this._model.accountId !== id) {
      this.resetMedusaModel();
      this._model.accountId = id;
    }
  }

  public updateFollowersInput(value: string): void {
    this._model.followersInput = value;
    this._model.followersPagination = 1;
    this._model.followerAccounts = [];
    this._model.hasMoreFollowers = true;

    clearTimeout(this._followersTimerId as number | undefined);
    this._followersTimerId = setTimeout(() => {
      this.followersSearchAsync(value, 0, this._limit);
    }, 750);
  }

  public updateFollowingInput(value: string): void {
    this._model.followingInput = value;
    this._model.followingPagination = 1;
    this._model.followingAccounts = [];
    this._model.hasMoreFollowing = true;

    clearTimeout(this._followingTimerId as number | undefined);
    this._followingTimerId = setTimeout(() => {
      this.followingSearchAsync(value, 0, this._limit);
    }, 750);
  }

  public async onNextLikedProductScrollAsync(): Promise<void> {
    if (this._model.areLikedProductsLoading) {
      return;
    }

    this._model.likedProductPagination = this._model.likedProductPagination + 1;
    const offset = this._limit * (this._model.likedProductPagination - 1);
    await this.requestLikedProductsAsync(
      this._model.account,
      AccountController.model.account,
      offset,
      this._limit
    );
  }

  public async onFollowersScrollAsync(): Promise<void> {
    if (this._model.areFollowersLoading) {
      return;
    }

    this._model.followersPagination = this._model.followersPagination + 1;
    const offset = this._limit * (this._model.followersPagination - 1);
    await this.followersSearchAsync(
      this._model.followersInput,
      offset,
      this._limit
    );
  }

  public async onFollowingScrollAsync(): Promise<void> {
    if (this._model.areFollowingLoading) {
      return;
    }

    this._model.followingPagination = this._model.followingPagination + 1;
    const offset = this._limit * (this._model.followingPagination - 1);
    await this.followingSearchAsync(
      this._model.followingInput,
      offset,
      this._limit
    );
  }

  public updateActiveTabId(value: string): void {
    this._model.prevTabIndex = this._model.activeTabIndex;

    switch (value) {
      case RoutePathsType.AccountWithIdLikes:
        this._model.activeTabIndex = 1;
        this._model.activeTabId = value;
        break;
      default:
        break;
    }
  }

  public updateActiveStatusTabId(value: string): void {
    this._model.prevStatusTabIndex = this._model.activeStatusTabIndex;

    switch (value) {
      case RoutePathsType.AccountStatusWithIdFollowers:
        this._model.activeStatusTabIndex = 1;
        this._model.activeStatusTabId = value;
        break;
      case RoutePathsType.AccountStatusWithIdFollowing:
        this._model.activeStatusTabIndex = 1;
        this._model.activeStatusTabId = value;
        break;
      default:
        break;
    }
  }

  public updateLikesScrollPosition(value: number | undefined) {
    this._model.likesScrollPosition = value;
  }

  public updateFollowerScrollPosition(value: number | undefined) {
    this._model.followerScrollPosition = value;
  }

  public updateFollowingScrollPosition(value: number | undefined) {
    this._model.followingScrollPosition = value;
  }

  public updateSelectedLikedProduct(value: PricedProduct | undefined): void {
    this._model.selectedLikedProduct = value;
  }

  public updateSelectedProductLikes(
    value: ProductLikesMetadataResponse | undefined
  ): void {
    this._model.selectedProductLikes = value;
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
    this.requestLikedProductsAsync(
      this._model.account,
      AccountController.model.account,
      0,
      this._limit
    );
  }

  public async followersSearchAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && this._model.areFollowersLoading) {
      return;
    }

    this._model.areFollowersLoading = true;

    try {
      const accountsResponse = await AccountService.requestFollowersSearchAsync(
        {
          queryUsername: query,
          accountId: this._model.account?.id ?? '',
          offset: offset,
          limit: limit,
        }
      );

      if (!accountsResponse.accounts || accountsResponse.accounts.length <= 0) {
        this._model.hasMoreFollowers = false;
        this._model.areFollowersLoading = false;
        return;
      }

      if (accountsResponse.accounts.length < limit) {
        this._model.hasMoreFollowers = false;
      } else {
        this._model.hasMoreFollowers = true;
      }

      if (offset > 0) {
        const followerAccounts = this._model.followerAccounts;
        this._model.followerAccounts = followerAccounts.concat(
          accountsResponse.accounts
        );
      } else {
        this._model.followerAccounts = accountsResponse.accounts;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const otherAccountIds = this._model.followerAccounts.map(
        (value) => value.id
      );
      const followerResponse =
        await AccountFollowersService.requestFollowersAsync({
          accountId: this._model.account?.id ?? '',
          otherAccountIds: otherAccountIds,
        });

      const followerAccountFollowers = {
        ...this._model.followerAccountFollowers,
      };
      for (const follower of followerResponse?.followers ?? []) {
        followerAccountFollowers[follower.followerId] = follower;
        this._model.followerAccountFollowers = followerAccountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const customerIds = this._model.followerAccounts.map(
        (value) => value.customerId
      );
      const customersResponse = await MedusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      if (customersResponse) {
        const followerCustomers = { ...this._model.followerCustomers };
        for (const customer of customersResponse) {
          followerCustomers[customer.id] = customer;
        }

        this._model.followerCustomers = followerCustomers;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areFollowersLoading = false;
  }

  public async followingSearchAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && this._model.areFollowingLoading) {
      return;
    }

    this._model.areFollowingLoading = true;

    try {
      const accountsResponse = await AccountService.requestFollowingSearchAsync(
        {
          queryUsername: query,
          accountId: this._model.account?.id ?? '',
          offset: offset,
          limit: limit,
        }
      );

      if (!accountsResponse.accounts || accountsResponse.accounts.length <= 0) {
        this._model.hasMoreFollowing = false;
        this._model.areFollowingLoading = false;
        return;
      }

      if (accountsResponse.accounts.length < limit) {
        this._model.hasMoreFollowing = false;
      } else {
        this._model.hasMoreFollowing = true;
      }

      if (offset > 0) {
        const followingAccounts = this._model.followingAccounts;
        this._model.followingAccounts = followingAccounts.concat(
          accountsResponse.accounts
        );
      } else {
        this._model.followingAccounts = accountsResponse.accounts;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const otherAccountIds = this._model.followingAccounts.map(
        (value) => value.id
      );
      const followerResponse =
        await AccountFollowersService.requestFollowersAsync({
          accountId: this._model.account?.id ?? '',
          otherAccountIds: otherAccountIds,
        });

      const followingAccountFollowers = {
        ...this._model.followingAccountFollowers,
      };
      for (const follower of followerResponse?.followers ?? []) {
        followingAccountFollowers[follower.followerId] = follower;
        this._model.followingAccountFollowers = followingAccountFollowers;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const customerIds = this._model.followingAccounts.map(
        (value) => value.customerId
      );
      const customersResponse = await MedusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      if (customersResponse) {
        const followingCustomers = { ...this._model.followingCustomers };
        for (const customer of customersResponse) {
          followingCustomers[customer.id] = customer;
        }

        this._model.followingCustomers = followingCustomers;
      }
    } catch (error: any) {
      console.error(error);
    }

    this._model.areFollowingLoading = false;
  }

  private async requestLikedProductsAsync(
    publicAccount: core.AccountResponse | undefined,
    account: core.AccountResponse | undefined,
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (this._model.areLikedProductsLoading || !publicAccount) {
      return;
    }

    this._model.areLikedProductsLoading = true;

    let productIds: string[] = [];
    try {
      const publicAccountProductLikesMetadataResponse =
        await ProductLikesService.requestAccountLikesMetadataAsync({
          accountId: publicAccount.id,
          offset: offset,
          limit: limit,
        });

      if (
        !publicAccountProductLikesMetadataResponse.metadata ||
        publicAccountProductLikesMetadataResponse.metadata.length <= 0
      ) {
        this._model.hasMoreLikes = false;
        this._model.areLikedProductsLoading = false;
        return;
      }

      if (publicAccountProductLikesMetadataResponse.metadata.length < limit) {
        this._model.hasMoreLikes = false;
      } else {
        this._model.hasMoreLikes = true;
      }

      const productLikesMetadata = { ...this._model.productLikesMetadata };
      for (const metadata of publicAccountProductLikesMetadataResponse.metadata) {
        productLikesMetadata[metadata.productId] = metadata;
      }

      productIds = publicAccountProductLikesMetadataResponse.metadata.map(
        (value) => value.productId
      );

      if (account) {
        const accountProductLikesMetadataResponse =
          await ProductLikesService.requestMetadataAsync({
            accountId: account.id,
            productIds: productIds,
          });
        const accountProductLikesMetadata =
          accountProductLikesMetadataResponse.metadata;
        for (const key in productLikesMetadata) {
          const index = accountProductLikesMetadata.findIndex(
            (value) => value.productId === key
          );
          productLikesMetadata[key].didAccountLike =
            accountProductLikesMetadata[index].didAccountLike;
        }
      }

      this._model.productLikesMetadata = productLikesMetadata;
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

  private resetMedusaModel(): void {
    this._model.account = undefined;
    this._model.customerMetadata = undefined;
    this._model.accountFollower = undefined;
    this._model.showFollowButton = undefined;
    this._model.profileUrl = undefined;
    this._model.username = '';
    this._model.activeTabId = RoutePathsType.AccountLikes;
    this._model.prevTabIndex = 0;
    this._model.activeTabIndex = 0;
    this._model.likedProducts = [];
    this._model.likesScrollPosition = 0;
    this._model.likedProductPagination = 1;
    this._model.productLikesMetadata = {};
    this._model.followersInput = '';
    this._model.followerAccounts = [];
    this._model.followerScrollPosition = 0;
    this._model.followersPagination = 1;
    this._model.followerAccountFollowers = {};
    this._model.followerCustomers = {};
    this._model.followingInput = '';
    this._model.followingAccounts = [];
    this._model.followingScrollPosition = 0;
    this._model.followingPagination = 1;
    this._model.followingAccountFollowers = {};
    this._model.followingCustomers = {};
    this._model.likeCount = undefined;
    this._model.followerCount = undefined;
    this._model.followingCount = undefined;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._publicAccountIdSubscription?.unsubscribe();
    this._publicAccountIdSubscription = this._model.store
      .pipe(select((model) => model.accountId))
      .subscribe({
        next: async (id: string | undefined) => {
          if (!id) {
            return;
          }

          try {
            const accountsResponse = await AccountService.requestAccountsAsync([
              id,
            ]);
            if (accountsResponse.accounts.length > 0) {
              this._model.account = accountsResponse.accounts[0];
            }
          } catch (error: any) {
            console.error(error);
          }

          if (!this._model.account) {
            return;
          }

          try {
            await this.initializeAccountAsync(this._model.account);
          } catch (error: any) {
            console.error(error);
          }

          try {
            this._model.customerMetadata =
              await MedusaService.requestCustomerMetadataAsync(
                this._model.account?.customerId ?? ''
              );
          } catch (error: any) {
            console.error(error);
          }

          try {
            await this.initializeS3BucketAsync(this._model.account);
          } catch (error: any) {
            console.error(error);
          }

          this.requestFollowerCountMetadataAsync(id);
          this.requestLikeCountAsync(id);
        },
      });
  }

  private async initializeAccountAsync(
    publicAccount: core.AccountResponse
  ): Promise<core.AccountResponse | undefined> {
    return new Promise<core.AccountResponse | undefined>((resolve, reject) => {
      this._accountSubscription?.unsubscribe();
      this._accountSubscription = AccountController.model.store
        .pipe(select((model) => model.account))
        .subscribe({
          next: async (account: core.AccountResponse | undefined) => {
            if (!account) {
              return;
            }

            try {
              const accountFollowerResponse =
                await AccountFollowersService.requestFollowersAsync({
                  accountId: account?.id ?? '',
                  otherAccountIds: [publicAccount.id],
                });
              if (
                AccountController.model.account?.id !== publicAccount.id &&
                accountFollowerResponse?.followers
              ) {
                this._model.accountFollower =
                  accountFollowerResponse?.followers.length > 0
                    ? accountFollowerResponse?.followers[0]
                    : undefined;
                this._model.showFollowButton = true;
              } else {
                this._model.showFollowButton = false;
              }
              resolve(account);
            } catch (error: any) {
              console.error(error);
              reject(error);
            }
          },
        });
    });
  }

  public async initializeS3BucketAsync(
    publicAccount: core.AccountResponse | null
  ): Promise<S3 | undefined> {
    return new Promise<S3 | undefined>((resolve, reject) => {
      this._s3Subscription?.unsubscribe();
      this._s3Subscription = BucketService.s3Observable.subscribe(
        async (s3: S3 | undefined) => {
          if (!s3) {
            return;
          }

          if (
            publicAccount?.profileUrl &&
            publicAccount.profileUrl.length > 0
          ) {
            try {
              this._model.profileUrl = await BucketService.getPublicUrlAsync(
                core.StorageFolderType.Avatars,
                publicAccount.profileUrl
              );
              resolve(s3);
            } catch (error: any) {
              console.error(error);
              reject(error);
            }
          }
        }
      );
    });
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
}

export default new AccountPublicController();
