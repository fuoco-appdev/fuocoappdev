import styles from '../email-confirmation.module.scss';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from '../responsive.component';
import { EmailConfirmationResponsiveProps } from '../email-confirmation.component';
import { Button, Line } from '@fuoco.appdev/core-ui';

export default function EmailConfirmationTabletComponent({
  emailConfirmationProps,
  onResendConfirmationClick,
}: EmailConfirmationResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <img
          className={[styles['image'], styles['image-tablet']].join(' ')}
          src={'../assets/images/email-confirmation.png'}
        />
        <div
          className={[
            styles['text-container'],
            styles['text-container-tablet'],
          ].join(' ')}
        >
          <div className={[styles['title'], styles['title-tablet']].join(' ')}>
            {t('confirmYourEmail')}
          </div>
          <div
            className={[
              styles['description'],
              styles['description-tablet'],
            ].join(' ')}
          >
            {t('confirmYourEmailDescription')}
          </div>
        </div>
        <Button
          touchScreen={true}
          block={true}
          size={'large'}
          icon={<Line.Send size={24} />}
          classNames={{
            container: styles['button-container'],
            button: styles['button'],
          }}
          rippleProps={{
            color: 'rgba(133, 38, 122, .35)',
          }}
          onClick={onResendConfirmationClick}
        >
          {t('resendConfirmation')}
        </Button>
      </div>
    </ResponsiveTablet>
  );
}
