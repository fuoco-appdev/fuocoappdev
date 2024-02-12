import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useParams } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import EmailConfirmationController from '../controllers/email-confirmation.controller';
import StoreController from '../controllers/store.controller';
import { useEffect, useRef, useState } from 'react';
import { OptionProps } from '@fuoco.appdev/core-ui';
import { LineItem, ShippingMethod, ReturnReason } from '@medusajs/medusa';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import React from 'react';
import { Helmet } from 'react-helmet';
import { EmailConfirmationState } from '../models/email-confirmation.model';
import { useTranslation } from 'react-i18next';

const EmailConfirmationDesktopComponent = lazy(
  () => import('./desktop/email-confirmation.desktop.component')
);
const EmailConfirmationTabletComponent = lazy(
  () => import('./tablet/email-confirmation.tablet.component')
);
const EmailConfirmationMobileComponent = lazy(
  () => import('./mobile/email-confirmation.mobile.component')
);

export interface EmailConfirmationProps {}

export interface EmailConfirmationResponsiveProps {
  emailConfirmationProps: EmailConfirmationState;
  onResendConfirmationClick: () => void;
}

export default function EmailConfirmationComponent(): JSX.Element {
  const { id } = useParams();
  const { t } = useTranslation();
  const [emailConfirmationProps] = useObservable(
    EmailConfirmationController.model.store
  );
  const isRenderedRef = useRef<boolean>(false);
  const renderCountRef = useRef<number>(0);

  const onResendConfirmationClick = () => {
    EmailConfirmationController.resendEmailConfirmationAsync(
      emailConfirmationProps.email ?? '',
      () => {
        WindowController.addToast({
          key: `email-confirmation-sent-${Math.random()}`,
          message: t('emailConfirmation') ?? '',
          description: t('emailConfirmationDescription') ?? '',
          type: 'success',
        });
      },
      (error) => {
        WindowController.addToast({
          key: `resend-email-${Math.random()}`,
          message: error?.name,
          description: error?.message,
          type: 'error',
        });
      }
    );
  };

  useEffect(() => {
    renderCountRef.current += 1;
    EmailConfirmationController.load(renderCountRef.current);

    return () => {
      EmailConfirmationController.disposeLoad(renderCountRef.current);
    };
  }, []);

  const suspenceComponent = (
    <>
      <div />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Email Confirmation | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Email Confirmation | Cruthology'} />
        <meta
          name="description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Email Confirmation | Cruthology'} />
        <meta
          property="og:description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <EmailConfirmationDesktopComponent
          emailConfirmationProps={emailConfirmationProps}
          onResendConfirmationClick={onResendConfirmationClick}
        />
        <EmailConfirmationTabletComponent
          emailConfirmationProps={emailConfirmationProps}
          onResendConfirmationClick={onResendConfirmationClick}
        />
        <EmailConfirmationMobileComponent
          emailConfirmationProps={emailConfirmationProps}
          onResendConfirmationClick={onResendConfirmationClick}
        />
      </React.Suspense>
    </>
  );
}
