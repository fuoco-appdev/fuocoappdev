import { useTranslation } from 'react-i18next';
import AccountController from '../../../controllers/account.controller';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowingResponsiveProps } from '../account-public-following.component';
import styles from '../account-public-following.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountPublicFollowingMobileComponent({
  accountPublicProps,
  accountProps,
  onItemClick,
}: AccountPublicFollowingResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {accountPublicProps.followingAccounts.map((value) => {
            const accountFollower = Object.keys(
              accountPublicProps.followingAccountFollowers
            ).includes(value.id ?? '')
              ? accountPublicProps.followingAccountFollowers[value.id ?? '']
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                account={value}
                accountProps={accountProps}
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
          {!accountPublicProps.hasMoreFollowing &&
            accountPublicProps.followingAccounts.length <= 0 && (
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
                    username: accountPublicProps.followersFollowingInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
