import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/account-public-followers.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowersResponsiveProps } from '../account-public-followers.component';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountPublicFollowersMobileComponent({
  onItemClick,
}: AccountPublicFollowersResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { AccountPublicController, AccountController } =
    React.useContext(DIContext);
  const {
    account,
    customerMetadata,
    profileUrl,
    showFollowButton,
    activeTabId,
    activeTabIndex,
    prevTabIndex,
    followerAccounts,
    followerAccountFollowers,
    hasMoreFollowers,
    areFollowersLoading,
    followersFollowingInput,
  } = AccountPublicController.model;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {followerAccounts.map((value) => {
            const accountFollower = Object.keys(
              followerAccountFollowers
            ).includes(value.id ?? '')
              ? followerAccountFollowers[value.id ?? '']
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                account={value}
                follower={accountFollower}
                isRequest={false}
                onClick={() => onItemClick(value.id ?? '')}
                onFollow={() =>
                  AccountController.requestFollowAsync(value.id ?? '')
                }
                onRequested={() =>
                  AccountController.requestUnfollowAsync(value.id ?? '')
                }
                onUnfollow={() =>
                  AccountController.requestUnfollowAsync(value.id ?? '')
                }
              />
            );
          })}
          {!hasMoreFollowers && followerAccounts.length <= 0 && (
            <div
              className={[
                styles['no-items-container'],
                styles['no-items-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-mobile'],
                ].join(' ')}
              >
                {t('noFollowersFound', {
                  username: followersFollowingInput,
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
