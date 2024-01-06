import styles from '../account-follow-item.module.scss';
import { Avatar, Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { AddressItemProps } from '../address-item.component';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';
import { AccountFollowItemResponsiveProps } from '../account-follow-item.component';
import AccountController from '../../controllers/account.controller';

export default function AccountFollowItemTabletComponent({
  accountProps,
  account,
  follower,
  customer,
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
  const { t, i18n } = useTranslation();
  return (
    <ResponsiveTablet>
      <div
        className={[styles['root'], styles['root-tablet']].join(' ')}
        onClick={onClick}
      >
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <Avatar
            classNames={{
              container: [
                styles['avatar-container'],
                styles['avatar-container-tablet'],
              ].join(' '),
            }}
            size={'custom'}
            text={customer?.firstName}
            src={profileUrl}
          />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-tablet']].join(
                ' '
              )}
            >
              {account.username}
            </div>
            {customer && (
              <div
                className={[
                  styles['full-name'],
                  styles['full-name-tablet'],
                ].join(' ')}
              >
                {`${customer?.firstName} ${customer?.lastName}`}
              </div>
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
                    styles['primary-button-tablet'],
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
                    styles['secondary-button-tablet'],
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
                    styles['secondary-button-tablet'],
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
              styles['request-button-container-tablet'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: [
                  styles['primary-button'],
                  styles['primary-button-tablet'],
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
                  styles['secondary-button-tablet'],
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
    </ResponsiveTablet>
  );
}
