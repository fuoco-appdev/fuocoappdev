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
import styles from '../account.module.scss';
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

export default function AccountDesktopComponent({
  windowProps,
  accountProps,
  storeProps,
  onCompleteProfile,
  onScroll,
  onScrollLoad,
}: AccountResponsiveProps): JSX.Element {
  const scrollContainerRef = createRef<HTMLDivElement>();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  const account = accountProps.account as core.Account;
  const customer = accountProps.customer as Customer;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['left-tab-container'],
              styles['left-tab-container-desktop'],
            ].join(' ')}
          ></div>
          <div
            className={[
              styles['right-tab-container'],
              styles['right-tab-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-desktop'],
              ].join(' ')}
            >
              <Button
                touchScreen={true}
                classNames={{
                  button: styles['button'],
                }}
                rippleProps={{
                  color: 'rgba(88, 40, 109, .35)',
                }}
                onClick={() =>
                  setTimeout(
                    () => navigate(RoutePathsType.AccountSettingsAccount),
                    75
                  )
                }
                type={'text'}
                rounded={true}
                floatingLabel={t('settings') ?? ''}
                size={'tiny'}
                icon={<Line.Settings size={24} color={'#2A2A5F'} />}
              />
            </div>
          </div>
        </div>
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
          {account?.status === 'Incomplete' && (
            <div
              className={[
                styles['incomplete-profile-container'],
                styles['incomplete-profile-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['incomplete-content'],
                  styles['incomplete-content-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['complete-profile-title'],
                    styles['complete-profile-title-desktop'],
                  ].join(' ')}
                >
                  {t('completeProfile')}
                </div>
                <div
                  className={[
                    styles['form-container'],
                    styles['form-container-desktop'],
                  ].join(' ')}
                >
                  <AccountProfileFormComponent
                    storeProps={storeProps}
                    values={accountProps.profileForm}
                    errors={accountProps.profileFormErrors}
                    onChangeCallbacks={{
                      firstName: (event) =>
                        AccountController.updateProfile({
                          firstName: event.target.value,
                        }),
                      lastName: (event) =>
                        AccountController.updateProfile({
                          lastName: event.target.value,
                        }),
                      phoneNumber: (value, event, formattedValue) =>
                        AccountController.updateProfile({
                          phoneNumber: value,
                        }),
                    }}
                  />
                </div>
                <div>
                  <Button
                    touchScreen={true}
                    classNames={{
                      container: [
                        styles['submit-button-container'],
                        styles['submit-button-container-desktop'],
                      ].join(' '),
                      button: [
                        styles['submit-button'],
                        styles['submit-button-desktop'],
                      ].join(' '),
                    }}
                    block={true}
                    size={'large'}
                    icon={<Line.Done size={24} />}
                    onClick={onCompleteProfile}
                  >
                    {t('complete')}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {account?.status === 'Complete' && (
            <>
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
                  text={customer?.first_name}
                  src={accountProps.profileUrl}
                  editMode={true}
                  onChange={AccountController.uploadAvatarAsync}
                  size={'medium'}
                />
              </div>
              <div
                className={[
                  styles['username'],
                  styles['username-desktop'],
                ].join(' ')}
              >
                {customer ? (
                  `${customer?.first_name} ${customer?.last_name}`
                ) : (
                  <Skeleton
                    count={1}
                    borderRadius={9999}
                    className={[
                      styles['skeleton-user'],
                      styles['skeleton-user-desktop'],
                    ].join(' ')}
                  />
                )}
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
                  activeId={accountProps.activeTabId}
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
                    AccountController.updateActiveTabId(id);
                    navigate(id);
                  }}
                  type={'underlined'}
                  tabs={[
                    {
                      id: RoutePathsType.AccountLikes,
                      icon: <Line.FavoriteBorder size={24} />,
                    },
                    {
                      id: RoutePathsType.AccountOrderHistory,
                      icon: <Line.History size={24} />,
                    },
                    {
                      id: RoutePathsType.AccountAddresses,
                      icon: <Line.LocationOn size={24} />,
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
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-enter']
                            : styles['right-to-left-enter'],
                        enterActive:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-enter-active']
                            : styles['right-to-left-enter-active'],
                        exit:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-exit']
                            : styles['right-to-left-exit'],
                        exitActive:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-exit-active']
                            : styles['right-to-left-exit-active'],
                      },
                      timeout: 250,
                    })
                  }
                >
                  <CSSTransition
                    key={accountProps.activeTabIndex}
                    classNames={{
                      enter:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-enter']
                          : styles['right-to-left-enter'],
                      enterActive:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-enter-active']
                          : styles['right-to-left-enter-active'],
                      exit:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-exit']
                          : styles['right-to-left-exit'],
                      exitActive:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
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
        {createPortal(
          accountProps.isCreateCustomerLoading && (
            <div
              className={[
                styles['loading-container'],
                styles['loading-container-desktop'],
              ].join(' ')}
            >
              <img
                src={'../assets/svg/ring-resize-light.svg'}
                className={[
                  styles['loading-ring'],
                  styles['loading-ring-desktop'],
                ].join(' ')}
              />
            </div>
          ),
          document.body
        )}
      </div>
    </ResponsiveDesktop>
  );
}
