import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
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
} from '../protobuf/customer_pb.js';
import { OrdersRequest, OrdersResponse } from '../protobuf/order_pb.js';
import {
  PriceListsRequest,
  PriceListsResponse,
} from '../protobuf/price-list_pb.js';
import {
  ProductCountRequest,
  ProductCountResponse,
  ProductMetadataResponse,
  ProductsRequest,
  ProductsResponse,
} from '../protobuf/product_pb.js';
import {
  StockLocationResponse,
  StockLocationsRequest,
  StockLocationsResponse,
} from '../protobuf/stock-location_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import AccountService from './account.service.ts';
import MapboxService, { GeocodingFeature } from './mapbox.service.ts';
import SupabaseService from './supabase.service.ts';

export interface CustomerProps {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  billing_address_id?: string;
  password_hash?: string;
  phone?: string;
  has_account: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  metadata?: string;
}

@Service()
export default class MedusaService {
  private readonly _supabaseService: SupabaseService;
  private readonly _mapboxService: MapboxService;
  private readonly _accountService: AccountService;
  private _url: string | undefined;
  private _secret: string | undefined;
  constructor() {
    this._supabaseService = serviceCollection.get(serviceTypes.SupabaseService);
    this._mapboxService = serviceCollection.get(serviceTypes.MapboxService);
    this._accountService = serviceCollection.get(serviceTypes.AccountService);

    this._url = Deno.env.get('MEDUSA_BACKEND_URL');
    this._secret = Deno.env.get('MEDUSA_SECRET');
    if (!this._url) {
      throw new Error("MEDUSA_BACKEND_URL doesn't exist");
    }

    if (!this._secret) {
      throw new Error("MEDUSA_SECRET doesn't exist");
    }
  }

  public async updateStockLocationMetadataAsync(
    stockLocation: Record<string, any>
  ): Promise<void> {
    const id = stockLocation['id'];
    const addressData = stockLocation['address'];
    let metadata = stockLocation['metadata'];

    if (!addressData) {
      return;
    }

    if (!metadata) {
      metadata = {};
    }

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
    metadata['coordinates'] = JSON.stringify({
      longitude: feature?.center[0],
      latitude: feature?.center[1],
    });
    metadata['place_name'] = feature?.place_name;
    const context = feature?.context.find((value) =>
      value.id.startsWith('region')
    );
    metadata['region'] = context?.text ?? '';
    await axiod.post(`${this._url}/admin/stock-locations/${id}`, {
      headers: {
        Authorization: `Basic ${this._secret}`,
      },
    });
  }

