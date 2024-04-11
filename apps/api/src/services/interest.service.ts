import SupabaseService from "./supabase.service.ts";
import {
  CreateInterestRequest,
  InterestResponse,
  InterestsRequest,
  InterestsResponse,
  SearchInterestsRequest,
} from "../protobuf/interest_pb.js";

export interface InterestProps {
  id?: string;
  created_at?: string;
  name?: string;
}

export class InterestService {
  public async findAsync(
    request: InstanceType<typeof InterestsRequest>,
  ): Promise<InstanceType<typeof InterestsResponse> | null> {
    const ids = request.getIdsList();
    const response = new InterestsResponse();

    const { data, error } = await SupabaseService.client
      .from("interest")
      .select()
      .in("id", ids);

    if (error) {
      console.error(error);
      return null;
    }

    for (const interestData of data) {
      const interest = new InterestResponse();
      interest.setId(interestData.id);
      interest.setCreatedAt(interestData.created_at);
      interest.setName(interestData.name);
      response.addInterests(interest);
    }

    return response;
  }

  public async upsertAsync(
    request: InstanceType<typeof CreateInterestRequest>,
  ): Promise<InstanceType<typeof InterestResponse> | null> {
    const name = request.getName().toLowerCase();
    const response = new InterestResponse();

    if (!name || name.length <= 0) {
      console.error("name cannot be undefined");
      return null;
    }

    const props: InterestProps = {
      name: name,
    };
    const { data, error } = await SupabaseService.client
      .from("interest")
      .upsert(props)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    const interestData = data.length > 0 ? data[0] : null;
    if (!interestData) {
      return null;
    }

    response.setId(interestData.id);
    response.setName(interestData.name);
    response.setCreatedAt(interestData.created_at);
    return response;
  }

  public async searchAsync(
    request: InstanceType<typeof SearchInterestsRequest>,
  ): Promise<InstanceType<typeof InterestsResponse> | null> {
    const query = request.getQuery();
    const offset = request.getOffset();
    const limit = request.getLimit();
    const response = new InterestsResponse();

    const { data, error } = await SupabaseService.client
      .from("interest")
      .select()
      .limit(limit)
      .range(offset, offset + limit)
      .ilike("name", `%${query}%`);

    if (error) {
      console.error(error);
      return null;
    }

    for (const interest of data) {
      const interestResponse = new InterestResponse();
      interestResponse.setId(interest.id);
      interestResponse.setCreatedAt(interest.created_at);
      interestResponse.setName(interest.name);
      response.addInterests(interestResponse);
    }

    return response;
  }
}

export default new InterestService();
