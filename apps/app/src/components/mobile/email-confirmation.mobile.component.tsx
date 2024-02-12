import styles from '../email-confirmation.module.scss';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import { EmailConfirmationResponsiveProps } from '../email-confirmation.component';
import { Button, Line } from '@fuoco.appdev/core-ui';

export default function EmailConfirmationMobileComponent({
  emailConfirmationProps,
  onResendConfirmationClick,
}: EmailConfirmationResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <img
          className={[styles['image'], styles['image-mobile']].join(' ')}
          src={'../assets/images/email-confirmation.png'}
        />
        <div
          className={[
            styles['text-container'],
            styles['text-container-mobile'],
          ].join(' ')}
        >
          <div className={[styles['title'], styles['title-mobile']].join(' ')}>
            {t('confirmYourEmail')}
          </div>
          <div
            className={[
              styles['description'],
              styles['description-mobile'],
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
    </ResponsiveMobile>
  );
}
