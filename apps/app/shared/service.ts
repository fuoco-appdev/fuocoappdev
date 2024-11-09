import { AxiosError } from 'axios';
import { makeObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { SerializableProperty } from 'mobx-persist-store/lib/esm2017/serializableProperty';
import ConfigService from './services/config.service';
import { StoreOptions } from './store-options';

export abstract class Service {
  private readonly _endpointUrl: string;
  protected readonly configService: ConfigService;
  protected readonly supabaseAnonKey: string;

  constructor(
    configService: ConfigService,
    supabaseAnonKey: string,
    options: StoreOptions = {}
  ) {
    makeObservable(this);
    this._endpointUrl = configService.supabase?.functions_url;
    this.configService = configService;
    this.supabaseAnonKey = supabaseAnonKey;

    if (options.strategy?.default) {
      makePersistable(this, {
        name: this.constructor.name.toLocaleLowerCase(),
        properties: options.persistableProperties?.default as (
          | keyof this
          | SerializableProperty<this, keyof this>
        )[],
        storage: options.strategy.default,
      });
    }
  }

  public get headers(): { [key: string]: string } {
    return {
      Authorization: `Bearer ${this.supabaseAnonKey}`,
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

  public abstract dispose(): void;
}