  public async getCustomerMetadataAsync(
    customerId: string
  ): Promise<InstanceType<typeof CustomerMetadataResponse>> {
    const response = new CustomerMetadataResponse();
    const customerResponse = await this._supabaseService.client
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

  public async getCustomerBySupabaseIdAsync(
    supabaseId: string
  ): Promise<InstanceType<typeof AdminCustomerResponse>> {
    const response = new AdminCustomerResponse();
    const account = await this._accountService.findAsync(supabaseId);
    if (account && account?.customer_id) {
      const customer = await this.getCustomerAsync(account.customer_id);
      response.setData(JSON.stringify(customer));
    } else {
      const supabaseUser =
        await this._supabaseService.client.auth.admin.getUserById(supabaseId);
      const fetchParams = new URLSearchParams({
        q: supabaseUser.data.user?.email ?? '',
      }).toString();
      const customerResponse = await axiod.get(
        `${this._url}/admin/customers?${fetchParams}`,
        {
          headers: {
            Authorization: `Basic ${this._secret}`,
          },
        }
      );
      const customers = customerResponse?.data['customers'] ?? [];
      if (customers.length > 0) {
        response.setData(JSON.stringify(customers[0]));
      }
    }

    return response;
  }

  public async getCustomerAsync(
    customerId: string,
    expand?: string
  ): Promise<object | null> {
    const params = new URLSearchParams({
      ...(expand && { expand: expand }),
    }).toString();
    const customerResponse = await axiod.get(
      `${this._url}/admin/customers/${customerId}?${params}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );
    const customer = customerResponse?.data['customer'];
    return customer;
  }

  public async getCustomersByIdAsync(
    ids: string[]
  ): Promise<CustomerProps[] | null> {
    const formattedIds = ids.toString();
    const customersResponse = await this._supabaseService.client
      .from('customer')
      .select()
      .filter('id', 'in', `(${formattedIds})`);

    if (customersResponse.error) {
      console.error(customersResponse.error);
      return null;
    }

    return customersResponse.data as CustomerProps[];
  }

  public async getCustomersAsync(
    request: InstanceType<typeof CustomersRequest>
  ): Promise<InstanceType<typeof CustomersResponse>> {
    const customerIds = request.getCustomerIdsList();
    const response = new CustomersResponse();
    const customers = await this.getCustomersByIdAsync(customerIds);
    if (!customers) {
      return response;
    }

    for (const customer of customers) {
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
    request: InstanceType<typeof UpdateCustomerRequest>
  ): Promise<InstanceType<typeof AdminCustomerResponse>> {
    const email = request.getEmail();
    const firstName = request.getFirstName();
    const lastName = request.getLastName();
    const phone = request.getPhone();
    const metadata = request.getMetadata();

    const updateCustomer = new AdminCustomerResponse();
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
            },
            {
              headers: {
                Authorization: `Basic ${this._secret}`,
              },
            }
          );
          const updatedCustomerData = updateCustomerResponse.data['customer'];
          updateCustomer.setData(JSON.stringify(updatedCustomerData));
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
          ...(email && { email: email }),
          ...(firstName && { first_name: firstName }),
          ...(lastName && { last_name: lastName }),
          ...(phone && { phone: phone }),
          ...(metadata && { metadata: metadata }),
        },
        {
          headers: {
            Authorization: `Basic ${this._secret}`,
          },
        }
      );
      const data = customerResponse.data['customer'];

      updateCustomer.setData(JSON.stringify(data));
    } catch (error: any) {
      console.error(error);
    }

    return updateCustomer;
  }

  public async addCustomerToGroupAsync(
    request: InstanceType<typeof AddCustomerToGroupRequest>
  ): Promise<InstanceType<typeof CustomerGroupResponse>> {
    const customerGroupId = request.getCustomerGroupId();
    const customerId = request.getCustomerId();
    const customerGroup = new CustomerGroupResponse();

    if (!customerId || customerId.length <= 0) {
      return customerGroup;
    }

    if (!customerGroupId || customerGroupId.length <= 0) {
      return customerGroup;
    }

    const customerGroupCustomers = await this._supabaseService.client
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
              Authorization: `Basic ${this._secret}`,
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
            Authorization: `Basic ${this._secret}`,
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
      await axiod.delete(
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
            Authorization: `Basic ${this._secret}`,
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
    const { data, error } = await this._supabaseService.client
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

    const priceListCustomerGroups = await this._supabaseService.client
      .from('price_list_customer_groups')
      .select()
      .in('customer_group_id', customerGroups);

    if (priceListCustomerGroups.error) {
      console.error(priceListCustomerGroups.error);
      return priceListsResponse;
    }

    const customerGroupPriceLists = priceListCustomerGroups.data.map(
      (value: any) => value.price_list_id
    );
    const priceLists = await this._supabaseService.client
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

  public async getStockLocationsAsync(
    request: InstanceType<typeof StockLocationsRequest>
  ): Promise<InstanceType<typeof StockLocationsResponse>> {
    const ids = request.getIdsList();
    const params = new URLSearchParams({
      expand: 'address',
    });
    ids.map((value) => params.append('id', value));

    const stockLocationsResponse = await axiod.get(
      `${this._url}/admin/stock-locations?${params.toString()}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );

    const stockLocations = new StockLocationsResponse();
    const data = stockLocationsResponse.data['stock_locations'];
    for (const location of data) {
      stockLocations.addLocations(JSON.stringify(location));
    }

    return stockLocations;
  }

  public async getStockLocationsAllAsync(): Promise<
    InstanceType<typeof StockLocationsResponse>
  > {
    const params = new URLSearchParams({
      expand: 'address,sales_channels',
    }).toString();
    const stockLocationsResponse = await axiod.get(
      `${this._url}/admin/stock-locations?${params}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );

    const stockLocations = new StockLocationsResponse();
    const data = stockLocationsResponse.data['stock_locations'];
    for (const location of data) {
      stockLocations.addLocations(JSON.stringify(location));
    }

    return stockLocations;
  }

  public async getStockLocationAsync(
    stockLocationId: string
  ): Promise<InstanceType<typeof StockLocationResponse>> {
    const stockLocation = new StockLocationResponse();
    const params = new URLSearchParams({
      expand: 'address,sales_channels',
    }).toString();
    const stockLocationResponse = await axiod.get(
      `${this._url}/admin/stock-locations/${stockLocationId}?${params}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );

    const data = stockLocationResponse.data['stock_location'];
    stockLocation.setData(JSON.stringify(data));
    return stockLocation;
  }

  public async getProductCountAsync(
    request: InstanceType<typeof ProductCountRequest>
  ): Promise<InstanceType<typeof ProductCountResponse>> {
    const type = request.getType();
    const response = new ProductCountResponse();
    const productTypeResponse = await this._supabaseService.client
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
    const { error, count } = await this._supabaseService.client
      .from('product')
      .select('*', { count: 'exact' })
      .match({ type_id: typeData['id'] });

    if (error) {
      console.error(error);
      response.setCount(0);
      return response;
    }

    response.setCount(count ?? 0);
    return response;
  }

  public async getProductsAsync(
    request: InstanceType<typeof ProductsRequest>
  ): Promise<InstanceType<typeof ProductsResponse>> {
    const ids = request.getIdsList();
    const params = new URLSearchParams();
    ids.map((value) => params.append('id', value));
    const productsResponse = await axiod.get(
      `${this._url}/admin/products?${params.toString()}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );

    const products = new ProductsResponse();
    const productsData = productsResponse.data['products'];
    for (const data of productsData) {
      products.addProducts(JSON.stringify(data));
    }

    return products;
  }

  public async getProductMetadataAsync(
    productId: string
  ): Promise<InstanceType<typeof ProductMetadataResponse>> {
    const params = new URLSearchParams({
      expand: 'sales_channels,tags,options,variants,type',
    });
    const productResponse = await axiod.get(
      `${this._url}/admin/products/${productId}?${params}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );
    const productMetadata = new ProductMetadataResponse();
    const data = productResponse.data['product'];
    productMetadata.setTitle(data.title);
    productMetadata.setSubtitle(data.subtitle);
    productMetadata.setDescription(data.description);
    productMetadata.setThumbnail(data.thumbnail);
    productMetadata.setType(JSON.stringify(data.type));
    productMetadata.setMaterial(data.material);
    productMetadata.setLength(data.length);
    productMetadata.setWeight(data.weight);
    productMetadata.setHeight(data.height);
    productMetadata.setWidth(data.width);
    productMetadata.setOriginCountry(data.origin_country);
    productMetadata.setMetadata(JSON.stringify(data.metadata));
    data.tags.map((value: Record<string, any>) =>
      productMetadata.addTags(JSON.stringify(value))
    );
    data.options.map((value: Record<string, any>) =>
      productMetadata.addOptions(JSON.stringify(value))
    );
    data.variants.map((value: Record<string, any>) =>
      productMetadata.addVariantIds(value.id)
    );
    data.sales_channels.map((value: Record<string, any>) =>
      productMetadata.addSalesChannelIds(value.id)
    );

    return productMetadata;
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
          Authorization: `Basic ${this._secret}`,
        },
      }
    );
    const orders = new OrdersResponse();
    const data = ordersResponse.data['orders'];
    orders.setData(JSON.stringify(data));

    return orders;
  }

  public async getOrderAsync(orderId: string): Promise<Record<string, any>> {
    const ordersResponse = await axiod.get(
      `${this._url}/admin/orders/${orderId}`,
      {
        headers: {
          Authorization: `Basic ${this._secret}`,
        },
      }
    );

    const data = ordersResponse.data['order'];
    return data;
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
          Authorization: `Basic ${this._secret}`,
        },
      }
    );
    return customerListResponse.data['customers'];
  }

  private async getFeatureAsync(
    searchText: string,
    country: string
  ): Promise<GeocodingFeature | null> {
    const geocoding = await this._mapboxService.requestGeocodingPlacesAsync(
      searchText,
      country
    );
    if (geocoding.features.length > 0) {
      return geocoding.features[0];
    }

    return null;
  }
}
