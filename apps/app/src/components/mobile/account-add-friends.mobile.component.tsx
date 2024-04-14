import { Input, Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountAddFriendsResponsiveProps } from '../account-add-friends.component';
import styles from '../account-add-friends.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountAddFriendsMobileComponent({
  accountProps,
  onAddFriendsLoad,
  onAddFriendsScroll,
}: AccountAddFriendsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div
        className={[styles['root'], styles['root-mobile']].join(' ')}
        style={{ height: window.innerHeight }}
        onScroll={onAddFriendsScroll}
        onLoad={onAddFriendsLoad}
      >
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
              value={accountProps.addFriendsInput}
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
                AccountController.updateAddFriendsInput(event.target.value)
              }
            />
          </div>
        </div>
        {accountProps.followRequestAccounts.length > 0 &&
          accountProps.addFriendsInput.length <= 0 && (
            <div
              className={[
                styles['follower-request-items-container'],
                styles['follower-request-items-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                {t('followerRequests')}
              </div>
              {accountProps.followRequestAccounts.map((value) => {
                const accountFollowerRequest = Object.keys(
                  accountProps.followRequestAccountFollowers
                ).includes(value.id)
                  ? accountProps.followRequestAccountFollowers[value.id]
                  : null;
                const customerRequest = Object.keys(
                  accountProps.followRequestCustomers
                ).includes(value.customerId)
                  ? accountProps.followRequestCustomers[value.customerId]
                  : null;
                return (
                  <AccountFollowItemComponent
                    key={value.id}
                    accountProps={accountProps}
                    account={value}
                    follower={accountFollowerRequest}
                    customer={customerRequest}
                    isRequest={true}
                    onClick={() =>
                      navigate({
                        pathname: `${RoutePathsType.Account}/${value.id}/likes`,
                        search: query.toString(),
                      })
                    }
                    onConfirm={() =>
                      AccountController.confirmFollowRequestAsync(
                        accountFollowerRequest?.accountId ?? '',
                        accountFollowerRequest?.followerId ?? ''
                      )
                    }
                    onRemove={() =>
                      AccountController.removeFollowRequestAsync(
                        accountFollowerRequest?.accountId ?? '',
                        accountFollowerRequest?.followerId ?? ''
                      )
                    }
                  />
                );
              })}
            </div>
          )}

        <div className={[styles['title'], styles['title-mobile']].join(' ')}>
          {t('results')}
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {accountProps.addFriendAccounts.map((value) => {
            const accountFollower = Object.keys(
              accountProps.addFriendAccountFollowers
            ).includes(value.id)
              ? accountProps.addFriendAccountFollowers[value.id]
              : null;
            const customer = Object.keys(
              accountProps.addFriendCustomers
            ).includes(value.customerId)
              ? accountProps.addFriendCustomers[value.customerId]
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                accountProps={accountProps}
                account={value}
                follower={accountFollower}
                customer={customer}
                isRequest={false}
                onClick={() =>
                  navigate({
                    pathname: `${RoutePathsType.Account}/${value.id}/likes`,
                    search: query.toString(),
                  })
                }
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
                accountProps.hasMoreAddFriends ||
                accountProps.areAddFriendsLoading
                  ? 24
                  : 0,
            }}
          />
          {!accountProps.hasMoreAddFriends &&
            accountProps.addFriendAccounts.length <= 0 && (
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
                  {t('noFriendsFound', {
                    username: accountProps.addFriendsInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
