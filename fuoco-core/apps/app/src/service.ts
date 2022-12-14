import { AxiosError } from 'axios';
import ConfigService from './services/config.service';

export class Service {
  private readonly _headers: { [key: string]: string };
  private readonly _endpointUrl: string;

  constructor() {
    this._headers = {
      Authorization: `Bearer ${ConfigService.supabase.key}`,
      'Content-Type': 'application/x-protobuf',
    };
    this._endpointUrl = `${ConfigService.supabase.url}/functions/v1`;
  }

  public get headers(): { [key: string]: string } {
    return this._headers;
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
