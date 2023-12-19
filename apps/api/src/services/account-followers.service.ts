import SupabaseService from './supabase.service.ts';
import {
  AccountFollowerRequest,
  AccountFollowerResponse,
  AccountFollowerCountMetadataResponse,
  AccountFollowersRequest,
  AccountFollowersResponse,
  AccountFollowerRequestsRequest,
} from '../protobuf/core_pb.js';

export interface AccountFollowersProps {
  account_id?: string;
  follower_id?: string;
  accepted?: boolean;
}

export class AccountFollowersService {
  //   public async getCountMetadataAsync(
  //     accountId: string
  //   ): Promise<AccountFollowerCountMetadataResponse | null> {
  //     const metadataResponse = await this.findCountMetadataAsync(accountId);
  //     return metadataResponse;
  //   }

  public async getFollowersAsync(
    request: InstanceType<typeof AccountFollowersRequest>
  ): Promise<AccountFollowersResponse | null> {
    const response = await this.findFollowersAsync(request);
    return response;
  }

  public async getRequestsAsync(
    request: InstanceType<typeof AccountFollowerRequestsRequest>
  ): Promise<AccountFollowersResponse | null> {
    const response = await this.findRequestsAsync(request);
    return response;
  }

  public async upsertAsync(
    request: InstanceType<typeof AccountFollowerRequest>
  ): Promise<AccountFollowerResponse | null> {
    const accountId = request.getAccountId();
    const followerId = request.getFollowerId();
    const response = new AccountFollowerResponse();

    if (!accountId || accountId.length <= 0) {
      console.error('Account id cannot be undefined');
      return null;
    }

    if (!followerId || followerId.length <= 0) {
      console.error('Follower id cannot be undefined');
      return null;
    }

    const props: AccountFollowersProps = {
      account_id: accountId,
      follower_id: followerId,
      accepted: false,
    };
    const { data, error } = await SupabaseService.client
      .from('account_followers')
      .upsert(props)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    const accountFollowerData = data.length > 0 ? data[0] : null;
    if (!accountFollowerData) {
      return null;
    }

    response.setAccountId(accountFollowerData.account_id);
    response.setFollowerId(accountFollowerData.follower_id);
    response.setIsFollowing(true);
    response.setAccepted(accountFollowerData.accepted);
    response.setCreatedAt(accountFollowerData.created_at);
    response.setUpdatedAt(accountFollowerData.updated_at);
    return response;
  }

  public async deleteAsync(
    request: InstanceType<typeof AccountFollowerRequest>
  ): Promise<AccountFollowerResponse | null> {
    const accountId = request.getAccountId();
    const followerId = request.getFollowerId();
    const response = new AccountFollowerResponse();

    if (!accountId || accountId.length <= 0) {
      console.error('Account id cannot be undefined');
      return null;
    }

    if (!followerId || followerId.length <= 0) {
      console.error('Follower id cannot be undefined');
      return null;
    }

    const props: AccountFollowersProps = {
      account_id: accountId,
      follower_id: followerId,
    };

    const { error } = await SupabaseService.client
      .from('account_followers')
      .delete()
      .match(props);

    if (error) {
      console.error(error);
      return null;
    }

    response.setAccountId(accountId);
    response.setFollowerId(followerId);
    response.setIsFollowing(false);
    response.setAccepted(false);
    return response;
  }

  public async confirmAsync(
    request: InstanceType<typeof AccountFollowerRequest>
  ): Promise<AccountFollowerResponse | null> {
    const accountId = request.getAccountId();
    const followerId = request.getFollowerId();
    const response = new AccountFollowerResponse();

    if (!accountId || accountId.length <= 0) {
      console.error('Account id cannot be undefined');
      return null;
    }

    if (!followerId || followerId.length <= 0) {
      console.error('Follower id cannot be undefined');
      return null;
    }

    const { data, error } = await SupabaseService.client
      .from('account_followers')
      .update({ accepted: true })
      .eq('account_id', accountId)
      .eq('follower_id', followerId)
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    const accountFollowerData = data.length > 0 ? data[0] : null;
    if (!accountFollowerData) {
      return null;
    }

    response.setAccountId(accountFollowerData.account_id);
    response.setFollowerId(accountFollowerData.follower_id);
    response.setIsFollowing(accountFollowerData.is_following);
    response.setAccepted(accountFollowerData.accepted);
    response.setCreatedAt(accountFollowerData.created_at);
    response.setUpdatedAt(accountFollowerData.updated_at);
    return response;
  }

