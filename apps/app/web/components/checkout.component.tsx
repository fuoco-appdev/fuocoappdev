import { RadioProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/radio/radio';
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShippingType } from '../../shared/models/checkout.model';
import { RoutePathsType } from '../../shared/route-paths-type';
import styles from '../modules/checkout.module.scss';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { CheckoutSuspenseDesktopComponent } from './desktop/suspense/checkout.suspense.desktop.component';
import { CheckoutSuspenseMobileComponent } from './mobile/suspense/checkout.suspense.mobile.component';

const CheckoutDesktopComponent = React.lazy(
  () => import('./desktop/checkout.desktop.component')
);
const CheckoutMobileComponent = React.lazy(
  () => import('./mobile/checkout.mobile.component')
);

export interface CheckoutResponsiveProps {
  shippingOptions: RadioProps[];
  providerOptions: RadioProps[];
  shippingAddressOptions: RadioProps[];
  isAddAddressOpen: boolean;
  isPayOpen: boolean;
  stripeOptions: StripeElementsOptions;
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

function CheckoutComponent(): JSX.Element {
  const query = useQuery();
  const {
    CheckoutController,
    AccountController,
    CartController,
    StoreController,
    MedusaService,
  } = React.useContext(DIContext);
  const { suspense, shippingOptions, shippingForm, addShippingForm } =
    CheckoutController.model;
  const { isFoodInCartRequired, cart } = CartController.model;
  const { customer } = AccountController.model;
  const { selectedRegion } = StoreController.model;
  const [currentShippingOptions, setCurrentShippingOptions] = React.useState<
    RadioProps[]
  >([]);
  const [providerOptions, setProviderOptions] = React.useState<RadioProps[]>(
    []
  );
  const [shippingAddressOptions, setShippingAddressOptions] = React.useState<
    RadioProps[]
  >([]);
  const [isAddAddressOpen, setIsAddAddressOpen] =
    React.useState<boolean>(false);
  const [isPayOpen, setIsPayOpen] = React.useState<boolean>(false);
  const [stripeOptions, setStripeOptions] =
    React.useState<StripeElementsOptions>({});
  const renderCountRef = React.useRef<number>(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  React.useEffect(() => {
    renderCountRef.current += 1;
    CheckoutController.load(renderCountRef.current);

    return () => {
      CheckoutController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (
      (cart && cart.items && cart.items.length <= 0) ||
      (isFoodInCartRequired && !CartController.isFoodRequirementInCart())
    ) {
      navigate({ pathname: RoutePathsType.Cart, search: query.toString() });
    }
  }, [cart]);

  React.useEffect(() => {
    if (!cart) {
      return;
    }

    const radioOptions: RadioProps[] = [];
    for (const option of shippingOptions) {
      // const minRequirement = option.requirements?.find(
      //   (value) => value.type === 'min_subtotal'
      // );
      // const maxRequirement = option.requirements?.find(
      //   (value) => value.type === 'max_subtotal'
      // );
      // if (minRequirement && cart.subtotal < minRequirement?.amount) {
      //   continue;
      // }

      // if (maxRequirement && cart.subtotal > maxRequirement?.amount) {
      //   continue;
      // }

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
            {selectedRegion &&
              MedusaService.formatAmount(
                option?.amount ?? 0,
                selectedRegion.currency_code,
                i18n.language
              )}
          </div>
        ),
      });
    }
    setCurrentShippingOptions(radioOptions);
  }, [shippingOptions, cart]);

  React.useEffect(() => {
    if (!cart) {
      return;
    }

    // let radioOptions: RadioProps[] = [];
    // for (const session of cart.payment_sessions as PaymentSession[]) {
    //   let description = '';
    //   let name = '';
    //   if (session.provider_id === ProviderType.Manual) {
    //     if (import.meta.env['MODE'] === 'production') {
    //       continue;
    //     }
    //     name = t('manualProviderName');
    //     description = t('manualProviderDescription');
    //   } else if (session.provider_id === ProviderType.Stripe) {
    //     name = t('creditCardProviderName');
    //     description = t('creditCardProviderDescription');
    //   }

    //   radioOptions.push({
    //     id: session.provider_id,
    //     label: name,
    //     value: name,
    //     description: description,
    //   });
    // }

    // radioOptions = radioOptions.sort((a, b) => (a.label < b.label ? -1 : 1));
    // setProviderOptions(radioOptions);

    // if (cart.payment_session) {
    //   setStripeOptions({
    //     clientSecret: cart.payment_session.data['client_secret'] as
    //       | string
    //       | undefined,
    //   });
    // }
  }, [cart]);

  React.useEffect(() => {
    const radioOptions: RadioProps[] = [];
    if (!customer) {
      return;
    }

    for (const address of customer?.addresses ?? []) {
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
  }, [customer]);

  React.useEffect(() => {
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

  const onContinueToDeliveryFromShippingAddress = async () => {
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

    const errors = await CheckoutController.getAddressFormErrorsAsync(
      shippingForm
    );

    if (errors) {
      CheckoutController.updateShippingAddressErrors(errors);
      return;
    }

    CheckoutController.updateShippingFormComplete(true);
    CheckoutController.updateBillingFormComplete(true);
    CheckoutController.continueToDeliveryAsync();
  };

  const onContinueToBillingFromShippingAddress = async () => {
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

    const errors = await CheckoutController.getAddressFormErrorsAsync(
      shippingForm
    );

    if (errors) {
      CheckoutController.updateShippingAddressErrors(errors);
      return;
    }

    CheckoutController.updateShippingFormComplete(true);
    CheckoutController.continueToBilling();
  };

  const onContinueToDeliveryFromBillingAddress = async () => {
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

    const errors = await CheckoutController.getAddressFormErrorsAsync(
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

    const errors = await CheckoutController.getAddressFormErrorsAsync(
      addShippingForm
    );
    if (errors) {
      CheckoutController.updateAddShippingAddressErrors(errors);
      return;
    }

    await CheckoutController.addShippingAddressAsync();
    setIsAddAddressOpen(false);
  };

  const stripeElementOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = React.useMemo(() => {
    return {
      classes: {
        base: styles['stripe-input-base'],
      },
      showIcon: true,
    };
  }, []);

  const suspenceComponent = (
    <>
      <CheckoutSuspenseDesktopComponent />
      <CheckoutSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

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
        <meta property="og:title" content={'Home | fuoco.appdev'} />
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
      <React.Suspense fallback={suspenceComponent}>
        <CheckoutDesktopComponent
          shippingOptions={currentShippingOptions}
          providerOptions={providerOptions}
          shippingAddressOptions={shippingAddressOptions}
          isAddAddressOpen={isAddAddressOpen}
          isPayOpen={isPayOpen}
          stripeOptions={stripeOptions}
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
        <CheckoutMobileComponent
          shippingOptions={currentShippingOptions}
          providerOptions={providerOptions}
          shippingAddressOptions={shippingAddressOptions}
          isAddAddressOpen={isAddAddressOpen}
          isPayOpen={isPayOpen}
          stripeOptions={stripeOptions}
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
      </React.Suspense>
    </>
  );
}

export default observer(CheckoutComponent);
