import { MutableRefObject, useEffect, useRef } from 'react';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
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
import { PayButtonMobileComponent } from './mobile/pay-button.mobile.component';
import { useNavigate } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../controllers/checkout.controller';
import { useTranslation } from 'react-i18next';
import { ProviderType } from '../models/checkout.model';
import { RoutePaths } from '../route-paths';
import { PayButtonDesktopComponent } from './desktop/pay-button.desktop.component';

export interface PayButtonProps {
  stripeOptions?: StripeElementsOptions;
  onPaymentComplete: () => void;
}

export interface PayButtonResponsiveProps {
  onPayAsync: () => void;
}

export default function PayButtonComponent({
  stripeOptions,
  onPaymentComplete,
}: PayButtonProps): JSX.Element {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [props] = useObservable(CheckoutController.model.store);
  const elements = useElements();
  const cardRef = useRef<StripeCardNumberElement | null | undefined>(null);

  useEffect(() => {
    cardRef.current = elements?.getElement('cardNumber');
  }, [elements]);

  const onPayAsync = async () => {
    let id: string | undefined = undefined;
    if (props.selectedProviderId === ProviderType.Manual) {
      id = await CheckoutController.proceedToManualPaymentAsync();
    } else if (props.selectedProviderId === ProviderType.Stripe) {
      id = await CheckoutController.proceedToStripePaymentAsync(
        stripe,
        cardRef.current,
        stripeOptions?.clientSecret
      );
    }

    if (id) {
      onPaymentComplete?.();
      navigate(`${RoutePaths.OrderConfirmed}/${id}`);
    }
  };

  return (
    <>
      <ResponsiveDesktop>
        <PayButtonDesktopComponent onPayAsync={onPayAsync} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <PayButtonMobileComponent onPayAsync={onPayAsync} />
      </ResponsiveMobile>
    </>
  );
}
