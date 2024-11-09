import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { RefundItem } from '../models/order-confirmed.model';
import {
  AddCustomerToGroupRequest,
  AdminCustomerResponse,
  CustomerGroupResponse,
  CustomerMetadataResponse,
  CustomerResponse,
  CustomersRequest,
  CustomersResponse,
  RemoveCustomerFromGroupRequest,
  UpdateCustomerRequest,
} from '../protobuf/customer_pb';
import { OrdersRequest, OrdersResponse } from '../protobuf/order_pb';
import {
  PriceListsRequest,
  PriceListsResponse,
} from '../protobuf/price-list_pb';
import {
  ProductCountRequest,
  ProductCountResponse,
  ProductMetadataResponse,
  ProductsRequest,
  ProductsResponse,
} from '../protobuf/product_pb';
import {
  StockLocationsRequest,
  StockLocationsResponse,
} from '../protobuf/stock-location_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import SupabaseService from './supabase.service';

export interface AddressPayload {
  address_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country_code?: string;
  province?: string;
  postal_code?: string;
  metadata?: object;
}

export interface CartPayload {
  region_id?: string;
  customer_id?: string;
  sales_channel_id?: string;
  currency_code?: string;
  shipping_address_id?: string;
  billing_address_id?: string;
  email?: string;
  shipping_address?: AddressPayload;
  billing_address?: AddressPayload;
  gift_cards?: { code: string }[];
  metadata?: object;
  additional_data?: object;
}

export default class MedusaService extends Service {
  @observable
  public accessToken: string | undefined;

  constructor(
    private readonly _publicKey: string,
    private readonly _configService: ConfigService,
    private readonly _supabaseService: SupabaseService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    makeObservable(this);
  }

  public override dispose(): void {}

  public async requestProductMetadataAsync(
    productId: string
  ): Promise<ProductMetadataResponse | undefined> {
    const response = await fetch(
      `${this.endpointUrl}/medusa/product-metadata/${productId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
        },
        body: '',
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const productMetadataResponse =
      ProductMetadataResponse.fromBinary(arrayBuffer);
    return productMetadataResponse;
  }

  public async requestProductCountAsync(type: string): Promise<number> {
    const productCountRequest = new ProductCountRequest({ type: type });
    const response = await fetch(`${this.endpointUrl}/medusa/products/count`, {
      method: 'post',
      headers: {
        ...this.headers,
      },
      body: productCountRequest.toBinary(),
    });
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const productCountResponse = ProductCountResponse.fromBinary(arrayBuffer);
    return productCountResponse.count;
  }

  public async requestStoreProductsAsync(
    params: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreProduct[]> {
    const searchParams = new URLSearchParams(params);

    const { products } = await fetch(
      `${
        this.configService.medusa.url
      }/store/products?${searchParams.toString()}`,
      {
        credentials: 'include',
        headers: {
          'x-publishable-api-key': this._publicKey,
        },
      }
    ).then((res) => res.json());
    return products;
  }

  public async requestStoreOrderAsync(
    orderId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreOrder> {
    const searchParams = new URLSearchParams(params);

    const { order } = await fetch(
      `${
        this.configService.medusa.url
      }/store/orders/${orderId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        headers: {
          'x-publishable-api-key': this._publicKey,
        },
      }
    ).then((res) => res.json());
    return order;
  }

