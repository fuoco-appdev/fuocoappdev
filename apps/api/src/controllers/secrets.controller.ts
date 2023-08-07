// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Guard, ContentType } from '../index.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import SecretsService from '../services/secrets.service.ts';
import { AuthGuard } from '../guards/auth.guard.ts';

@Controller('/secrets')
export class SecretsController {
  @Post('/public')
  @ContentType('application/x-protobuf')
  public async getPublicSecretsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const secrets = SecretsService.getPublicSecrets();
    context.response.type = 'application/x-protobuf';
    context.response.body = secrets.serializeBinary();
  }

  @Post('/private')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getPrivateSecretsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const secrets = SecretsService.getPrivateSecrets();
    context.response.type = 'application/x-protobuf';
    context.response.body = secrets.serializeBinary();
  }
}
