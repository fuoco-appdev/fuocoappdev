import { Avatar, Button } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import Ripples from 'react-ripples';
import styles from '../../modules/account-follow-item.module.scss';
import { AccountMessageItemResponsiveProps } from '../account-message-item.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountMessageItemMobileComponent({
  account,
  profileUrl,
  onClick,
  onMessage,
}: AccountMessageItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <ResponsiveMobile>
      <Ripples
        className={[styles['ripples'], styles['ripples-mobile']].join(' ')}
        color={'rgba(42, 42, 95, .35)'}
        onClick={onClick}
      >
        <div className={[styles['root'], styles['root-mobile']].join(' ')}>
          <div
            className={[
              styles['left-content'],
              styles['left-content-mobile'],
            ].join(' ')}
          >
            <Avatar
              classNames={{
                container: [
                  styles['avatar-container'],
                  styles['avatar-container-mobile'],
                ].join(' '),
              }}
              size={'custom'}
              text={account.customer?.first_name ?? ''}
              src={profileUrl}
            />
            <div
              className={[
                styles['user-info-container'],
                styles['user-info-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['username'], styles['username-mobile']].join(
                  ' '
                )}
              >
                {account.username && account.username}
                {!account.username && (
                  <Skeleton
                    count={1}
                    borderRadius={20}
                    height={20}
                    width={80}
                    className={[
                      styles['skeleton-user'],
                      styles['skeleton-user-mobile'],
                    ].join(' ')}
                  />
                )}
              </div>
              {account.customer && (
                <div
                  className={[
                    styles['full-name'],
                    styles['full-name-mobile'],
                  ].join(' ')}
                >
                  {`${account.customer?.first_name} ${account.customer?.last_name}`}
                </div>
              )}
              {!account.customer && (
                <Skeleton
                  count={1}
                  borderRadius={16}
                  height={16}
                  width={120}
                  className={[
                    styles['full-name'],
                    styles['full-name-mobile'],
                  ].join(' ')}
                />
              )}
            </div>
          </div>
          <Button
            classNames={{
              button: [
                styles['secondary-button'],
                styles['secondary-button-mobile'],
              ].join(' '),
            }}
            rippleProps={{
              color: 'rgba(42, 42, 95, .35)',
            }}
            size={'small'}
            type={'secondary'}
            onClick={onMessage}
          >
            {t('message')}
          </Button>
        </div>
      </Ripples>
    </ResponsiveMobile>
  );
}

export default observer(AccountMessageItemMobileComponent);
