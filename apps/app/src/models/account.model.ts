import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';
import { Customer, Order, Address } from '@medusajs/medusa';
import {
  ProfileFormErrors,
  ProfileFormValues,
} from '../components/account-profile-form.component';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { RoutePathsType } from '../route-paths';
import { User } from '@supabase/supabase-js';

export interface AccountState {
  user: User | null;
  account: core.Account | undefined;
  customer: Customer | undefined;
  profileForm: ProfileFormValues;
  profileFormErrors: ProfileFormErrors;
  errorStrings: ProfileFormErrors;
  profileUrl: string | undefined;
  username: string;
  orders: Order[];
  orderPagination: number;
  hasMoreOrders: boolean;
  shippingForm: AddressFormValues;
  shippingFormErrors: AddressFormErrors;
  addressErrorStrings: AddressFormErrors;
  selectedAddress: Address | undefined;
  editShippingForm: AddressFormValues;
  editShippingFormErrors: AddressFormErrors;
  activeTabId: string;
  prevTabIndex: number;
  activeTabIndex: number;
  areOrdersLoading: boolean;
  ordersScrollPosition: number | undefined;
}

export class AccountModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'account' },
        withProps<AccountState>({
          user: null,
          account: undefined,
          customer: undefined,
          profileForm: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
          },
          profileFormErrors: {},
          errorStrings: {},
          profileUrl: undefined,
          username: '',
          orders: [],
          orderPagination: 1,
          hasMoreOrders: true,
          shippingForm: {
            email: '',
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartments: '',
            postalCode: '',
            city: '',
            countryCode: '',
            region: '',
            phoneNumber: '',
          },
          shippingFormErrors: {},
          addressErrorStrings: {},
          selectedAddress: undefined,
          editShippingForm: {
            email: '',
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartments: '',
            postalCode: '',
            city: '',
            countryCode: '',
            region: '',
            phoneNumber: '',
          },
          editShippingFormErrors: {},
          activeTabId: '',
          prevTabIndex: 0,
          activeTabIndex: 0,
          areOrdersLoading: false,
          ordersScrollPosition: undefined,
        })
      )
    );
  }

  public get user(): User | undefined {
    return this.store.getValue().user;
  }

  public set user(value: User | undefined) {
    if (JSON.stringify(this.user) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, user: value }));
    }
  }

  public get profileForm(): ProfileFormValues {
    return this.store.getValue().profileForm;
  }

  public set profileForm(value: ProfileFormValues) {
    if (JSON.stringify(this.profileForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, profileForm: value }));
    }
  }

  public get profileFormErrors(): ProfileFormErrors {
    return this.store.getValue().ProfileFormErrors;
  }

  public set profileFormErrors(value: ProfileFormErrors) {
    if (JSON.stringify(this.profileFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, profileFormErrors: value }));
    }
  }

  public get errorStrings(): ProfileFormErrors {
    return this.store.getValue().errorStrings;
  }

  public set errorStrings(value: ProfileFormErrors) {
    if (JSON.stringify(this.errorStrings) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, errorStrings: value }));
    }
  }

  public get profileUrl(): string | undefined {
    return this.store.getValue().profileUrl;
  }

  public set profileUrl(value: string | undefined) {
    if (this.profileUrl !== value) {
      this.store.update((state) => ({ ...state, profileUrl: value }));
    }
  }

  public get customer(): Customer | undefined {
    return this.store.getValue().customer;
  }

  public set customer(value: Customer | undefined) {
    if (JSON.stringify(this.customer) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customer: value }));
    }
  }

  public get account(): core.Account | undefined {
    return this.store.getValue().account;
  }

  public set account(value: core.Account | undefined) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, account: value }));
    }
  }

  public get username(): string {
    return this.store.getValue().username;
  }

  public set username(value: string) {
    if (this.username !== value) {
      this.store.update((state) => ({ ...state, username: value }));
    }
  }

  public get orders(): Order[] {
    return this.store.getValue().orders;
  }

  public set orders(value: Order[]) {
    if (JSON.stringify(this.orders) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, orders: value }));
    }
  }

  public get orderPagination(): number {
    return this.store?.getValue().orderPagination;
  }

  public set orderPagination(value: number) {
    if (this.orderPagination !== value) {
      this.store?.update((state) => ({
        ...state,
        orderPagination: value,
      }));
    }
  }

  public get hasMoreOrders(): boolean {
    return this.store?.getValue().hasMoreOrders;
  }

  public set hasMoreOrders(value: boolean) {
    if (this.hasMoreOrders !== value) {
      this.store?.update((state) => ({
        ...state,
        hasMoreOrders: value,
      }));
    }
  }

  public get shippingForm(): AddressFormValues {
    return this.store.getValue().shippingForm;
  }

  public set shippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.shippingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, shippingForm: value }));
    }
  }

  public get shippingFormErrors(): AddressFormErrors {
    return this.store.getValue().shippingFormErrors;
  }

  public set shippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.shippingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, shippingFormErrors: value }));
    }
  }

  public get addressErrorStrings(): AddressFormErrors {
    return this.store.getValue().addressErrorStrings;
  }

  public set addressErrorStrings(value: AddressFormErrors) {
    if (JSON.stringify(this.addressErrorStrings) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, addressErrorStrings: value }));
    }
  }

  public get selectedAddress(): Address | undefined {
    return this.store.getValue().selectedAddress;
  }

  public set selectedAddress(value: Address | undefined) {
    if (JSON.stringify(this.selectedAddress) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedAddress: value }));
    }
  }

  public get editShippingForm(): AddressFormValues {
    return this.store.getValue().editShippingForm;
  }

  public set editShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.editShippingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, editShippingForm: value }));
    }
  }

  public get editShippingFormErrors(): AddressFormErrors {
    return this.store.getValue().editShippingFormErrors;
  }

  public set editShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.editShippingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        editShippingFormErrors: value,
      }));
    }
  }

  public get activeTabId(): string {
    return this.store.getValue().activeTabId;
  }

  public set activeTabId(value: string) {
    if (this.activeTabId !== value) {
      this.store.update((state) => ({
        ...state,
        activeTabId: value,
      }));
    }
  }

  public get prevTabIndex(): number {
    return this.store.getValue().prevTabIndex;
  }

  public set prevTabIndex(value: number) {
    if (this.prevTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        prevTabIndex: value,
      }));
    }
  }

  public get activeTabIndex(): number {
    return this.store.getValue().activeTabIndex;
  }

  public set activeTabIndex(value: number) {
    if (this.activeTabIndex !== value) {
      this.store.update((state) => ({
        ...state,
        activeTabIndex: value,
      }));
    }
  }

  public get areOrdersLoading(): boolean {
    return this.store.getValue().areOrdersLoading;
  }

  public set areOrdersLoading(value: boolean) {
    if (this.areOrdersLoading !== value) {
      this.store.update((state) => ({
        ...state,
        areOrdersLoading: value,
      }));
    }
  }

  public get ordersScrollPosition(): number | undefined {
    return this.store.getValue().ordersScrollPosition;
  }

  public set ordersScrollPosition(value: number | undefined) {
    if (this.ordersScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        ordersScrollPosition: value,
      }));
    }
  }
}
