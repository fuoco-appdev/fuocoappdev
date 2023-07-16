import { AuthGuard } from '../guards/auth.guard.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { CustomerRequest, OrdersRequest } from '../protobuf/core_pb.js';
import { Controller, Post, Guard, ContentType } from '../index.ts';
import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import MedusaService from '../services/medusa.service.ts';
import SupabaseService from '../services/supabase.service.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';

@Controller('/medusa')
export class MedusaController {
  @Post('/stock-locations')
  @ContentType('application/x-protobuf')
  public async getStockLocationsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const response = await MedusaService.getStockLocationsAsync();
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/create')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async createCustomerAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const token = context.request.headers.get('session-token') ?? '';
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const customerRequest = CustomerRequest.deserializeBinary(requestValue);
    const response = await MedusaService.createCustomerAsync(
      token,
      customerRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/:email')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getCustomerAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const token = context.request.headers.get('session-token') ?? '';
    const paramsEmail = context.params['email'];
    const response = await MedusaService.getCustomerAsync(token, paramsEmail);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/update/:id')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async updateCustomerAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsId = context.params['id'];
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const customerRequest = CustomerRequest.deserializeBinary(requestValue);
    const response = await MedusaService.updateCustomerAsync(
      paramsId,
      customerRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/orders/:customerId')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getOrdersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsCustomerId = context.params['customerId'];
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const ordersRequest = OrdersRequest.deserializeBinary(requestValue);
    const response = await MedusaService.getOrdersAsync(
      paramsCustomerId,
      ordersRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
