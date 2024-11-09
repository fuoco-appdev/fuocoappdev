import {
  DeepLTranslateRequest,
  DeepLTranslationsResponse,
} from '../protobuf/deepl_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';

export default class DeepLService extends Service {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async translateAsync(
    text: string,
    languageCode: string
  ): Promise<DeepLTranslationsResponse> {
    const request = new DeepLTranslateRequest({
      text: text,
      languageCode: languageCode.toUpperCase(),
    });

    const response = await fetch(`${this.endpointUrl}/deepl/translate`, {
      method: 'post',
      headers: {
        ...this.headers,
      },
      body: request.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const translationsResponse =
      DeepLTranslationsResponse.fromBinary(arrayBuffer);
    return translationsResponse;
  }
}
