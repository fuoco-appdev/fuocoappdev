import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import {
  StockLocationsResponse,
  CustomerResponse,
  CustomerRequest,
  OrdersResponse,
  OrdersRequest,
} from '../protobuf/core_pb.js';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import MapboxService, {
  Geocoding,
  GeocodingFeature,
} from './mapbox.service.ts';
import SupabaseService from './supabase.service.ts';

class MedusaService {
  private _url: string | undefined;
  private _token: string | undefined;
  constructor() {
    this._url = Deno.env.get('MEDUSA_BACKEND_URL');
    this._token = Deno.env.get('MEDUSA_API_TOKEN');
    if (!this._url) {
      throw new Error("MEDUSA_BACKEND_URL doesn't exist");
    }

    if (!this._token) {
      throw new Error("MEDUSA_API_TOKEN doesn't exist");
    }
  }

  public async getCustomerAsync(
    email: string
  ): Promise<InstanceType<typeof CustomerResponse>> {
    const params = new URLSearchParams({
      q: email,
    }).toString();
    const customerResponse = await axiod.get(
      `${this._url}/admin/customers?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
    const customer = new CustomerResponse();
    const customers = customerResponse.data['customers'];
    if (customers.length > 0) {
      customer.setData(JSON.stringify(customers[0]));
    }

    return customer;
  }

  public async createCustomerAsync(
    request: InstanceType<typeof CustomerRequest>
  ): Promise<InstanceType<typeof CustomerResponse>> {
    const email = request.getEmail();
    const firstName = request.getFirstName();
    const lastName = request.getLastName();
    const phone = request.getPhone();
    const metadata = request.getMetadata();
    const customerResponse = await axiod.post(
      `${this._url}/admin/customers/create`,
      {
        ...(email && { email: email }),
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
        ...(phone && { phone: phone }),
        ...(metadata && { metadata: metadata }),
      },
      {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
    const customer = new CustomerResponse();
    const data = customerResponse.data['customer'];
    customer.setData(JSON.stringify(data));
    return customer;
  }

  public async updateCustomerAsync(
    customerId: string,
    request: InstanceType<typeof CustomerRequest>
  ): Promise<InstanceType<typeof CustomerResponse>> {
    const firstName = request.getFirstName();
    const lastName = request.getLastName();
    const phone = request.getPhone();
    const metadata = request.getMetadata();
    const customerResponse = await axiod.post(
      `${this._url}/admin/customers/${customerId}`,
      {
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
        ...(phone && { phone: phone }),
        ...(metadata && { metadata: metadata }),
      },
      {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
    const customer = new CustomerResponse();
    const data = customerResponse.data['customer'];
    customer.setData(JSON.stringify(data));
    return customer;
  }

  public async getStockLocationsAsync(): Promise<
    InstanceType<typeof StockLocationsResponse>
  > {
    const params = new URLSearchParams({
      expand: 'address,sales_channels',
    }).toString();
    const stockLocationsResponse = await axiod.get(
      `${this._url}/admin/stock-locations?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      }
    );

    const stockLocations = new StockLocationsResponse();
    const data = stockLocationsResponse.data['stock_locations'];
    for (const location of data) {
      const addressData = location['address'];
      let metadata = location['metadata'];
      if (!metadata) {
        metadata = {};
      }

      if (
        addressData &&
        (!metadata['coordinates'] ||
          !metadata['place_name'] ||
          !metadata['region'] ||
          metadata['updated_at'] !== addressData['updated_at'])
      ) {
        let searchText = '';
        if (addressData['company']) {
          searchText += `${addressData['company']}, `;
        }
        if (addressData['address_1']) {
          searchText += `${addressData['address_1']}, `;
        }
        if (addressData['address_2']) {
          searchText += `${addressData['address_2']}, `;
        }
        if (addressData['city']) {
          searchText += `${addressData['city']}`;
        }
        const feature = await this.getFeatureAsync(
          searchText,
          addressData['country_code']
        );
        metadata['coordinates'] = {
          longitude: feature?.center[0],
          latitude: feature?.center[1],
        };
        metadata['place_name'] = feature?.place_name;
        const context = feature?.context.find((value) =>
          value.id.startsWith('region')
        );
        metadata['region'] = context?.text ?? '';
        metadata['updated_at'] = addressData['updated_at'];
        const { error } = await SupabaseService.client
          .from('stock_location')
          .update({ metadata: metadata })
          .match({ address_id: addressData['id'] })
          .select();

        if (error) {
          console.error(error);
        }
      }

      stockLocations.addLocations(
        JSON.stringify({ location, metadata: metadata })
      );
    }

    return stockLocations;
  }

  public async getOrdersAsync(
    customerId: string,
    request: InstanceType<typeof OrdersRequest>
  ): Promise<InstanceType<typeof OrdersResponse>> {
    const offset = request.getOffset();
    const limit = request.getLimit();
    const params = new URLSearchParams({
      customer_id: customerId,
      offset: offset,
      limit: limit,
    }).toString();
    const ordersResponse = await axiod.get(
      `${this._url}/admin/orders?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
    const orders = new OrdersResponse();
    const data = ordersResponse.data['orders'];
    orders.setData(JSON.stringify(data));

    return orders;
  }

  private async getFeatureAsync(
    searchText: string,
    country: string
  ): Promise<GeocodingFeature | null> {
    const geocoding = await MapboxService.requestGeocodingPlacesAsync(
      searchText,
      country
    );
    if (geocoding.features.length > 0) {
      return geocoding.features[0];
    }

    return null;
  }
}

export default new MedusaService();
