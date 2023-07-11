import Medusa from '@medusajs/medusa-js';
import { Customer } from '@medusajs/medusa';
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

  public async requestCustomerAsync(
    email: string
  ): Promise<Customer | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/customer/${email}`,
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
    return customerResponse.data && JSON.parse(customerResponse.data);
  }

  public async requestCreateCustomerAsync(props: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: string;
  }): Promise<Customer | undefined> {
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
    return customerResponse.data && JSON.parse(customerResponse.data);
  }

  public async requestUpdateCustomerAsync(
    customerId: string,
    props: {
      first_name?: string;
      last_name?: string;
      phone?: string;
      metadata?: string;
    }
  ): Promise<Customer | undefined> {
    const session = await SupabaseService.requestSessionAsync();
    const customerRequest = new core.CustomerRequest({
      firstName: props.first_name,
      lastName: props.last_name,
      phone: props.phone,
      metadata: props.metadata,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/medusa/customer/update/${customerId}`,
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
    return customerResponse.data && JSON.parse(customerResponse.data);
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
}

export default new MedusaService();
