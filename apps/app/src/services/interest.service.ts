import { Service } from "../service";
import { BehaviorSubject, Observable } from "rxjs";
import SupabaseService from "./supabase.service";
import axios, { AxiosError } from "axios";
import WindowController from "../controllers/window.controller";
import { Session, User } from "@supabase/supabase-js";
import {
  CreateInterestRequest,
  InterestResponse,
  InterestsRequest,
  InterestsResponse,
  SearchInterestsRequest,
} from "../protobuf/interest_pb";

class InterestService extends Service {
  constructor() {
    super();
  }

  public async requestFindAsync(
    ids: string[],
  ): Promise<InterestsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new InterestsRequest({
      ids: ids,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/interest/interests`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const interestsResponse = InterestsResponse.fromBinary(arrayBuffer);
    return interestsResponse;
  }

  public async requestCreateAsync(
    name: string,
  ): Promise<InterestResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new CreateInterestRequest({
      name: name,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/interest/create`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const interestResponse = InterestResponse.fromBinary(arrayBuffer);
    return interestResponse;
  }

  public async requestSearchAsync(props: {
    query: string;
    limit?: number;
    offset?: number;
  }): Promise<InterestsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new SearchInterestsRequest({
      query: props.query,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/interest/search`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const interestsResponse = InterestsResponse.fromBinary(arrayBuffer);
    return interestsResponse;
  }
}

export default new InterestService();
