import { Input, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import AccountPublicController from '../../controllers/account-public.controller';
import AccountController from '../../controllers/account.controller';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowersResponsiveProps } from '../account-public-followers.component';
import styles from '../account-public-followers.module.scss';
import { ResponsiveTablet } from '../responsive.component';

export default function AccountPublicFollowersTabletComponent({
  accountPublicProps,
  accountProps,
  onItemClick,
}: AccountPublicFollowersResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['search-input-root'],
              styles['search-input-root-tablet'],
            ].join(' ')}
          >
            <Input
              value={accountPublicProps.followersInput}
              classNames={{
                container: [
                  styles['search-input-container'],
                  styles['search-input-container-tablet'],
                ].join(' '),
                input: [
                  styles['search-input'],
                  styles['search-input-tablet'],
                ].join(' '),
              }}
              placeholder={t('search') ?? ''}
              icon={<Line.Search size={24} color={'#2A2A5F'} />}
              onChange={(event) =>
                AccountPublicController.updateFollowersInput(event.target.value)
              }
            />
          </div>
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-tablet'],
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
                  styles['no-items-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-tablet'],
                  ].join(' ')}
                >
                  {t('noFollowersFound', {
                    username: accountPublicProps.followersInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}
