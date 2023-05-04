import { Controller, Post, Guard, ContentType } from '../index.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import { Account } from '../protobuf/core_pb.js';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import SupabaseService from '../services/supabase.service.ts';
import AccountService from '../services/account.service.ts';
import MailService from '../services/mail.service.ts';

@Controller('/account')
export class AccountController {
  @Post('/create')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async createAccountAsync(
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

    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const account = Account.deserializeBinary(requestValue);
    const data = await AccountService.createAsync(
      supabaseUser.data.user.id,
      account
    );
    if (!data) {
      throw HttpError.createError(409, `Cannot create account`);
    }

    const response = AccountService.assignAndGetAccountProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/all')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getAllAccountsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const data = await AccountService.findAllAsync();
    if (!data) {
      throw HttpError.createError(404, `No accounts were found`);
    }

    const accounts = AccountService.assignAndGetAccountsProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = accounts.serializeBinary();
  }

  @Post('/public/all')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getAllPublicAccountsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const data = await AccountService.findAllPublicAsync();
    if (!data) {
      throw HttpError.createError(404, `No accounts were found`);
    }

    const accounts = AccountService.assignAndGetAccountsProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = accounts.serializeBinary();
  }

  @Post('/update/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async updateAccountAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const account = Account.deserializeBinary(requestValue);
    const data = await AccountService.updateAsync(paramsId, account);
    if (!data) {
      throw HttpError.createError(404, `Account data not found`);
    }

    const responseAccount = AccountService.assignAndGetAccountProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = responseAccount.serializeBinary();
  }

  @Post('/delete/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async deleteAccountAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    await AccountService.deleteAsync(paramsId);

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
  public async getAccountAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const data = await AccountService.findAsync(paramsId);
    if (!data) {
      throw HttpError.createError(
        404,
        `Account with supabase id ${paramsId} not found`
      );
    }

    const account = AccountService.assignAndGetAccountProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = account.serializeBinary();
  }
}
