import { ContentType, Controller, Guard, Post } from "../index.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { AuthGuard } from "../guards/index.ts";
import {
  CreateDeviceRequest,
  DevicesRequest,
  UpdateDeviceRequest,
} from "../protobuf/core_pb.js";
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
import { readAll } from "https://deno.land/std@0.105.0/io/util.ts";
import SupabaseService from "../services/supabase.service.ts";
import DeviceService from "../services/device.service.ts";

@Controller("/device")
export class DeviceController {
  @Post("/webhook/fulfillment")
  @ContentType("application/json")
  public async handleWebhookFulfillmentAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body().value;
    const fulfillment = body["record"];
    await DeviceService.createOrderBroadcastAsync(fulfillment);

    context.response.status = 200;
  }

  @Post("/create")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async createAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const token = context.request.headers.get("session-token") ?? "";
    const supabaseUser = await SupabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const body = await context.request.body({ type: "reader" });
    const requestValue = await readAll(body.value);
    const request = CreateDeviceRequest.deserializeBinary(requestValue);
    const response = await DeviceService.createAsync(
      supabaseUser.data.user.id,
      request,
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot create device`);
    }

    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }

  @Post("/update/:id")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async updateAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const paramsId = context.params["id"];
    const token = context.request.headers.get("session-token") ?? "";
    const supabaseUser = await SupabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const body = await context.request.body({ type: "reader" });
    const requestValue = await readAll(body.value);
    const request = UpdateDeviceRequest.deserializeBinary(requestValue);
    const response = await DeviceService.updateAsync(
      supabaseUser.data.user.id,
      paramsId,
      request,
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot update device`);
    }

    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }

  @Post("/devices")
  @Guard(AuthGuard)
  @ContentType("application/x-protobuf")
  public async getDevicesAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body({ type: "reader" });
    const requestValue = await readAll(body.value);
    const request = DevicesRequest.deserializeBinary(requestValue);
    const response = await DeviceService.getDevicesAsync(request);
    if (!response) {
      throw HttpError.createError(409, `Cannot get devices`);
    }

    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }
}
