import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import AccountPublicController from '../../controllers/account-public.controller';
import styles from '../account-public-status.module.scss';
import { Alert, Button, Input, Line, Modal, Tabs } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import WindowController from '../../controllers/window.controller';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';
import AccountAddFriendsComponent, {
  AccountAddFriendsResponsiveProps,
} from '../account-add-friends.component';
import AccountFollowItemComponent from '../account-follow-item.component';
import { AccountFollowersFollowingResponsiveProps } from '../account-public-status.component';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Skeleton from 'react-loading-skeleton';

export default function AccountPublicStatusDesktopComponent({
  accountPublicProps,
  followerCount,
  followingCount,
  onScroll,
  onLoad,
}: AccountFollowersFollowingResponsiveProps): JSX.Element {
  const scrollContainerRef = createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          onScroll={onScroll}
          onLoad={onLoad}
          ref={scrollContainerRef}
        >
          {followerCount && followingCount && (
            <div
              className={[
                styles['tabs-container'],
                styles['tabs-container-desktop'],
              ].join(' ')}
            >
              <Tabs
                flex={true}
                activeId={accountPublicProps.activeStatusTabId}
                classNames={{
                  nav: [styles['tab-nav'], styles['tab-nav-desktop']].join(' '),
                  tabButton: [
                    styles['tab-button'],
                    styles['tab-button-desktop'],
                  ].join(''),
                  tabOutline: [
                    styles['tab-outline'],
                    styles['tab-outline-desktop'],
                  ].join(' '),
                }}
                onChange={(id) => {
                  AccountPublicController.updateActiveStatusTabId(id);
                  if (id === RoutePathsType.AccountStatusWithIdFollowers) {
                    navigate(
                      `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/followers`
                    );
                  } else if (
                    id === RoutePathsType.AccountStatusWithIdFollowing
                  ) {
                    navigate(
                      `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/following`
                    );
                  }
                }}
                type={'underlined'}
                tabs={[
                  {
                    id: RoutePathsType.AccountStatusWithIdFollowers,
                    label: `${followerCount} ${t('followers')}`,
                  },
                  {
                    id: RoutePathsType.AccountStatusWithIdFollowing,
                    label: `${followingCount} ${t('following')}`,
                  },
                ]}
              />
            </div>
          )}
          {(!followerCount || !followingCount) && (
            <div
              className={[
                styles['tabs-container-skeleton'],
                styles['tabs-container-skeleton-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-desktop'],
                ].join('')}
              >
                <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
              </div>
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-desktop'],
                ].join('')}
              >
                <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
              </div>
            </div>
          )}
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-desktop'],
            ].join(' ')}
          >
            <TransitionGroup
              component={null}
              childFactory={(child) =>
                React.cloneElement(child, {
                  classNames: {
                    enter:
                      accountPublicProps.activeTabIndex >
                      accountPublicProps.prevTabIndex
                        ? styles['left-to-right-enter']
                        : styles['right-to-left-enter'],
                    enterActive:
                      accountPublicProps.activeTabIndex >
                      accountPublicProps.prevTabIndex
                        ? styles['left-to-right-enter-active']
                        : styles['right-to-left-enter-active'],
                    exit:
                      accountPublicProps.activeTabIndex >
                      accountPublicProps.prevTabIndex
                        ? styles['left-to-right-exit']
                        : styles['right-to-left-exit'],
                    exitActive:
                      accountPublicProps.activeTabIndex >
                      accountPublicProps.prevTabIndex
                        ? styles['left-to-right-exit-active']
                        : styles['right-to-left-exit-active'],
                  },
                  timeout: 250,
                })
              }
            >
              <CSSTransition
                key={accountPublicProps.activeTabIndex}
                classNames={{
                  enter:
                    accountPublicProps.activeTabIndex <
                    accountPublicProps.prevTabIndex
                      ? styles['left-to-right-enter']
                      : styles['right-to-left-enter'],
                  enterActive:
                    accountPublicProps.activeTabIndex <
                    accountPublicProps.prevTabIndex
                      ? styles['left-to-right-enter-active']
                      : styles['right-to-left-enter-active'],
                  exit:
                    accountPublicProps.activeTabIndex <
                    accountPublicProps.prevTabIndex
                      ? styles['left-to-right-exit']
                      : styles['right-to-left-exit'],
                  exitActive:
                    accountPublicProps.activeTabIndex <
                    accountPublicProps.prevTabIndex
                      ? styles['left-to-right-exit-active']
                      : styles['right-to-left-exit-active'],
                }}
                timeout={250}
                unmountOnExit={false}
              >
                <div style={{ minWidth: '100%', minHeight: '100%' }}>
                  <Outlet context={{ scrollContainerRef }} />
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