  public async requestStoreCreateReturn(
    body: { order_id: string; items: RefundItem[] },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreReturn> {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
      `${
        this.configService.medusa.url
      }/store/return?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return response.return;
  }

  public async requestStoreCartAddShippingMethod(
    cartId: string,
    body: { option_id: string },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/shipping-methods?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCreatePaymentCollection(
    body: {
      cart_id: string;
      region_id?: string;
      currency_code?: string;
      amount?: number;
    },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StorePaymentCollection> {
    const searchParams = new URLSearchParams(params);
    const { payment_collection } = await fetch(
      `${
        this.configService.medusa.url
      }/store/payment-collections?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return payment_collection;
  }

  public async requestStoreInitializePaymentSession(
    paymentCollectionId: string,
    body: {
      provider_id: string;
    },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StorePaymentCollection> {
    const searchParams = new URLSearchParams(params);
    const { payment_collection } = await fetch(
      `${
        this.configService.medusa.url
      }/store/payment-collections/${paymentCollectionId}/payment-sessions?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return payment_collection;
  }

  public async requestStoreReturnReasons(
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreReturnReason[]> {
    const searchParams = new URLSearchParams(params);
    const { return_reasons } = await fetch(
      `${
        this.configService.medusa.url
      }/store/return-reasons?${searchParams.toString()}`
    ).then((res) => res.json());
    return return_reasons;
  }

  public async requestStoreShippingOptions(
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreShippingOption[]> {
    const searchParams = new URLSearchParams(params);
    const { shipping_options } = await fetch(
      `${
        this.configService.medusa.url
      }/store/shipping-options?${searchParams.toString()}`
    ).then((res) => res.json());
    return shipping_options;
  }

  public async requestAdminProductTypesAsync(): Promise<
    HttpTypes.AdminProductType[]
  > {
    const accessToken = '';
    const { product_types } = await fetch(
      `${this.configService.medusa.url}/admin/product-types`,
      {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
    return product_types;
  }

  public async requestAdminRegionsAsync(): Promise<HttpTypes.AdminRegion[]> {
    const accessToken = '';
    const { regions } = await fetch(
      `${this.configService.medusa.url}/admin/regions`,
      {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
    return regions;
  }

  public async requestStoreCart(
    cartId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}?${searchParams.toString()}`
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCreateCart(
    body: CartPayload,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${this.configService.medusa.url}/store/carts?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreUpdateCart(
    cartId: string,
    body: CartPayload,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCartComplete(
    cartId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/complete?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: '',
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCartAddPromotions(
    cartId: string,
    body: {
      promo_codes: string[];
    },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/promotions?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCartRemovePromotion(
    cartId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/promotions?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreAddLineItem(
    cartId: string,
    body: { variant_id: string; quantity: number },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/line-items?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreUpdateLineItem(
    cartId: string,
    lineItemId: string,
    body: { quantity: number; metadata?: object },
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.StoreCart> {
    const searchParams = new URLSearchParams(params);
    const { cart } = await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/line-items/${lineItemId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return cart;
  }

  public async requestStoreCartRemoveLineItem(
    cartId: string,
    lineItemId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<void> {
    const searchParams = new URLSearchParams(params);
    await fetch(
      `${
        this.configService.medusa.url
      }/store/carts/${cartId}/line-items/${lineItemId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': this._publicKey,
        },
      }
    ).then((res) => res.json());
  }

  public async requestAdminProductsAsync(
    ids: string[]
  ): Promise<HttpTypes.AdminProduct[]> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new ProductsRequest({ ids: ids });
    const response = await fetch(`${this.endpointUrl}/medusa/products`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const productsResponse = ProductsResponse.fromBinary(arrayBuffer);

    const products: HttpTypes.AdminProduct[] = [];
    for (const json of productsResponse.products) {
      products.push(JSON.parse(json) as HttpTypes.AdminProduct);
    }
    return products;
  }

  public async requestAdminCustomerCreateAddressAsync(
    body: AddressPayload,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.AdminCustomer> {
    const searchParams = new URLSearchParams(params);
    const { customer } = await fetch(
      `${
        this.configService.medusa.url
      }/store/customers/me/addresses?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return customer;
  }

  public async requestAdminCustomerUpdateAddress(
    addressId: string,
    body: AddressPayload,
    params?: Record<string, any> | URLSearchParams
  ): Promise<HttpTypes.AdminCustomer> {
    const searchParams = new URLSearchParams(params);
    const { customer } = await fetch(
      `${
        this.configService.medusa.url
      }/store/customers/me/addresses/${addressId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          'x-publishable-api-key': this._publicKey,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return customer;
  }

  public async requestStoreCustomerRemoveAddress(
    addressId: string,
    params?: Record<string, any> | URLSearchParams
  ): Promise<void> {
    const searchParams = new URLSearchParams(params);
    await fetch(
      `${
        this.configService.medusa.url
      }/store/customers/me/addresses${addressId}?${searchParams.toString()}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          'x-publishable-api-key': this._publicKey,
        },
      }
    ).then((res) => res.json());
  }

  public async requestCustomerMetadataAsync(
    customerId: string
  ): Promise<CustomerMetadataResponse | undefined> {
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer/metadata/${customerId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
        },
        body: '',
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerMetadataResponse =
      CustomerMetadataResponse.fromBinary(arrayBuffer);
    if (!customerMetadataResponse) {
      return undefined;
    }

    return customerMetadataResponse;
  }

  public async requestAdminCustomerAsync(
    supabaseId: string
  ): Promise<HttpTypes.AdminCustomer | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer/${supabaseId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: '',
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerResponse = AdminCustomerResponse.fromBinary(arrayBuffer);
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    const customerData = JSON.parse(customerResponse.data);
    return customerData;
  }

  public async requestCustomersAsync(props: {
    customerIds: string[];
  }): Promise<CustomerResponse[] | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new CustomersRequest({
      customerIds: props.customerIds,
    });
    const response = await fetch(`${this.endpointUrl}/medusa/customers`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customersResponse = CustomersResponse.fromBinary(arrayBuffer);
    if (customersResponse.customers.length <= 0) {
      return undefined;
    }

    return customersResponse.customers;
  }

  public async requestUpdateAdminCustomerAsync(props: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: string;
  }): Promise<HttpTypes.AdminCustomer | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const customerRequest = new UpdateCustomerRequest({
      email: props.email,
      firstName: props.first_name,
      lastName: props.last_name,
      phone: props.phone,
      metadata: props.metadata,
    });
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer/update-account`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: customerRequest.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerResponse = AdminCustomerResponse.fromBinary(arrayBuffer);
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    return JSON.parse(customerResponse.data);
  }

  public async requestCustomerGroupAsync(
    salesLocationId: string
  ): Promise<HttpTypes.AdminCustomerGroup | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer-group/${salesLocationId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: '',
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(arrayBuffer);
    if (customerGroupResponse.data.length <= 0) {
      return undefined;
    }

    const customerGroupData = JSON.parse(customerGroupResponse.data);
    return customerGroupData;
  }

  public async requestAddCustomerToGroupAsync(props: {
    customerGroupId: string;
    customerId: string;
  }): Promise<HttpTypes.AdminCustomerGroup | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const addCustomerToGroupRequest = new AddCustomerToGroupRequest({
      customerGroupId: props.customerGroupId,
      customerId: props.customerId,
    });
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer-group/add-customer`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: addCustomerToGroupRequest.toBinary(),
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(arrayBuffer);
    if (customerGroupResponse.data.length <= 0) {
      return undefined;
    }

    const customerGroupData = JSON.parse(customerGroupResponse.data);
    return customerGroupData;
  }

  public async requestRemoveCustomerFromGroupAsync(props: {
    customerGroupId: string;
    customerId: string;
  }): Promise<HttpTypes.AdminCustomerGroup | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const removeCustomerFromGroupRequest = new RemoveCustomerFromGroupRequest({
      customerGroupId: props.customerGroupId,
      customerId: props.customerId,
    });
    const response = await fetch(
      `${this.endpointUrl}/medusa/customer-group/remove-customer`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: removeCustomerFromGroupRequest.toBinary(),
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(arrayBuffer);
    if (customerGroupResponse.data.length <= 0) {
      return undefined;
    }

    const customerGroupData = JSON.parse(customerGroupResponse.data);
    return customerGroupData;
  }

  public async requestGetPriceListsAsync(props: {
    customerGroups: string[];
    offset?: number;
    limit?: number;
    status?: string[];
    type?: string[];
  }): Promise<HttpTypes.AdminPriceList[]> {
    const session = await this._supabaseService.requestSessionAsync();
    const priceListsRequest = new PriceListsRequest({
      offset: props.offset,
      limit: props.limit,
      status: props.status,
      customerGroups: props.customerGroups,
      type: props.type,
    });
    const response = await fetch(`${this.endpointUrl}/medusa/price-lists`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: priceListsRequest.toBinary(),
    });
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const priceListsResponse = PriceListsResponse.fromBinary(arrayBuffer);
    const priceListsData =
      priceListsResponse.data.length > 0
        ? JSON.parse(priceListsResponse.data)
        : {};
    if (Object.keys(priceListsData).length > 0) {
      return priceListsData?.['price_lists'] ?? [];
    }

    return [];
  }

  public async requestStockLocationsAsync(
    ids: string[]
  ): Promise<HttpTypes.AdminStockLocation[]> {
    const request = new StockLocationsRequest({
      ids: ids,
    });
    const response = await fetch(`${this.endpointUrl}/medusa/stock-locations`, {
      method: 'post',
      headers: {
        ...this.headers,
      },
      body: request.toBinary(),
    });
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const stockLocationsResponse =
      StockLocationsResponse.fromBinary(arrayBuffer);
    const locations: HttpTypes.AdminStockLocation[] = [];
    for (const stockLocation of stockLocationsResponse.locations) {
      const json = JSON.parse(stockLocation) as HttpTypes.AdminStockLocation;
      if (!json) {
        continue;
      }

      locations.push(json);
    }

    return locations;
  }

  public async requestStockLocationsAllAsync(): Promise<
    (HttpTypes.AdminStockLocation & {
      sales_channels: HttpTypes.AdminSalesChannel[];
    })[]
  > {
    const response = await fetch(
      `${this.endpointUrl}/medusa/stock-locations/all`,
      {
        method: 'post',
        headers: {
          ...this.headers,
        },
        body: '',
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const stockLocationsResponse =
      StockLocationsResponse.fromBinary(arrayBuffer);
    const locations: any[] = [];
    for (const stockLocation of stockLocationsResponse.locations) {
      const json = JSON.parse(stockLocation);
      if (!json) {
        continue;
      }

      locations.push(json);
    }

    return locations;
  }

  public async requestOrdersAsync(
    customerId: string,
    props: {
      offset: number;
      limit: number;
    }
  ): Promise<HttpTypes.StoreOrder[] | undefined> {
    const session = await this._supabaseService.requestSessionAsync();
    const ordersRequest = new OrdersRequest({
      offset: props.offset,
      limit: props.limit,
    });
    const response = await fetch(
      `${this.endpointUrl}/medusa/orders/${customerId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: ordersRequest.toBinary(),
      }
    );
    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const ordersResponse = OrdersResponse.fromBinary(arrayBuffer);
    return ordersResponse.data && JSON.parse(ordersResponse.data);
  }

  public async deleteSessionAsync(): Promise<void> {
    try {
      fetch(`${this.configService.medusa.url}/auth/session`, {
        credentials: 'include',
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          this.accessToken = undefined;
        });
    } catch (error: any) {
      console.error(error);
    }
  }
}
