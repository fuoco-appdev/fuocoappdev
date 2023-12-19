import styles from '../account-follow-item.module.scss';
import { Avatar, Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { AddressItemProps } from '../address-item.component';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop } from '../responsive.component';
import { AccountFollowItemResponsiveProps } from '../account-follow-item.component';
import { useState } from 'react';
import Ripples from 'react-ripples';

export default function AccountFollowItemDesktopComponent({
  account,
  follower,
  customer,
  isFollowing,
  isAccepted,
  profileUrl,
  onClick,
  onFollow,
  onUnfollow,
  onRequested,
}: AccountFollowItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

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
            text={account.username}
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
              {account.username}
            </div>
            {customer && (
              <div
                className={[
                  styles['full-name'],
                  styles['full-name-desktop'],
                ].join(' ')}
              >
                {`${customer?.firstName} ${customer?.lastName}`}
              </div>
            )}
          </div>
        </div>
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
              button: [styles['button'], styles['button-desktop']].join(' '),
            }}
            rippleProps={{
              color: 'rgba(42, 42, 95, .35)',
            }}
            size={'medium'}
            type={'primary'}
            onClick={onUnfollow}
          >
            {t('following')}
          </Button>
        )}
      </div>
    </ResponsiveDesktop>
  );
}
