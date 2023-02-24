/* eslint-disable @typescript-eslint/no-explicit-any */
import SupabaseService from './supabase.service.ts';
import { Customer, Customers } from '../protobuf/core_pb.js';

export interface CustomerProps {
  id?: string;
  created_at?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export class CustomerService {
  public async findAsync(email: string): Promise<CustomerProps | null> {
    const { data, error } = await SupabaseService.client
      .from('customer')
      .select()
      .match({ email: email });

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async updateAsync(
    customerId: string,
    customer: InstanceType<typeof Customer>
  ): Promise<CustomerProps | null> {
    const email = customer.getEmail();
    const firstName = customer.getFirstName();
    const lastName = customer.getLastName();
    const customerData = this.assignAndGetCustomerData({
      email,
      firstName,
      lastName,
    });
    const { data, error } = await SupabaseService.client
      .from('customer')
      .update(customerData)
      .match({ id: customerId })
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data.length > 0 ? data[0] : null;
  }

  public async findAllAsync(): Promise<CustomerProps[] | null> {
    const { data, error } = await SupabaseService.client
      .from('customer')
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  public assignAndGetCustomersProtocol(
    props: CustomerProps[]
  ): InstanceType<typeof Customers> {
    const customers = new Customers();
    for (const customerData of props) {
      const customer = this.assignAndGetCustomerProtocol(customerData);
      customers.getCustomersList().push(customer);
    }

    return customers;
  }

  public assignAndGetCustomerProtocol(
    props: CustomerProps
  ): InstanceType<typeof Customer> {
    const customer = new Customer();

    props.id && customer.setId(props.id);
    props.created_at && customer.setCreatedAt(props.created_at);
    props.email && customer.setEmail(props.email);
    props.first_name && customer.setFirstName(props.first_name);
    props.last_name && customer.setLastName(props.last_name);

    return customer;
  }

  public assignAndGetCustomerData(props: {
    id?: string;
    createdAt?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    return {
      ...(props.email && { email: props.email }),
      ...(props.firstName && { first_name: props.firstName }),
      ...(props.lastName && { last_name: props.lastName }),
    };
  }
}

export default new CustomerService();
