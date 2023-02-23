/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from './supabase.service.ts';
import { User, Users } from '../protobuf/core_pb.js';

export interface UserProps {
  id?: string;
  created_at?: string;
  role?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export class UserService {
  public async findAsync(email: string): Promise<UserProps | null> {
    const { data, error } = await SupabaseService.client
      .from('user')
      .select()
      .match({ email: email });

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async updateAsync(
    userId: string,
    user: InstanceType<typeof User>
  ): Promise<UserProps | null> {
    const email = user.getEmail();
    const firstName = user.getFirstName();
    const lastName = user.getLastName();
    const userData = this.assignAndGetUserData({
      email,
      firstName,
      lastName,
    });
    const { data, error } = await SupabaseService.client
      .from('user')
      .update(userData)
      .match({ user_id: userId })
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async findAllAsync(): Promise<UserProps[] | null> {
    const { data, error } = await SupabaseService.client.from('user').select();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
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

    props.id && user.setId(props.id);
    props.created_at && user.setCreatedAt(props.created_at);
    props.role && user.setRole(props.role);
    props.email && user.setEmail(props.email);
    props.first_name && user.setFirstName(props.first_name);
    props.last_name && user.setLastName(props.last_name);

    return user;
  }

  public assignAndGetUserData(props: {
    id?: string;
    createdAt?: string;
    role?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    return {
      ...(props.role && { role: props.role }),
      ...(props.email && { email: props.email }),
      ...(props.firstName && { first_name: props.firstName }),
      ...(props.lastName && { last_name: props.lastName }),
    };
  }
}

export default new UserService();
