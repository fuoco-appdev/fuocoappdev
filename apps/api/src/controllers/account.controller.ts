import { Controller, Post, Guard, ContentType } from '../index.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import {
  Account,
  GettingStartedRequest,
  RequestStatus,
} from '../protobuf/core_pb.js';
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
  public async createAsync(
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

    const account = await AccountService.findAsync(supabaseUser.data.user.id);
    const requestKeyIdle = Object.keys(RequestStatus)[RequestStatus.IDLE];
    if (account?.request_status !== requestKeyIdle) {
      throw HttpError.createError(403, `Supabase user has already requested`);
    }

    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const gettingStartedRequest =
      GettingStartedRequest.deserializeBinary(requestValue);
    try {
      await MailService.sendFromContentAsync(
        supabaseUser.data.user.email ?? '',
        'fuoco.appdev@gmail.com',
        `Get started with ${gettingStartedRequest.getCompany()}`,
        `${gettingStartedRequest.getCompany()}, ${gettingStartedRequest.getPhoneNumber()}, ${gettingStartedRequest.getComment()}`
      );
    } catch (error: any) {
      console.error(error);
    }

    const partialAccount = new Account();
    partialAccount.setCompany(gettingStartedRequest.getCompany());
    partialAccount.setPhoneNumber(gettingStartedRequest.getPhoneNumber());
    partialAccount.setRequestStatus(RequestStatus.REQUESTED);
    const updatedAccountData = await AccountService.updateAsync(
      supabaseUser.data.user.id,
      partialAccount
    );
    if (!updatedAccountData) {
      throw HttpError.createError(404, `Account not updated`);
    }

    const response = await AccountService.assignAndGetAccountProtocol(
      updatedAccountData
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