  //   private async findCountMetadataAsync(
  //     accountId: string
  //   ): Promise<AccountFollowerCountMetadataResponse | null> {
  //     const metadataResponse = new AccountFollowerCountMetadataResponse();

  //     if (accountId.length <= 0) {
  //       console.error('Account ids cannot be empty');
  //       return null;
  //     }

  //     try {
  //       const followingData = await SupabaseService.client
  //         .from('account_followers')
  //         .select('', { count: 'exact' })
  //         .eq('account_id', id);

  //       if (followingData.error) {
  //         console.error(followingData.error);
  //       } else {
  //         metadataResponse.setFollowingCount(followingData.count);
  //       }
  //     } catch (error: any) {
  //       console.error(error);
  //     }

  //     try {
  //       const followersData = await SupabaseService.client
  //         .from('account_followers')
  //         .select('', { count: 'exact' })
  //         .not('accepted', 'in', '(false)')
  //         .eq('follower_id', id);

  //       if (followersData.error) {
  //         console.error(followersData.error);
  //       } else {
  //         metadataResponse.setFollowersCount(followersData.count);
  //       }
  //     } catch (error: any) {
  //       console.error(error);
  //     }

  //     return metadataResponse;
  //   }

  private async findFollowersAsync(
    request: InstanceType<typeof AccountFollowersRequest>
  ): Promise<AccountFollowersResponse | null> {
    const accountId = request.getAccountId();
    const otherAccountIds = request.getOtherAccountIdsList();
    const followersResponse = new AccountFollowersResponse();

    if (otherAccountIds.length <= 0) {
      console.error('Other account ids cannot be empty');
      return null;
    }

    for (const id of otherAccountIds) {
      const followerResponse = new AccountFollowerResponse();
      try {
        const followerData = await SupabaseService.client
          .from('account_followers')
          .select()
          .eq('account_id', accountId)
          .eq('follower_id', id);

        if (followerData.error) {
          console.error(followerData.error);
        }

        if (!followerData.data || followerData.data?.length <= 0) {
          followerResponse.setAccountId(accountId);
          followerResponse.setFollowerId(id);
          followerResponse.setIsFollowing(false);
          followerResponse.setAccepted(false);
        } else {
          const data = followerData.data[0];
          followerResponse.setAccountId(data.account_id);
          followerResponse.setFollowerId(data.follower_id);
          followerResponse.setIsFollowing(true);
          followerResponse.setAccepted(data.accepted);
          followerResponse.setCreatedAt(data.created_at);
          followerResponse.setUpdatedAt(data.updated_at);
        }

        followersResponse.addFollowers(followerResponse);
      } catch (error: any) {
        console.error(error);
      }
    }

    return followersResponse;
  }

  private async findRequestsAsync(
    request: InstanceType<typeof AccountFollowerRequestsRequest>
  ): Promise<AccountFollowersResponse | null> {
    const accountId = request.getAccountId();
    const offset = request.getOffset();
    const limit = request.getLimit();
    const followersResponse = new AccountFollowersResponse();

    if (!accountId) {
      console.error('Account id cannot be empty');
      return null;
    }

    try {
      const followerRequestsData = await SupabaseService.client
        .from('account_followers')
        .select()
        .eq('follower_id', accountId)
        .eq('accepted', false);

      if (followerRequestsData.error) {
        console.error(followerRequestsData.error);
      }

      for (const requestedFollower of followerRequestsData.data) {
        const followerResponse = new AccountFollowerResponse();
        followerResponse.setAccountId(requestedFollower.account_id);
        followerResponse.setFollowerId(requestedFollower.follower_id);
        followerResponse.setIsFollowing(true);
        followerResponse.setAccepted(requestedFollower.accepted);
        followerResponse.setCreatedAt(requestedFollower.created_at);
        followerResponse.setUpdatedAt(requestedFollower.updated_at);
        followersResponse.addFollowers(followerResponse);
      }
    } catch (error: any) {
      console.error(error);
    }

    return followersResponse;
  }
}

export default new AccountFollowersService();
