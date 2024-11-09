import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AuthGuard } from '../guards/index.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
  CreateInterestRequest,
  InterestsRequest,
  SearchInterestsRequest,
} from '../protobuf/interest_pb.js';
import serviceCollection from '../service_collection.ts';
import InterestService from '../services/interest.service.ts';

@Controller('/interest')
export class InterestController {
  private readonly _interestService: InterestService;

  constructor() {
    this._interestService = serviceCollection.get(InterestService);
  }

  @Post('/create')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async createAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const request = CreateInterestRequest.deserializeBinary(requestValue);
    const response = await this._interestService.upsertAsync(request);
    if (!response) {
      throw HttpError.createError(409, `Cannot create interest`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/search')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getSearchAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const searchInterestsRequest =
      SearchInterestsRequest.deserializeBinary(requestValue);
    const response = await this._interestService.searchAsync(
      searchInterestsRequest
    );
    if (!response) {
      throw HttpError.createError(404, `No interests were found`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }

  @Post('/interests')
  @Guard(AuthGuard)
  @ContentType('application/x-protobuf')
  public async getInterestsAsync(
    context: Oak.RouterContext<
      string,
      Oak.RouteParams<string>,
      Record<string, any>
    >
  ): Promise<void> {
    const body = await context.request.body({ type: 'reader' });
    const requestValue = await readAll(body.value);
    const interestsRequest = InterestsRequest.deserializeBinary(requestValue);
    const response = await this._interestService.findAsync(interestsRequest);
    if (!response) {
      throw HttpError.createError(404, `No interests were found`);
    }

    context.response.type = 'application/x-protobuf';
    context.response.body = response.serializeBinary();
  }
}
