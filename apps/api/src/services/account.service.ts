import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import {
  AccountExistsRequest,
  AccountExistsResponse,
  AccountLikeRequest,
  AccountPresenceRequest,
  AccountPresenceResponse,
  AccountPresencesResponse,
  AccountRequest,
  AccountResponse,
  AccountsRequest,
  AccountsResponse,
} from '../protobuf/account_pb.js';
import serviceCollection, { serviceTypes } from '../service_collection.ts';
import SupabaseService from './supabase.service.ts';

export interface AccountProps {
  id?: string;
  customer_id?: string;
  supabase_id?: string;
  profile_url?: string;
  status?: string;
  updated_at?: string;
  username?: string;
  birthday?: string;
  metadata?: string;
}

export interface AccountDocument extends AccountProps {
  customer: object | undefined;
}

@Service()
export default class AccountService {
  private readonly _supabaseService: SupabaseService;

  constructor() {
    this._supabaseService = serviceCollection.get(serviceTypes.SupabaseService);
  }

  public async findAsync(supabaseId: string): Promise<AccountProps | null> {
    const { data, error } = await this._supabaseService.client
      .from('account')
      .select()
      .match({ supabase_id: supabaseId });

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async findPresenceAsync(
    request: InstanceType<typeof AccountPresenceRequest>
  ): Promise<InstanceType<typeof AccountPresencesResponse> | null> {
    const accountPresencesResponse = new AccountPresencesResponse();
    const accountIds = request.getAccountIdsList();
    const { data, error } = await this._supabaseService.client
      .from('account_presence')
      .select()
      .in('account_id', accountIds);

    if (error) {
      console.error(error);
      return null;
    }

    for (const presence of data) {
      const accountPresenceResponse = new AccountPresenceResponse();
      accountPresenceResponse.setAccountId(presence.account_id);
      accountPresenceResponse.setLastSeen(presence.last_seen);
      accountPresenceResponse.setIsOnline(presence.is_online);
      accountPresencesResponse.addAccountPresences(accountPresenceResponse);
    }

    return accountPresencesResponse;
  }

  public async createAsync(
    request: InstanceType<typeof AccountRequest>
  ): Promise<AccountProps | null> {
    const supabaseId = request.getSupabaseId();
    const existingAccount = await this.findAsync(supabaseId);
    if (existingAccount) {
      return null;
    }

    const supabaseUser =
      await this._supabaseService.client.auth.admin.getUserById(supabaseId);
    if (supabaseUser.error) {
      console.error(supabaseUser.error);
      return null;
    }

    const accountData = this.assignAndGetAccountData({
      supabaseId,
    });
    const { data, error } = await this._supabaseService.client
      .from('account')
      .insert([accountData])
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async checkExistsAsync(
    request: InstanceType<typeof AccountExistsRequest>
  ): Promise<InstanceType<typeof AccountExistsResponse> | null> {
    const username = request.getUsername();
    const response = new AccountExistsResponse();
    const exists = await this.checkUsernameExistsAsync(username);
    response.setExists(exists);
    return response;
  }

  public async updateAsync(
    supabaseId: string,
    request: InstanceType<typeof AccountRequest>
  ): Promise<AccountProps | null> {
    const customerId = request.getCustomerId();
    const profileUrl = request.getProfileUrl();
    const status = request.getStatus();
    const username = request.getUsername();
    const birthday = request.getBirthday();
    const metadata = request.getMetadata();

    const accountData = this.assignAndGetAccountData({
      customerId,
      profileUrl,
      status,
      username,
      birthday,
      metadata,
    });

    const { data, error } = await this._supabaseService.client
      .from('account')
      .update(accountData)
      .match({ supabase_id: supabaseId })
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async findAccountsAsync(
    request: InstanceType<typeof AccountsRequest>
  ): Promise<InstanceType<typeof AccountsResponse> | null> {
    const response = new AccountsResponse();
    const accounts = await this.findAccountsByIdAsync(
      request.getAccountIdsList()
    );
    if (!accounts) {
      console.error('No accounts found');
      return response;
    }
    for (const account of accounts) {
      const accountResponse = this.assignAndGetAccountProtocol(account);
      response.addAccounts(accountResponse);
    }

    return response;
  }

  public async findAccountsByIdAsync(
    ids: string[]
  ): Promise<AccountProps[] | null> {
    const formattedIds = ids.toString();
    const { data, error } = await this._supabaseService.client
      .from('account')
      .select()
      .filter('id', 'in', `(${formattedIds})`);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async deleteAsync(supabaseId: string): Promise<void> {
    const { error } = await this._supabaseService.client
      .from('account')
      .delete()
      .match({ supabase_id: supabaseId });

    if (error) {
      console.error(error);
    }
  }

  public async findLikeAsync(
    request: InstanceType<typeof AccountLikeRequest>
  ): Promise<InstanceType<typeof AccountsResponse> | null> {
    const queryUsername = request.getQueryUsername();
    const accountId = request.getAccountId();
    const offset = request.getOffset();
    const limit = request.getLimit();

    const { data, error } = await this._supabaseService.client
      .from('account')
      .select()
      .not('id', 'in', `(${accountId})`)
      .not('status', 'in', '(Incomplete)')
      .limit(limit)
      .range(offset, offset + limit)
      .ilike('username', `%${queryUsername}%`);

    if (error) {
      console.error(error);
      return null;
    }

    const response = this.assignAndGetAccountsProtocol(data);
    return response;
  }

  public async findFollowersLikeAsync(
    request: InstanceType<typeof AccountLikeRequest>
  ): Promise<InstanceType<typeof AccountsResponse> | null> {
    const queryUsername = request.getQueryUsername();
    const accountId = request.getAccountId();
    const offset = request.getOffset();
    const limit = request.getLimit();

    const accountsData = await this._supabaseService.client
      .from('account')
      .select('*, account_followers!account_followers_account_id_fkey!inner(*)')
      .filter('account_followers.follower_id', 'eq', accountId)
      .not('account_followers.accepted', 'in', '(false)')
      .not('id', 'in', `(${accountId})`)
      .not('status', 'in', '(Incomplete)')
      .limit(limit)
      .range(offset, offset + limit)
      .ilike('username', `%${queryUsername}%`);

    if (accountsData.error) {
      console.error(accountsData.error);
      return null;
    }

    const response = this.assignAndGetAccountsProtocol(accountsData.data);
    return response;
  }

  public async findFollowingLikeAsync(
    request: InstanceType<typeof AccountLikeRequest>
  ): Promise<InstanceType<typeof AccountsResponse> | null> {
    const queryUsername = request.getQueryUsername();
    const accountId = request.getAccountId();
    const offset = request.getOffset();
    const limit = request.getLimit();

    const accountsData = await this._supabaseService.client
      .from('account')
      .select(
        '*, account_followers!account_followers_follower_id_fkey!inner(*)'
      )
      .filter('account_followers.account_id', 'eq', accountId)
      .not('account_followers.accepted', 'in', '(false)')
      .not('id', 'in', `(${accountId})`)
      .not('status', 'in', '(Incomplete)')
      .limit(limit)
      .range(offset, offset + limit)
      .ilike('username', `%${queryUsername}%`);

    if (accountsData.error) {
      console.error(accountsData.error);
      return null;
    }

    const response = this.assignAndGetAccountsProtocol(accountsData.data);
    return response;
  }

  public assignAndGetAccountsProtocol(
    props: AccountProps[]
  ): InstanceType<typeof AccountsResponse> {
    const accountsResponse = new AccountsResponse();
    for (const accountData of props) {
      const account = this.assignAndGetAccountProtocol(accountData);
      accountsResponse.getAccountsList().push(account);
    }

    return accountsResponse;
  }

  public assignAndGetAccountProtocol(
    props: AccountProps
  ): InstanceType<typeof AccountResponse> {
    const account = new AccountResponse();

    props.id && account.setId(props.id);
    props.customer_id && account.setCustomerId(props.customer_id);
    props.supabase_id && account.setSupabaseId(props.supabase_id);
    props.profile_url && account.setProfileUrl(props.profile_url);
    props.status && account.setStatus(props.status);
    props.updated_at && account.setUpdateAt(props.updated_at);
    props.username && account.setUsername(props.username);
    props.birthday && account.setBirthday(props.birthday);
    props.metadata && account.setMetadata(props.metadata);

    return account;
  }

  public assignAndGetAccountData(props: {
    id?: string;
    customerId?: string;
    supabaseId?: string;
    profileUrl?: string;
    status?: string;
    username?: string;
    birthday?: string;
    metadata?: string;
  }) {
    const date = new Date(Date.now());
    return {
      ...(props.supabaseId && { supabase_id: props.supabaseId }),
      ...(props.customerId && { customer_id: props.customerId }),
      ...(props.profileUrl && { profile_url: props.profileUrl }),
      ...(props.status && { status: props.status }),
      ...(props.username && { username: props.username }),
      ...(props.birthday && { birthday: props.birthday }),
      ...(props.metadata && { metadata: props.metadata }),
      updated_at: date.toUTCString(),
    };
  }

  private async checkUsernameExistsAsync(username: string): Promise<boolean> {
    const { data, error } = await this._supabaseService.client
      .from('account')
      .select()
      .eq('username', username);

    if (error) {
      console.error(error);
      return false;
    }

    return data.length > 0;
  }
}
