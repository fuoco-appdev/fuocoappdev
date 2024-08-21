import { Avatar, Button } from '@fuoco.appdev/web-components';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { AccountFollowItemResponsiveProps } from '../account-follow-item.component';
import styles from '../account-follow-item.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountFollowItemDesktopComponent({
  accountProps,
  account,
  isRequest,
  isFollowing,
  isAccepted,
  profileUrl,
  onClick,
  onFollow,
  onUnfollow,
  onRequested,
  onConfirm,
  onRemove,
}: AccountFollowItemResponsiveProps): JSX.Element {
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
            text={account.customer?.first_name}
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
        {accountProps.account?.id !== account.id && !isRequest && (
          <>
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
          </>
        )}
        {accountProps.account?.id !== account.id && isRequest && (
          <div
            className={[
              styles['request-button-container'],
              styles['request-button-container-desktop'],
            ].join(' ')}
          >
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
              onClick={onConfirm}
            >
              {t('confirm')}
            </Button>
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
              onClick={onRemove}
            >
              {t('remove')}
            </Button>
          </div>
        )}
      </div>
    </ResponsiveDesktop>
  );
}
