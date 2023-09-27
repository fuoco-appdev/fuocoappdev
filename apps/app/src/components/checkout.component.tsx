import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './checkout.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import { RadioProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/radio/radio';
import StoreController from '../controllers/store.controller';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import {
  CheckoutState,
  ProviderType,
  ShippingType,
} from '../models/checkout.model';
import CartController from '../controllers/cart.controller';
import { PaymentSession, Customer, Cart } from '@medusajs/medusa';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import SecretsService from '../services/secrets.service';
import { CheckoutMobileComponent } from './mobile/checkout.mobile.component';
import { CheckoutDesktopComponent } from './desktop/checkout.desktop.component';
import { Helmet } from 'react-helmet';
import { AccountState } from '../models/account.model';
import { StoreState } from '../models/store.model';
import { CartState } from '../models/cart.model';
import { WindowState } from '../models/window.model';

export interface CheckoutResponsiveProps {
  checkoutProps: CheckoutState;
  accountProps: AccountState;
  storeProps: StoreState;
  cartProps: CartState;
  windowProps: WindowState;
  shippingOptions: RadioProps[];
  providerOptions: RadioProps[];
  shippingAddressOptions: RadioProps[];
  isAddAddressOpen: boolean;
  isPayOpen: boolean;
  stripeOptions: StripeElementsOptions;
  stripePromise: Promise<Stripe | null>;
  stripeElementOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions;
  setIsAddAddressOpen: (value: boolean) => void;
  setIsPayOpen: (value: boolean) => void;
  onContinueToDeliveryFromShippingAddress: () => void;
  onContinueToBillingFromShippingAddress: () => void;
  onContinueToDeliveryFromBillingAddress: () => void;
  onAddAddressAsync: () => void;
}

