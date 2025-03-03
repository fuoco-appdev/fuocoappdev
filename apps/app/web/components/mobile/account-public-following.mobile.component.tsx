import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/account-public-following.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowingResponsiveProps } from '../account-public-following.component';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountPublicFollowingMobileComponent({
  onItemClick,
}: AccountPublicFollowingResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { AccountPublicController, AccountController } =
    React.useContext(DIContext);
  const {
    followingAccounts,
    followingAccountFollowers,
    hasMoreFollowing,
    areFollowingLoading,
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
          {followingAccounts.map((value) => {
            const accountFollower = Object.keys(
              followingAccountFollowers
            ).includes(value.id ?? '')
              ? followingAccountFollowers[value.id ?? '']
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
          {!hasMoreFollowing && followingAccounts.length <= 0 && (
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
                {t('noFollowingFound', {
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

export default observer(AccountPublicFollowingMobileComponent);
