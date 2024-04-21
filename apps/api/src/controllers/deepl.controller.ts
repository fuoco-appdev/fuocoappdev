import { AuthGuard } from "../guards/auth.guard.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { DeepLTranslateRequest } from "../protobuf/deepl_pb.js";
import { ContentType, Controller, Guard, Post } from "../index.ts";
import { readAll } from "https://deno.land/std@0.105.0/io/util.ts";
import DeepLService from "../services/deepl.service.ts";
import SupabaseService from "../services/supabase.service.ts";
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";

@Controller("/deepl")
export class DeepLController {
  @Post("/translate")
  @ContentType("application/x-protobuf")
  public async translateAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >,
  ): Promise<void> {
    const body = await context.request.body({ type: "reader" });
    const requestValue = await readAll(body.value);
    const request = DeepLTranslateRequest.deserializeBinary(requestValue);
    const response = await DeepLService.translateAsync(request);
    context.response.type = "application/x-protobuf";
    context.response.body = response.serializeBinary();
  }
}
