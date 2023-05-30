import Medusa from '@medusajs/medusa-js';
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

  public async requestStockLocationsAsync(): Promise<core.StockLocations> {
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

    const stockLocationsResponse = core.StockLocations.fromBinary(arrayBuffer);
    return stockLocationsResponse;
  }
}

export default new MedusaService();
