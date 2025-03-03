import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DIContext } from './app.component';

const EmailConfirmationDesktopComponent = React.lazy(
  () => import('./desktop/email-confirmation.desktop.component')
);
const EmailConfirmationMobileComponent = React.lazy(
  () => import('./mobile/email-confirmation.mobile.component')
);

export interface EmailConfirmationProps {}

export interface EmailConfirmationResponsiveProps {
  onResendConfirmationClick: () => void;
}

function EmailConfirmationComponent(): JSX.Element {
  const { t } = useTranslation();
  const { EmailConfirmationController } = React.useContext(DIContext);
  const { email, suspense } = EmailConfirmationController.model;
  const renderCountRef = React.useRef<number>(0);

  const onResendConfirmationClick = () => {
    EmailConfirmationController.resendEmailConfirmationAsync(
      email ?? '',
      () => {
        // WindowController.addToast({
        //   key: `email-confirmation-sent-${Math.random()}`,
        //   message: t('emailConfirmation') ?? '',
        //   description: t('emailConfirmationDescription') ?? '',
        //   type: 'success',
        // });
      },
      (error) => {
        // WindowController.addToast({
        //   key: `resend-email-${Math.random()}`,
        //   message: error?.name,
        //   description: error?.message,
        //   type: 'error',
        // });
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

  if (suspense) {
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
          onResendConfirmationClick={onResendConfirmationClick}
        />
        <EmailConfirmationMobileComponent
          onResendConfirmationClick={onResendConfirmationClick}
        />
      </React.Suspense>
    </>
  );
}

export default observer(EmailConfirmationComponent);
