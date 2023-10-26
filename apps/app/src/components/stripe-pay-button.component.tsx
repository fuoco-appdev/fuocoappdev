import { MutableRefObject, useEffect, useRef } from 'react';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
  ResponsiveTablet,
} from './responsive.component';
import {
  Elements,
  useElements,
  useStripe,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import { useTranslation } from 'react-i18next';
import { ProviderType } from '../models/checkout.model';
import { RoutePathsType } from '../route-paths';
import { lazy } from '@loadable/component';
import React from 'react';

const StripePayButtonDesktopComponent = lazy(
  () => import('./desktop/stripe-pay-button.desktop.component')
);
const StripePayButtonTabletComponent = lazy(
  () => import('./tablet/stripe-pay-button.tablet.component')
);
const StripePayButtonMobileComponent = lazy(
  () => import('./mobile/stripe-pay-button.mobile.component')
);

export interface StripePayButtonProps {
  stripeOptions?: StripeElementsOptions;
  onPaymentClick?: () => void;
  onPaymentComplete?: () => void;
}

export interface StripePayButtonResponsiveProps {
  onPayAsync: () => void;
}

export default function StripePayButtonComponent({
  stripeOptions,
  onPaymentClick,
  onPaymentComplete,
}: StripePayButtonProps): JSX.Element {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cardRef = useRef<StripeCardNumberElement | null | undefined>(null);

  useEffect(() => {
    cardRef.current = elements?.getElement('cardNumber');
  }, [elements]);

  const onPayAsync = async () => {
    onPaymentClick?.();

    const id = await CheckoutController.proceedToStripePaymentAsync(
      stripe,
      cardRef.current,
      stripeOptions?.clientSecret
    );

    if (id) {
      onPaymentComplete?.();
      navigate(`${RoutePathsType.OrderConfirmed}/${id}`);
    }
  };

  const suspenceComponent = (
    <>
      <ResponsiveSuspenseDesktop>
        <div />
      </ResponsiveSuspenseDesktop>
      <ResponsiveSuspenseTablet>
        <div />
      </ResponsiveSuspenseTablet>
      <ResponsiveSuspenseMobile>
        <div />
      </ResponsiveSuspenseMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <StripePayButtonDesktopComponent onPayAsync={onPayAsync} />
      <StripePayButtonTabletComponent onPayAsync={onPayAsync} />
      <StripePayButtonMobileComponent onPayAsync={onPayAsync} />
    </React.Suspense>
  );
}
