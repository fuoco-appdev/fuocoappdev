import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Typography,
  Button,
  Accordion,
  Input,
  InputPhoneNumber,
  Listbox,
  InputGeocoding,
  OptionProps,
  Modal,
  LanguageSwitch,
  Line,
  Avatar,
  Tabs,
} from '@fuoco.appdev/core-ui';
import styles from '../account-public.module.scss';
import AccountController from '../../controllers/account.controller';
import WindowController from '../../controllers/window.controller';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import * as core from '../../protobuf/core_pb';
import AccountProfileFormComponent from '../account-profile-form.component';
import { Customer } from '@medusajs/medusa';
import Skeleton from 'react-loading-skeleton';
import AccountOrderHistoryComponent from '../account-order-history.component';
import AccountAddressesComponent from '../account-addresses.component';
import AccountEditComponent from '../account-likes.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';
import { AccountResponsiveProps } from '../account.component';
import { createPortal } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AccountPublicResponsiveProps } from '../account-public.component';
import AccountPublicController from '../../controllers/account-public.controller';

export default function AccountPublicDesktopComponent({
  windowProps,
  accountPublicProps,
  storeProps,
  isFollowing,
  isAccepted,
  onScroll,
  onScrollLoad,
  onFollow,
  onRequested,
  onUnfollow,
}: AccountPublicResponsiveProps): JSX.Element {
  const scrollContainerRef = createRef<HTMLDivElement>();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          onScroll={(e) => {
            onScroll(e);
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = e.currentTarget.scrollTop;
            if (prevPreviewScrollTop > scrollTop) {
              yPosition += prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition -= scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = e.currentTarget.scrollTop;
          }}
          onLoad={onScrollLoad}
          ref={scrollContainerRef}
        >
          {accountPublicProps.account?.status === 'Complete' && (
            <>
              <div
                className={[
                  styles['top-content'],
                  styles['top-content-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['avatar-container'],
                    styles['avatar-container-desktop'],
                  ].join(' ')}
                >
                  <Avatar
                    classNames={{
                      button: {
                        button: [
                          styles['avatar-button'],
                          styles['avatar-button-desktop'],
                        ].join(' '),
                      },
                      cropImage: {
                        overlay: {
                          background: [
                            styles['avatar-overlay-background'],
                            styles['avatar-overlay-background-desktop'],
                          ].join(' '),
                        },
                        saveButton: {
                          button: [styles['avatar-save-button']].join(' '),
                        },
                      },
                    }}
                    text={accountPublicProps.customerMetadata?.firstName}
                    src={accountPublicProps.profileUrl}
                    size={'large'}
                  />
                </div>
                <div
                  className={[
                    styles['username'],
                    styles['username-desktop'],
                  ].join(' ')}
                >
                  {accountPublicProps.customerMetadata ? (
                    `${accountPublicProps.customerMetadata?.firstName} ${accountPublicProps.customerMetadata?.lastName}`
                  ) : (
                    <Skeleton
                      count={1}
                      borderRadius={9999}
                      width={120}
                      className={[
                        styles['skeleton-user'],
                        styles['skeleton-user-desktop'],
                      ].join(' ')}
                    />
                  )}
                </div>
                <div
                  className={[
                    styles['follow-button-container'],
                    styles['follow-button-container-desktop'],
                  ].join(' ')}
                >
                  {accountPublicProps.showFollowButton && !isFollowing && (
                    <Button
                      classNames={{
                        button: [
                          styles['primary-button'],
                          styles['primary-button-desktop'],
                        ].join(' '),
                      }}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      size={'medium'}
                      type={'primary'}
                      onClick={onFollow}
                    >
                      {t('follow')}
                    </Button>
                  )}
                  {accountPublicProps.showFollowButton &&
                    isFollowing &&
                    !isAccepted && (
                      <Button
                        classNames={{
                          button: [
                            styles['secondary-button'],
                            styles['secondary-button-desktop'],
                          ].join(' '),
                        }}
                        rippleProps={{
                          color: 'rgba(42, 42, 95, .35)',
                        }}
                        size={'medium'}
                        type={'secondary'}
                        onClick={onRequested}
                      >
                        {t('requested')}
                      </Button>
                    )}
                  {accountPublicProps.showFollowButton &&
                    isFollowing &&
                    isAccepted && (
                      <Button
                        classNames={{
                          button: [
                            styles['secondary-button'],
                            styles['secondary-button-desktop'],
                          ].join(' '),
                        }}
                        rippleProps={{
                          color: 'rgba(42, 42, 95, .35)',
                        }}
                        size={'medium'}
                        type={'secondary'}
                        onClick={onUnfollow}
                      >
                        {t('following')}
                      </Button>
                    )}
                </div>
              </div>
              <div
                className={[
                  styles['tabs-container'],
                  styles['tabs-container-desktop'],
                ].join(' ')}
              >
                <Tabs
                  flex={true}
                  touchScreen={true}
                  activeId={accountPublicProps.activeTabId}
                  classNames={{
                    nav: [styles['tab-nav'], styles['tab-nav-desktop']].join(
                      ' '
                    ),
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
                    AccountPublicController.updateActiveTabId(id);
                    navigate(id);
                  }}
                  type={'underlined'}
                  tabs={[
                    {
                      id: RoutePathsType.AccountLikes,
                      icon: <Line.FavoriteBorder size={24} />,
                    },
                  ]}
                />
              </div>
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
            </>
          )}
        </div>
      </div>
    </ResponsiveDesktop>
  );
}