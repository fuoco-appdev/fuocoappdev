import { Tabs } from '@fuoco.appdev/core-ui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AccountPublicController from '../../controllers/account-public.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountFollowersFollowingResponsiveProps } from '../account-public-status.component';
import styles from '../account-public-status.module.scss';
import { ResponsiveTablet } from '../responsive.component';
;

export default function AccountPublicStatusTabletComponent({
  accountPublicProps,
  followerCount,
  followingCount,
  onScrollLoad,
  onScrollReload,
}: AccountFollowersFollowingResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          ref={scrollContainerRef}
        >
          {followerCount && followingCount && (
            <div
              className={[
                styles['tabs-container'],
                styles['tabs-container-tablet'],
              ].join(' ')}
            >
              <Tabs
                touchScreen={true}
                flex={true}
                activeId={accountPublicProps.activeStatusTabId}
                classNames={{
                  nav: [styles['tab-nav'], styles['tab-nav-tablet']].join(' '),
                  tabButton: [
                    styles['tab-button'],
                    styles['tab-button-tablet'],
                  ].join(''),
                  tabOutline: [
                    styles['tab-outline'],
                    styles['tab-outline-tablet'],
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
                styles['tabs-container-skeleton-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-tablet'],
                ].join('')}
              >
                <Skeleton style={{ height: 48 }} borderRadius={6} />
              </div>
              <div
                className={[
                  styles['tab-button-skeleton'],
                  styles['tab-button-skeleton-tablet'],
                ].join('')}
              >
                <Skeleton style={{ height: 48 }} borderRadius={6} />
              </div>
            </div>
          )}
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-tablet'],
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
    </ResponsiveTablet>
  );
}
