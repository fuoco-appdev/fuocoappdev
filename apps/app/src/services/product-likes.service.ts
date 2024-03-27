import { Service } from "../service";
import { BehaviorSubject, Observable } from "rxjs";
import SupabaseService from "./supabase.service";
import axios, { AxiosError } from "axios";
import WindowController from "../controllers/window.controller";
import { Session, User } from "@supabase/supabase-js";
import {
  AccountProductLikesMetadataRequest,
  ProductLikeCountMetadataResponse,
  ProductLikeRequest,
  ProductLikesMetadataRequest,
  ProductLikesMetadataResponse,
  ProductLikesMetadatasResponse,
} from "../protobuf/product-like_pb";

class ProductLikesService extends Service {
  constructor() {
    super();
  }

  public async requestCountMetadataAsync(
    accountId: string,
  ): Promise<ProductLikeCountMetadataResponse> {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/product-likes/count-metadata/${accountId}`,
      headers: {
        ...this.headers,
      },
      data: "",
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikeCountMetadataResponse = ProductLikeCountMetadataResponse
      .fromBinary(arrayBuffer);
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

    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/product-likes/metadata`,
      headers: {
        ...this.headers,
      },
      data: productLikesMetadataRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse = ProductLikesMetadatasResponse
      .fromBinary(arrayBuffer);
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

    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/product-likes/account-metadata`,
      headers: {
        ...this.headers,
      },
      data: accountProductLikesMetadataRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse = ProductLikesMetadatasResponse
      .fromBinary(arrayBuffer);
    return productLikesMetadatasResponse;
  }

  public async requestAddAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<ProductLikesMetadataResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const productLikeRequest = new ProductLikeRequest({
      productId: props.productId,
      accountId: props.accountId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/product-likes/add`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: productLikeRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse = ProductLikesMetadatasResponse
      .fromBinary(arrayBuffer);
    if (productLikesMetadatasResponse.metadata.length > 0) {
      return productLikesMetadatasResponse.metadata[0];
    }

    return null;
  }

  public async requestRemoveAsync(props: {
    productId: string;
    accountId: string;
  }): Promise<ProductLikesMetadataResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const productLikeRequest = new ProductLikeRequest({
      productId: props.productId,
      accountId: props.accountId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/product-likes/remove`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: productLikeRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productLikesMetadatasResponse = ProductLikesMetadatasResponse
      .fromBinary(arrayBuffer);
    if (productLikesMetadatasResponse.metadata.length > 0) {
      return productLikesMetadatasResponse.metadata[0];
    }

    return null;
  }
}

export default new ProductLikesService();
