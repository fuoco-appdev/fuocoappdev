// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Guard, ContentType } from '../index.ts';
import { User as SupabaseUser } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';
import {
  GettingStartedRequest,
  User,
  UserRequestStatus,
} from '../protobuf/core_pb.js';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import SupabaseService from '../services/supabase.service.ts';
import MailService from '../services/mail.service.ts';

@Controller('/user')
export class UserController {
  @Post('/create')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async createUserAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const token = context.request.headers.get('session-token') ?? '';
    const supabaseUser = await SupabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const body = context.request.body({
      contentTypes: {
        bytes: ['text'],
      },
    });
    const requestValue = await body.value;
    console.log(requestValue);
    const user = User.deserializeBinary(requestValue);
    console.log(user);
    const data = await UserService.createAsync(supabaseUser.data.user.id, user);

    if (!data) {
      throw HttpError.createError(409, `Cannot create user`);
    }

    const responseUser = UserService.assignAndGetUserProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = responseUser.serializeBinary();
  }

  @Post('/all')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getAllUsersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const data = await UserService.findAllAsync();
    if (!data) {
      throw HttpError.createError(404, `No users were found`);
    }

    const users = UserService.assignAndGetUsersProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = users.serializeBinary();
  }

  @Post('/public/all')
  @ContentType('application/x-protobuf')
  public async getAllPublicUsersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const data = await UserService.findAllPublicAsync();
    if (!data) {
      throw HttpError.createError(404, `No public users were found`);
    }

    const users = UserService.assignAndGetUsersProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = users.serializeBinary();
  }

  @Post('/getting-started')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async requestGettingStartedAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const token = context.request.headers.get('session-token') ?? '';
    const supabaseUser = await SupabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const user = await UserService.findAsync(supabaseUser.data.user.id);
    if (user?.request_status !== UserRequestStatus.IDLE) {
      throw HttpError.createError(403, `Supabase user has already requested`);
    }

    const body = context.request.body();
    const requestValue = await body.value;
    const gettingStartedRequest =
      GettingStartedRequest.deserializeBinary(requestValue);
    await MailService.sendFromContentAsync(
      user?.email ?? '',
      'fuoco.appdev@gmail.com',
      `Get started with ${gettingStartedRequest.getCompany()}`,
      `${gettingStartedRequest.getCompany()}, ${gettingStartedRequest.getPhoneNumber()}, ${gettingStartedRequest.getComment()}`
    );

    const partialUser = new User();
    partialUser.setCompany(gettingStartedRequest.getCompany());
    partialUser.setPhoneNumber(gettingStartedRequest.getPhoneNumber());
    partialUser.setRequestStatus(UserRequestStatus.REQUESTED);
    const updatedUserData = await UserService.updateAsync(
      supabaseUser.data.user.id,
      partialUser
    );
    if (!updatedUserData) {
      throw HttpError.createError(404, `Supabase user not updated`);
    }

    const responseUser = await UserService.assignAndGetUserProtocol(
      updatedUserData
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = responseUser.serializeBinary();
  }

  @Post('/update/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async updateUserAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const body = context.request.body();
    const requestValue = await body.value;
    const user = User.deserializeBinary(requestValue);
    const data = await UserService.updateAsync(paramsId, user);
    if (!data) {
      throw HttpError.createError(404, `User data not found`);
    }

    const responseUser = UserService.assignAndGetUserProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = responseUser.serializeBinary();
  }

  @Post('/delete/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async deleteUserAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    await UserService.deleteAsync(paramsId);

    const supabaseUser = await SupabaseService.client.auth.admin.deleteUser(
      paramsId
    );
    if (supabaseUser.error) {
      throw HttpError.createError(
        supabaseUser.error.status ?? 0,
        supabaseUser.error.message
      );
    }

    context.response.status = Oak.Status.OK;
  }

  @Post('/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getUserAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const data = await UserService.findAsync(paramsId);
    if (!data) {
      throw HttpError.createError(
        404,
        `User with superbase id ${paramsId} not found`
      );
    }

    const user = UserService.assignAndGetUserProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = user.serializeBinary();
  }
}
