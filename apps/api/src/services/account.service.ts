import SupabaseService from './supabase.service.ts';
import {
  AccountRequest,
  AccountResponse,
  AccountsRequest,
  AccountsResponse,
  AccountExistsRequest,
  AccountExistsResponse,
  AccountLikeRequest,
} from '../protobuf/core_pb.js';

export interface AccountProps {
  id?: string;
  customer_id?: string;
  supabase_id?: string;
  profile_url?: string;
  status?: string;
  updated_at?: string;
  language_code?: string;
  username?: string;
}

export class AccountService {
  public async findAsync(supabaseId: string): Promise<AccountProps | null> {
    const { data, error } = await SupabaseService.client
      .from('account')
      .select()
      .match({ supabase_id: supabaseId });

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async createAsync(
    request: InstanceType<typeof AccountRequest>
  ): Promise<AccountProps | null> {
    const supabaseId = request.getSupabaseId();
    const existingAccount = await this.findAsync(supabaseId);
    if (existingAccount) {
      return null;
    }

    const supabaseUser = await SupabaseService.client.auth.admin.getUserById(
      supabaseId
    );
    if (supabaseUser.error) {
      console.error(supabaseUser.error);
      return null;
    }

    const accountData = this.assignAndGetAccountData({
      supabaseId,
    });
    const { data, error } = await SupabaseService.client
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
  ): Promise<AccountProps | null> {
    const username = request.getUsername();
    const response = new AccountExistsResponse();

    const { data, error } = await SupabaseService.client
      .from('account')
      .select()
      .eq('username', username);

    if (error) {
      console.error(error);
      return null;
    }

    response.setExists(data.length > 0);
    return response;
  }

  public async updateAsync(
    supabaseId: string,
    request: InstanceType<typeof AccountRequest>
  ): Promise<AccountProps | null> {
    const customerId = request.getCustomerId();
    const profileUrl = request.getProfileUrl();
    const status = request.getStatus();
    const languageCode = request.getLanguageCode();
    const username = request.getUsername();

    const accountData = this.assignAndGetAccountData({
      customerId,
      profileUrl,
      status,
      languageCode,
      username,
    });
    const { data, error } = await SupabaseService.client
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
  ): Promise<AccountsResponse | null> {
    const response = new AccountsResponse();
    const formattedIds = request.getAccountIdsList().toString();
    const { data, error } = await SupabaseService.client
      .from('account')
      .select()
      .filter('id', 'in', `(${formattedIds})`);

    if (error) {
      console.error(error);
      return null;
    }

    for (const account of data) {
      const accountResponse = this.assignAndGetAccountProtocol(account);
      response.addAccounts(accountResponse);
    }

    return response;
  }

  public async deleteAsync(supabaseId: string): Promise<void> {
    const { error } = await SupabaseService.client
      .from('account')
      .delete()
      .match({ supabase_id: supabaseId });

    if (error) {
      console.error(error);
    }
  }

  public async findLikeAsync(
    request: InstanceType<typeof AccountLikeRequest>
  ): Promise<AccountsResponse | null> {
    const queryUsername = request.getQueryUsername();
    const accountId = request.getAccountId();
    const offset = request.getOffset();
    const limit = request.getLimit();

    const { data, error } = await SupabaseService.client
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
    props.language_code && account.setLanguageCode(props.language_code);
    props.username && account.setUsername(props.username);

    return account;
  }

  public assignAndGetAccountData(props: {
    id?: string;
    customerId?: string;
    supabaseId?: string;
    profileUrl?: string;
    status?: string;
    languageCode?: string;
    username?: string;
  }) {
    const date = new Date(Date.now());
    return {
      ...(props.supabaseId && { supabase_id: props.supabaseId }),
      ...(props.customerId && { customer_id: props.customerId }),
      ...(props.profileUrl && { profile_url: props.profileUrl }),
      ...(props.status && { status: props.status }),
      ...(props.languageCode && { language_code: props.languageCode }),
      ...(props.username && { username: props.username }),
      updated_at: date.toUTCString(),
    };
  }
}

export default new AccountService();
