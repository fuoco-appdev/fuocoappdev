import { Avatar, Button } from '@fuoco.appdev/web-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import styles from '../../../modules/notification-item.module.scss';
import { AccountNotificationItemProps } from '../../notification-item.component';
import { ResponsiveDesktop } from '../../responsive.component';

export default function AccountNotificationItemDesktopComponent({
  notification,
  fromNow,
  account,
  publicProfileUrl,
  isFollowing,
  isAccepted,
  onFollow,
  onRequested,
  onUnfollow,
}: AccountNotificationItemProps): JSX.Element {
  const { t, i18n } = useTranslation();
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['details'], styles['details-desktop']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-desktop']].join(
              ' '
            )}
          >
            <Avatar
              classNames={{
                container: styles['avatar-icon'],
              }}
              text={account?.username}
              src={publicProfileUrl}
              size={'custom'}
            />
          </div>
          <div
            className={[
              styles['message-container'],
              styles['message-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['message'], styles['message-desktop']].join(
                ' '
              )}
            >
              {notification.eventName === 'account.accepted' && (
                <span
                  className={[
                    styles['message-content'],
                    styles['message-content-desktop'],
                  ].join(' ')}
                >
                  <span className={[styles['message-bold']].join(' ')}>
                    {account?.username}
                  </span>
                  &nbsp;
                  {t('accountFollowerAcceptedDescription')}
                </span>
              )}
              {notification.eventName === 'account.following' && (
                <span
                  className={[
                    styles['message-content'],
                    styles['message-content-desktop'],
                  ].join(' ')}
                >
                  <span className={[styles['message-bold']].join(' ')}>
                    {account?.username}
                  </span>
                  &nbsp;
                  {t('accountFollowerFollowingDescription')}
                </span>
              )}
            </div>
            <div
              className={[
                styles['message-date'],
                styles['message-date-desktop'],
              ].join(' ')}
            >
              {moment(notification.createdAt)
                .locale(i18n.language)
                .subtract(6, 'days')
                .calendar()}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          {!isFollowing && (
            <Button
              classNames={{
                button: [
                  styles['primary-button'],
                  styles['primary-button-desktop'],
                ].join(' '),
              }}
              rippleProps={{
                color: 'rgba(42, 42, 95, .35)',
              }}
              size={'medium'}
              type={'primary'}
              onClick={onFollow}
            >
              {t('follow')}
            </Button>
          )}
          {isFollowing && !isAccepted && (
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
              onClick={onRequested}
            >
              {t('requested')}
            </Button>
          )}
          {isFollowing && isAccepted && (
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
              onClick={onUnfollow}
            >
              {t('following')}
            </Button>
          )}
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
