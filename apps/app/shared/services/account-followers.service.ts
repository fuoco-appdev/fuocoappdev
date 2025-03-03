import {
  AccountFollowerCountMetadataResponse,
  AccountFollowerRequest,
  AccountFollowerRequestsRequest,
  AccountFollowerResponse,
  AccountFollowersRequest,
  AccountFollowersResponse,
} from '../protobuf/account-follower_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export default class AccountFollowersService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _logflareService: LogflareService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestCountMetadataAsync(
    accountId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowerCountMetadataResponse | null> {
    const supabaseUser = await this._supabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    try {
      const response = await fetch(
        `${this.endpointUrl}/account-followers/count-metadata/${accountId}`,
        {
          method: 'post',
          headers: {
            ...this.headers,
          },
          body: '',
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowerCountMetadataResponse =
        AccountFollowerCountMetadataResponse.fromBinary(arrayBuffer);
      return accountFollowerCountMetadataResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCountMetadataAsync(
          accountId,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: supabaseUser.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestFollowersAsync(
    props: {
      accountId: string;
      otherAccountIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowersResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowersRequest = new AccountFollowersRequest({
      accountId: props.accountId,
      otherAccountIds: props.otherAccountIds,
    });
    try {
      const response = await fetch(
        `${this.endpointUrl}/account-followers/followers`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: accountFollowersRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowersResponse =
        AccountFollowersResponse.fromBinary(arrayBuffer);

      return accountFollowersResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestFollowersAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestFollowerRequestsAsync(
    props: {
      accountId: string;
      offset: number;
      limit: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowersResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const accountFollowerRequestsRequest = new AccountFollowerRequestsRequest(
        {
          accountId: props.accountId,
          offset: props.offset,
          limit: props.limit,
        }
      );
      const response = await fetch(
        `${this.endpointUrl}/account-followers/requests`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: accountFollowerRequestsRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowersResponse =
        AccountFollowersResponse.fromBinary(arrayBuffer);

      return accountFollowersResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestFollowerRequestsAsync(
          props,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestAddAsync(
    props: {
      accountId: string;
      followerId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const accountFollowerRequest = new AccountFollowerRequest({
        accountId: props.accountId,
        followerId: props.followerId,
      });
      const response = await fetch(
        `${this.endpointUrl}/account-followers/add`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: accountFollowerRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowerResponse =
        AccountFollowerResponse.fromBinary(arrayBuffer);

      return accountFollowerResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAddAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestRemoveAsync(
    props: {
      accountId: string;
      followerId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const accountFollowerRequest = new AccountFollowerRequest({
        accountId: props.accountId,
        followerId: props.followerId,
      });
      const response = await fetch(
        `${this.endpointUrl}/account-followers/remove`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: accountFollowerRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowerResponse =
        AccountFollowerResponse.fromBinary(arrayBuffer);

      return accountFollowerResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestRemoveAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestConfirmAsync(
    props: {
      accountId: string;
      followerId: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const accountFollowerRequest = new AccountFollowerRequest({
        accountId: props.accountId,
        followerId: props.followerId,
      });
      const response = await fetch(
        `${this.endpointUrl}/account-followers/confirm`,
        {
          method: 'post',
          headers: {
            ...this.headers,
            'Session-Token': `${session?.access_token}`,
          },
          body: accountFollowerRequest.toBinary(),
        }
      );

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const accountFollowerResponse =
        AccountFollowerResponse.fromBinary(arrayBuffer);

      return accountFollowerResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestConfirmAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }
}
