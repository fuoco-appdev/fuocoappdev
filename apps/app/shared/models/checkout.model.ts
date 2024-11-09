import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { AddressFormErrors, AddressFormValues } from '../models/account.model';
import { StoreOptions } from '../store-options';

export enum ShippingType {
  Standard = 'Standard',
  Express = 'Express',
}

export enum ProviderType {
  Manual = 'manual',
  Stripe = 'stripe',
}

export class CheckoutModel extends Model {
  @observable
  public shippingForm: AddressFormValues;
  @observable
  public shippingFormErrors: AddressFormErrors;
  @observable
  public shippingFormComplete: boolean;
  @observable
  public selectedShippingAddressOptionId: string | undefined;
  @observable
  public billingForm: AddressFormValues;
  @observable
  public billingFormErrors: AddressFormErrors;
  @observable
  public billingFormComplete: boolean;
  @observable
  public addShippingForm: AddressFormValues;
  @observable
  public addShippingFormErrors: AddressFormErrors;
  @observable
  public errorStrings: AddressFormErrors;
  @observable
  public sameAsBillingAddress: boolean;
  @observable
  public shippingOptions: HttpTypes.StoreShippingOption[];
  @observable
  public selectedShippingOptionId: string | undefined;
  @observable
  public giftCardCode: string;
  @observable
  public discountCode: string;
  @observable
  public selectedProviderId: ProviderType | undefined;
  @observable
  public isPaymentLoading: boolean;
  @observable
  public isLegalAge: boolean;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    this.shippingForm = {
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
    };
    this.shippingFormErrors = {};
    this.shippingFormComplete = false;
    this.selectedShippingAddressOptionId = '';
    this.billingForm = {
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
    };
    this.billingFormErrors = {};
    this.billingFormComplete = false;
    this.addShippingForm = {
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
    };
    this.addShippingFormErrors = {};
    this.errorStrings = {};
    this.sameAsBillingAddress = true;
    this.shippingOptions = [];
    this.selectedShippingOptionId = undefined;
    this.giftCardCode = '';
    this.discountCode = '';
    this.selectedProviderId = undefined;
    this.isPaymentLoading = false;
    this.isLegalAge = false;
  }

  public updateShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.shippingForm) !== JSON.stringify(value)) {
      this.shippingForm = value;
    }
  }

  public updateShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.shippingFormErrors) !== JSON.stringify(value)) {
      this.shippingFormErrors = value;
    }
  }

  public updateShippingFormComplete(value: boolean) {
    if (this.shippingFormComplete !== value) {
      this.shippingFormComplete = value;
    }
  }

  public updateSelectedShippingAddressOptionId(value: string | undefined) {
    if (this.selectedShippingAddressOptionId !== value) {
      this.selectedShippingAddressOptionId = value;
    }
  }

  public updateBillingForm(value: AddressFormValues) {
    if (JSON.stringify(this.billingForm) !== JSON.stringify(value)) {
      this.billingForm = value;
    }
  }

  public updateBillingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.billingFormErrors) !== JSON.stringify(value)) {
      this.billingFormErrors = value;
    }
  }

  public updateBillingFormComplete(value: boolean) {
    if (this.billingFormComplete !== value) {
      this.billingFormComplete = value;
    }
  }

  public updateAddShippingForm(value: AddressFormValues) {
    if (JSON.stringify(this.addShippingForm) !== JSON.stringify(value)) {
      this.addShippingForm = value;
    }
  }

  public updateAddShippingFormErrors(value: AddressFormErrors) {
    if (JSON.stringify(this.addShippingFormErrors) !== JSON.stringify(value)) {
      this.addShippingFormErrors = value;
    }
  }

  public updateErrorStrings(value: AddressFormErrors) {
    if (JSON.stringify(this.errorStrings) !== JSON.stringify(value)) {
      this.errorStrings = value;
    }
  }

  public updateSameAsBillingAddress(value: boolean) {
    if (this.sameAsBillingAddress !== value) {
      this.sameAsBillingAddress = value;
    }
  }

  public updateShippingOptions(value: HttpTypes.StoreShippingOption[]) {
    if (JSON.stringify(this.shippingOptions) !== JSON.stringify(value)) {
      this.shippingOptions = value;
    }
  }

  public updateSelectedShippingOptionId(value: string | undefined) {
    if (this.selectedShippingOptionId !== value) {
      this.selectedShippingOptionId = value;
    }
  }

  public updateGiftCardCode(value: string) {
    if (this.giftCardCode !== value) {
      this.giftCardCode = value;
    }
  }

  public updateDiscountCode(value: string) {
    if (this.discountCode !== value) {
      this.discountCode = value;
    }
  }

  public updateSelectedProviderId(value: ProviderType | undefined) {
    if (this.selectedProviderId !== value) {
      this.selectedProviderId = value;
    }
  }

  public updateIsPaymentLoading(value: boolean) {
    if (this.isPaymentLoading !== value) {
      this.isPaymentLoading = value;
    }
  }

  public updateIsLegalAge(value: boolean) {
    if (this.isLegalAge !== value) {
      this.isLegalAge = value;
    }
  }
}
