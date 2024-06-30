import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../web/components/address-form.component';

export enum ShippingType {
  Standard = 'Standard',
  Express = 'Express',
}

export enum ProviderType {
  Manual = 'manual',
  Stripe = 'stripe',
}

export interface CheckoutState {
  shippingForm: AddressFormValues;
  shippingFormErrors: AddressFormErrors;
  shippingFormComplete: boolean;
  selectedShippingAddressOptionId: string;
  billingForm: AddressFormValues;
  billingFormErrors: AddressFormErrors;
  billingFormComplete: boolean;
  addShippingForm: AddressFormValues;
  addShippingFormErrors: AddressFormErrors;
  errorStrings: AddressFormErrors;
  sameAsBillingAddress: boolean;
  shippingOptions: PricedShippingOption[];
  selectedShippingOptionId: string | undefined;
  giftCardCode: string;
  discountCode: string;
  selectedProviderId: ProviderType | undefined;
  isPaymentLoading: boolean;
  isLegalAge: boolean;
}

export class CheckoutModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'checkout' },
        withProps<CheckoutState>({
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
          shippingFormComplete: false,
          selectedShippingAddressOptionId: '',
          billingForm: {
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
          billingFormErrors: {},
          billingFormComplete: false,
          addShippingForm: {
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
          addShippingFormErrors: {},
          errorStrings: {},
          sameAsBillingAddress: true,
          shippingOptions: [],
          selectedShippingOptionId: undefined,
          giftCardCode: '',
          discountCode: '',
          selectedProviderId: undefined,
          isPaymentLoading: false,
          isLegalAge: false,
        })
      )
    );
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

  public get shippingFormComplete(): boolean {
    return this.store.getValue().shippingFormComplete;
  }

  public set shippingFormComplete(value: boolean) {
    if (this.shippingFormComplete !== value) {
      this.store.update((state) => ({ ...state, shippingFormComplete: value }));
    }
  }

  public get selectedShippingAddressOptionId(): string | undefined {
    return this.store.getValue().selectedShippingAddressOptionId;
  }

  public set selectedShippingAddressOptionId(value: string | undefined) {
    if (this.selectedShippingAddressOptionId !== value) {
      this.store.update((state) => ({
        ...state,
        selectedShippingAddressOptionId: value,
      }));
    }
  }

  public get billingForm(): AddressFormValues {
    return this.store.getValue().billingForm;
  }

  public set billingForm(value: AddressFormValues) {
    if (JSON.stringify(this.billingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, billingForm: value }));
    }
  }

  public get billingFormErrors(): AddressFormErrors {
    return this.store.getValue().billingFormErrors;
  }

  public set billingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.billingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, billingFormErrors: value }));
    }
  }

  public get billingFormComplete(): boolean {
    return this.store.getValue().billingFormComplete;
  }

  public set billingFormComplete(value: boolean) {
    if (this.billingFormComplete !== value) {
      this.store.update((state) => ({ ...state, billingFormComplete: value }));
    }
  }

  public get addShippingForm(): AddressFormValues {
    return this.store.getValue().addShippingForm;
  }

  public set addShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.addShippingForm) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, addShippingForm: value }));
    }
  }

  public get addShippingFormErrors(): AddressFormErrors {
    return this.store.getValue().addShippingFormErrors;
  }

  public set addShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.addShippingFormErrors) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        addShippingFormErrors: value,
      }));
    }
  }

  public get errorStrings(): AddressFormErrors {
    return this.store.getValue().errorStrings;
  }

  public set errorStrings(value: AddressFormErrors) {
    if (JSON.stringify(this.errorStrings) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, errorStrings: value }));
    }
  }

  public get sameAsBillingAddress(): boolean {
    return this.store.getValue().sameAsBillingAddress;
  }

  public set sameAsBillingAddress(value: boolean) {
    if (this.sameAsBillingAddress !== value) {
      this.store.update((state) => ({ ...state, sameAsBillingAddress: value }));
    }
  }

  public get shippingOptions(): PricedShippingOption[] {
    return this.store.getValue().shippingOptions;
  }

  public set shippingOptions(value: PricedShippingOption[]) {
    if (JSON.stringify(this.shippingOptions) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, shippingOptions: value }));
    }
  }

  public get selectedShippingOptionId(): string | undefined {
    return this.store.getValue().selectedShippingOptionId;
  }

  public set selectedShippingOptionId(value: string | undefined) {
    if (this.selectedShippingOptionId !== value) {
      this.store.update((state) => ({
        ...state,
        selectedShippingOptionId: value,
      }));
    }
  }

  public get giftCardCode(): string {
    return this.store.getValue().giftCardCode;
  }

  public set giftCardCode(value: string) {
    if (this.giftCardCode !== value) {
      this.store.update((state) => ({
        ...state,
        giftCardCode: value,
      }));
    }
  }

  public get discountCode(): string {
    return this.store.getValue().discountCode;
  }

  public set discountCode(value: string) {
    if (this.discountCode !== value) {
      this.store.update((state) => ({
        ...state,
        discountCode: value,
      }));
    }
  }

  public get selectedProviderId(): ProviderType | undefined {
    return this.store.getValue().selectedProviderId;
  }

  public set selectedProviderId(value: ProviderType | undefined) {
    if (this.selectedProviderId !== value) {
      this.store.update((state) => ({
        ...state,
        selectedProviderId: value,
      }));
    }
  }

  public get isPaymentLoading(): boolean {
    return this.store.getValue().isPaymentLoading;
  }

  public set isPaymentLoading(value: boolean) {
    if (this.isPaymentLoading !== value) {
      this.store.update((state) => ({
        ...state,
        isPaymentLoading: value,
      }));
    }
  }

  public get isLegalAge(): boolean {
    return this.store.getValue().isLegalAge;
  }

  public set isLegalAge(value: boolean) {
    if (this.isLegalAge !== value) {
      this.store.update((state) => ({
        ...state,
        isLegalAge: value,
      }));
    }
  }
}
