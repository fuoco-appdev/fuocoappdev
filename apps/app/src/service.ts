import { AxiosError } from 'axios';
import ConfigService from './services/config.service';
import SupabaseService from './services/supabase.service';

export class Service {
  private readonly _endpointUrl: string;

  constructor() {
    this._endpointUrl = ConfigService.supabase.functions_url;
  }

  public get headers(): { [key: string]: string } {
    return {
      Authorization: `Bearer ${SupabaseService.anonKey}`,
      'Content-Type': 'application/x-protobuf',
    };
  }

  public get endpointUrl(): string {
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
