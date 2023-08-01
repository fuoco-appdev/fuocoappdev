import Medusa from '@medusajs/medusa-js';
import { Customer, Order } from '@medusajs/medusa';
import ConfigService from './config.service';
import axios, { AxiosError } from 'axios';
import { Service } from '../service';
import SupabaseService from './supabase.service';
import * as core from '../protobuf/core_pb';

class MedusaService extends Service {
  private readonly _medusa: Medusa;

  constructor() {
    super();

    this._medusa = new Medusa({
      baseUrl: ConfigService.medusa.url,
      apiKey: ConfigService.medusa.key,
      maxRetries: 3,
    });
  }

  public get medusa(): Medusa {
    return this._medusa;
  }

  public async requestProductCountAsync(type: string): Promise<number> {
    const productCountRequest = new core.ProductCountRequest({ type: type });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/products/count`,
      headers: {
        ...this.headers,
      },
      data: productCountRequest.toBinary(),
      responseType: 'arraybuffer',
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const productCountResponse =
      core.ProductCountResponse.fromBinary(arrayBuffer);
    return productCountResponse.count;
  }

  public async requestCustomerAsync(
    supabaseId: string
  ): Promise<Customer | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/customer/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = core.CustomerResponse.fromBinary(arrayBuffer);
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    try {
      await this.medusa.auth.getSession();
    } catch (error: any) {
      if (customerResponse.password.length > 0) {
        const authResponse = await this.medusa.auth.authenticate({
          email: session?.user.email ?? '',
          password: customerResponse.password,
        });
        if (!authResponse.customer) {
          return undefined;
        }
      }
    }

    return JSON.parse(customerResponse.data);
  }

  public async requestCreateCustomerAsync(props: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: string;
  }): Promise<Customer | undefined> {
    const userExistsResponse = await this.medusa.auth.exists(
      props?.email ?? ''
    );
    if (userExistsResponse.exists) {
      return undefined;
    }

    const session = await SupabaseService.requestSessionAsync();
    const customerRequest = new core.CustomerRequest({
      email: props.email,
      firstName: props.first_name,
      lastName: props.last_name,
      phone: props.phone,
      metadata: props.metadata,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/customer/create`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: customerRequest.toBinary(),
      responseType: 'arraybuffer',
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = core.CustomerResponse.fromBinary(arrayBuffer);
    if (customerResponse.data.length <= 0) {
      return undefined;
    }

    try {
      await this.medusa.auth.getSession();
    } catch (error: any) {
      if (customerResponse.password.length > 0 && props.email) {
        const authResponse = await this.medusa.auth.authenticate({
          email: props.email,
          password: customerResponse.password,
        });
        if (!authResponse.customer) {
          return undefined;
        }
      }
    }

    return JSON.parse(customerResponse.data);
  }

  public async requestStockLocationsAsync(): Promise<any[]> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/stock-locations`,
      headers: {
        ...this.headers,
      },
      data: '',
      responseType: 'arraybuffer',
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const stockLocationsResponse =
      core.StockLocationsResponse.fromBinary(arrayBuffer);
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
  ): Promise<Order[] | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const ordersRequest = new core.OrdersRequest({
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/orders/${customerId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: ordersRequest.toBinary(),
      responseType: 'arraybuffer',
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const ordersResponse = core.OrdersResponse.fromBinary(arrayBuffer);
    return ordersResponse.data && JSON.parse(ordersResponse.data);
  }
}

export default new MedusaService();
