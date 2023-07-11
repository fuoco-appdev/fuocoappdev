import { AuthGuard } from '../guards/auth.guard.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { Customer, CustomerRequest } from '../protobuf/core_pb.js';
import { Controller, Post, Guard, ContentType } from '../index.ts';
import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import MedusaService from '../services/medusa.service.ts';

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
    const paramsEmail = context.params['email'];
    const response = await MedusaService.getCustomerAsync(paramsEmail);
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
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const customerRequest = CustomerRequest.deserializeBinary(requestValue);
    const response = await MedusaService.createCustomerAsync(customerRequest);
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
}
