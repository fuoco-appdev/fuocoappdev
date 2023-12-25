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
  private _cartSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _publicAccountIdSubscription: Subscription | undefined;
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

          this._publicAccountSubscription?.unsubscribe();
          this._publicAccountSubscription = this._model.store
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

  public updateAccountId(id: string | undefined): void {
    this._model.accountId = id;
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

  public updateActiveTabId(value: string): void {
    this._model.prevTabIndex = this._model.activeTabIndex;

    switch (value) {
      case RoutePathsType.AccountLikes:
        this._model.activeTabIndex = 1;
        this._model.activeTabId = value;
        break;
      default:
        break;
    }
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
    this._model.showFollowButton = false;
    this._model.profileUrl = undefined;
    this._model.username = '';
    this._model.activeTabId = RoutePathsType.AccountLikes;
    this._model.prevTabIndex = 0;
    this._model.activeTabIndex = 0;
    this._model.likedProducts = [];
    this._model.likesScrollPosition = 0;
    this._model.likedProductPagination = 1;
    this._model.productLikesMetadata = {};
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

          this._model.likedProducts = [];
          this._model.likesScrollPosition = 0;
          this._model.likedProductPagination = 1;
          this._model.productLikesMetadata = {};
          try {
            const accountsResponse = await AccountService.requestAccountsAsync([
              id,
            ]);
            if (accountsResponse.accounts.length > 0) {
              this._model.account = accountsResponse.accounts[0];
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

              try {
                await this.initializeAccountAsync(this._model.account);
              } catch (error: any) {
                console.error(error);
              }
            }
          } catch (error: any) {
            console.error(error);
          }
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
              if (accountFollowerResponse?.followers) {
                this._model.accountFollower =
                  accountFollowerResponse?.followers.length > 0
                    ? accountFollowerResponse?.followers[0]
                    : undefined;
                this._model.showFollowButton = true;
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
}

export default new AccountPublicController();
