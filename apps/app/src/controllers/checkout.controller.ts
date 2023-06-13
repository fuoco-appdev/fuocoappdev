import { Subscription } from 'rxjs';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../components/address-form.component';
import { Controller } from '../controller';
import { CheckoutModel } from '../models/checkout.model';
import MedusaService from '../services/medusa.service';
import CartController from './cart.controller';
import {
  AddressPayload,
  Cart,
  ShippingMethod,
  ShippingOption,
  Order,
  Swap,
} from '@medusajs/medusa';
import { select } from '@ngneat/elf';
import StoreController from './store.controller';

class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;
  private _cartSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CheckoutModel();
    this.onCartChangedAsync = this.onCartChangedAsync.bind(this);
  }

  public get model(): CheckoutModel {
    return this._model;
  }

  public initialize(renderCount: number): void {
    this.initializeAsync(renderCount);

    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({
        next: this.onCartChangedAsync,
      });
  }

  public dispose(renderCount: number): void {
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
      this._model.selectedShippingOptionId === value
    ) {
      return;
    }

    const cartResponse = await MedusaService.medusa.carts.addShippingMethod(
      CartController.model.cartId,
      { option_id: value }
    );
    CartController.updateLocalCartAsync(cartResponse.cart);
    this._model.selectedShippingOptionId = value;
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

    const cartResponse = await MedusaService.medusa.carts.update(
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
    await CartController.updateLocalCartAsync(cartResponse.cart);
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

  public async proceedToPaymentAsync(): Promise<void> {
    const completeCart = await CartController.completeCartAsync();
    this.resetCheckoutStates();
    console.log(completeCart);
    await CartController.resetCartAsync();
  }

  public getAddressFormErrors(
    form: AddressFormValues
  ): AddressFormErrors | undefined {
    const errors: AddressFormErrors = {};

    if (!form.email || form.email?.length <= 0) {
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

  private resetCheckoutStates(): void {
    this._model.shippingForm = {};
    this._model.shippingFormErrors = {};
    this._model.shippingFormComplete = false;
    this._model.billingForm = {};
    this._model.billingFormErrors = {};
    this._model.billingFormComplete = false;
    this._model.sameAsBillingAddress = true;
    this._model.shippingOptions = [];
    this._model.selectedShippingOptionId = undefined;
    this._model.giftCardCode = '';
    this._model.discountCode = '';
    this._model.providerId = '';
  }

  private async onCartChangedAsync(value: Cart | undefined): Promise<void> {
    if (!value) {
      return;
    }

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

    if (value?.region_id) {
      const shippingOptionsResponse =
        await MedusaService.medusa.shippingOptions.list();
      const shippingOptionsFromRegion =
        shippingOptionsResponse.shipping_options.filter(
          (option) => option.region_id === value?.region_id
        );
      shippingOptionsFromRegion.sort(
        (current, next) => (current.amount ?? 0) - (next.amount ?? 0)
      );
      this._model.shippingOptions = shippingOptionsFromRegion;

      const shippingMethods: ShippingMethod[] = value?.shipping_methods;
      if (shippingMethods && shippingMethods.length > 0) {
        this._model.selectedShippingOptionId =
          shippingMethods[0].shipping_option_id;
      } else {
        await this.updateSelectedShippingOptionIdAsync(
          shippingOptionsFromRegion[0].id ?? ''
        );
      }
    }

    await this.initializePaymentSessionAsync(value);
  }

  private async initializePaymentSessionAsync(cart: Cart): Promise<void> {
    if (cart?.id && !cart.payment_sessions?.length && cart?.items?.length) {
      const cartResponse =
        await MedusaService.medusa.carts.createPaymentSessions(cart.id);
      await CartController.updateLocalCartAsync(cartResponse.cart);
    }

    if (cart.payment_session) {
      const cartResponse =
        await MedusaService.medusa.carts.refreshPaymentSession(
          cart.id,
          cart.payment_session.id
        );
      await CartController.updateLocalCartAsync(cartResponse.cart);
    }
  }
}

export default new CheckoutController();
