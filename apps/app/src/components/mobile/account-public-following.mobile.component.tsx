import { Input, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import AccountPublicController from '../../controllers/account-public.controller';
import AccountController from '../../controllers/account.controller';
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
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['search-input-root'],
              styles['search-input-root-mobile'],
            ].join(' ')}
          >
            <Input
              value={accountPublicProps.followingInput}
              classNames={{
                container: [
                  styles['search-input-container'],
                  styles['search-input-container-mobile'],
                ].join(' '),
                input: [
                  styles['search-input'],
                  styles['search-input-mobile'],
                ].join(' '),
              }}
              placeholder={t('search') ?? ''}
              icon={<Line.Search size={24} color={'#2A2A5F'} />}
              onChange={(event) =>
                AccountPublicController.updateFollowingInput(event.target.value)
              }
            />
          </div>
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {accountPublicProps.followingAccounts.map((value) => {
            const accountFollower = Object.keys(
              accountPublicProps.followingAccountFollowers
            ).includes(value.id)
              ? accountPublicProps.followingAccountFollowers[value.id]
              : null;
            const customer = Object.keys(
              accountPublicProps.followingCustomers
            ).includes(value.customerId)
              ? accountPublicProps.followingCustomers[value.customerId]
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                account={value}
                accountProps={accountProps}
                follower={accountFollower}
                customer={customer}
                isRequest={false}
                onClick={() => onItemClick(value.id)}
                onFollow={() => AccountController.requestFollowAsync(value.id)}
                onRequested={() =>
                  AccountController.requestUnfollowAsync(value.id)
                }
                onUnfollow={() =>
                  AccountController.requestUnfollowAsync(value.id)
                }
              />
            );
          })}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight:
                accountPublicProps.hasMoreFollowing ||
                accountPublicProps.areFollowingLoading
                  ? 24
                  : 0,
            }}
          />
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
                    username: accountPublicProps.followingInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
