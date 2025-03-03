import { useElements, useStripe } from '@stripe/react-stripe-js';
import {
  StripeCardNumberElement,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from './responsive.component';

const StripePayButtonDesktopComponent = React.lazy(
  () => import('./desktop/stripe-pay-button.desktop.component')
);
const StripePayButtonMobileComponent = React.lazy(
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

function StripePayButtonComponent({
  stripeOptions,
  onPaymentClick,
  onPaymentComplete,
}: StripePayButtonProps): JSX.Element {
  const query = useQuery();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cardRef = React.useRef<StripeCardNumberElement | null | undefined>(
    null
  );
  const { CheckoutController } = React.useContext(DIContext);

  React.useEffect(() => {
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
      navigate({
        pathname: `${RoutePathsType.OrderConfirmed}/${id}`,
        search: query.toString(),
      });
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

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <StripePayButtonDesktopComponent onPayAsync={onPayAsync} />
      <StripePayButtonMobileComponent onPayAsync={onPayAsync} />
    </React.Suspense>
  );
}

export default observer(StripePayButtonComponent);
