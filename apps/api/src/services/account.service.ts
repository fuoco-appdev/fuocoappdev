import SupabaseService from './supabase.service.ts';
import { Account, Accounts } from '../protobuf/core_pb.js';

export interface AccountProps {
  id?: string;
  customer_id?: string;
  supabase_id?: string;
  profile_url?: string;
  status?: string;
  updated_at?: string;
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
    supabaseId: string,
    account: InstanceType<typeof Account>
  ): Promise<AccountProps | null> {
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

  public async updateAsync(
    supabaseId: string,
    account: InstanceType<typeof Account>
  ): Promise<AccountProps | null> {
    const customerId = account.getCustomerId();
    const profileUrl = account.getProfileUrl();
    const status = account.getStatus();

    const accountData = this.assignAndGetAccountData({
      customerId,
      profileUrl,
      status,
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

  public async findAllAsync(): Promise<AccountProps[] | null> {
    const { data, error } = await SupabaseService.client
      .from('account')
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async findAllPublicAsync(): Promise<AccountProps[] | null> {
    const { data, error } = await SupabaseService.client
      .from('account')
      .select('id, location');

    if (error) {
      console.error(error);
      return null;
    }

    return data;
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

  public assignAndGetAccountsProtocol(
    props: AccountProps[]
  ): InstanceType<typeof Accounts> {
    const accounts = new Accounts();
    for (const accountData of props) {
      const account = this.assignAndGetAccountProtocol(accountData);
      accounts.getAccountsList().push(account);
    }

    return accounts;
  }

  public assignAndGetAccountProtocol(
    props: AccountProps
  ): InstanceType<typeof Account> {
    const account = new Account();

    props.id && account.setId(props.id);
    props.customer_id && account.setCustomerId(props.customer_id);
    props.supabase_id && account.setSupabaseId(props.supabase_id);
    props.profile_url && account.setProfileUrl(props.profile_url);
    props.status && account.setStatus(props.status);
    props.updated_at && account.setUpdateAt(props.updated_at);

    return account;
  }

  public assignAndGetAccountData(props: {
    id?: string;
    customerId?: string;
    supabaseId?: string;
    profileUrl?: string;
    status?: string;
  }) {
    const date = new Date(Date.now());
    return {
      ...(props.supabaseId && { supabase_id: props.supabaseId }),
      ...(props.customerId && { customer_id: props.customerId }),
      ...(props.profileUrl && { profile_url: props.profileUrl }),
      ...(props.status && { status: props.status }),
      updated_at: date.toUTCString(),
    };
  }
}

export default new AccountService();
