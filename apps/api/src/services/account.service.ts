import SupabaseService from './supabase.service.ts';
import {
  Location,
  Account,
  RequestStatus,
  Accounts,
} from '../protobuf/core_pb.js';

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
    const company = account.getCompany();
    const phoneNumber = account.getPhoneNumber();
    const language = account.getLanguage();
    const location = account.getLocation();

    const accountData = this.assignAndGetAccountData({
      supabaseId,
      userId,
      company,
      phoneNumber,
      language,
      location,
      requestStatus: RequestStatus.IDLE,
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
    const company = account.getCompany();
    const phoneNumber = account.getPhoneNumber();
    const language = account.getLanguage();
    const location = account.getLocation();
    const requestStatus = account.getRequestStatus();

    const accountData = this.assignAndGetAccountData({
      company,
      phoneNumber,
      language,
      location,
      requestStatus,
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
    const location = new Location();
    if (props.location) {
      location.setLongitude(props.location.longitude);
      location.setLatitude(props.location.latitude);
    }

    props.id && account.setId(props.id);
    props.user_id && account.setUserId(props.user_id);
    props.supabase_id && account.setSupabaseId(props.supabase_id);
    props.company && account.setCompany(props.company);
    props.phone_number && account.setPhoneNumber(props.phone_number);
    props.language && account.setLanguage(props.language);
    props.location && account.setLocation(location);
    const requestIndex = Object.keys(RequestStatus).indexOf(
      props.request_status ?? ''
    );
    props.request_status && account.setRequestStatus(requestIndex);

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
      ...(props.location && {
        location: {
          longitude: props.location.getLongitude(),
          latitude: props.location.getLatitude(),
        },
      }),
      ...(props.requestStatus !== undefined && {
        request_status: Object.keys(RequestStatus)[props.requestStatus] ?? '',
      }),
    };
  }
}

export default new AccountService();
