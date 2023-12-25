import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import {
  StockLocationsResponse,
  UpdateCustomerResponse,
  CustomersRequest,
  CustomersResponse,
  CustomerResponse,
  CustomerMetadataResponse,
  UpdateCustomerRequest,
  AddCustomerToGroupRequest,
  RemoveCustomerFromGroupRequest,
  CustomerGroupResponse,
  OrdersResponse,
  OrdersRequest,
  ProductCountResponse,
  ProductCountRequest,
  ProductResponse,
  PriceListsRequest,
  PriceListsResponse,
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

  public async getCustomerMetadataAsync(
    customerId: string
  ): Promise<InstanceType<typeof CustomerMetadataResponse>> {
    const response = new CustomerMetadataResponse();
    const customerResponse = await SupabaseService.client
      .from('customer')
      .select()
      .eq('id', customerId);

    if (customerResponse.error) {
      console.error(customerResponse.error);
      return response;
    }

    const data = customerResponse.data.length > 0 && customerResponse.data[0];
    if (data) {
      response.setId(data.id);
      response.setFirstName(data.first_name);
      response.setLastName(data.last_name);
      response.setHasAccount(data.has_account);
      response.setCreatedAt(data.created_at);
      response.setUpdatedAt(data.updated_at);
      response.setDeletedAt(data.deleted_at);
    }

    return response;
  }

  public async getCustomerAsync(
    sessionToken: string,
    supabaseId: string
  ): Promise<InstanceType<typeof UpdateCustomerResponse>> {
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

    const updateCustomer = new UpdateCustomerResponse();
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
          updateCustomer.setData(JSON.stringify(updatedCustomerData));
          updateCustomer.setPassword(sessionToken);
        } catch (error: any) {
          console.error(error);
        }
      }
    }

    return updateCustomer;
  }

  public async getCustomersAsync(
    request: InstanceType<typeof CustomersRequest>
  ): Promise<InstanceType<typeof CustomersResponse>> {
    const customerIds = request.getCustomerIdsList();
    const response = new CustomersResponse();
    const formattedIds = customerIds.toString();
    const customersResponse = await SupabaseService.client
      .from('customer')
      .select()
      .filter('id', 'in', `(${formattedIds})`);

    if (customersResponse.error) {
      console.error(customersResponse.error);
      return response;
    }

    for (const customer of customersResponse.data) {
      const customerResponse = new CustomerResponse();
      customer?.id && customerResponse.setId(customer.id);
      customer?.email && customerResponse.setEmail(customer.email);
      customer?.first_name &&
        customerResponse.setFirstName(customer.first_name);
      customer?.last_name && customerResponse.setLastName(customer.last_name);
      customer?.billing_address_id &&
        customerResponse.setBillingAddressId(customer.billing_address_id);
      customer?.phone && customerResponse.setPhone(customer.phone);
      customer?.has_account &&
        customerResponse.setHasAccount(customer.has_account);
      customer?.created_at &&
        customerResponse.setCreatedAt(customer.created_at);
      customer?.updated_at &&
        customerResponse.setUpdatedAt(customer.updated_at);
      customer?.deleted_at &&
        customerResponse.setDeletedAt(customer.deleted_at);
      customer?.metadata && customerResponse.setMetadata(customer.metadata);
      response.addCustomers(customerResponse);
    }

    return response;
  }

  public async updateCustomerAccountAsync(
    sessionToken: string,
    request: InstanceType<typeof UpdateCustomerRequest>
  ): Promise<InstanceType<typeof UpdateCustomerResponse>> {
    const email = request.getEmail();
    const firstName = request.getFirstName();
    const lastName = request.getLastName();
    const phone = request.getPhone();
    const metadata = request.getMetadata();

    const updateCustomer = new UpdateCustomerResponse();
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
          updateCustomer.setData(JSON.stringify(updatedCustomerData));
          updateCustomer.setPassword(sessionToken);
        } catch (error: any) {
          console.error(error);
        }
      }

      return updateCustomer;
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
    updateCustomer.setData(JSON.stringify(data));
    updateCustomer.setPassword(sessionToken);
    return updateCustomer;
  }

  public async addCustomerToGroupAsync(
    request: InstanceType<typeof AddCustomerToGroupRequest>
  ): Promise<InstanceType<typeof CustomerGroupResponse>> {
    const customerGroupId = request.getCustomerGroupId();
    const customerId = request.getCustomerId();
    const customerGroup = new CustomerGroupResponse();

    const customerGroupCustomers = await SupabaseService.client
      .from('customer_group_customers')
      .select()
      .match({ customer_id: customerId });

    if (customerGroupCustomers.error) {
      console.error(customerGroupCustomers.error);
      return customerGroup;
    }

    for (const group of customerGroupCustomers.data) {
      if (customerGroupId === group.customer_group_id) {
        continue;
      }

      try {
        const customerGroupResponse = await axiod.delete(
          `${this._url}/admin/customer-groups/${group.customer_group_id}/customers/batch`,
          {
            customer_ids: [
              {
                id: customerId,
              },
            ],
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
    }

    try {
      const customerGroupResponse = await axiod.post(
        `${this._url}/admin/customer-groups/${customerGroupId}/customers/batch`,
        {
          customer_ids: [
            {
              id: customerId,
            },
          ],
        },
        {
          headers: {
            'x-medusa-access-token': this._token,
          },
        }
      );

      const customerGroupData = customerGroupResponse.data
        ? customerGroupResponse.data['customer_group']
        : '';
      customerGroup.setData(JSON.stringify(customerGroupData));
    } catch (error: any) {
      console.error(error);
    }

    return customerGroup;
  }

  public async removeCustomerFromGroupAsync(
    request: InstanceType<typeof RemoveCustomerFromGroupRequest>
  ): Promise<InstanceType<typeof CustomerGroupResponse>> {
    const customerGroupId = request.getCustomerGroupId();
    const customerId = request.getCustomerId();
    const customerGroup = new CustomerGroupResponse();

    try {
      const customerGroupResponse = await axiod.delete(
        `${this._url}/admin/customer-groups/${customerGroupId}/customers/batch`,
        {
          customer_ids: [
            {
              id: customerId,
            },
          ],
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

    customerGroup.setData('');
    return customerGroup;
  }

  public async findCustomerGroupAsync(
    salesLocationId: string
  ): Promise<InstanceType<typeof CustomerGroupResponse>> {
    const customerGroup = new CustomerGroupResponse();
    const { data, error } = await SupabaseService.client
      .from('customer_group')
      .select()
      .contains('metadata', {
        sales_location_id: salesLocationId,
      });

    if (error) {
      console.error(error);
      return customerGroup;
    }

    const customerGroupData = data.length > 0 ? data[0] : '';
    customerGroup.setData(JSON.stringify(customerGroupData));
    return customerGroup;
  }

  public async getPriceListsAsync(
    request: InstanceType<typeof PriceListsRequest>
  ): Promise<InstanceType<typeof PriceListsResponse>> {
    const offset = request.getOffset() ?? 0;
    const limit = request.getLimit() ?? 10;
    const status = request.getStatusList();
    const customerGroups = request.getCustomerGroupsList() ?? [];
    const type = request.getTypeList();

    const priceListsResponse = new PriceListsResponse();
    if (customerGroups.length <= 0) {
      return priceListsResponse;
    }

    const priceListCustomerGroups = await SupabaseService.client
      .from('price_list_customer_groups')
      .select()
      .in('customer_group_id', customerGroups);

    if (priceListCustomerGroups.error) {
      console.error(priceListCustomerGroups.error);
      return priceListsResponse;
    }

    const customerGroupPriceLists = priceListCustomerGroups.data.map(
      (value) => value.price_list_id
    );
    const priceLists = await SupabaseService.client
      .from('price_list')
      .select()
      .limit(limit)
      .range(offset, offset + limit)
      .in('id', customerGroupPriceLists)
      .in('status', status.length > 0 ? status : ['active'])
      .in('type', type.length > 0 ? type : ['sale']);

    if (priceLists.error) {
      console.error(priceLists.error);
      return priceListsResponse;
    }

    priceListsResponse.setData(
      JSON.stringify({ price_lists: priceLists.data })
    );

    return priceListsResponse;
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
    const { error, count } = await SupabaseService.client
      .from('product')
      .select('*', { count: 'exact' })
      .match({ type_id: typeData['id'] });

    if (error) {
      console.error(error);
      response.setCount(0);
      return response;
    }

    response.setCount(count);
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
