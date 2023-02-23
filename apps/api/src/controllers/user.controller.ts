// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Guard, ContentType } from '../index.ts';
import { User as SupabaseUser } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';
import {
  User,
  RequestStatus,
} from '../protobuf/core_pb.js';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import SupabaseService from '../services/supabase.service.ts';
import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';

@Controller('/user')
export class UserController {
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
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const user = User.deserializeBinary(requestValue);
    const data = await UserService.updateAsync(paramsId, user);
    if (!data) {
      throw HttpError.createError(404, `User data not found`);
    }

    const responseUser = UserService.assignAndGetUserProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = responseUser.serializeBinary();
  }

  @Post('/:email')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getUserAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsEmail = context.params['email'];
    const data = await UserService.findAsync(paramsEmail);
    if (!data) {
      throw HttpError.createError(
        404,
        `User with email ${paramsEmail} not found`
      );
    }

    const user = UserService.assignAndGetUserProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = user.serializeBinary();
  }
}