export default function CheckoutComponent(): JSX.Element {
  const [checkoutProps] = useObservable(CheckoutController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [cartProps] = useObservable(CartController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [shippingOptions, setShippingOptions] = useState<RadioProps[]>([]);
  const [providerOptions, setProviderOptions] = useState<RadioProps[]>([]);
  const [shippingAddressOptions, setShippingAddressOptions] = useState<
    RadioProps[]
  >([]);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState<boolean>(false);
  const [isPayOpen, setIsPayOpen] = useState<boolean>(false);
  const [stripeOptions, setStripeOptions] = useState<StripeElementsOptions>({});
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const customer = accountProps.customer as Customer;
  const stripePromise = loadStripe(SecretsService.stripePublishableKey ?? '');

  const stripeElementOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      classes: {
        base: styles['stripe-input-base'],
      },
      showIcon: true,
    };
  }, []);

  useEffect(() => {
    if (cartProps.cart && cartProps.cart.items.length <= 0) {
      navigate(RoutePathsType.Store);
    }
  }, [cartProps.cart]);

  useEffect(() => {
    const radioOptions: RadioProps[] = [];
    for (const option of checkoutProps.shippingOptions as PricedShippingOption[]) {
      let description = '';
      if (option.name === ShippingType.Standard) {
        description = t('standardShippingDescription');
      } else if (option.name === ShippingType.Express) {
        description = t('expressShippingDescription');
      }

      radioOptions.push({
        id: option.id,
        label: option.name ?? '',
        value: option.id ?? '',
        description: description,
        rightContent: () => (
          <div className={styles['radio-price-text']}>
            {storeProps.selectedRegion &&
              formatAmount({
                amount: option?.amount ?? 0,
                region: storeProps.selectedRegion,
                includeTaxes: false,
              })}
          </div>
        ),
      });
    }
    setShippingOptions(radioOptions);
  }, [checkoutProps.shippingOptions]);

  useEffect(() => {
    if (!cartProps.cart) {
      return;
    }

    const cart = cartProps.cart as Cart;
    let radioOptions: RadioProps[] = [];
    for (const session of cart.payment_sessions as PaymentSession[]) {
      let description = '';
      let name = '';
      if (session.provider_id === ProviderType.Manual) {
        if (process.env['NODE_ENV'] === 'production') {
          continue;
        }
        name = t('manualProviderName');
        description = t('manualProviderDescription');
      } else if (session.provider_id === ProviderType.Stripe) {
        name = t('creditCardProviderName');
        description = t('creditCardProviderDescription');
      }

      radioOptions.push({
        id: session.provider_id,
        label: name,
        value: name,
        description: description,
      });
    }

    radioOptions = radioOptions.sort((a, b) => (a.label < b.label ? -1 : 1));
    setProviderOptions(radioOptions);

    if (cart.payment_session) {
      setStripeOptions({
        clientSecret: cart.payment_session.data['client_secret'] as
          | string
          | undefined,
      });
    }
  }, [cartProps.cart]);

  useEffect(() => {
    let radioOptions: RadioProps[] = [];
    if (!customer) {
      return;
    }

    for (const address of customer?.shipping_addresses) {
      let value = `${address.address_1}`;
      let description = `${address.first_name} ${address.last_name}, ${address.phone}`;
      if (address?.address_2) {
        value += ` ${address.address_2}, `;
      } else {
        value += ', ';
      }

      if (address?.province) {
        value += `${address.province}, `;
      }

      value += address.country_code?.toUpperCase();

      if (address.company) {
        description += `, ${address.company}`;
      }

      radioOptions.push({
        id: address.id,
        label: value,
        value: value,
        description: description,
      });
    }

    setShippingAddressOptions(radioOptions);
  }, [accountProps.customer]);

  useEffect(() => {
    CheckoutController.updateErrorStrings({
      email: t('fieldEmptyError') ?? '',
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      address: t('fieldEmptyError') ?? '',
      postalCode: t('fieldEmptyError') ?? '',
      city: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  const onContinueToDeliveryFromShippingAddress = () => {
    CheckoutController.updateShippingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = CheckoutController.getAddressFormErrors(
      checkoutProps.shippingForm
    );

    if (errors) {
      CheckoutController.updateShippingAddressErrors(errors);
      return;
    }

    CheckoutController.updateShippingFormComplete(true);
    CheckoutController.updateBillingFormComplete(true);
    CheckoutController.continueToDeliveryAsync();
  };

  const onContinueToBillingFromShippingAddress = () => {
    CheckoutController.updateShippingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = CheckoutController.getAddressFormErrors(
      checkoutProps.shippingForm
    );

    if (errors) {
      CheckoutController.updateShippingAddressErrors(errors);
      return;
    }

    CheckoutController.updateShippingFormComplete(true);
    CheckoutController.continueToBilling();
  };

  const onContinueToDeliveryFromBillingAddress = () => {
    CheckoutController.updateBillingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = CheckoutController.getAddressFormErrors(
      CheckoutController.model.billingForm
    );

    if (errors) {
      CheckoutController.updateBillingAddressErrors(errors);
      return;
    }

    CheckoutController.updateBillingFormComplete(true);
    CheckoutController.continueToDeliveryAsync();
  };

  const onAddAddressAsync = async () => {
    CheckoutController.updateAddShippingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = CheckoutController.getAddressFormErrors(
      checkoutProps.addShippingForm
    );
    if (errors) {
      CheckoutController.updateAddShippingAddressErrors(errors);
      return;
    }

    await CheckoutController.addShippingAddressAsync();
    setIsAddAddressOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Home | Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <ResponsiveDesktop>
        <CheckoutDesktopComponent
          checkoutProps={checkoutProps}
          accountProps={accountProps}
          storeProps={storeProps}
          cartProps={cartProps}
          windowProps={windowProps}
          shippingOptions={shippingOptions}
          providerOptions={providerOptions}
          shippingAddressOptions={shippingAddressOptions}
          isAddAddressOpen={isAddAddressOpen}
          isPayOpen={isPayOpen}
          stripeOptions={stripeOptions}
          stripePromise={stripePromise}
          stripeElementOptions={stripeElementOptions}
          setIsAddAddressOpen={setIsAddAddressOpen}
          setIsPayOpen={setIsPayOpen}
          onContinueToDeliveryFromShippingAddress={
            onContinueToDeliveryFromShippingAddress
          }
          onContinueToBillingFromShippingAddress={
            onContinueToBillingFromShippingAddress
          }
          onContinueToDeliveryFromBillingAddress={
            onContinueToDeliveryFromBillingAddress
          }
          onAddAddressAsync={onAddAddressAsync}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CheckoutMobileComponent
          checkoutProps={checkoutProps}
          accountProps={accountProps}
          storeProps={storeProps}
          cartProps={cartProps}
          windowProps={windowProps}
          shippingOptions={shippingOptions}
          providerOptions={providerOptions}
          shippingAddressOptions={shippingAddressOptions}
          isAddAddressOpen={isAddAddressOpen}
          isPayOpen={isPayOpen}
          stripeOptions={stripeOptions}
          stripePromise={stripePromise}
          stripeElementOptions={stripeElementOptions}
          setIsAddAddressOpen={setIsAddAddressOpen}
          setIsPayOpen={setIsPayOpen}
          onContinueToDeliveryFromShippingAddress={
            onContinueToDeliveryFromShippingAddress
          }
          onContinueToBillingFromShippingAddress={
            onContinueToBillingFromShippingAddress
          }
          onContinueToDeliveryFromBillingAddress={
            onContinueToDeliveryFromBillingAddress
          }
          onAddAddressAsync={onAddAddressAsync}
        />
      </ResponsiveMobile>
    </>
  );
}
