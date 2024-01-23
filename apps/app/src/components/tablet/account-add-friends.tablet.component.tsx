import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-add-friends.module.scss';
import { Alert, Button, Input, Line, Modal, Tabs } from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import WindowController from '../../controllers/window.controller';
import { ResponsiveTablet } from '../responsive.component';
import { AccountAddFriendsResponsiveProps } from '../account-add-friends.component';
import AccountFollowItemComponent from '../account-follow-item.component';

export default function AccountAddFriendsTabletComponent({
  accountProps,
  onAddFriendsLoad,
  onAddFriendsScroll,
}: AccountAddFriendsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveTablet>
      <div
        className={[styles['root'], styles['root-tablet']].join(' ')}
        style={{ height: window.innerHeight }}
        onScroll={onAddFriendsScroll}
        onLoad={onAddFriendsLoad}
      >
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
              value={accountProps.addFriendsInput}
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
                styles['follower-request-items-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-tablet']].join(' ')}
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

        <div className={[styles['title'], styles['title-tablet']].join(' ')}>
          {t('results')}
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-tablet'],
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
              display:
                accountProps.hasMoreAddFriends ||
                accountProps.areAddFriendsLoading
                  ? 'flex'
                  : 'none',
            }}
          />
          {!accountProps.hasMoreAddFriends &&
            accountProps.addFriendAccounts.length <= 0 && (
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
                  {t('noFriendsFound', {
                    username: accountProps.addFriendsInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}
