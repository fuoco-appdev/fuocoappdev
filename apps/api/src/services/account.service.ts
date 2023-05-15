import SupabaseService from './supabase.service.ts';
import { Account, Accounts } from '../protobuf/core_pb.js';

export interface AccountProps {
  id?: string;
  user_id?: string;
  supabase_id?: string;
  company?: string;
  phone_number?: string;
  language?: string;
  location?: { longitude: string; latitude: string };
  request_status?: string;
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

    const userId = account.getUserId();
    const language = account.getLanguage();

    const accountData = this.assignAndGetAccountData({
      supabaseId,
      userId,
      language,
      location,
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
    const language = account.getLanguage();

    const accountData = this.assignAndGetAccountData({
      language,
      location,
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
    props.user_id && account.setUserId(props.user_id);
    props.supabase_id && account.setSupabaseId(props.supabase_id);
    props.language && account.setLanguage(props.language);

    return account;
  }

  public assignAndGetAccountData(props: {
    id?: string;
    userId?: string;
    supabaseId?: string;
    company?: string;
    phoneNumber?: string;
    language?: string;
    location?: InstanceType<typeof Location> | null | undefined;
    requestStatus?: number;
  }) {
    return {
      ...(props.supabaseId && { supabase_id: props.supabaseId }),
      ...(props.userId && { user_id: props.userId }),
      ...(props.company && { company: props.company }),
      ...(props.phoneNumber && { phone_number: props.phoneNumber }),
      ...(props.language && { language: props.language }),
    };
  }
}

export default new AccountService();