import { useTranslation } from 'react-i18next';
import AccountController from '../../../controllers/account.controller';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowersResponsiveProps } from '../account-public-followers.component';
import styles from '../account-public-followers.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountPublicFollowersMobileComponent({
  accountPublicProps,
  accountProps,
  onItemClick,
}: AccountPublicFollowersResponsiveProps): JSX.Element {
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
          {!accountPublicProps.hasMoreFollowers &&
            accountPublicProps.followerAccounts.length <= 0 && (
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
