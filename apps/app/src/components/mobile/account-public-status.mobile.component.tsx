import { Tabs } from '@fuoco.appdev/core-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AccountPublicController from '../../controllers/account-public.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountFollowersFollowingResponsiveProps } from '../account-public-status.component';
import styles from '../account-public-status.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountPublicStatusMobileComponent({
  accountPublicProps,
  followerCount,
  followingCount,
  onScroll,
  onLoad,
}: AccountFollowersFollowingResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
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
                styles['tabs-container-mobile'],
              ].join(' ')}
            >
              <Tabs
                flex={true}
                touchScreen={true}
                activeId={accountPublicProps.activeStatusTabId}
                classNames={{
                  nav: [styles['tab-nav'], styles['tab-nav-mobile']].join(' '),
                  tabButton: [
                    styles['tab-button'],
                    styles['tab-button-mobile'],
                  ].join(''),
                  tabOutline: [
                    styles['tab-outline'],
                    styles['tab-outline-mobile'],
                  ].join(' '),
                }}
                onChange={(id) => {
                  AccountPublicController.updateActiveStatusTabId(id);
                  if (id === RoutePathsType.AccountStatusWithIdFollowers) {
                    navigate({
                      pathname: `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/followers`,
                      search: query.toString(),
                    });
                  } else if (
                    id === RoutePathsType.AccountStatusWithIdFollowing
                  ) {
                    navigate({
                      pathname: `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/following`,
                      search: query.toString(),
                    });
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
                styles['tabs-container-skeleton-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-mobile'],
                ].join('')}
              >
                <Skeleton style={{ height: 48 }} borderRadius={6} />
              </div>
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-mobile'],
                ].join('')}
              >
                <Skeleton style={{ height: 48 }} borderRadius={6} />
              </div>
            </div>
          )}
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-mobile'],
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
    </ResponsiveMobile>
  );
}
