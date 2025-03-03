import {
  AccountProductLikesMetadataRequest,
  ProductLikeCountMetadataResponse,
  ProductLikeRequest,
  ProductLikesMetadataRequest,
  ProductLikesMetadataResponse,
  ProductLikesMetadatasResponse,
} from '../protobuf/product-like_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export default class ProductLikesService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _logflareService: LogflareService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestCountMetadataAsync(
    accountId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<ProductLikeCountMetadataResponse> {
    try {
      const response = await fetch(
        `${this.endpointUrl}/product-likes/count-metadata/${accountId}`,
        {
          method: 'post',
          headers: {
            ...this.headers,
          },
          body: '',
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const productLikeCountMetadataResponse =
        ProductLikeCountMetadataResponse.fromBinary(arrayBuffer);
      return productLikeCountMetadataResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCountMetadataAsync(
          accountId,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestMetadataAsync(
    props: {
      accountId: string;
      productIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ProductLikesMetadatasResponse> {
    try {
      const productLikesMetadataRequest = new ProductLikesMetadataRequest({
        accountId: props.accountId,
        productIds: props.productIds,
      });

      const response = await fetch(
        `${this.endpointUrl}/product-likes/metadata`,
        {
          method: 'post',
          headers: {
            ...this.headers,
          },
          body: productLikesMetadataRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const productLikesMetadatasResponse =
        ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
      return productLikesMetadatasResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestMetadataAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestAccountLikesMetadataAsync(
    props: {
      accountId: string;
      offset?: number;
      limit?: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ProductLikesMetadatasResponse> {
    try {
      const accountProductLikesMetadataRequest =
        new AccountProductLikesMetadataRequest({
          accountId: props.accountId,
          offset: props.offset,
          limit: props.limit,
        });

      const response = await fetch(
        `${this.endpointUrl}/product-likes/account-metadata`,
        {
          method: 'post',
          headers: {
            ...this.headers,
          },
          body: accountProductLikesMetadataRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const productLikesMetadatasResponse =
        ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
      return productLikesMetadatasResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAccountLikesMetadataAsync(
          props,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestAddAsync(
    props: {
      productId: string;
      accountId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ProductLikesMetadataResponse | null> {
    try {
      const session = await this._supabaseService.requestSessionAsync();
      const productLikeRequest = new ProductLikeRequest({
        productId: props.productId,
        accountId: props.accountId,
      });
      const response = await fetch(`${this.endpointUrl}/product-likes/add`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: productLikeRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const productLikesMetadatasResponse =
        ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
      if (productLikesMetadatasResponse.metadata.length > 0) {
        return productLikesMetadatasResponse.metadata[0];
      }

      return null;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAddAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestRemoveAsync(
    props: {
      productId: string;
      accountId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<ProductLikesMetadataResponse | null> {
    try {
      const session = await this._supabaseService.requestSessionAsync();
      const productLikeRequest = new ProductLikeRequest({
        productId: props.productId,
        accountId: props.accountId,
      });
      const response = await fetch(`${this.endpointUrl}/product-likes/remove`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: productLikeRequest.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const productLikesMetadatasResponse =
        ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
      if (productLikesMetadatasResponse.metadata.length > 0) {
        return productLikesMetadatasResponse.metadata[0];
      }

      return null;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestRemoveAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }
}
