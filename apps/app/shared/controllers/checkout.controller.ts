import { HttpTypes } from '@medusajs/types';
import { Stripe, StripeCardNumberElement } from '@stripe/stripe-js';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { AddressFormErrors, AddressFormValues } from '../models/account.model';
import { CheckoutModel, ProviderType } from '../models/checkout.model';
import MedusaService, { AddressPayload } from '../services/medusa.service';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';
import AccountController from './account.controller';
import CartController from './cart.controller';
import ExploreController from './explore.controller';
import StoreController from './store.controller';

export default class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;
  private readonly _cartRelations: string;
  private _cartDisposer: Lambda | undefined;
  private _customerDisposer: Lambda | undefined;
  private _shippingFormDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      MedusaService: MedusaService;
      SupabaseService: SupabaseService;
      ExploreController: ExploreController;
      CartController: CartController;
      AccountController: AccountController;
      StoreController: StoreController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new CheckoutModel(this._storeOptions);
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

  public override initialize = (renderCount: number): void => {
    this.initializeAsync(renderCount);

    const supabaseService = this._container.get('SupabaseService');
    supabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
    this._shippingFormDisposer = observe(
      this._model,
      'shippingForm',
      this.onShippingFormChanged
    );
  };

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenDisposer?.();
    this._shippingFormDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._cartDisposer?.();
    this._customerDisposer?.();
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
    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    await when(
      () => exploreController.model.selectedInventoryLocation !== undefined
    );
    const selectedInventoryLocation =
      exploreController.model.selectedInventoryLocation;
    const cartId = selectedInventoryLocation
      ? cartController.model.cartIds?.[selectedInventoryLocation.id]
      : undefined;
    const carts = cartController.model.carts;
    const cartItems = carts[cartId ?? '']?.items ?? [];
    if (
      !cartId ||
      this._model.selectedShippingAddressOptionId === value ||
      !carts[cartId] ||
      cartItems.length <= 0
    ) {
      return;
    }

    try {
      const cart = await medusaService.requestStoreCartAddShippingMethod(
        cartId,
        { option_id: value },
        {
          expand: this._cartRelations,
        }
      );

      if (!cart) {
        return;
      }

      cartController.updateCarts(cart.id, cart);
      cartController.updateSelectedCart(cart);

      this._model.selectedShippingOptionId = value;
    } catch (error: any) {
      console.error(error);
    }
  }

  public async addShippingAddressAsync(): Promise<void> {
    const accountController = this._container.get('AccountController');
    await accountController.addAddressAsync(this._model.addShippingForm);
  }

  public async updateSelectedShippingAddressOptionIdAsync(
    value: string
  ): Promise<void> {
    const accountController = this._container.get('AccountController');
    await when(() => accountController.model.customer !== undefined);
    const customer: HttpTypes.StoreCustomer | undefined =
      accountController.model.customer;
    if (!customer) {
      return;
    }

    const address = customer?.addresses.find((address) => address.id === value);
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
    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    await when(
      () => exploreController.model.selectedInventoryLocation !== undefined
    );
    const selectedInventoryLocation =
      exploreController.model.selectedInventoryLocation;
    const cartId = selectedInventoryLocation
      ? cartController.model.cartIds?.[selectedInventoryLocation.id]
      : undefined;
    const cart = cartController.model.cart;
    if (
      !cartId ||
      !cart ||
      !this._model.billingFormComplete ||
      this._model.selectedProviderId === value
    ) {
      return;
    }

    let paymentCollection = cart.payment_collection;
    if (!paymentCollection?.id) {
      try {
        paymentCollection =
          await medusaService.requestStoreCreatePaymentCollection({
            cart_id: cartId,
          });
      } catch (error: any) {
        console.error(error);
      }
    }

    try {
      paymentCollection =
        await medusaService.requestStoreInitializePaymentSession(
          paymentCollection?.id ?? '',
          {
            provider_id: value,
          }
        );

      const updatedCart = await medusaService.requestStoreCart(cart.id);
      cartController.updateCarts(updatedCart.id, updatedCart);
      cartController.updateSelectedCart(updatedCart);

      this._model.selectedProviderId = value;
    } catch (error: any) {
      console.error(error);
    }
  }

  public async continueToDeliveryAsync(): Promise<boolean> {
    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    await when(
      () => exploreController.model.selectedInventoryLocation !== undefined
    );
    const selectedInventoryLocation =
      exploreController.model.selectedInventoryLocation;
    await when(() => cartController.model.cartIds !== undefined);
    const cartIds = cartController.model.cartIds ?? {};
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
      const cart = await medusaService.requestStoreUpdateCart(
        cartId,
        {
          email: this._model.shippingForm.email ?? '',
          shipping_address: shippingAddressPayload,
          billing_address: billingAddressPayload,
        },
        {
          expand: this._cartRelations,
        }
      );
      if (!cart) {
        return false;
      }

      cartController.updateCarts(cart.id, cart);
      cartController.updateSelectedCart(cart);
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

    const cartController = this._container.get('CartController');
    await cartController.updateCartAsync({
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

    const medusaService = this._container.get('MedusaService');
    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const selectedInventoryLocation =
      exploreController.model.selectedInventoryLocation;
    const cartId = selectedInventoryLocation
      ? cartController.model.cartIds?.[selectedInventoryLocation.id]
      : undefined;

    if (!cartId) {
      return;
    }
    await medusaService.requestStoreCartAddPromotions(cartId, {
      promo_codes: [this._model.discountCode],
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
    const accountController = this._container.get('AccountController');
    const customer = accountController.model.customer;
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

    const cartController = this._container.get('CartController');
    const accountController = this._container.get('AccountController');
    await when(() => cartController.model.cart !== undefined);
    const cart = cartController.model.cart;

    await this.onCartChangedAsync(cart);

    this._customerDisposer?.();
    this._customerDisposer = observe(
      accountController.model,
      'customer',
      this.onCustomerChangedAsync
    );
  }

  private async requestShippingOptions(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const storeController = this._container.get('StoreController');
    await when(() => storeController.model.selectedRegion !== undefined);
    const selectedRegion = storeController.model.selectedRegion;

    try {
      const shippingOptions = await medusaService.requestStoreShippingOptions({
        region_id: selectedRegion?.id,
      });
      this._model.shippingOptions = shippingOptions ?? [];
    } catch (error: any) {
      console.error(error);
    }
  }

  private async getCompleteCartIdAsync(): Promise<string | undefined> {
    const cartController = this._container.get('CartController');
    const completeCart = await cartController.completeCartAsync();
    this.resetCheckoutStates();
    await cartController.resetCartAsync();
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

  private async onCartChangedAsync(
    value: HttpTypes.StoreCart | undefined
  ): Promise<void> {
    if (!value) {
      return;
    }

    const accountController = this._container.get('AccountController');
    const customer = accountController.model.customer;
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

    const paymentCollection = value?.payment_collection;
    const paymentSessions = paymentCollection?.payment_sessions ?? [];
    // Select first provider by default
    if (
      this._model.billingFormComplete &&
      !this._model.selectedProviderId &&
      paymentSessions.length > 0
    ) {
      await this.updateSelectedProviderIdAsync(
        paymentSessions[0].provider_id as ProviderType
      );
    }

    await this.initializePaymentSessionAsync(value);
  }

  private async initializePaymentSessionAsync(
    cart: HttpTypes.StoreCart
  ): Promise<void> {
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    let paymentCollection = cart?.payment_collection;
    const paymentSessions = paymentCollection?.payment_sessions ?? [];
    if (cart?.id && !paymentCollection && cart?.items?.length) {
      try {
        paymentCollection =
          await medusaService.requestStoreCreatePaymentCollection({
            cart_id: cart.id,
          });
      } catch (error: any) {
        console.error(error);
      }
    }

    if (paymentCollection) {
      try {
        paymentCollection =
          await medusaService.requestStoreInitializePaymentSession(
            paymentCollection.id,
            {
              provider_id: paymentSessions[0].id,
            }
          );

        const updatedCart = await medusaService.requestStoreCart(cart.id);
        cartController.updateCarts(updatedCart.id, updatedCart);
        cartController.updateSelectedCart(updatedCart);
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async onCustomerChangedAsync(
    value: IValueDidChange<HttpTypes.StoreCustomer | undefined>
  ): Promise<void> {
    const customer = value.newValue;
    if (!customer) {
      return;
    }

    if (customer.addresses?.length <= 0) {
      this._model.selectedShippingAddressOptionId = undefined;
    }

    // // Select first shipping address
    // if (value.shipping_addresses?.length > 0) {
    //   await this.updateSelectedShippingAddressOptionIdAsync(
    //     value.shipping_addresses[0].id ?? ''
    //   );
    // }
  }

  private onShippingFormChanged(
    value: IValueDidChange<AddressFormValues>
  ): void {
    if (this._model.sameAsBillingAddress) {
      this._model.billingForm = value.newValue;
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
