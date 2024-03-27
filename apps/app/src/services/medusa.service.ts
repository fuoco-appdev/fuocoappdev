import Medusa from "@medusajs/medusa-js";
import {
  Customer,
  CustomerGroup,
  Order,
  PriceList,
  Product,
  SalesChannel,
} from "@medusajs/medusa";
import ConfigService from "./config.service";
import axios, { AxiosError } from "axios";
import { Service } from "../service";
import SupabaseService from "./supabase.service";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { BehaviorSubject, Observable } from "rxjs";
import Cookies from "js-cookie";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { OrdersRequest, OrdersResponse } from "src/protobuf/order_pb";
import {
  StockLocationsRequest,
  StockLocationsResponse,
} from "../protobuf/stock-location_pb";
import {
  PriceListsRequest,
  PriceListsResponse,
} from "../protobuf/price-list_pb";
import {
  AddCustomerToGroupRequest,
  CustomerGroupResponse,
  CustomerMetadataResponse,
  CustomerResponse,
  CustomersRequest,
  CustomersResponse,
  RemoveCustomerFromGroupRequest,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "../protobuf/customer_pb";
import {
  ProductCountRequest,
  ProductCountResponse,
  ProductMetadataResponse,
  ProductsRequest,
  ProductsResponse,
} from "../protobuf/product_pb";

class MedusaService extends Service {
  private _medusa: Medusa | undefined;
  private _accessToken: string | undefined;
  private _accessTokenBehaviorSubject: BehaviorSubject<string | undefined>;

  constructor() {
    super();

    this._accessTokenBehaviorSubject = new BehaviorSubject<string | undefined>(
      undefined,
    );
    this._accessToken = undefined;
  }

  public get medusa(): Medusa | undefined {
    return this._medusa;
  }

  public get accessToken(): string | undefined {
    return this._accessTokenBehaviorSubject.getValue();
  }

  public get accessTokenObservable(): Observable<string | undefined> {
    return this._accessTokenBehaviorSubject.asObservable();
  }

  public intializeMedusa(): void {
    this._medusa = new Medusa({
      baseUrl: ConfigService.medusa.url,
      apiKey: process.env["MEDUSA_PUBLIC_KEY"] ?? "",
      maxRetries: 3,
    });
  }

  public async requestProductMetadataAsync(
    productId: string,
  ): Promise<ProductMetadataResponse | undefined> {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/product-metadata/${productId}`,
      headers: {
        ...this.headers,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productMetadataResponse = ProductMetadataResponse.fromBinary(
      arrayBuffer,
    );
    return productMetadataResponse;
  }

  public async requestProductCountAsync(type: string): Promise<number> {
    const productCountRequest = new ProductCountRequest({ type: type });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/products/count`,
      headers: {
        ...this.headers,
      },
      data: productCountRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productCountResponse = ProductCountResponse.fromBinary(
      arrayBuffer,
    );
    return productCountResponse.count;
  }

  public async requestProductsAsync(ids: string[]): Promise<Product[]> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new ProductsRequest({ ids: ids });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/products`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productsResponse = ProductsResponse.fromBinary(
      arrayBuffer,
    );

    const products: Product[] = [];
    for (const json of productsResponse.products) {
      products.push(JSON.parse(json) as Product);
    }
    return products;
  }

  public async requestCustomerMetadataAsync(
    customerId: string,
  ): Promise<CustomerMetadataResponse | undefined> {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer/metadata/${customerId}`,
      headers: {
        ...this.headers,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerMetadataResponse = CustomerMetadataResponse.fromBinary(
      arrayBuffer,
    );
    if (!customerMetadataResponse) {
      return undefined;
    }

    return customerMetadataResponse;
  }

  public async requestCustomerAccountAsync(
    supabaseId: string,
  ): Promise<Customer | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer/${supabaseId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = UpdateCustomerResponse.fromBinary(
      arrayBuffer,
    );
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    const customerData = JSON.parse(customerResponse.data);
    if (customerData.has_account) {
      try {
        if (customerResponse.password.length > 0 && session?.user.email) {
          const authResponse = await this.medusa?.auth.getToken({
            email: session?.user.email,
            password: customerResponse.password,
          });
          this._accessToken = authResponse?.access_token;
          this._accessTokenBehaviorSubject.next(this._accessToken);
        }
      } catch (error: any) {
        console.error(error);
        return undefined;
      }

      return customerData;
    }

    return undefined;
  }

  public async requestCustomersAsync(props: {
    customerIds: string[];
  }): Promise<CustomerResponse[] | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new CustomersRequest({
      customerIds: props.customerIds,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customers`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customersResponse = CustomersResponse.fromBinary(arrayBuffer);
    if (customersResponse.customers.length <= 0) {
      return undefined;
    }

    return customersResponse.customers;
  }

  public async requestUpdateCustomerAccountAsync(props: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: string;
  }): Promise<Customer | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const customerRequest = new UpdateCustomerRequest({
      email: props.email,
      firstName: props.first_name,
      lastName: props.last_name,
      phone: props.phone,
      metadata: props.metadata,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer/update-account`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: customerRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = UpdateCustomerResponse.fromBinary(
      arrayBuffer,
    );
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    try {
      if (customerResponse.password.length > 0 && props.email) {
        const authResponse = await this.medusa?.auth.getToken({
          email: props.email,
          password: customerResponse.password,
        });
        this._accessToken = authResponse?.access_token;
        this._accessTokenBehaviorSubject.next(this._accessToken);
      }
    } catch (error: any) {
      console.error(error);
      return undefined;
    }

    return JSON.parse(customerResponse.data);
  }

  public async requestCustomerGroupAsync(
    salesLocationId: string,
  ): Promise<CustomerGroup | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer-group/${salesLocationId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(
      arrayBuffer,
    );
    if (customerGroupResponse.data.length <= 0) {
      return undefined;
    }

    const customerGroupData = JSON.parse(customerGroupResponse.data);
    return customerGroupData;
  }

  public async requestAddCustomerToGroupAsync(props: {
    customerGroupId: string;
    customerId: string;
  }): Promise<CustomerGroup | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const addCustomerToGroupRequest = new AddCustomerToGroupRequest({
      customerGroupId: props.customerGroupId,
      customerId: props.customerId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer-group/add-customer`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: addCustomerToGroupRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(
      arrayBuffer,
    );
    if (customerGroupResponse.data.length <= 0) {
      return undefined;
    }

    const customerGroupData = JSON.parse(customerGroupResponse.data);
    return customerGroupData;
  }

  public async requestRemoveCustomerFromGroupAsync(props: {
    customerGroupId: string;
    customerId: string;
  }): Promise<CustomerGroup | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const removeCustomerFromGroupRequest = new RemoveCustomerFromGroupRequest({
      customerGroupId: props.customerGroupId,
      customerId: props.customerId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/customer-group/remove-customer`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: removeCustomerFromGroupRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerGroupResponse = CustomerGroupResponse.fromBinary(
      arrayBuffer,
    );
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
  }): Promise<PriceList[]> {
    const session = await SupabaseService.requestSessionAsync();
    const priceListsRequest = new PriceListsRequest({
      offset: props.offset,
      limit: props.limit,
      status: props.status,
      customerGroups: props.customerGroups,
      type: props.type,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/price-lists`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: priceListsRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const priceListsResponse = PriceListsResponse.fromBinary(arrayBuffer);
    const priceListsData = priceListsResponse.data.length > 0
      ? JSON.parse(priceListsResponse.data)
      : {};
    if (Object.keys(priceListsData).length > 0) {
      return priceListsData?.["price_lists"] ?? [];
    }

    return [];
  }

  public async requestStockLocationsAsync(ids: string[]): Promise<
    StockLocation[]
  > {
    const request = new StockLocationsRequest({
      ids: ids,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/stock-locations`,
      headers: {
        ...this.headers,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const stockLocationsResponse = StockLocationsResponse.fromBinary(
      arrayBuffer,
    );
    const locations: StockLocation[] = [];
    for (const stockLocation of stockLocationsResponse.locations) {
      const json = JSON.parse(stockLocation) as StockLocation;
      if (!json) {
        continue;
      }

      locations.push(json);
    }

    return locations;
  }

  public async requestStockLocationsAllAsync(): Promise<
    (StockLocation & { sales_channels: SalesChannel[] })[]
  > {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/stock-locations/all`,
      headers: {
        ...this.headers,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const stockLocationsResponse = StockLocationsResponse.fromBinary(
      arrayBuffer,
    );
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
    },
  ): Promise<Order[] | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const ordersRequest = new OrdersRequest({
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/orders/${customerId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: ordersRequest.toBinary(),
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const ordersResponse = OrdersResponse.fromBinary(arrayBuffer);
    return ordersResponse.data && JSON.parse(ordersResponse.data);
  }

  public async deleteSessionAsync(): Promise<void> {
    try {
      await this._medusa?.auth.deleteSession();
      this._accessTokenBehaviorSubject.next(undefined);
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new MedusaService();
