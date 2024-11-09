import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
  AccountProductLikesMetadataRequest,
  ProductLikeRequest,
  ProductLikesMetadataRequest,
} from '../protobuf/product-like_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import ProductLikesService from '../services/product-likes.service.ts';

@Controller('/product-likes')
export class ProductLikesController {
  private readonly _productLikesService: ProductLikesService;

  constructor() {
    this._productLikesService = serviceCollection.get(
      serviceTypes.ProductLikesService
    );
  }

  @Post('/add')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async addLikeAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const productLike = ProductLikeRequest.deserializeBinary(requestValue);
    const response = await this._productLikesService.upsertAsync(productLike);
    if (!response) {
      throw HttpError.createError(409, `Cannot add product like`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/remove')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async removeLikeAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const productLike = ProductLikeRequest.deserializeBinary(requestValue);
    const response = await this._productLikesService.deleteAsync(productLike);
    if (!response) {
      throw HttpError.createError(409, `Cannot remove product like`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/metadata')
  @ContentType('application/x-protobuf')
  public async getMetadataAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const metadataRequest =
      ProductLikesMetadataRequest.deserializeBinary(requestValue);
    const response = await this._productLikesService.getMetadataAsync(
      metadataRequest
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find metadata`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/account-metadata')
  @ContentType('application/x-protobuf')
  public async getAccountMetadataAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const metadataRequest =
      AccountProductLikesMetadataRequest.deserializeBinary(requestValue);
    const response = await this._productLikesService.getAccountMetadataAsync(
      metadataRequest
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find metadata`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/count-metadata/:accountId')
  @ContentType('application/x-protobuf')
  public async getCountMetadataAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsAccountId = context.params['accountId'];
    const response = await this._productLikesService.getCountMetadataAsync(
      paramsAccountId
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find metadata`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
