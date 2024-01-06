import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import AccountPublicController from '../../controllers/account-public.controller';
import styles from '../account-public-following.module.scss';
import { Alert, Button, Input, Line, Modal, Tabs } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import WindowController from '../../controllers/window.controller';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
  useDesktopEffect,
} from '../responsive.component';
import AccountAddFriendsComponent, {
  AccountAddFriendsResponsiveProps,
} from '../account-add-friends.component';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountPublicFollowingResponsiveProps } from '../account-public-following.component';

export default function AccountPublicFollowingTabletComponent({
  accountPublicProps,
  onItemClick,
}: AccountPublicFollowingResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

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
              value={accountPublicProps.followingInput}
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
                AccountPublicController.updateFollowingInput(event.target.value)
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
              display:
                accountPublicProps.hasMoreFollowing ||
                accountPublicProps.areFollowingLoading
                  ? 'flex'
                  : 'none',
            }}
          />
          {!accountPublicProps.hasMoreFollowing &&
            accountPublicProps.followingAccounts.length <= 0 && (
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
                  {t('noFollowingFound', {
                    username: accountPublicProps.followingInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}
