import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import {
  StockLocationsResponse,
  CustomerResponse,
  CustomerRequest,
  OrdersResponse,
  OrdersRequest,
  ProductCountResponse,
  ProductCountRequest,
  ProductResponse,
} from '../protobuf/core_pb.js';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import MapboxService, { GeocodingFeature } from './mapbox.service.ts';
import SupabaseService from './supabase.service.ts';
import AccountService from './account.service.ts';

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
    sessionToken: string,
    supabaseId: string
  ): Promise<InstanceType<typeof CustomerResponse>> {
    const account = await AccountService.findAsync(supabaseId);
    let customerDataList: any[];
    if (account && account?.customer_id) {
      const customerResponse = await axiod.get(
        `${this._url}/admin/customers/${account.customer_id}`,
        {
          headers: {
            'x-medusa-access-token': this._token,
          },
        }
      );
      const customer = customerResponse?.data['customer'];
      customerDataList = [customer];
    } else {
      const supabaseUser = await SupabaseService.client.auth.admin.getUserById(
        supabaseId
      );
      const fetchParams = new URLSearchParams({
        q: supabaseUser.data.user?.email ?? '',
      }).toString();
      const customerResponse = await axiod.get(
        `${this._url}/admin/customers?${fetchParams}`,
        {
          headers: {
            'x-medusa-access-token': this._token,
          },
        }
      );
      customerDataList = customerResponse?.data['customers'] ?? [];
    }

    const customer = new CustomerResponse();
    if (customerDataList.length > 0) {
      for (const customerData of customerDataList) {
        const updateParams = new URLSearchParams({
          expand: 'shipping_addresses',
        }).toString();
        try {
          const updateCustomerResponse = await axiod.post(
            `${this._url}/admin/customers/${customerData.id}?${updateParams}`,
            {
              password: sessionToken,
            },
            {
              headers: {
                'x-medusa-access-token': this._token,
              },
            }
          );

          const updatedCustomerData = updateCustomerResponse.data['customer'];
          customer.setData(JSON.stringify(updatedCustomerData));
          customer.setPassword(sessionToken);
        } catch (error: any) {
          console.error(error);
        }
      }
    }

    return customer;
  }

  public async updateCustomerAccountAsync(
    sessionToken: string,
    request: InstanceType<typeof CustomerRequest>
  ): Promise<InstanceType<typeof CustomerResponse>> {
    const email = request.getEmail();
    const firstName = request.getFirstName();
    const lastName = request.getLastName();
    const phone = request.getPhone();
    const metadata = request.getMetadata();

    const customer = new CustomerResponse();
    const existingCustomers = await this.findCustomersAsync(email);
    if (existingCustomers.length > 0) {
      for (const existingCustomer of existingCustomers) {
        if (!existingCustomer.has_account) {
          continue;
        }

        const updateParams = new URLSearchParams({
          expand: 'shipping_addresses',
        }).toString();

        try {
          const updateCustomerResponse = await axiod.post(
            `${this._url}/admin/customers/${existingCustomer.id}?${updateParams}`,
            {
              ...(email && { email: email }),
              ...(firstName && { first_name: firstName }),
              ...(lastName && { last_name: lastName }),
              ...(phone && { phone: phone }),
              ...(metadata && { metadata: metadata }),
              password: sessionToken,
            },
            {
              headers: {
                'x-medusa-access-token': this._token,
              },
            }
          );
          const updatedCustomerData = updateCustomerResponse.data['customer'];
          customer.setData(JSON.stringify(updatedCustomerData));
          customer.setPassword(sessionToken);
        } catch (error: any) {
          console.error(error);
        }
      }

      return customer;
    }

    try {
      const customerResponse = await axiod.post(
        `${this._url}/admin/customers`,
        {
          ...(email && { email: email, password: sessionToken }),
          ...(firstName && { first_name: firstName }),
          ...(lastName && { last_name: lastName }),
          ...(phone && { phone: phone }),
          ...(metadata && { metadata: metadata }),
        },
        {
          headers: {
            'x-medusa-access-token': this._token,
          },
        }
      );
    } catch (error: any) {
      console.error(error);
    }

    const data = customerResponse.data['customer'];
    customer.setData(JSON.stringify(data));
    customer.setPassword(sessionToken);
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
          'x-medusa-access-token': this._token,
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

  public async getProductCountAsync(
    request: InstanceType<typeof ProductCountRequest>
  ): Promise<InstanceType<typeof ProductCountResponse>> {
    const type = request.getType();
    const response = new ProductCountResponse();
    const productTypeResponse = await SupabaseService.client
      .from('product_type')
      .select()
      .match({ value: type });

    if (productTypeResponse.error) {
      console.error(productTypeResponse.error);
      response.setCount(0);
      return response;
    }

    if (productTypeResponse.data.length <= 0) {
      response.setCount(0);
      return response;
    }

    const typeData = productTypeResponse.data[0];
    const { data, error } = await SupabaseService.client
      .from('product')
      .select()
      .match({ type_id: typeData['id'] });

    if (error) {
      console.error(error);
      response.setCount(0);
      return response;
    }

    response.setCount(data.length);
    return response;
  }

  public async getProductAsync(
    productId: string
  ): Promise<InstanceType<typeof ProductResponse>> {
    const productResponse = await axiod.get(
      `${this._url}/admin/products/${productId}`,
      {
        headers: {
          'x-medusa-access-token': this._token,
        },
      }
    );
    const product = new ProductResponse();
    const data = productResponse.data['product'];
    product.setData(JSON.stringify(data));

    return product;
  }

  public async getOrdersAsync(
    customerId: string,
    request: InstanceType<typeof OrdersRequest>
  ): Promise<InstanceType<typeof OrdersResponse>> {
    const offset = request.getOffset();
    const limit = request.getLimit();
    const params = new URLSearchParams({
      customer_id: customerId,
      offset: offset.toString(),
      limit: limit.toString(),
    }).toString();
    const ordersResponse = await axiod.get(
      `${this._url}/admin/orders?${params}`,
      {
        headers: {
          'x-medusa-access-token': this._token,
        },
      }
    );
    const orders = new OrdersResponse();
    const data = ordersResponse.data['orders'];
    orders.setData(JSON.stringify(data));

    return orders;
  }

  private async findCustomersAsync(
    email: string
  ): Promise<Record<string, unknown>[]> {
    const params = new URLSearchParams({
      q: email,
    }).toString();
    const customerListResponse = await axiod.get(
      `${this._url}/admin/customers?${params}`,
      {
        headers: {
          'x-medusa-access-token': this._token,
        },
      }
    );
    return customerListResponse.data['customers'];
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
