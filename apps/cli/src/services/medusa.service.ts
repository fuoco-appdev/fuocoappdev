import Medusa from "@medusajs/medusa-js";
import {
  Customer,
  CustomerGroup,
  Order,
  PriceList,
  SalesChannel,
} from "@medusajs/medusa";
import ConfigService, { Config } from "./config.service";
import axios, { AxiosError } from "axios";
import { Service } from "../service";
import SupabaseService from "./supabase.service";
import * as core from "../protobuf/core_pb";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { BehaviorSubject, Observable } from "rxjs";
import Cookies from "js-cookie";
import { StockLocation } from "@medusajs/stock-location/dist/models";

class MedusaService extends Service {
  private _medusa: Medusa | undefined;

  constructor() {
    super();
  }

  public get medusa(): Medusa | undefined {
    return this._medusa;
  }

  public override initialize(config: Config): void {
    super.initialize(config);
    this._medusa = new Medusa({
      baseUrl: config.medusa.url,
      apiKey: config.medusa.public_key,
      maxRetries: 3,
    });
  }

  public async requestStockLocationAsync(stockLocationId: string): Promise<
    (StockLocation & { sales_channels: SalesChannel[] })
  > {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/medusa/stock-location/${stockLocationId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });
    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const stockLocationResponse = core.StockLocationResponse.fromBinary(
      arrayBuffer,
    );
    const json = JSON.parse(stockLocationResponse.data);
    return json;
  }

  public async deleteSessionAsync(): Promise<void> {
    try {
      await this._medusa?.auth.deleteSession();
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default new MedusaService();
