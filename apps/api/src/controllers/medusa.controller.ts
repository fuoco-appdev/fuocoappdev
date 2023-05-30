import { AuthGuard } from '../guards/auth.guard.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { Controller, Post, Guard, ContentType } from '../index.ts';
import MedusaService from '../services/medusa.service.ts';

@Controller('/medusa')
export class MedusaController {
  @Post('/stock-locations')
  @ContentType('application/x-protobuf')
  public async getStockLocationsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const response = await MedusaService.getStockLocationsAsync();
    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
