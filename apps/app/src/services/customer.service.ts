/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-throw-literal */
import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import MedusaService from './medusa.service';
import axios, { AxiosError } from 'axios';

class CustomerService extends Service {
  private readonly _activeCustomerBehaviorSubject: BehaviorSubject<core.Customer | null>;
  private readonly _customersBehaviorSubject: BehaviorSubject<core.Customer[]>;

  constructor() {
    super();

    this._activeCustomerBehaviorSubject =
      new BehaviorSubject<core.Customer | null>(null);
    this._customersBehaviorSubject = new BehaviorSubject<core.Customer[]>([]);
  }

  public get activeCustomerObservable(): Observable<core.Customer | null> {
    return this._activeCustomerBehaviorSubject.asObservable();
  }

  public get customersObservable(): Observable<core.Customer[]> {
    return this._customersBehaviorSubject.asObservable();
  }

  public get activeCustomer(): core.Customer | null {
    return this._activeCustomerBehaviorSubject.getValue();
  }

  public clearActiveCustomer(): void {
    this._activeCustomerBehaviorSubject.next(null);
  }

  public async requestActiveAsync(): Promise<core.Customer> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No active user');
    }
    const customer = await this.requestAsync(supabaseUser.email ?? '');
    this._activeCustomerBehaviorSubject.next(customer);
    return customer;
  }

  public async requestAsync(email: string): Promise<core.Customer> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/customer/${email}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = core.Customer.fromBinary(arrayBuffer);
    return customerResponse;
  }

  public async requestCreateAsync(): Promise<core.Customer> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No active user');
    }

    const customer = await MedusaService.medusa.customers.create({
      email: supabaseUser.email ?? '',
      password: '',
      first_name: '',
      last_name: '',
    });

    if (!customer) {
      throw new Error('No customer created');
    }

    return await this.requestAsync(customer.customer.email);
  }

  public async requestUpdateActiveAsync(props: {
    email?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<core.Customer> {
    if (!this.activeCustomer) {
      throw new Error('No customer');
    }

    const customer = await this.requestUpdateAsync(
      this.activeCustomer.id,
      props
    );
    this._activeCustomerBehaviorSubject.next(customer);
    return customer;
  }

  public async requestUpdateAsync(
    customerId: string,
    props: {
      email?: string;
      firstName?: string;
      lastName?: string;
    }
  ): Promise<core.Customer> {
    const session = await SupabaseService.requestSessionAsync();
    const customer = new core.Customer({
      email: props.email ? props.email : this.activeCustomer?.email,
      firstName: props.firstName
        ? props.firstName
        : this.activeCustomer?.firstName,
      lastName: props.lastName ? props.lastName : this.activeCustomer?.lastName,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/customer/update/${customerId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: customer.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const customerResponse = core.Customer.fromBinary(arrayBuffer);
    return customerResponse;
  }
}

export default new CustomerService();
