import { Button, Line } from '@fuoco.appdev/web-components';
import { useTranslation } from 'react-i18next';
import { EmailConfirmationResponsiveProps } from '../email-confirmation.component';
import styles from '../email-confirmation.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function EmailConfirmationDesktopComponent({
  onResendConfirmationClick,
}: EmailConfirmationResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <img
          className={[styles['image'], styles['image-desktop']].join(' ')}
          src={'../assets/images/email-confirmation.png'}
        />
        <div
          className={[
            styles['text-container'],
            styles['text-container-desktop'],
          ].join(' ')}
        >
          <div className={[styles['title'], styles['title-desktop']].join(' ')}>
            {t('confirmYourEmail')}
          </div>
          <div
            className={[
              styles['description'],
              styles['description-desktop'],
            ].join(' ')}
          >
            {t('confirmYourEmailDescription')}
          </div>
        </div>
        <Button
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
    </ResponsiveDesktop>
  );
}
