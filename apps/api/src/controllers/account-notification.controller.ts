import { readAll } from "https://deno.land/std@0.105.0/io/util.ts";
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { AuthGuard } from "../guards/index.ts";
import { ContentType, Controller, Guard, Post } from "../index.ts";
import { AccountNotificationsRequest } from "../protobuf/account-notification_pb.js";
import AccountNotificationService from "../services/account-notification.service.ts";

@Controller("/account-notification")
export class AccountNotificationController {
  @Post("/webhook/order")
  @ContentType("application/json")
  public async handleWebhookOrderAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body().value;
    const order = body["record"];
    const type = body['type'];
    if (type === 'INSERT') {
      await AccountNotificationService.createOrderNotificationAsync(order);
    }

    context.response.status = 200;
  }

  @Post("/webhook/account-followers")
  @ContentType("application/json")
  public async handleWebhookAccountFollowersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body().value;
    const accountFollower = body["record"];
    const type = body['type'];
    if (type === 'UPDATE') {
      await AccountNotificationService.createAccountFollowerNotificationAsync(accountFollower);
    }

    context.response.status = 200;
  }

  @Post("/notifications")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async getNotificationsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body({ type: "reader" });
    const requestValue = await readAll(body.value);
    const request = AccountNotificationsRequest.deserializeBinary(requestValue);
    const response = await AccountNotificationService.getNotificationsAsync(
      request,
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot find notifications`);
    }

    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }

  @Post("/seen-all/:accountId")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async updateSeenAllAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const paramsAccountId = context.params["accountId"];
    const response = await AccountNotificationService.updateSeenAllAsync(
      paramsAccountId,
    );
    if (!response) {
      throw HttpError.createError(
        409,
        `Cannot update seen all with account id ${paramsAccountId}`,
      );
    }

    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }

  @Post("/unseen-count/:accountId")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async getUnseenCountAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const paramsAccountId = context.params["accountId"];
    const response = await AccountNotificationService.getUnseenCountAsync(
      paramsAccountId,
    );
    if (!response) {
      throw HttpError.createError(
        409,
        `Cannot find unseen count with account id ${paramsAccountId}`,
      );
    }
    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }
}
