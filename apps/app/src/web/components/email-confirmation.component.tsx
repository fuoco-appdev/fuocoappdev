import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import EmailConfirmationController from '../../controllers/email-confirmation.controller';
import WindowController from '../../controllers/window.controller';
import { EmailConfirmationState } from '../../models/email-confirmation.model';

const EmailConfirmationDesktopComponent = React.lazy(
  () => import('./desktop/email-confirmation.desktop.component')
);
const EmailConfirmationMobileComponent = React.lazy(
  () => import('./mobile/email-confirmation.mobile.component')
);

export interface EmailConfirmationProps {}

export interface EmailConfirmationResponsiveProps {
  emailConfirmationProps: EmailConfirmationState;
  onResendConfirmationClick: () => void;
}

export default function EmailConfirmationComponent(): JSX.Element {
  const { t } = useTranslation();
  const [emailConfirmationProps] = useObservable(
    EmailConfirmationController.model.store
  );
  const [emailConfirmationDebugProps] = useObservable(
    EmailConfirmationController.model.debugStore
  );
  const renderCountRef = React.useRef<number>(0);

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

  React.useEffect(() => {
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

  if (emailConfirmationDebugProps.suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Email Confirmation | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Email Confirmation | fuoco.appdev'} />
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
        <meta
          property="og:title"
          content={'Email Confirmation | fuoco.appdev'}
        />
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
        <EmailConfirmationMobileComponent
          emailConfirmationProps={emailConfirmationProps}
          onResendConfirmationClick={onResendConfirmationClick}
        />
      </React.Suspense>
    </>
  );
}
