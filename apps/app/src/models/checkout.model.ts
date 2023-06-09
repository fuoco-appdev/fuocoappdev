import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';

export interface CheckoutState {
  shippingForm: AddressFormValues;
  shippingFormErrors: AddressFormErrors;
  shippingFormComplete: boolean;
  billingForm: AddressFormValues;
  billingFormErrors: AddressFormErrors;
  billingFormComplete: boolean;
  sameAsBillingAddress: boolean;
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
            apartments: '',
            postalCode: '',
            city: '',
            countryIndex: 0,
            regionIndex: 0,
            phoneNumber: '',
          },
          shippingFormErrors: {},
          shippingFormComplete: false,
          billingForm: {
            email: '',
            firstName: '',
            lastName: '',
            company: '',
            apartments: '',
            postalCode: '',
            city: '',
            countryIndex: 0,
            regionIndex: 0,
            phoneNumber: '',
          },
          billingFormErrors: {},
          billingFormComplete: true,
          sameAsBillingAddress: true,
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

  public get sameAsBillingAddress(): boolean {
    return this.store.getValue().sameAsBillingAddress;
  }

  public set sameAsBillingAddress(value: boolean) {
    if (this.sameAsBillingAddress !== value) {
      this.store.update((state) => ({ ...state, sameAsBillingAddress: value }));
    }
  }
}
