import { Avatar, Button } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import styles from '../../modules/account-message-item.module.scss';
import { AccountMessageItemResponsiveProps } from '../account-message-item.component';
import { ResponsiveDesktop } from '../responsive.component';

function AccountMessageItemDesktopComponent({
  account,
  profileUrl,
  onClick,
  onMessage,
}: AccountMessageItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <ResponsiveDesktop>
      <div
        className={[styles['root'], styles['root-desktop']].join(' ')}
        onClick={onClick}
      >
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <Avatar
            classNames={{
              container: [
                styles['avatar-container'],
                styles['avatar-container-desktop'],
              ].join(' '),
            }}
            size={'custom'}
            text={account.customer?.first_name ?? ''}
            src={profileUrl}
          />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-desktop']].join(
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
                    styles['skeleton-user-desktop'],
                  ].join(' ')}
                />
              )}
            </div>
            {account.customer && (
              <div
                className={[
                  styles['full-name'],
                  styles['full-name-desktop'],
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
                  styles['full-name-desktop'],
                ].join(' ')}
              />
            )}
          </div>
        </div>
        <Button
          classNames={{
            button: [
              styles['secondary-button'],
              styles['secondary-button-desktop'],
            ].join(' '),
          }}
          rippleProps={{
            color: 'rgba(42, 42, 95, .35)',
          }}
          size={'medium'}
          type={'secondary'}
          onClick={onMessage}
        >
          {t('message')}
        </Button>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(AccountMessageItemDesktopComponent);
