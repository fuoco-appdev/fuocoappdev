import { Subscription } from 'rxjs';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { Controller } from '../controller';
import { CheckoutModel, ProviderType } from '../models/checkout.model';
import MedusaService from '../services/medusa.service';
import CartController from './cart.controller';
import {
  AddressPayload,
  Cart,
  ShippingMethod,
  ShippingOption,
  Order,
  Swap,
  Customer,
} from '@medusajs/medusa';
import { select } from '@ngneat/elf';
import WindowController from './window.controller';
import AccountController from './account.controller';
import {
  Stripe,
  StripeElements,
  StripeCardNumberElement,
} from '@stripe/stripe-js';

class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;
  private _cartSubscription: Subscription | undefined;
  private _customerSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CheckoutModel();
    this.onCartChangedAsync = this.onCartChangedAsync.bind(this);
    this.onCustomerChangedAsync = this.onCustomerChangedAsync.bind(this);
  }

  public get model(): CheckoutModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);

    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({
        next: this.onCartChangedAsync,
      });

    this._customerSubscription = AccountController.model.store
      .pipe(select((model) => model.customer))
      .subscribe({
        next: this.onCustomerChangedAsync,
      });
  }

  public override dispose(renderCount: number): void {
    this._customerSubscription?.unsubscribe();
    this._cartSubscription?.unsubscribe();
  }

  public async initializeAsync(renderCount: number): Promise<void> {
    if (renderCount > 1) {
      return;
    }
  }

  public updateShippingAddress(value: AddressFormValues): void {
    this._model.shippingForm = { ...this._model.shippingForm, ...value };
  }

  public updateShippingAddressErrors(value: AddressFormErrors): void {
    this._model.shippingFormErrors = value;
  }

  public updateBillingAddress(value: AddressFormValues): void {
    this._model.billingForm = { ...this._model.billingForm, ...value };
  }

  public updateBillingAddressErrors(value: AddressFormErrors): void {
    this._model.billingFormErrors = value;
  }

  public updateAddShippingAddress(value: AddressFormValues): void {
    this._model.addShippingForm = { ...this._model.addShippingForm, ...value };
  }

  public updateAddShippingAddressErrors(value: AddressFormErrors): void {
    this._model.addShippingFormErrors = value;
  }

  public updateErrorStrings(value: AddressFormErrors): void {
    this._model.errorStrings = value;
  }

  public updateSameAsBillingAddress(value: boolean): void {
    this._model.sameAsBillingAddress = value;
    this._model.billingFormComplete = value;
  }

  public updateShippingFormComplete(value: boolean): void {
    this._model.shippingFormComplete = value;
  }

  public updateBillingFormComplete(value: boolean): void {
    this._model.billingFormComplete = value;
  }

  public async updateSelectedShippingOptionIdAsync(
    value: string
  ): Promise<void> {
    if (
      !CartController.model.cartId ||
      this._model.selectedShippingAddressOptionId === value ||
      !CartController.model.cart ||
      CartController.model.cart?.items.length <= 0
    ) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.addShippingMethod(
        CartController.model.cartId,
        { option_id: value }
      );
      if (cartResponse?.cart) {
        await CartController.updateLocalCartAsync(cartResponse.cart);
      }

      this._model.selectedShippingOptionId = value;
    } catch (error: any) {
      WindowController.addToast({
        key: `add-shipping-address-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async addShippingAddressAsync(): Promise<void> {
    await AccountController.addAddressAsync(this._model.addShippingForm);
  }

  public async updateSelectedShippingAddressOptionIdAsync(
    value: string
  ): Promise<void> {
    const customer = AccountController.model.customer;
    const address = customer?.shipping_addresses.find(
      (address) => address.id === value
    );
    if (!address) {
      return;
    }

    this.updateShippingAddress({
      email: customer?.email,
      firstName: address?.first_name ?? '',
      lastName: address?.last_name ?? '',
      company: address?.company ?? '',
      address: address?.address_1 ?? '',
      apartments: address?.address_2 ?? '',
      postalCode: address?.postal_code ?? '',
      city: address?.city ?? '',
      countryCode: address.country_code ?? '',
      region: address?.province ?? '',
      phoneNumber: address?.phone ?? '',
    });

    this._model.selectedShippingAddressOptionId = value;
    this._model.shippingFormComplete = true;

    if (this._model.sameAsBillingAddress && !this._model.billingFormComplete) {
      this._model.billingFormComplete = true;
    }

    await this.continueToDeliveryAsync();
  }

  public async updateSelectedProviderIdAsync(
    value: ProviderType
  ): Promise<void> {
    if (
      !CartController.model.cartId ||
      !CartController.model.cart ||
      !this._model.billingFormComplete ||
      this._model.selectedProviderId === value
    ) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.setPaymentSession(
        CartController.model.cartId,
        {
          provider_id: value,
        }
      );
      if (cartResponse?.cart) {
        await CartController.updateLocalCartAsync(cartResponse.cart);
      }

      this._model.selectedProviderId = value;
    } catch (error: any) {
      WindowController.addToast({
        key: `set-payment-session-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async continueToDeliveryAsync(): Promise<void> {
    if (!CartController.model.cartId) {
      return;
    }

    if (this._model.sameAsBillingAddress) {
      this._model.billingForm = this._model.shippingForm;
    }

    const shippingAddressPayload: AddressPayload = {
      first_name: this._model.shippingForm.firstName,
      last_name: this._model.shippingForm.lastName,
      phone: this._model.shippingForm.phoneNumber,
      company: this._model.shippingForm.company,
      address_1: this._model.shippingForm.address,
      address_2: this._model.shippingForm.apartments,
      city: this._model.shippingForm.city,
      country_code: this._model.shippingForm.countryCode,
      province: this._model.shippingForm.region,
      postal_code: this._model.shippingForm.postalCode,
    };

    const billingAddressPayload: AddressPayload = {
      first_name: this._model.billingForm.firstName,
      last_name: this._model.billingForm.lastName,
      phone: this._model.billingForm.phoneNumber,
      company: this._model.billingForm.company,
      address_1: this._model.billingForm.address,
      address_2: this._model.billingForm.apartments,
      city: this._model.billingForm.city,
      country_code: this._model.billingForm.countryCode,
      province: this._model.billingForm.region,
      postal_code: this._model.billingForm.postalCode,
    };

    try {
      const cartResponse = await MedusaService.medusa?.carts.update(
        CartController.model.cartId,
        {
          email: this._model.shippingForm.email,
          shipping_address: this._model.shippingFormComplete
            ? shippingAddressPayload
            : undefined,
          billing_address: this._model.shippingFormComplete
            ? billingAddressPayload
            : undefined,
        }
      );
      if (cartResponse?.cart) {
        await CartController.updateLocalCartAsync(cartResponse.cart);
      }
    } catch (error: any) {
      WindowController.addToast({
        key: `update-cart-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public continueToBilling(): void {
    this._model.shippingFormComplete = true;
  }

  public updateGiftCardCodeText(value: string): void {
    this._model.giftCardCode = value;
  }

  public async updateGiftCardCodeAsync(): Promise<void> {
    if (!this._model.giftCardCode || this._model.giftCardCode.length <= 0) {
      return;
    }

    await CartController.updateCartAsync({
      gift_cards: [{ code: this._model.giftCardCode }],
    });

    this._model.giftCardCode = '';
  }

  public updateDiscountCodeText(value: string): void {
    this._model.discountCode = value;
  }

  public async updateDiscountCodeAsync(): Promise<void> {
    if (!this._model.discountCode || this._model.discountCode.length <= 0) {
      return;
    }

    await CartController.updateCartAsync({
      discounts: [{ code: this._model.discountCode }],
    });

    this._model.discountCode = '';
  }

  public async proceedToStripePaymentAsync(
    stripe: Stripe | null | undefined,
    card: StripeCardNumberElement | null | undefined,
    clientSecret: string | undefined
  ): Promise<string | undefined> {
    if (
      !card ||
      !clientSecret ||
      !stripe ||
      this._model.selectedProviderId !== ProviderType.Stripe
    ) {
      return undefined;
    }

    try {
      this._model.isPaymentLoading = true;
      const payment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${this._model.billingForm.firstName} ${this._model.billingForm.lastName}`,
            email: this._model.shippingForm.email,
            phone: this._model.billingForm.phoneNumber,
            address: {
              city: this._model.billingForm.city,
              country: this._model.billingForm.countryCode,
              line1: this._model.billingForm.address,
              line2: this._model.billingForm.apartments,
              postal_code: this._model.billingForm.postalCode,
            },
          },
        },
      });

      if (payment.error) {
        throw payment.error;
      }
    } catch (error: any) {
      this._model.isPaymentLoading = false;
      WindowController.addToast({
        key: `pay-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });

      return undefined;
    }

    return this.getCompleteCartIdAsync();
  }

  public async proceedToManualPaymentAsync(): Promise<string | undefined> {
    if (this._model.selectedProviderId !== ProviderType.Manual) {
      return undefined;
    }

    return this.getCompleteCartIdAsync();
  }

  public getAddressFormErrors(
    form: AddressFormValues
  ): AddressFormErrors | undefined {
    const errors: AddressFormErrors = {};

    if (
      !AccountController.model.customer &&
      (!form.email || form.email?.length <= 0)
    ) {
      errors.email = this._model.errorStrings.email;
    }

    if (!form.firstName || form.firstName?.length <= 0) {
      errors.firstName = this._model.errorStrings.firstName;
    }

    if (!form.lastName || form.lastName?.length <= 0) {
      errors.lastName = this._model.errorStrings.lastName;
    }

    if (!form.address || form.address?.length <= 0) {
      errors.address = this._model.errorStrings.address;
    }

    if (!form.postalCode || form.postalCode?.length <= 0) {
      errors.postalCode = this._model.errorStrings.postalCode;
    }

    if (!form.city || form.city?.length <= 0) {
      errors.city = this._model.errorStrings.city;
    }

    if (!form.phoneNumber || form.phoneNumber?.length <= 0) {
      errors.phoneNumber = this._model.errorStrings.phoneNumber;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return undefined;
  }

  private async getCompleteCartIdAsync(): Promise<string | undefined> {
    const completeCart = await CartController.completeCartAsync();
    this.resetCheckoutStates();
    await CartController.resetCartAsync();
    this._model.isPaymentLoading = false;
    return completeCart?.id;
  }

  private resetCheckoutStates(): void {
    if (!WindowController.model.isAuthenticated) {
      this._model.shippingForm = {};
      this._model.shippingFormErrors = {};
      this._model.shippingFormComplete = false;
    }

    this._model.billingForm = {};
    this._model.billingFormErrors = {};
    this._model.billingFormComplete = false;
    this._model.sameAsBillingAddress = true;
    this._model.shippingOptions = [];
    this._model.selectedShippingOptionId = undefined;
    this._model.giftCardCode = '';
    this._model.discountCode = '';
    this._model.selectedProviderId = undefined;
  }

  private async onCartChangedAsync(value: Cart | undefined): Promise<void> {
    if (!value) {
      return;
    }

    const customer = AccountController.model.customer;
    if (!customer) {
      this._model.shippingForm = {
        email: value?.email,
        firstName: value?.shipping_address?.first_name ?? '',
        lastName: value?.shipping_address?.last_name ?? '',
        company: value?.shipping_address?.company ?? '',
        address: value?.shipping_address?.address_1 ?? '',
        apartments: value?.shipping_address?.address_2 ?? '',
        postalCode: value?.shipping_address?.postal_code ?? '',
        city: value?.shipping_address?.city ?? '',
        countryCode: value?.shipping_address?.country_code ?? '',
        region: value?.shipping_address?.province ?? '',
        phoneNumber: value?.shipping_address?.phone ?? '',
      };
      this._model.billingForm = {
        email: value?.email,
        firstName: value?.billing_address?.first_name ?? '',
        lastName: value?.billing_address?.last_name ?? '',
        company: value?.billing_address?.company ?? '',
        address: value?.billing_address?.address_1 ?? '',
        apartments: value?.billing_address?.address_2 ?? '',
        postalCode: value?.billing_address?.postal_code ?? '',
        city: value?.billing_address?.city ?? '',
        countryCode: value?.billing_address?.country_code ?? '',
        region: value?.billing_address?.province ?? '',
        phoneNumber: value?.billing_address?.phone ?? '',
      };

      if (
        value?.shipping_address &&
        Object.keys(this.getAddressFormErrors(this._model.shippingForm) ?? {})
          .length <= 0
      ) {
        this._model.shippingFormComplete = true;
      }

      if (
        value?.billing_address &&
        Object.keys(this.getAddressFormErrors(this._model.billingForm) ?? {})
          .length <= 0
      ) {
        this._model.billingFormComplete = true;
      }
    }

    if (value?.region_id) {
      try {
        const shippingOptionsResponse =
          await MedusaService.medusa?.shippingOptions.list();
        const shippingOptionsFromRegion =
          shippingOptionsResponse?.shipping_options.filter(
            (option) => option.region_id === value?.region_id
          );
        shippingOptionsFromRegion?.sort(
          (current, next) => (current.amount ?? 0) - (next.amount ?? 0)
        );
        this._model.shippingOptions = shippingOptionsFromRegion ?? [];

        const shippingMethods: ShippingMethod[] = value?.shipping_methods;
        if (shippingMethods && shippingMethods.length > 0) {
          this._model.selectedShippingOptionId =
            shippingMethods[0].shipping_option_id;
        } else {
          await this.updateSelectedShippingOptionIdAsync(
            shippingOptionsFromRegion?.[0].id ?? ''
          );
        }
      } catch (error: any) {
        WindowController.addToast({
          key: `list-shipping-options-${Math.random()}`,
          message: error.name,
          description: error.message,
          type: 'error',
        });
      }
    }

    // Select first provider by default
    if (
      this._model.billingFormComplete &&
      !this._model.selectedProviderId &&
      value?.payment_sessions.length > 0
    ) {
      await this.updateSelectedProviderIdAsync(
        value?.payment_sessions[0].provider_id as ProviderType
      );
    }

    await this.initializePaymentSessionAsync(value);
  }

  private async initializePaymentSessionAsync(cart: Cart): Promise<void> {
    if (cart?.id && !cart.payment_sessions?.length && cart?.items?.length) {
      try {
        const cartResponse =
          await MedusaService.medusa?.carts.createPaymentSessions(cart.id);
        if (cartResponse?.cart) {
          await CartController.updateLocalCartAsync(cartResponse.cart);
        }
      } catch (error: any) {
        WindowController.addToast({
          key: `create-payment-sessions-${Math.random()}`,
          message: error.name,
          description: error.message,
          type: 'error',
        });
      }
    }

    if (cart.payment_session) {
      try {
        const cartResponse =
          await MedusaService.medusa?.carts.refreshPaymentSession(
            cart.id,
            cart.payment_session.id
          );
        if (cartResponse?.cart) {
          await CartController.updateLocalCartAsync(cartResponse.cart);
        }
      } catch (error: any) {
        WindowController.addToast({
          key: `refresh-payment-session-${Math.random()}`,
          message: error.name,
          description: error.message,
          type: 'error',
        });
      }
    }
  }

  private async onCustomerChangedAsync(
    value: Customer | undefined
  ): Promise<void> {
    if (value && value?.shipping_addresses?.length <= 0) {
      this._model.selectedShippingAddressOptionId = undefined;
    }

    // Select first shipping address
    if (
      value &&
      !this._model.selectedShippingAddressOptionId &&
      value.shipping_addresses?.length > 0
    ) {
      await this.updateSelectedShippingAddressOptionIdAsync(
        value.shipping_addresses[0].id ?? ''
      );
    }
  }
}

export default new CheckoutController();
