import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/auth.guard.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
  AddCustomerToGroupRequest,
  CustomersRequest,
  RemoveCustomerFromGroupRequest,
  UpdateCustomerRequest,
} from '../protobuf/customer_pb.js';
import { OrdersRequest } from '../protobuf/order_pb.js';
import { PriceListsRequest } from '../protobuf/price-list_pb.js';
import {
  ProductCountRequest,
  ProductsRequest,
} from '../protobuf/product_pb.js';
import { StockLocationsRequest } from '../protobuf/stock-location_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import MedusaService from '../services/medusa.service.ts';

@Controller('/medusa')
export class MedusaController {
  private readonly _medusaService: MedusaService;

  constructor() {
    this._medusaService = serviceCollection.get(serviceTypes.MedusaService);
  }

  @Post('/webhook/stock-location')
  @ContentType('application/x-protobuf')
  public async handleWebhookStockLocationAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body().value;
    const stockLocation = body['record'];
    await this._medusaService.updateStockLocationMetadataAsync(stockLocation);

    context.response.status = 200;
  }

  @Post('/stock-locations')
  @ContentType('application/x-protobuf')
  public async getStockLocationsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = StockLocationsRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.getStockLocationsAsync(request);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/stock-locations/all')
  @ContentType('application/x-protobuf')
  public async getStockLocationsAllAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const response = await this._medusaService.getStockLocationsAllAsync();
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/products/count')
  @ContentType('application/x-protobuf')
  public async getProductCountAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = ProductCountRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.getProductCountAsync(request);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/products')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getProductsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = ProductsRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.getProductsAsync(request);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/update-account')
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
    const updateCustomerRequest =
      UpdateCustomerRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.updateCustomerAccountAsync(
      updateCustomerRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer-group/add-customer')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async addCustomerToGroupAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const addCustomerToGroupRequest =
      AddCustomerToGroupRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.addCustomerToGroupAsync(
      addCustomerToGroupRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer-group/remove-customer')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async removeCustomerFromGroupAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const removeCustomerFromGroupRequest =
      RemoveCustomerFromGroupRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.removeCustomerFromGroupAsync(
      removeCustomerFromGroupRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/price-lists')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getPriceListsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const priceListsRequest = PriceListsRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.getPriceListsAsync(
      priceListsRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customers')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getCustomersAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const customersRequest = CustomersRequest.deserializeBinary(requestValue);
    const response = await this._medusaService.getCustomersAsync(
      customersRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/product-metadata/:productId')
  @ContentType('application/x-protobuf')
  public async getProductMetadataAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsProductId = context.params['productId'];
    const response = await this._medusaService.getProductMetadataAsync(
      paramsProductId
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/metadata/:customerId')
  @ContentType('application/x-protobuf')
  public async getCustomerMetadataAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsCustomerId = context.params['customerId'];
    const response = await this._medusaService.getCustomerMetadataAsync(
      paramsCustomerId
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer-group/:salesLocationId')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getCustomerGroupAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsSalesLocationId = context.params['salesLocationId'];
    const response = await this._medusaService.findCustomerGroupAsync(
      paramsSalesLocationId
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/customer/:supabaseId')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getCustomerAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsSupabaseId = context.params['supabaseId'];
    const response = await this._medusaService.getCustomerBySupabaseIdAsync(
      paramsSupabaseId
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
    const response = await this._medusaService.getOrdersAsync(
      paramsCustomerId,
      ordersRequest
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/stock-location/:stockLocationId')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getStockLocationAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const paramsStockLocationId = context.params['stockLocationId'];
    const response = await this._medusaService.getStockLocationAsync(
      paramsStockLocationId
    );
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
