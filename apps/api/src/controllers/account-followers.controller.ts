import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
  AccountFollowerRequest,
  AccountFollowerRequestsRequest,
  AccountFollowersRequest,
} from '../protobuf/account-follower_pb.js';
import serviceCollection from '../service_collection.ts';
import AccountFollowersService from '../services/account-followers.service.ts';

@Controller('/account-followers')
export class AccountFollowersController {
  private readonly _accountFollowersService: AccountFollowersService;

  constructor() {
    this._accountFollowersService = serviceCollection.get(
      AccountFollowersService
    );
  }

  @Post('/add')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async addAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const follower = AccountFollowerRequest.deserializeBinary(requestValue);
    const response = await this._accountFollowersService.upsertAsync(follower);
    if (!response) {
      throw HttpError.createError(409, `Cannot add follower`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/remove')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async removeAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const follower = AccountFollowerRequest.deserializeBinary(requestValue);
    const response = await this._accountFollowersService.deleteAsync(follower);
    if (!response) {
      throw HttpError.createError(409, `Cannot remove follower`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/confirm')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async confirmAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const follower = AccountFollowerRequest.deserializeBinary(requestValue);
    const response = await this._accountFollowersService.confirmAsync(follower);
    if (!response) {
      throw HttpError.createError(409, `Cannot confirm follower`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/requests')
  @ContentType('application/x-protobuf')
  public async getRequestsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const followerRequestsRequest =
      AccountFollowerRequestsRequest.deserializeBinary(requestValue);
    const response = await this._accountFollowersService.getRequestsAsync(
      followerRequestsRequest
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find followers`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/followers')
  @ContentType('application/x-protobuf')
  public async getFollowersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const followersRequest =
      AccountFollowersRequest.deserializeBinary(requestValue);
    const response = await this._accountFollowersService.getFollowersAsync(
      followersRequest
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find followers`);
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
    const response = await this._accountFollowersService.getCountMetadataAsync(
      paramsAccountId
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find metadata`);
    }
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
