/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpTypes } from '@medusajs/types';
import { Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { AccountPublicModel } from '../models/account-public.model';
import { AccountDocument } from '../models/account.model';
import { AccountResponse } from '../protobuf/account_pb';
import { StorageFolderType } from '../protobuf/common_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { RoutePathsType } from '../route-paths-type';
import AccountFollowersService from '../services/account-followers.service';
import AccountService from '../services/account.service';
import BucketService from '../services/bucket.service';
import MedusaService from '../services/medusa.service';
import ProductLikesService from '../services/product-likes.service';
import { StoreOptions } from '../store-options';
import AccountController from './account.controller';

export default class AccountPublicController extends Controller {
  private readonly _model: AccountPublicModel;
  private readonly _limit: number;
  private _usernameTimerId: NodeJS.Timeout | number | undefined;
  private _followersTimerId: NodeJS.Timeout | number | undefined;
  private _followingTimerId: NodeJS.Timeout | number | undefined;
  private _cartDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;
  private _publicAccountIdDisposer: Lambda | undefined;
  private _publicAccountDisposer: Lambda | undefined;
  private _accountDisposer: Lambda | undefined;
  private _loadedAccountDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      MedusaService: MedusaService;
      AccountService: AccountService;
      AccountController: AccountController;
      AccountFollowersService: AccountFollowersService;
      ProductLikesService: ProductLikesService;
      BucketService: BucketService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new AccountPublicModel(this._storeOptions);
    this._limit = 10;
  }

  public get model(): AccountPublicModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    const medusaService = this._container.get('MedusaService');
    this._medusaAccessTokenDisposer = observe(
      medusaService,
      'accessToken',
      (value) => {
        if (!value.newValue) {
          this.resetMedusaModel();
          this.initializeAsync(renderCount);
        }
      }
    );
  }

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    clearTimeout(this._followingTimerId as number | undefined);
    clearTimeout(this._followersTimerId as number | undefined);
    clearTimeout(this._usernameTimerId as number | undefined);
    this._publicAccountIdDisposer?.();
    this._loadedAccountDisposer?.();
    this._accountDisposer?.();
    this._publicAccountDisposer?.();
    this._medusaAccessTokenDisposer?.();
    this._cartDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public async loadLikedProductsAsync(id: string): Promise<void> {
    const accountController = this._container.get('AccountController');
    await when(() => accountController.model.account !== undefined);
    const account = accountController.model.account;
    this._model.updateLikedProducts([]);
    this._model.updateLikesScrollPosition(0);
    this._model.updateLikedProductPagination(1);
    this._model.updateProductLikesMetadata({});

    await this.requestLikedProductsAsync(id, account?.id, 0, this._limit);
  }

  public async loadFollowersAsync(): Promise<void> {
    this._model.updateFollowerAccounts([]);
    this._model.updateFollowerScrollPosition(0);
    this._model.updateFollowersPagination(1);
    this._model.updateFollowerAccountFollowers({});

    await when(() => this._model.account !== undefined);
    const publicAccount = this._model.account;

    if (!publicAccount) {
      return;
    }

    await this.followersSearchAsync(
      this._model.followersFollowingInput,
      0,
      this._limit
    );
  }

  public async loadFollowingAsync(): Promise<void> {
    this._model.updateFollowingAccounts([]);
    this._model.updateFollowingScrollPosition(0);
    this._model.updateFollowingPagination(1);
    //this._model.updateFollowingAccountFollowers({});

    await when(() => this._model.account !== undefined);
    const publicAccount = this._model.account;

    if (!publicAccount) {
      return;
    }

    await this.followingSearchAsync(
      this._model.followersFollowingInput,
      0,
      this._limit
    );
  }

  public updateAccountId(id: string | undefined): void {
    this._model.updateAccountId(id);
  }

  public updateFollowersInput(value: string): void {
    this._model.updateFollowersFollowingInput(value);
    this._model.updateFollowersPagination(1);
    this._model.updateFollowerAccounts([]);
    this._model.updateHasMoreFollowers(true);

    clearTimeout(this._followersTimerId as number | undefined);
    this._followersTimerId = setTimeout(() => {
      this.followersSearchAsync(value, 0, this._limit);
    }, 750);
  }

  public updateFollowingInput(value: string): void {
    this._model.updateFollowersFollowingInput(value);
    this._model.updateFollowingPagination(1);
    this._model.updateFollowingAccounts([]);
    this._model.updateHasMoreFollowing(true);

    clearTimeout(this._followingTimerId as number | undefined);
    this._followingTimerId = setTimeout(() => {
      this.followingSearchAsync(value, 0, this._limit);
    }, 750);
  }

  public async onNextLikedProductScrollAsync(): Promise<void> {
    if (this._model.areLikedProductsLoading || !this._model.accountId) {
      return;
    }

    this._model.updateLikedProductPagination(
      this._model.likedProductPagination + 1
    );
    const offset = this._limit * (this._model.likedProductPagination - 1);
    const accountController = this._container.get('AccountController');
    await this.requestLikedProductsAsync(
      this._model.accountId,
      accountController.model.account?.id,
      offset,
      this._limit
    );
  }

  public async onFollowersScrollAsync(): Promise<void> {
    if (this._model.areFollowersLoading) {
      return;
    }

    this._model.updateFollowersPagination(this._model.followersPagination + 1);
    const offset = this._limit * (this._model.followersPagination - 1);
    await this.followersSearchAsync(
      this._model.followersFollowingInput,
      offset,
      this._limit
    );
  }

  public async onFollowingScrollAsync(): Promise<void> {
    if (this._model.areFollowingLoading) {
      return;
    }

    this._model.updateFollowingPagination(this._model.followingPagination + 1);
    const offset = this._limit * (this._model.followingPagination - 1);
    await this.followingSearchAsync(
      this._model.followersFollowingInput,
      offset,
      this._limit
    );
  }

  public updateActiveTabId(value: string): void {
    this._model.updatePrevTabIndex(this._model.activeTabIndex);

    switch (value) {
      case RoutePathsType.AccountWithIdLikes:
        this._model.updateActiveTabIndex(1);
        this._model.updateActiveTabId(value);
        break;
      default:
        break;
    }
  }

  public updateActiveStatusTabId(value: string): void {
    this._model.updatePrevStatusTabIndex(this._model.activeStatusTabIndex);

    switch (value) {
      case RoutePathsType.AccountStatusWithIdFollowers:
        this._model.updateActiveStatusTabIndex(1);
        this._model.updateActiveStatusTabId(value);
        break;
      case RoutePathsType.AccountStatusWithIdFollowing:
        this._model.updateActiveStatusTabIndex(1);
        this._model.updateActiveStatusTabId(value);
        break;
      default:
        break;
    }
  }

  public updateLikesScrollPosition(value: number | undefined) {
    this._model.updateLikesScrollPosition(value);
  }

  public updateFollowerScrollPosition(value: number | undefined) {
    this._model.followerScrollPosition = value;
  }

  public updateFollowingScrollPosition(value: number | undefined) {
    this._model.followingScrollPosition = value;
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

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse
  ): void {
    if (!this._model.accountId) {
      return;
    }

    const productLikesMetadata = { ...this._model.productLikesMetadata };
    productLikesMetadata[id] = metadata;

    if (!metadata.didAccountLike) {
      delete productLikesMetadata[id];
    }

    this._model.productLikesMetadata = productLikesMetadata;
    const accountController = this._container.get('AccountController');
    this.requestLikedProductsAsync(
      this._model.accountId,
      accountController.model.account?.id,
      0,
      this._limit
    );
  }

  public async followersSearchAsync(
    query: string,
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (!force && this._model.areFollowersLoading) {
      return;
    }

    this._model.areFollowersLoading = true;

    await when(() => this._model.account !== undefined);
    const account = this._model.account;
    let followerAccounts: AccountDocument[] = [];
    const accountService = this._container.get('AccountService');
    try {
      const accountsResponse = await accountService.requestFollowersSearchAsync(
        {
          queryUsername: query,
          accountId: account?.id ?? '',
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
        followerAccounts = this._model.followerAccounts.concat(documents);
      } else {
        followerAccounts = documents;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const otherAccountIds = followerAccounts.map((value) => value.id ?? '');
      const accountFollowersService = this._container.get(
        'AccountFollowersService'
      );
      const followerResponse =
        await accountFollowersService.requestFollowersAsync({
          accountId: account?.id ?? '',
          otherAccountIds: otherAccountIds,
        });

      const followerAccountFollowers = {
        ...this._model.followerAccountFollowers,
      };
      for (const follower of followerResponse?.followers ?? []) {
        followerAccountFollowers[follower.followerId] = follower;
      }

      this._model.followerAccountFollowers = followerAccountFollowers;
    } catch (error: any) {
      console.error(error);
    }

    try {
      const customerIds: string[] = followerAccounts.map(
        (value) => value.customer_id ?? ''
      );
      const medusaService = this._container.get('MedusaService');
      const customersResponse = await medusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      for (let i = 0; i < followerAccounts.length; i++) {
        const customerId = followerAccounts[i].customer_id;
        const customer = customersResponse?.find(
          (value) => value.id === customerId
        );
        followerAccounts[i].customer = {
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

    this._model.followerAccounts = followerAccounts;
    this._model.areFollowersLoading = false;
  }

  public async followingSearchAsync(
    query: string,
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (!force && this._model.areFollowingLoading) {
      return;
    }

    this._model.areFollowingLoading = true;

    await when(() => this._model.account !== undefined);
    const account = this._model.account;
    let followingAccounts: AccountDocument[] = [];
    try {
      const accountService = this._container.get('AccountService');
      const accountsResponse = await accountService.requestFollowingSearchAsync(
        {
          queryUsername: query,
          accountId: account?.id ?? '',
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
        followingAccounts = this._model.followingAccounts.concat(documents);
      } else {
        followingAccounts = documents;
      }
    } catch (error: any) {
      console.error(error);
    }

    try {
      const otherAccountIds = followingAccounts.map((value) => value.id ?? '');
      const accountFollowersService = this._container.get(
        'AccountFollowersService'
      );
      const followerResponse =
        await accountFollowersService.requestFollowersAsync({
          accountId: account?.id ?? '',
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
      const customerIds: string[] = followingAccounts.map(
        (value) => value.customer_id ?? ''
      );
      const medusaService = this._container.get('MedusaService');
      const customersResponse = await medusaService.requestCustomersAsync({
        customerIds: customerIds,
      });
      for (let i = 0; i < followingAccounts.length; i++) {
        const customerId = followingAccounts[i].customer_id;
        const customer = customersResponse?.find(
          (value) => value.id === customerId
        );
        followingAccounts[i].customer = {
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

    this._model.followingAccounts = followingAccounts;
    this._model.areFollowingLoading = false;
  }

  public resetMedusaModel(): void {
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
    this._model.followersFollowingInput = '';
    this._model.followerAccounts = [];
    this._model.followerScrollPosition = 0;
    this._model.followersPagination = 1;
    this._model.followerAccountFollowers = {};
    this._model.followingAccounts = [];
    this._model.followingScrollPosition = 0;
    this._model.followingPagination = 1;
    this._model.followingAccountFollowers = {};
    this._model.likeCount = undefined;
    this._model.followerCount = undefined;
    this._model.followingCount = undefined;
  }

  private async requestLikedProductsAsync(
    publicAccountId: string,
    accountId: string | undefined,
    offset = 0,
    limit = 10,
    force = false
  ): Promise<void> {
    if (!publicAccountId) {
      return;
    }

    if (!force && this._model.areLikedProductsLoading) {
      return;
    }

    this._model.areLikedProductsLoading = true;

    let productIds: string[] = [];
    try {
      const productLikesService = this._container.get('ProductLikesService');
      const publicAccountProductLikesMetadataResponse =
        await productLikesService.requestAccountLikesMetadataAsync({
          accountId: publicAccountId,
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

      if (accountId) {
        const productLikesService = this._container.get('ProductLikesService');
        const accountProductLikesMetadataResponse =
          await productLikesService.requestMetadataAsync({
            accountId: accountId,
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
      const medusaService = this._container.get('MedusaService');
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
      this._model.hasMoreLikes = false;
    }

    this._model.areLikedProductsLoading = false;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {
    this._publicAccountIdDisposer?.();
    this._publicAccountIdDisposer = observe(
      this._model,
      'accountId',
      async (value) => {
        const id = value.newValue;
        if (!id) {
          return;
        }

        this.resetMedusaModel();

        try {
          const accountService = this._container.get('AccountService');
          const accountsResponse = await accountService.requestAccountsAsync([
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

        this.initializeAccountSubscription(this._model.account);

        try {
          const medusaService = this._container.get('MedusaService');
          this._model.customerMetadata =
            await medusaService.requestCustomerMetadataAsync(
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
          await this.requestFollowerCountMetadataAsync(id);
        } catch (error: any) {
          console.error(error);
        }

        try {
          await this.requestLikeCountAsync(id);
        } catch (error: any) {
          console.error(error);
        }
      }
    );
  }

  private initializeAccountSubscription(publicAccount: AccountResponse): void {
    this._accountDisposer?.();
    const accountController = this._container.get('AccountController');
    this._accountDisposer = observe(
      accountController.model,
      'account',
      async (value) => {
        const account = value.newValue;
        if (!account) {
          return;
        }

        try {
          const accountFollowersService = this._container.get(
            'AccountFollowersService'
          );
          const accountFollowerResponse =
            await accountFollowersService.requestFollowersAsync({
              accountId: account?.id ?? '',
              otherAccountIds: [publicAccount.id],
            });
          const accountController = this._container.get('AccountController');
          if (
            accountController.model.account?.id !== publicAccount.id &&
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
        } catch (error: any) {
          console.error(error);
        }
      }
    );
  }

  public async initializeS3BucketAsync(
    publicAccount: AccountResponse | null
  ): Promise<void> {
    const bucketService = this._container.get('BucketService');
    await when(() => bucketService.s3 !== undefined);
    const s3 = bucketService.s3;
    if (!s3) {
      return;
    }

    if (publicAccount?.profileUrl && publicAccount.profileUrl.length > 0) {
      try {
        const bucketService = this._container.get('BucketService');
        this._model.profileUrl = await bucketService.getPublicUrlAsync(
          StorageFolderType.Avatars,
          publicAccount.profileUrl
        );
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async requestLikeCountAsync(accountId: string): Promise<void> {
    try {
      const productLikesService = this._container.get('ProductLikesService');
      const response = await productLikesService.requestCountMetadataAsync(
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
      const accountFollowersService = this._container.get(
        'AccountFollowersService'
      );
      const response = await accountFollowersService.requestCountMetadataAsync(
        accountId
      );
      this._model.followerCount = response.followersCount;
      this._model.followingCount = response.followingCount;
    } catch (error: any) {
      console.error(error);
    }
  }
}
