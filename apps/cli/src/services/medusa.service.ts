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
import { StockLocationResponse } from "../protobuf/stock-location_pb";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { BehaviorSubject, Observable } from "rxjs";
import Cookies from "js-cookie";
import { StockLocation } from "@medusajs/stock-location/dist/models";

class MedusaService extends Service {
  constructor() {
    super();
  }

  public override initialize(config: Config): void {
    super.initialize(config);
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

    const stockLocationResponse = StockLocationResponse.fromBinary(
      arrayBuffer,
    );
    const json = JSON.parse(stockLocationResponse.data);
    return json;
  }
}

export default new MedusaService();
