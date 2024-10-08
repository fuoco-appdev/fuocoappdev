import { AddressPayload, Cart, Customer, Region } from '@medusajs/medusa';
import { select } from '@ngneat/elf';
import { Stripe, StripeCardNumberElement } from '@stripe/stripe-js';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import {
  AddressFormErrors,
  AddressFormValues,
} from '../../web/components/address-form.component';
import { Controller } from '../controller';
import { CheckoutModel, ProviderType } from '../models/checkout.model';
import MedusaService from '../services/medusa.service';
import SupabaseService from '../services/supabase.service';
import AccountController from './account.controller';
import CartController from './cart.controller';
import ExploreController from './explore.controller';
import StoreController from './store.controller';

class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;
  private readonly _cartRelations: string;
  private _cartSubscription: Subscription | undefined;
  private _customerSubscription: Subscription | undefined;
  private _shippingFormSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CheckoutModel();
    this._cartRelations =
      'payment_session,billing_address,shipping_address,items,region,discounts,gift_cards,customer,payment_sessions,payment,shipping_methods,sales_channel,sales_channels';
    this.onCartChangedAsync = this.onCartChangedAsync.bind(this);
    this.onCustomerChangedAsync = this.onCustomerChangedAsync.bind(this);
    this.onShippingFormChanged = this.onShippingFormChanged.bind(this);
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): CheckoutModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);

    this._shippingFormSubscription?.unsubscribe();
    this._shippingFormSubscription = this._model.store
      .pipe(select((model) => model.shippingForm))
      .subscribe({ next: this.onShippingFormChanged });

    SupabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
  }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._shippingFormSubscription?.unsubscribe();
  }

  public override disposeLoad(_renderCount: number): void {
    this._cartSubscription?.unsubscribe();
    this._customerSubscription?.unsubscribe();
  }

  public override load(renderCount: number): void {
    this.loadAsync(renderCount);
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

  public updateIsLegalAge(value: boolean): void {
    this._model.isLegalAge = value;
  }

  public async updateSelectedShippingOptionIdAsync(
    value: string
  ): Promise<void> {
    const selectedInventoryLocation = await firstValueFrom(
      ExploreController.model.store.pipe(
        select((model) => model.selectedInventoryLocation),
        filter((value) => value !== undefined),
        take(1)
      )
    );
    const cartId = selectedInventoryLocation
      ? CartController.model.cartIds[selectedInventoryLocation.id]
      : undefined;
    const carts = await firstValueFrom(
      CartController.model.store.pipe(
        select((model) => model.carts),
        take(1)
      )
    );
    if (
      !cartId ||
      this._model.selectedShippingAddressOptionId === value ||
      !carts[cartId] ||
      carts[cartId]?.items.length <= 0
    ) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.addShippingMethod(
        cartId,
        { option_id: value },
        {
          expand: this._cartRelations,
        }
      );

      if (!cartResponse?.cart) {
        return;
      }

      CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
      CartController.updateSelectedCart(cartResponse.cart);

      this._model.selectedShippingOptionId = value;
    } catch (error: any) {
      console.error(error);
    }
  }

  public async addShippingAddressAsync(): Promise<void> {
    await AccountController.addAddressAsync(this._model.addShippingForm);
  }

  public async updateSelectedShippingAddressOptionIdAsync(
    value: string
  ): Promise<void> {
    const customer: Customer = await firstValueFrom(
      AccountController.model.store.pipe(
        select((model) => model.customer),
        filter((value) => value !== undefined),
        take(1)
      )
    );
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

    const completed = await this.continueToDeliveryAsync();
    if (!completed) {
      return;
    }

    this._model.shippingFormComplete = true;

    if (this._model.sameAsBillingAddress && !this._model.billingFormComplete) {
      this._model.billingFormComplete = true;
    }
  }

  public async updateSelectedProviderIdAsync(
    value: ProviderType
  ): Promise<void> {
    const selectedInventoryLocation = await firstValueFrom(
      ExploreController.model.store.pipe(
        select((model) => model.selectedInventoryLocation),
        filter((value) => value !== undefined),
        take(1)
      )
    );
    const cartId = selectedInventoryLocation
      ? CartController.model.cartIds[selectedInventoryLocation.id]
      : undefined;
    const cart = await firstValueFrom(
      CartController.model.store.pipe(
        select((model) => model.cart),
        take(1)
      )
    );
    if (
      !cartId ||
      !cart ||
      !this._model.billingFormComplete ||
      this._model.selectedProviderId === value
    ) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.setPaymentSession(
        cartId,
        {
          provider_id: value,
        },
        {
          expand: this._cartRelations,
        }
      );
      if (!cartResponse?.cart) {
        return;
      }

      CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
      CartController.updateSelectedCart(cartResponse.cart);

      this._model.selectedProviderId = value;
    } catch (error: any) {
      console.error(error);
    }
  }

  public async continueToDeliveryAsync(): Promise<boolean> {
    const selectedInventoryLocation = await firstValueFrom(
      ExploreController.model.store.pipe(
        select((model) => model.selectedInventoryLocation),
        filter((value) => value !== undefined),
        take(1)
      )
    );
    const cartIds = CartController.model.localStore
      ? await firstValueFrom(
          CartController.model.localStore.pipe(
            select((model) => model.cartIds),
            filter((value) => value !== undefined),
            take(1)
          )
        )
      : {};
    const cartId = selectedInventoryLocation
      ? cartIds[selectedInventoryLocation.id]
      : undefined;
    if (!cartId) {
      return false;
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
        cartId,
        {
          email: this._model.shippingForm.email,
          shipping_address: shippingAddressPayload,
          billing_address: billingAddressPayload,
        },
        {
          expand: this._cartRelations,
        }
      );
      if (!cartResponse?.cart) {
        return false;
      }

      CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
      CartController.updateSelectedCart(cartResponse.cart);
    } catch (error: any) {
      console.error(error);
      return false;
    }

    return true;
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
      console.error(error);

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

  public async getAddressFormErrorsAsync(
    form: AddressFormValues
  ): Promise<AddressFormErrors | undefined> {
    const errors: AddressFormErrors = {};

    const customer = await firstValueFrom(
      AccountController.model.store.pipe(
        select((model) => model.customer),
        take(1)
      )
    );
    if (!customer && (!form.email || form.email?.length <= 0)) {
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

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private async loadAsync(_renderCount: number): Promise<void> {
    await this.requestShippingOptions();

    const cart = await firstValueFrom(
      CartController.model.store.pipe(
        select((model) => model.cart),
        filter((value) => value !== undefined),
        take(1)
      )
    );
    await this.onCartChangedAsync(cart);

    this._customerSubscription?.unsubscribe();
    this._customerSubscription = AccountController.model.store
      .pipe(select((model) => model.customer))
      .subscribe({ next: this.onCustomerChangedAsync });
  }

  private async requestShippingOptions(): Promise<void> {
    const selectedRegion: Region = await firstValueFrom(
      StoreController.model.store.pipe(
        select((model) => model.selectedRegion),
        filter((value) => value !== undefined),
        take(1)
      )
    );

    try {
      const shippingOptionsResponse =
        await MedusaService.medusa?.shippingOptions.list({
          region_id: selectedRegion?.id,
        });
      this._model.shippingOptions =
        shippingOptionsResponse?.shipping_options ?? [];
    } catch (error: any) {
      console.error(error);
    }
  }

  private async getCompleteCartIdAsync(): Promise<string | undefined> {
    const completeCart = await CartController.completeCartAsync();
    this.resetCheckoutStates();
    await CartController.resetCartAsync();
    this._model.isPaymentLoading = false;
    return completeCart?.id;
  }

  private resetCheckoutStates(): void {
    this._model.sameAsBillingAddress = true;
    this._model.shippingOptions = [];
    this._model.selectedShippingOptionId = undefined;
    this._model.giftCardCode = '';
    this._model.discountCode = '';
    this._model.selectedShippingAddressOptionId = undefined;
    this._model.selectedShippingOptionId = undefined;
    this._model.selectedProviderId = undefined;
  }

  private async onCartChangedAsync(value: Cart | undefined): Promise<void> {
    if (!value) {
      return;
    }

    const customer = await firstValueFrom(
      AccountController.model.store.pipe(
        select((model) => model.customer),
        take(1)
      )
    );
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

      if (
        value?.shipping_address &&
        Object.keys(
          (await this.getAddressFormErrorsAsync(this._model.shippingForm)) ?? {}
        ).length <= 0
      ) {
        this._model.shippingFormComplete = true;
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
    if (cart?.id && cart.payment_sessions?.length <= 0 && cart?.items?.length) {
      try {
        const cartResponse =
          await MedusaService.medusa?.carts.createPaymentSessions(cart.id, {
            expand: this._cartRelations,
          });
        if (!cartResponse?.cart) {
          return;
        }

        CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
        CartController.updateSelectedCart(cartResponse.cart);
      } catch (error: any) {
        console.error(error);
      }
    }

    if (cart.payment_session) {
      try {
        const cartResponse =
          await MedusaService.medusa?.carts.refreshPaymentSession(
            cart.id,
            cart.payment_session.id,
            {
              expand: this._cartRelations,
            }
          );
        if (!cartResponse?.cart) {
          return;
        }

        CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
        CartController.updateSelectedCart(cartResponse.cart);
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async onCustomerChangedAsync(
    value: Customer | undefined
  ): Promise<void> {
    if (!value) {
      return;
    }

    if (value.shipping_addresses?.length <= 0) {
      this._model.selectedShippingAddressOptionId = undefined;
    }

    // // Select first shipping address
    // if (value.shipping_addresses?.length > 0) {
    //   await this.updateSelectedShippingAddressOptionIdAsync(
    //     value.shipping_addresses[0].id ?? ''
    //   );
    // }
  }

  private onShippingFormChanged(value: AddressFormValues): void {
    if (this._model.sameAsBillingAddress) {
      this._model.billingForm = value;
      this._model.billingFormComplete = true;
    }
  }

  private onAuthStateChanged(
    event: AuthChangeEvent,
    _session: Session | null
  ): void {
    if (event === 'SIGNED_OUT') {
      this._model.shippingForm = {};
      this._model.billingForm = {};
      this._model.shippingFormComplete = false;
      this._model.billingFormComplete = false;
    }
  }
}

export default new CheckoutController();
