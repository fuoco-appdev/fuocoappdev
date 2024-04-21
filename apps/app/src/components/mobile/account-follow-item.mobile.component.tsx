import { Avatar, Button } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import Ripples from 'react-ripples';
import { AccountFollowItemResponsiveProps } from '../account-follow-item.component';
import styles from '../account-follow-item.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountFollowItemMobileComponent({
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
    <ResponsiveMobile>
      <Ripples color={'rgba(42, 42, 95, .35)'} onClick={onClick}>
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
              text={account.customer?.first_name}
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
          {accountProps.account?.id !== account.id && !isRequest && (
            <>
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
                  size={'small'}
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
                  size={'small'}
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
                  size={'small'}
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
                styles['request-button-container-mobile'],
              ].join(' ')}
            >
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
                size={'tiny'}
                type={'primary'}
                onClick={onConfirm}
              >
                {t('confirm')}
              </Button>
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
                size={'tiny'}
                type={'secondary'}
                onClick={onRemove}
              >
                {t('remove')}
              </Button>
            </div>
          )}
        </div>
      </Ripples>
    </ResponsiveMobile>
  );
}
