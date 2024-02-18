import { AxiosError } from "axios";
import ConfigService, { Config } from "./services/config.service";

export class Service {
  private _endpointUrl: string | undefined;
  private _anonKey: string | undefined;

  constructor() {
  }

  public initialize(config: Config) {
    this._endpointUrl = config.supabase.functions_url;
    this._anonKey = config.supabase.anon_key;
  }

  public get headers(): { [key: string]: string } {
    return {
      Authorization: `Bearer ${this._anonKey}`,
      "Content-Type": "application/x-protobuf",
    };
  }

  public get endpointUrl(): string | undefined {
    return this._endpointUrl;
  }

  public assertResponse(buffer: Uint8Array): void {
    const message = new TextDecoder().decode(buffer);
    let json: any = {};
    try {
      json = JSON.parse(message);
    } catch {
      return;
    }

    if (json?.status >= 400) {
      throw json as AxiosError;
    }
  }
}
