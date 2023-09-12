import styles from '../checkout.module.scss';
import { Button, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { StripePayButtonResponsiveProps } from '../stripe-pay-button.component';

export function StripePayButtonMobileComponent({
  onPayAsync,
}: StripePayButtonResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className={[
        styles['pay-button-container'],
        styles['pay-button-container-mobile'],
      ].join(' ')}
    >
      <Button
        classNames={{
          button: styles['pay-button'],
        }}
        rippleProps={{
          color: 'rgba(233, 33, 66, .35)',
        }}
        touchScreen={true}
        block={true}
        size={'large'}
        icon={<Line.Lock size={24} />}
        onClick={onPayAsync}
      >
        {t('pay')}
      </Button>
    </div>
  );
}