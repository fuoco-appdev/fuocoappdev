/* eslint-disable jsx-a11y/alt-text */
import { Input, Line, Scroll, Tabs } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/account-public-status.module.scss';
import { useQuery } from '../../route-paths';
import { AccountFollowersFollowingResponsiveProps } from '../account-public-status.component';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountPublicStatusMobileComponent({
  followerCount,
  followingCount,
  onScrollLoad,
  onScrollReload,
}: AccountFollowersFollowingResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { AccountPublicController } = React.useContext(DIContext);
  const {
    account,
    activeTabIndex,
    prevTabIndex,
    followersFollowingInput,
    activeStatusTabId,
    hasMoreFollowers,
    hasMoreFollowing,
    areFollowersReloading,
    areFollowingReloading,
    areFollowersLoading,
    areFollowingLoading,
  } = AccountPublicController.model;
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        {followerCount && followingCount && (
          <div
            className={[
              styles['tabs-container'],
              styles['tabs-container-mobile'],
            ].join(' ')}
            ref={topBarRef}
          >
            <Tabs
              flex={true}
              touchScreen={true}
              activeId={activeStatusTabId}
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
                    pathname: `${RoutePathsType.AccountStatus}/${account?.id}/followers`,
                    search: query.toString(),
                  });
                } else if (id === RoutePathsType.AccountStatusWithIdFollowing) {
                  navigate({
                    pathname: `${RoutePathsType.AccountStatus}/${account?.id}/following`,
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
                  value={followersFollowingInput}
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
                  onChange={(event) => {
                    if (
                      activeStatusTabId ===
                      RoutePathsType.AccountStatusWithIdFollowing
                    ) {
                      AccountPublicController.updateFollowingInput(
                        event.target.value
                      );
                    } else if (
                      activeStatusTabId ===
                      RoutePathsType.AccountStatusWithIdFollowers
                    ) {
                      AccountPublicController.updateFollowersInput(
                        event.target.value
                      );
                    }
                  }}
                />
              </div>
            </div>
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
        <Scroll
          touchScreen={true}
          classNames={{
            scrollContainer: [
              styles['scroll-container'],
              styles['scroll-container-mobile'],
            ].join(' '),
            reloadContainer: [
              styles['scroll-load-container'],
              styles['scroll-load-container-mobile'],
            ].join(' '),
            loadContainer: [
              styles['scroll-load-container'],
              styles['scroll-load-container-mobile'],
            ].join(' '),
            pullIndicator: [
              styles['pull-indicator'],
              styles['pull-indicator-mobile'],
            ].join(' '),
          }}
          reloadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          loadingHeight={56}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={
            <div className={[styles['pull-indicator-container']].join(' ')}>
              <Line.ArrowDownward size={24} />
            </div>
          }
          isLoadable={hasMoreFollowers || hasMoreFollowing}
          isReloading={areFollowersReloading || areFollowingReloading}
          isLoading={areFollowersLoading || areFollowingLoading}
          onReload={onScrollReload}
          onLoad={onScrollLoad}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop =
              contentRef.current?.getBoundingClientRect().top ?? 0;
            if (prevPreviewScrollTop <= scrollTop) {
              yPosition -= prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition += scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = scrollTop;
          }}
        >
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
                      activeTabIndex > prevTabIndex
                        ? styles['left-to-right-enter']
                        : styles['right-to-left-enter'],
                    enterActive:
                      activeTabIndex > prevTabIndex
                        ? styles['left-to-right-enter-active']
                        : styles['right-to-left-enter-active'],
                    exit:
                      activeTabIndex > prevTabIndex
                        ? styles['left-to-right-exit']
                        : styles['right-to-left-exit'],
                    exitActive:
                      activeTabIndex > prevTabIndex
                        ? styles['left-to-right-exit-active']
                        : styles['right-to-left-exit-active'],
                  },
                  timeout: 250,
                })
              }
            >
              <CSSTransition
                key={activeTabIndex}
                classNames={{
                  enter:
                    activeTabIndex < prevTabIndex
                      ? styles['left-to-right-enter']
                      : styles['right-to-left-enter'],
                  enterActive:
                    activeTabIndex < prevTabIndex
                      ? styles['left-to-right-enter-active']
                      : styles['right-to-left-enter-active'],
                  exit:
                    activeTabIndex < prevTabIndex
                      ? styles['left-to-right-exit']
                      : styles['right-to-left-exit'],
                  exitActive:
                    activeTabIndex < prevTabIndex
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
        </Scroll>
      </div>
    </ResponsiveMobile>
  );
}

export default observer(AccountPublicStatusMobileComponent);
