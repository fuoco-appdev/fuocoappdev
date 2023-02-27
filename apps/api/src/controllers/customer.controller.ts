// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Guard, ContentType } from '../index.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import CustomerService from '../services/customer.service.ts';
import { AuthGuard } from '../guards/index.ts';
import { Customer } from '../protobuf/core_pb.js';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';

@Controller('/customer')
export class CustomerController {
  @Post('/all')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getAllCustomersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const data = await CustomerService.findAllAsync();
    if (!data) {
      throw HttpError.createError(404, `No customers were found`);
    }

    const customers = CustomerService.assignAndGetCustomersProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = customers.serializeBinary();
  }

  @Post('/update/:id')
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
    const customer = Customer.deserializeBinary(requestValue);
    const data = await CustomerService.updateAsync(paramsId, customer);
    if (!data) {
      throw HttpError.createError(404, `Customer data not found`);
    }

    const responseCustomer = CustomerService.assignAndGetCustomerProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = responseCustomer.serializeBinary();
  }

  @Post('/:email')
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
    const data = await CustomerService.findAsync(paramsEmail);
    if (!data) {
      throw HttpError.createError(
        404,
        `Customer with email ${paramsEmail} not found`
      );
    }

    const customer = CustomerService.assignAndGetCustomerProtocol(data);
    context.response.type = 'application/x-protobuf';
    context.response.body = customer.serializeBinary();
  }
}
