import { Avatar, Button, Line, Tabs } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/account-public.module.scss';
import { useQuery } from '../../route-paths';
import { AccountPublicResponsiveProps } from '../account-public.component';
import { DIContext } from '../app.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountPublicMobileComponent({
  isFollowing,
  isAccepted,
  likeCount,
  followerCount,
  followingCount,
  onScroll,
  onScrollLoad,
  onFollow,
  onRequested,
  onUnfollow,
  onLikesClick,
  onFollowersClick,
  onFollowingClick,
}: AccountPublicResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const { AccountPublicController } = React.useContext(DIContext);
  const {
    account,
    customerMetadata,
    profileUrl,
    showFollowButton,
    activeTabId,
    activeTabIndex,
    prevTabIndex,
  } = AccountPublicController.model;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['scroll-content'],
            styles['scroll-content-mobile'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          onScroll={onScroll}
          onLoad={onScrollLoad}
          ref={scrollContainerRef}
        >
          {account?.status === 'Complete' && (
            <>
              <div
                className={[
                  styles['top-content'],
                  styles['top-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['status-container'],
                    styles['status-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['avatar-content'],
                      styles['avatar-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['avatar-container'],
                        styles['avatar-container-mobile'],
                      ].join(' ')}
                    >
                      <Avatar
                        classNames={{
                          button: {
                            button: [
                              styles['avatar-button'],
                              styles['avatar-button-mobile'],
                            ].join(' '),
                          },
                          cropImage: {
                            overlay: {
                              background: [
                                styles['avatar-overlay-background'],
                                styles['avatar-overlay-background-mobile'],
                              ].join(' '),
                            },
                            saveButton: {
                              button: [styles['avatar-save-button']].join(' '),
                            },
                          },
                        }}
                        text={customerMetadata?.firstName}
                        src={profileUrl}
                        size={'large'}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={[
                    styles['username'],
                    styles['username-mobile'],
                  ].join(' ')}
                >
                  {customerMetadata ? (
                    `${customerMetadata?.firstName} ${customerMetadata?.lastName}`
                  ) : (
                    <Skeleton
                      count={1}
                      borderRadius={9999}
                      width={120}
                      className={[
                        styles['skeleton-user'],
                        styles['skeleton-user-mobile'],
                      ].join(' ')}
                    />
                  )}
                </div>
                <div
                  className={[
                    styles['followers-status-container'],
                    styles['followers-status-container-mobile'],
                  ].join(' ')}
                >
                  {likeCount !== undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                      onClick={onLikesClick}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        {likeCount}
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        {t('likes')}
                      </div>
                    </div>
                  )}
                  {likeCount === undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={30} height={19} borderRadius={19} />
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={55} height={19} borderRadius={19} />
                      </div>
                    </div>
                  )}
                  {followerCount !== undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                      onClick={onFollowersClick}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        {followerCount}
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        {t('followers')}
                      </div>
                    </div>
                  )}
                  {followerCount === undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={30} height={19} borderRadius={19} />
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={55} height={19} borderRadius={19} />
                      </div>
                    </div>
                  )}
                  {followingCount !== undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                      onClick={onFollowingClick}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        {followingCount}
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        {t('following')}
                      </div>
                    </div>
                  )}
                  {followingCount === undefined && (
                    <div
                      className={[
                        styles['followers-status-item'],
                        styles['followers-status-item-mobile'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['followers-status-value'],
                          styles['followers-status-value-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={30} height={19} borderRadius={19} />
                      </div>
                      <div
                        className={[
                          styles['followers-status-name'],
                          styles['followers-status-name-mobile'],
                        ].join(' ')}
                      >
                        <Skeleton width={55} height={19} borderRadius={19} />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={[
                    styles['follow-button-container'],
                    styles['follow-button-container-mobile'],
                  ].join(' ')}
                >
                  {showFollowButton && !isFollowing && (
                    <Button
                      classNames={{
                        button: [
                          styles['primary-button'],
                          styles['primary-button-mobile'],
                        ].join(' '),
                      }}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      size={'small'}
                      type={'primary'}
                      onClick={onFollow}
                    >
                      {t('follow')}
                    </Button>
                  )}
                  {showFollowButton && isFollowing && !isAccepted && (
                    <Button
                      classNames={{
                        button: [
                          styles['secondary-button'],
                          styles['secondary-button-mobile'],
                        ].join(' '),
                      }}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      size={'small'}
                      type={'secondary'}
                      onClick={onRequested}
                    >
                      {t('requested')}
                    </Button>
                  )}
                  {showFollowButton && isFollowing && isAccepted && (
                    <Button
                      classNames={{
                        button: [
                          styles['secondary-button'],
                          styles['secondary-button-mobile'],
                        ].join(' '),
                      }}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      size={'small'}
                      type={'secondary'}
                      onClick={onUnfollow}
                    >
                      {t('following')}
                    </Button>
                  )}
                  {showFollowButton === undefined && (
                    <Skeleton
                      count={1}
                      borderRadius={6}
                      height={34}
                      width={104}
                    />
                  )}
                </div>
              </div>
              <div
                className={[
                  styles['tabs-container'],
                  styles['tabs-container-mobile'],
                ].join(' ')}
              >
                <Tabs
                  flex={true}
                  touchScreen={true}
                  activeId={activeTabId}
                  classNames={{
                    nav: [styles['tab-nav'], styles['tab-nav-mobile']].join(
                      ' '
                    ),
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
                    AccountPublicController.updateActiveTabId(id);
                    navigate({
                      pathname: `${RoutePathsType.Account}/${id}/likes`,
                      search: query.toString(),
                    });
                  }}
                  type={'underlined'}
                  tabs={[
                    {
                      id: RoutePathsType.AccountWithIdLikes,
                      icon: <Line.FavoriteBorder size={24} />,
                    },
                  ]}
                />
              </div>
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
            </>
          )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}

export default observer(AccountPublicMobileComponent);
