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
import SupabaseService from './supabase.service';

export default class ProductLikesService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestCountMetadataAsync(
    accountId: string
  ): Promise<ProductLikeCountMetadataResponse> {
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
  }

  public async requestMetadataAsync(props: {
    accountId: string;
    productIds: string[];
  }): Promise<ProductLikesMetadatasResponse> {
    const productLikesMetadataRequest = new ProductLikesMetadataRequest({
      accountId: props.accountId,
      productIds: props.productIds,
    });

    const response = await fetch(`${this.endpointUrl}/product-likes/metadata`, {
      method: 'post',
      headers: {
        ...this.headers,
      },
      body: productLikesMetadataRequest.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse =
      ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
    return productLikesMetadatasResponse;
  }

  public async requestAccountLikesMetadataAsync(props: {
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<ProductLikesMetadatasResponse> {
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
  }

  public async requestAddAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<ProductLikesMetadataResponse | null> {
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
  }

  public async requestRemoveAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<ProductLikesMetadataResponse | null> {
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
  }
}
