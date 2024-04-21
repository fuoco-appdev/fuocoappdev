import { Service } from "../service";
import {
  CreateDeviceRequest,
  DeviceResponse,
  DevicesRequest,
  DevicesResponse,
  UpdateDeviceRequest,
} from "../protobuf/device_pb";
import { BehaviorSubject, Observable } from "rxjs";
import SupabaseService from "./supabase.service";
import axios, { AxiosError } from "axios";
import { Session, User } from "@supabase/supabase-js";

export interface CreateDeviceProps {
  type?: string;
  name?: string;
  stockLocationId?: string;
  metadata?: Record<string, any>;
}

export interface UpdateDeviceProps {
  name?: string;
  stockLocationId?: string;
  metadata?: Record<string, any>;
}

class DeviceService extends Service {
  constructor() {
    super();
  }

  public async requestCreateAsync(
    { type, name, stockLocationId, metadata }: CreateDeviceProps,
  ): Promise<DeviceResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new CreateDeviceRequest({
      type: type,
      name: name,
      stockLocationId: stockLocationId,
      metadata: JSON.stringify(metadata),
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/device/create`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deviceResponse = DeviceResponse.fromBinary(arrayBuffer);
    return deviceResponse;
  }

  public async requestUpdateAsync(
    id: string,
    { name, stockLocationId, metadata }: UpdateDeviceProps,
  ): Promise<DeviceResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new UpdateDeviceRequest({
      name: name,
      stockLocationId: stockLocationId,
      metadata: JSON.stringify(metadata),
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/device/update/${id}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deviceResponse = DeviceResponse.fromBinary(arrayBuffer);
    return deviceResponse;
  }

  public async requestDevicesAsync(
    stockLocationId: string,
  ): Promise<DevicesResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new DevicesRequest({
      stockLocationId: stockLocationId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/device/devices`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const deviceResponse = DevicesResponse.fromBinary(arrayBuffer);
    return deviceResponse;
  }
}

export default new DeviceService();
