import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { ContentType, Controller, Post } from '../index.ts';
import { DeepLTranslateRequest } from '../protobuf/deepl_pb.js';
import serviceCollection from '../service_collection.ts';
import DeepLService from '../services/deepl.service.ts';

@Controller('/deepl')
export class DeepLController {
  private readonly _deepLService: DeepLService;

  constructor() {
    this._deepLService = serviceCollection.get(DeepLService);
  }

  @Post('/translate')
  @ContentType('application/x-protobuf')
  public async translateAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = DeepLTranslateRequest.deserializeBinary(requestValue);
    const response = await this._deepLService.translateAsync(request);
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
