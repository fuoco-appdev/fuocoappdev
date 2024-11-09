import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
  CreateDeviceRequest,
  DevicesRequest,
  UpdateDeviceRequest,
} from '../protobuf/device_pb.js';
import serviceCollection from '../service_collection.ts';
import DeviceService from '../services/device.service.ts';
import SupabaseService from '../services/supabase.service.ts';

@Controller('/device')
export class DeviceController {
  private readonly _deviceService: DeviceService;
  private readonly _supabaseService: SupabaseService;

  constructor() {
    this._deviceService = serviceCollection.get(DeviceService);
    this._supabaseService = serviceCollection.get(SupabaseService);
  }

  @Post('/webhook/fulfillment')
  @ContentType('application/json')
  public async handleWebhookFulfillmentAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body().value;
    const fulfillment = body['record'];
    await this._deviceService.createOrderBroadcastAsync(fulfillment);

    context.response.status = 200;
  }

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
    const supabaseUser = await this._supabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = CreateDeviceRequest.deserializeBinary(requestValue);
    const response = await this._deviceService.createAsync(
      supabaseUser.data.user.id,
      request
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot create device`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/update/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async updateAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const token = context.request.headers.get('session-token') ?? '';
    const supabaseUser = await this._supabaseService.client.auth.getUser(token);
    if (!supabaseUser.data.user) {
      throw HttpError.createError(404, `Supabase user not found`);
    }

    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = UpdateDeviceRequest.deserializeBinary(requestValue);
    const response = await this._deviceService.updateAsync(
      supabaseUser.data.user.id,
      paramsId,
      request
    );
    if (!response) {
      throw HttpError.createError(409, `Cannot update device`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/devices')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getDevicesAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = DevicesRequest.deserializeBinary(requestValue);
    const response = await this._deviceService.getDevicesAsync(request);
    if (!response) {
      throw HttpError.createError(409, `Cannot get devices`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
