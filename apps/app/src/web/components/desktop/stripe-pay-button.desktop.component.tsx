import { Button, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import styles from '../checkout.module.scss';
import { ResponsiveDesktop } from '../responsive.component';
import { StripePayButtonResponsiveProps } from '../stripe-pay-button.component';

export default function StripePayButtonDesktopComponent({
  onPayAsync,
}: StripePayButtonResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div
        className={[
          styles['pay-button-container'],
          styles['pay-button-container-desktop'],
        ].join(' ')}
      >
        <Button
          classNames={{
            button: styles['pay-button'],
          }}
          rippleProps={{
            color: 'rgba(233, 33, 66, .35)',
          }}
          block={true}
          size={'large'}
          icon={<Line.Lock size={24} />}
          onClick={onPayAsync}
        >
          {t('pay')}
        </Button>
      </div>
    </ResponsiveDesktop>
  );
}
