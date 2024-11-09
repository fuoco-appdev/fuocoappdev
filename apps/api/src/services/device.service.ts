import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import { RealtimeChannel } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import {
  CreateDeviceRequest,
  DeviceResponse,
  DevicesRequest,
  DevicesResponse,
  UpdateDeviceRequest,
} from '../protobuf/device_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import AccountService from './account.service.ts';
import MedusaService from './medusa.service.ts';
import SupabaseService from './supabase.service.ts';

export interface DeviceProps {
  id?: string;
  created_at?: string;
  updated_at?: string;
  type: string;
  stock_location_id: string;
  name: string;
  metadata: string;
  active: string;
}

@Service()
export default class DeviceService {
  private readonly _medusaService: MedusaService;
  private readonly _supabaseService: SupabaseService;
  private readonly _accountService: AccountService;
  constructor() {
    this._medusaService = serviceCollection.get(serviceTypes.MedusaService);
    this._supabaseService = serviceCollection.get(serviceTypes.SupabaseService);
    this._accountService = serviceCollection.get(serviceTypes.AccountService);
  }
  public async createOrderBroadcastAsync(
    fulfillment: Record<string, any>
  ): Promise<void> {
    const orderId = fulfillment['order_id'] as string;
    const locationId = fulfillment['location_id'] as string;
    const orderResponse = await this._medusaService.getOrderAsync(orderId);
    const devicesRequest = new DevicesRequest();
    devicesRequest.setStockLocationId(locationId);
    const devicesResponse = await this.getDevicesAsync(devicesRequest);
    for (const device of devicesResponse?.getDevicesList() ?? []) {
      const channel = this._supabaseService.client.channel(
        `device-${device.getId()}`
      );
      this.sendCreatedBroadcast(channel, {
        type: 'order',
        data: orderResponse,
      });
    }
  }

  public async createAsync(
    supabaseId: string,
    request: InstanceType<typeof CreateDeviceRequest>
  ): Promise<InstanceType<typeof DeviceResponse> | null> {
    const accountResponse = await this._accountService.findAsync(supabaseId);
    if (!accountResponse) {
      console.error('No account associated to supabase id');
      return null;
    }

    const response = new DeviceResponse();
    const type = request.getType();
    const stockLocationId = request.getStockLocationId();
    const name = request.getName();
    const metadata = request.getMetadata();

    const stockLocationResponse =
      await this._medusaService.getStockLocationAsync(stockLocationId);
    const stockLocation = JSON.parse(stockLocationResponse.getData());
    const stockLocationMetadata = stockLocation.metadata;
    const adminAccountId = stockLocationMetadata.admin_account_id;
    if (accountResponse.id !== adminAccountId) {
      console.error('Account is not admin to the stock location');
      return null;
    }

    const deviceData = await this._supabaseService.client
      .from('device')
      .insert([
        {
          type: type,
          stock_location_id: stockLocationId,
          name: name,
          metadata: metadata,
        },
      ])
      .select();

    if (deviceData.error) {
      console.error(deviceData.error);
      return null;
    }

    const data = deviceData.data.length > 0 ? deviceData.data[0] : null;
    if (!data) {
      console.error('Created device returned null');
      return null;
    }
    response.setId(data.id);
    response.setCreatedAt(data.created_at);
    response.setUpdatedAt(data.updated_at);
    response.setType(data.type);
    response.setStockLocationId(data.stock_location_id);
    response.setName(data.name);
    response.setMetadata(data.metadata);

    return response;
  }

  public async updateAsync(
    supabaseId: string,
    deviceId: string,
    request: InstanceType<typeof UpdateDeviceRequest>
  ): Promise<InstanceType<typeof DeviceResponse> | null> {
    const accountResponse = await this._accountService.findAsync(supabaseId);
    if (!accountResponse) {
      console.error('No account associated to supabase id');
      return null;
    }

    const response = new DeviceResponse();
    const stockLocationId = request.getStockLocationId();
    const name = request.getName();
    const metadata = request.getMetadata();

    const stockLocationResponse =
      await this._medusaService.getStockLocationAsync(stockLocationId);
    const stockLocation = JSON.parse(stockLocationResponse.getData());
    const stockLocationMetadata = stockLocation.metadata;
    const adminAccountId = stockLocationMetadata.admin_account_id;
    if (accountResponse.id !== adminAccountId) {
      console.error('Account is not admin to the stock location');
      return null;
    }

    const deviceData = await this._supabaseService.client
      .from('device')
      .update({
        ...(name && { name: name }),
        ...(metadata && { metadata: metadata }),
      })
      .eq('id', deviceId)
      .select();

    if (deviceData.error) {
      console.error(deviceData.error);
      return null;
    }

    const data = deviceData.data.length > 0 ? deviceData.data[0] : null;
    if (!data) {
      console.error('Updated device returned null');
      return null;
    }
    response.setId(data.id);
    response.setCreatedAt(data.created_at);
    response.setUpdatedAt(data.updated_at);
    response.setType(data.type);
    response.setStockLocationId(data.stock_location_id);
    response.setName(data.name);
    response.setMetadata(data.metadata);

    return response;
  }

  public async getDevicesAsync(
    request: InstanceType<typeof DevicesRequest>
  ): Promise<InstanceType<typeof DevicesResponse> | null> {
    const response = new DevicesResponse();
    const stockLocationId = request.getStockLocationId();
    const devicesData = await this._supabaseService.client
      .from('device')
      .select()
      .eq('stock_location_id', stockLocationId);

    if (devicesData.error) {
      console.error(devicesData.error);
      return null;
    }

    for (const data of devicesData.data) {
      const deviceResponse = new DeviceResponse();
      deviceResponse.setId(data.id);
      deviceResponse.setCreatedAt(data.created_at);
      deviceResponse.setUpdatedAt(data.updated_at);
      deviceResponse.setType(data.type);
      deviceResponse.setStockLocationId(data.stock_location_id);
      deviceResponse.setName(data.name);
      deviceResponse.setMetadata(data.metadata);
      response.addDevices(deviceResponse);
    }

    return response;
  }

  private sendCreatedBroadcast(
    channel: RealtimeChannel,
    data: Record<string, any>
  ): void {
    const subscription = channel?.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }
      await channel?.send({
        type: 'broadcast',
        event: 'CREATED',
        payload: data,
      });

      subscription?.unsubscribe();
    });
  }
}
