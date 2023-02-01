/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from './supabase.service.ts';
import {
  Location,
  User,
  UserRequestStatus,
  Users,
} from '../protobuf/core_pb.js';

export interface UserProps {
  id?: string;
  created_at?: string;
  supabase_id?: string;
  role?: number;
  company?: string;
  email?: string;
  phone_number?: string;
  language?: string;
  location?: { longitude: string; latitude: string };
  request_status?: number;
}

export class UserService {
  public async findAsync(supabaseId: string): Promise<UserProps | null> {
    const { data, error } = await SupabaseService.client
      .from('users')
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
    user: InstanceType<typeof User>
  ): Promise<UserProps | null> {
    const existingUser = await this.findAsync(supabaseId);
    if (existingUser) {
      return null;
    }

    const role = user.getRole();
    const company = user.getCompany();
    const email = user.getEmail();
    const phoneNumber = user.getPhoneNumber();
    const language = user.getLanguage();
    const location = user.getLocation();

    const userData = this.assignAndGetUserData({
      supabaseId,
      role,
      company,
      email,
      phoneNumber,
      language,
      location,
      requestStatus: UserRequestStatus.IDLE,
    });

    const { data, error } = await SupabaseService.client
      .from('users')
      .insert([userData])
      .select();

    console.log(data);
    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async updateAsync(
    supabaseId: string,
    user: InstanceType<typeof User>
  ): Promise<UserProps | null> {
    const company = user.getCompany();
    const email = user.getEmail();
    const phoneNumber = user.getPhoneNumber();
    const language = user.getLanguage();
    const location = user.getLocation();
    const requestStatus = user.getRequestStatus();

    const userData = this.assignAndGetUserData({
      company,
      email,
      phoneNumber,
      language,
      location,
      requestStatus,
    });
    const { data, error } = await SupabaseService.client
      .from('users')
      .update(userData)
      .match({ supabase_id: supabaseId })
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async findAllAsync(): Promise<UserProps[] | null> {
    const { data, error } = await SupabaseService.client
      .from('users')
      .select()
      .filter('role', 'gt', 0);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async findAllPublicAsync(): Promise<UserProps[] | null> {
    const { data, error } = await SupabaseService.client
      .from('users')
      .select('id, location')
      .filter('role', 'gt', 0);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public async deleteAsync(supabaseId: string): Promise<void> {
    const { error } = await SupabaseService.client
      .from('users')
      .delete()
      .match({ supabase_id: supabaseId });

    if (error) {
      console.error(error);
    }
  }

  public assignAndGetUsersProtocol(
    props: UserProps[]
  ): InstanceType<typeof Users> {
    const users = new Users();
    for (const userData of props) {
      const user = this.assignAndGetUserProtocol(userData);
      users.getUsersList().push(user);
    }

    return users;
  }

  public assignAndGetUserProtocol(props: UserProps): InstanceType<typeof User> {
    const user = new User();
    const location = new Location();
    if (props.location) {
      location.setLongitude(props.location.longitude);
      location.setLatitude(props.location.latitude);
    }

    props.id && user.setId(props.id);
    props.created_at && user.setCreatedAt(props.created_at);
    props.supabase_id && user.setSupabaseId(props.supabase_id);
    props.role && user.setRole(props.role);
    props.company && user.setCompany(props.company);
    props.email && user.setEmail(props.email);
    props.phone_number && user.setPhoneNumber(props.phone_number);
    props.language && user.setLanguage(props.language);
    props.location && user.setLocation(location);
    props.request_status && user.setRequestStatus(props.request_status);

    return user;
  }

  public assignAndGetUserData(props: {
    id?: string;
    createdAt?: string;
    supabaseId?: string;
    role?: number;
    company?: string;
    email?: string;
    phoneNumber?: string;
    language?: string;
    location?: InstanceType<typeof Location> | null | undefined;
    requestStatus?: number;
  }) {
    return {
      ...(props.supabaseId && { supabase_id: props.supabaseId }),
      ...(props.role !== undefined && { role: props.role }),
      ...(props.company && { company: props.company }),
      ...(props.email && { email: props.email }),
      ...(props.phoneNumber && { phone_number: props.phoneNumber }),
      ...(props.language && { language: props.language }),
      ...(props.location && {
        location: {
          longitude: props.location.getLongitude(),
          latitude: props.location.getLatitude(),
        },
      }),
      ...(props.requestStatus !== undefined && {
        request_status: props.requestStatus,
      }),
    };
  }
}

export default new UserService();
