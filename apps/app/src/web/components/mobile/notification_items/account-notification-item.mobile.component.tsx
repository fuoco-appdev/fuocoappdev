import { Avatar, Button } from '@fuoco.appdev/web-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import styles from '../../../modules/notification-item.module.scss';
import { AccountNotificationItemProps } from '../../notification-item.component';
import { ResponsiveMobile } from '../../responsive.component';

export default function AccountNotificationItemMobileComponent({
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
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['details'], styles['details-mobile']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
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
              styles['message-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[styles['message'], styles['message-mobile']].join(
                ' '
              )}
            >
              {notification.eventName === 'account.accepted' && (
                <span
                  className={[
                    styles['message-content'],
                    styles['message-content-mobile'],
                  ].join(' ')}
                >
                  <span className={[styles['message-bold']].join(' ')}>
                    {account?.username}
                  </span>
                  &nbsp;
                  <span>{t('accountFollowerAcceptedDescription')}</span>
                </span>
              )}
              {notification.eventName === 'account.following' && (
                <span
                  className={[
                    styles['message-content'],
                    styles['message-content-mobile'],
                  ].join(' ')}
                >
                  <span className={[styles['message-bold']].join(' ')}>
                    {account?.username}
                  </span>
                  &nbsp;
                  <span>{t('accountFollowerFollowingDescription')}</span>
                </span>
              )}
            </div>
            <div
              className={[
                styles['message-date'],
                styles['message-date-mobile'],
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
            styles['right-content-mobile'],
          ].join(' ')}
        >
          {!isFollowing && (
            <Button
              classNames={{
                button: [
                  styles['primary-button'],
                  styles['primary-button-mobile'],
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
                  styles['secondary-button-mobile'],
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
                  styles['secondary-button-mobile'],
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
    </ResponsiveMobile>
  );
}
