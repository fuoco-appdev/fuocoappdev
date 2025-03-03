import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/account-public-followers.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowersResponsiveProps } from '../account-public-followers.component';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';

function AccountPublicFollowersDesktopComponent({
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
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-desktop'],
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
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight: hasMoreFollowers || areFollowersLoading ? 24 : 0,
            }}
          />
          {!hasMoreFollowers && followerAccounts.length <= 0 && (
            <div
              className={[
                styles['no-items-container'],
                styles['no-items-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-desktop'],
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
    </ResponsiveDesktop>
  );
}

export default observer(AccountPublicFollowersDesktopComponent);
