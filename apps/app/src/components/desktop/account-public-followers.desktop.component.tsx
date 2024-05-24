import { useTranslation } from 'react-i18next';
import AccountController from '../../controllers/account.controller';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowersResponsiveProps } from '../account-public-followers.component';
import styles from '../account-public-followers.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountPublicFollowersDesktopComponent({
  accountPublicProps,
  accountProps,
  onItemClick,
}: AccountPublicFollowersResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-desktop'],
          ].join(' ')}
        >
          {accountPublicProps.followerAccounts.map((value) => {
            const accountFollower = Object.keys(
              accountPublicProps.followerAccountFollowers
            ).includes(value.id ?? '')
              ? accountPublicProps.followerAccountFollowers[value.id ?? '']
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                accountProps={accountProps}
                account={value}
                follower={accountFollower}
                isRequest={false}
                onClick={() => onItemClick(value.id ?? '')}
                onFollow={() => AccountController.requestFollowAsync(value.id ?? '')}
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
              maxHeight:
                accountPublicProps.hasMoreFollowers ||
                  accountPublicProps.areFollowersLoading
                  ? 24
                  : 0,
            }}
          />
          {!accountPublicProps.hasMoreFollowers &&
            accountPublicProps.followerAccounts.length <= 0 && (
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
                    username: accountPublicProps.followersFollowingInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
