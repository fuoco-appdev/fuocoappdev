import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';

export interface LogflareLogMetadata {
  level: 'info' | 'error' | 'warning';
  stack: {
    targetObject: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructorOpt?: Function;
  };
  message: string;
  supabaseId?: string;
  [key: string]: any;
}

export default class LogflareService extends Service {
  private readonly _logflareUrl: string;
  private readonly _logflareSource: string;
  constructor(
    private readonly _accessToken: string,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    this._logflareUrl = this._configService.logflare.url;
    this._logflareSource = this._configService.logflare.source;
  }

  public override dispose(): void {}

  public async requestCreateLog(
    props: {
      message: string;
      metadata: LogflareLogMetadata;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<unknown> {
    try {
      const response = await fetch(
        `${this._logflareUrl}/api/logs?source=${this._logflareSource}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${this._accessToken}`,
          },
          body: JSON.stringify([
            {
              message: props.message,
              metadata: {
                ...props.metadata,
                stack: props.metadata.stack,
                timestamp: new Date(Date.now()).toUTCString(),
                device: '',
              },
            },
          ]),
        }
      );

      if (!response.ok) throw await response.json();
      return response.json();
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCreateLog(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        throw error;
      }
    }
  }

  public override async requestHealthAsync(
    retries = 1,
    retryDelay = 1000
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${this._configService.logflare.url}/health`
      );
      return response.status === 200;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestHealthAsync(retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        return false;
      }
    }
  }
}
