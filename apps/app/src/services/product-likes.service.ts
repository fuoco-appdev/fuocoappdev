import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';
import { Session, User } from '@supabase/supabase-js';

class ProductLikesService extends Service {
  constructor() {
    super();
  }

  public async requestMetadataAsync(props: {
    accountId: string;
    productIds: string[];
  }): Promise<core.ProductLikesMetadatasResponse> {
    const productLikesMetadataRequest = new core.ProductLikesMetadataRequest({
      accountId: props.accountId,
      productIds: props.productIds,
    });

    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/product-likes/metadata`,
      headers: {
        ...this.headers,
      },
      data: productLikesMetadataRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse =
      core.ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
    return productLikesMetadatasResponse;
  }

  public async requestAccountLikesMetadataAsync(props: {
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<core.ProductLikesMetadatasResponse> {
    const accountProductLikesMetadataRequest =
      new core.AccountProductLikesMetadataRequest({
        accountId: props.accountId,
        offset: props.offset,
        limit: props.limit,
      });

    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/product-likes/account-metadata`,
      headers: {
        ...this.headers,
      },
      data: accountProductLikesMetadataRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse =
      core.ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
    return productLikesMetadatasResponse;
  }

  public async requestAddAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<core.ProductLikesMetadataResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const productLikeRequest = new core.ProductLikeRequest({
      productId: props.productId,
      accountId: props.accountId,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/product-likes/add`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: productLikeRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse =
      core.ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
    if (productLikesMetadatasResponse.metadata.length > 0) {
      return productLikesMetadatasResponse.metadata[0];
    }

    return null;
  }

  public async requestRemoveAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<core.ProductLikesMetadataResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const productLikeRequest = new core.ProductLikeRequest({
      productId: props.productId,
      accountId: props.accountId,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/product-likes/remove`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: productLikeRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse =
      core.ProductLikesMetadatasResponse.fromBinary(arrayBuffer);
    if (productLikesMetadatasResponse.metadata.length > 0) {
      return productLikesMetadatasResponse.metadata[0];
    }

    return null;
  }
}

export default new ProductLikesService();
