import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../../controllers/window.controller';
import styles from '../window.module.scss';
import {
  Alert,
  Avatar,
  Banner,
  BannerOverlay,
  Button,
  Dropdown,
  LanguageSwitch,
  Line,
  Modal,
  Solid,
  Tabs,
  ToastOverlay,
  Typography,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import { Customer } from '@medusajs/medusa';
import AccountController from '../../controllers/account.controller';
import { CSSTransition } from 'react-transition-group';
import { WindowResponsiveProps } from '../window.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';
import LoadingComponent from '../loading.component';
import { WindowSuspenseDesktopComponent } from './suspense/window.suspense.desktop.component';

export default function WindowDesktopComponent({
  windowProps,
  windowLocalProps,
  accountProps,
  permissionsProps,
  homeProps,
  openMore,
  isLanguageOpen,
  setOpenMore,
  setIsLanguageOpen,
  onSelectLocation,
  onCancelLocation,
  onSidebarTabsChanged,
  onNavigateBack,
}: WindowResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigationBackRef = useRef<HTMLDivElement | null>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);

  useDesktopEffect(() => {
    setDate(new Date(Date.now()));
  }, []);

  const account = windowProps.account as core.AccountResponse;
  const customer = accountProps.customer as Customer;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['top-bar-left-content'],
              styles['top-bar-left-content-desktop'],
            ].join(' ')}
          >
            <div className={[styles['top-bar-button-container']].join(' ')}>
              <Button
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                floatingLabel={t('menu') ?? ''}
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Menu size={24} color={'rgba(252, 245, 227, 1)'} />}
              />
            </div>
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-desktop'],
              ].join(' ')}
            >
              <img src={'../assets/svg/logo.svg'} />
              <img
                className={[
                  styles['logo-text'],
                  styles['logo-text-desktop'],
                ].join(' ')}
                src={'../assets/svg/logo-text.svg'}
              />
            </div>
          </div>
          <div
            className={[
              styles['top-bar-right-content'],
              styles['top-bar-right-content-desktop'],
            ].join(' ')}
          >
            {!windowProps.account && (
              <div
                className={[
                  styles['top-bar-button-container'],
                  styles['top-bar-button-container-desktop'],
                ].join(' ')}
              >
                <LanguageSwitch
                  open={isLanguageOpen}
                  onOpen={() => setIsLanguageOpen(true)}
                  onClose={() => setIsLanguageOpen(false)}
                  floatingLabel={t('language') ?? ''}
                  supportedLanguages={[
                    { isoCode: 'en', countryCode: 'GB' },
                    { isoCode: 'fr', countryCode: 'FR' },
                  ]}
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  hideText={true}
                  language={windowLocalProps.languageCode}
                  onChange={(isoCode: string, info) =>
                    WindowController.updateLanguageInfo(isoCode, info)
                  }
                />
              </div>
            )}
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-desktop'],
              ].join(' ')}
            >
              <Button
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() => navigate(RoutePathsType.Help)}
                type={'text'}
                floatingLabel={t('help') ?? ''}
                rounded={true}
                size={'tiny'}
                icon={
                  windowProps.activeRoute !== RoutePathsType.Help ? (
                    <Line.HelpOutline
                      size={24}
                      color={'rgba(252, 245, 227, .8)'}
                    />
                  ) : (
                    <Solid.Help size={24} color={'rgba(252, 245, 227, 1)'} />
                  )
                }
              />
            </div>
            <div
              className={[
                styles['shopping-cart-container-details'],
                styles['shopping-cart-container-details-desktop'],
              ].join(' ')}
            >
              <Button
                classNames={{
                  container: [
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-desktop'],
                  ].join(' '),
                }}
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() =>
                  setTimeout(() => navigate(RoutePathsType.Cart), 75)
                }
                type={'text'}
                floatingLabel={t('shoppingCart') ?? ''}
                rounded={true}
                size={'tiny'}
                icon={
                  windowProps.activeRoute !== RoutePathsType.Cart &&
                  windowProps.activeRoute !== RoutePathsType.Checkout ? (
                    <Line.ShoppingCart
                      size={24}
                      color={'rgba(252, 245, 227, .8)'}
                    />
                  ) : (
                    <Solid.ShoppingCart
                      size={24}
                      color={'rgba(252, 245, 227, 1)'}
                    />
                  )
                }
              />
              {windowProps.cartCount > 0 && (
                <div
                  className={[
                    styles['cart-number-container'],
                    styles['cart-number-container-desktop'],
                  ].join(' ')}
                >
                  <span
                    className={[
                      styles['cart-number'],
                      styles['cart-number-desktop'],
                    ].join(' ')}
                  >
                    {windowProps.cartCount}
                  </span>
                </div>
              )}
            </div>
            {!windowProps.account && (
              <>
                <div
                  className={[
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    onClick={() => navigate(RoutePathsType.Signup)}
                    type={'text'}
                    floatingLabel={t('signup') ?? ''}
                    rounded={true}
                    size={'tiny'}
                    icon={
                      windowProps.activeRoute !== RoutePathsType.Signup ? (
                        <Line.PersonAdd
                          size={24}
                          color={'rgba(252, 245, 227, .8)'}
                        />
                      ) : (
                        <Solid.PersonAdd
                          size={24}
                          color={'rgba(252, 245, 227, 1)'}
                        />
                      )
                    }
                  />
                </div>
                <div
                  className={[
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    onClick={() => navigate(RoutePathsType.Signin)}
                    type={'text'}
                    floatingLabel={t('signin') ?? ''}
                    rounded={true}
                    size={'tiny'}
                    icon={
                      windowProps.activeRoute !== RoutePathsType.Signin ? (
                        <Line.Login
                          size={24}
                          color={'rgba(252, 245, 227, .8)'}
                        />
                      ) : (
                        <Line.Login
                          size={24}
                          color={'rgba(252, 245, 227, 1)'}
                        />
                      )
                    }
                  />
                </div>
              </>
            )}
            {windowProps.account && (
              <>
                {/* <div className={styles['tab-button-container']}>
                      <Button
                        rippleProps={{
                          color: 'rgba(252, 245, 227, .35)',
                        }}
                        onClick={() => navigate(RoutePathsType.Notifications)}
                        disabled={windowProps.activeRoute === RoutePathsType.Cart}
                        type={'text'}
                        rounded={true}
                        size={'tiny'}
                        touchScreen={true}
                        icon={
                          <Line.Notifications
                            size={24}
                            color={
                              windowProps.activeRoute === RoutePathsType.Notifications
                                ? 'rgba(252, 245, 227, 1)'
                                : 'rgba(252, 245, 227, .6)'
                            }
                          />
                        }
                      />
                    </div> */}
                <div
                  className={[
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    onClick={() => navigate(RoutePathsType.Account)}
                    floatingLabel={
                      account?.status !== 'Incomplete'
                        ? `${customer?.first_name} ${customer?.last_name}`
                        : t('profile') ?? undefined
                    }
                    type={'text'}
                    rounded={true}
                    size={'tiny'}
                    icon={
                      account?.status === 'Incomplete' ? (
                        <Line.AccountCircle
                          size={24}
                          color={
                            windowProps.activeRoute?.startsWith(
                              RoutePathsType.Account
                            )
                              ? 'rgba(252, 245, 227, 1)'
                              : 'rgba(252, 245, 227, .8)'
                          }
                        />
                      ) : (
                        <div
                          className={
                            windowProps.activeRoute?.startsWith(
                              RoutePathsType.Account
                            )
                              ? [
                                  styles['avatar-container-selected'],
                                  styles['avatar-container-selected-desktop'],
                                ].join(' ')
                              : undefined
                          }
                        >
                          <Avatar
                            classNames={{
                              container: [
                                styles['avatar-container'],
                                styles['avatar-container-desktop'],
                              ].join(' '),
                            }}
                            size={'custom'}
                            text={customer?.first_name}
                            src={accountProps?.profileUrl}
                            touchScreen={true}
                          />
                        </div>
                      )
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          <CSSTransition
            nodeRef={sideBarRef}
            in={isSideBarOpen && Boolean(sideBarRef.current)}
            timeout={300}
            classNames={{
              appear: styles['side-bar-appear'],
              appearActive: styles['side-bar-appear-active'],
              appearDone: styles['side-bar-appear-done'],
              enter: styles['side-bar-enter'],
              enterActive: styles['side-bar-enter-active'],
              enterDone: styles['side-bar-enter-done'],
              exit: styles['side-bar-exit'],
              exitActive: styles['side-bar-exit-active'],
              exitDone: styles['side-bar-exit-done'],
            }}
          >
            <div
              ref={sideBarRef}
              className={[styles['side-bar'], styles['side-bar-desktop']].join(
                ' '
              )}
            >
              <Tabs
                activeId={windowProps.activeRoute}
                direction={'vertical'}
                type={'underlined'}
                onChange={onSidebarTabsChanged}
                classNames={{
                  tabOutline: [
                    styles['tab-outline'],
                    isSideBarOpen
                      ? styles['tab-outline-open']
                      : styles['tab-outline-close'],
                  ].join(' '),
                  tabSlider: styles['tab-slider'],
                  tabIcon: styles['tab-icon'],
                  tabButton: styles['tab-button'],
                  hoveredTabIcon: styles['hovered-tab-icon'],
                  hoveredTabButton: styles['hovered-tab-button'],
                }}
                tabs={[
                  {
                    id: RoutePathsType.Home,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Home ? (
                        <Solid.Home size={24} />
                      ) : (
                        <Line.Home size={24} />
                      ),
                    label: isSideBarOpen ? t('home') ?? '' : undefined,
                  },
                  {
                    id: RoutePathsType.Store,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Store ? (
                        <Solid.Store size={24} />
                      ) : (
                        <Line.Store size={24} />
                      ),
                    label: isSideBarOpen ? t('store') ?? '' : undefined,
                  },
                ]}
              />
              {isSideBarOpen && (
                <div
                  className={[
                    styles['side-bar-bottom-content'],
                    styles['side-bar-bottom-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['side-bar-link-container'],
                      styles['side-bar-link-container-desktop'],
                    ].join(' ')}
                  >
                    <Typography.Link
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        navigate(RoutePathsType.TermsOfService);
                        e.preventDefault();
                      }}
                    >
                      {t('termsOfService')}
                    </Typography.Link>
                    <Typography.Link
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        navigate(RoutePathsType.PrivacyPolicy);
                        e.preventDefault();
                      }}
                    >
                      {t('privacyPolicy')}
                    </Typography.Link>
                  </div>
                  <div
                    className={[
                      styles['copyright-text'],
                      styles['copyright-text-desktop'],
                    ].join(' ')}
                  >
                    Cruthology <Line.Copyright size={16} />{' '}
                    {date?.getFullYear()}
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
          <div
            className={[
              styles['right-content'],
              styles['right-content-desktop'],
            ].join(' ')}
          >
            <CSSTransition
              nodeRef={navigationBackRef}
              in={
                windowProps.showNavigateBack &&
                Boolean(navigationBackRef.current)
              }
              timeout={150}
              classNames={{
                appear: styles['navigation-back-appear'],
                appearActive: styles['navigation-back-appear-active'],
                appearDone: styles['navigation-back-appear-done'],
                enter: styles['navigation-back-enter'],
                enterActive: styles['navigation-back-enter-active'],
                enterDone: styles['navigation-back-enter-done'],
                exit: styles['navigation-back-exit'],
                exitActive: styles['navigation-back-exit-active'],
                exitDone: styles['navigation-back-exit-done'],
              }}
            >
              <div
                className={[
                  styles['navigation-back-container'],
                  styles['navigation-back-container-desktop'],
                ].join(' ')}
                ref={navigationBackRef}
              >
                <div
                  className={[
                    styles['navigation-back-left-content'],
                    styles['navigation-back-left-content-desktop'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['button'],
                    }}
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    rounded={true}
                    size={'tiny'}
                    disabled={!windowProps.showNavigateBack}
                    onClick={() => {
                      if (
                        windowProps.activeRoute?.startsWith(
                          RoutePathsType.AccountSettings
                        )
                      ) {
                        setTimeout(() => navigate(RoutePathsType.Account), 150);
                        return;
                      }

                      onNavigateBack();
                    }}
                    type={'text'}
                    icon={<Line.ArrowBack size={24} color={'#2A2A5F'} />}
                  />
                </div>
                <div
                  className={[
                    styles['navigation-back-center-content'],
                    styles['navigation-back-center-content-desktop'],
                  ].join(' ')}
                >
                  {windowProps.activeRoute?.startsWith(
                    `${RoutePathsType.Store}/`
                  ) && (
                    <>
                      <Avatar
                        classNames={{
                          container: [
                            styles['avatar-container'],
                            styles['avatar-container-desktop'],
                          ].join(' '),
                        }}
                        size={'custom'}
                        text={
                          homeProps.selectedInventoryLocation?.company ?? ''
                        }
                        src={''}
                      />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {homeProps.selectedInventoryLocation?.company ?? ''}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute?.startsWith(
                    RoutePathsType.AccountSettings
                  ) && (
                    <>
                      <Line.Settings size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('settings')}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute ===
                    RoutePathsType.AccountAddFriends && (
                    <>
                      <Line.PersonAddAlt1 size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('addFriends')}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute === RoutePathsType.Checkout && (
                    <>
                      <Line.ShoppingCart size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('checkout')}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute ===
                    RoutePathsType.TermsOfService && (
                    <>
                      <Line.Gavel size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('termsOfService')}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute === RoutePathsType.PrivacyPolicy && (
                    <>
                      <Line.Gavel size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('privacyPolicy')}
                      </div>
                    </>
                  )}
                  {windowProps.activeRoute?.startsWith(
                    RoutePathsType.OrderConfirmed
                  ) && (
                    <>
                      <Line.ShoppingCart size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('orderConfirmed')}
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={[
                    styles['navigation-back-right-content'],
                    styles['navigation-back-right-content-desktop'],
                  ].join(' ')}
                >
                  {windowProps.activeRoute?.startsWith(
                    RoutePathsType.AccountSettings
                  ) && (
                    <Button
                      classNames={{
                        button: styles['button'],
                      }}
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      rounded={true}
                      onClick={() => AccountController.logoutAsync()}
                      floatingLabel={t('signOut') ?? ''}
                      type={'text'}
                      icon={<Line.Logout size={24} color={'#2A2A5F'} />}
                    />
                  )}
                </div>
              </div>
            </CSSTransition>
            <Outlet />
          </div>
        </div>
        <Modal
          classNames={{
            overlay: [
              styles['modal-overlay'],
              styles['modal-overlay-desktop'],
            ].join(' '),
            modal: [styles['modal'], styles['modal-desktop']].join(' '),
            text: [styles['modal-text'], styles['modal-text-desktop']].join(
              ' '
            ),
            title: [styles['modal-title'], styles['modal-title-desktop']].join(
              ' '
            ),
            description: [
              styles['modal-description'],
              styles['modal-description-desktop'],
            ].join(' '),
            footerButtonContainer: [
              styles['modal-footer-button-container'],
              styles['modal-footer-button-container-desktop'],
              styles['modal-address-footer-button-container-desktop'],
            ].join(' '),
            cancelButton: {
              button: [
                styles['modal-cancel-button'],
                styles['modal-cancel-button-desktop'],
              ].join(' '),
            },
            confirmButton: {
              button: [
                styles['modal-confirm-button'],
                styles['modal-confirm-button-desktop'],
              ].join(' '),
            },
          }}
          title={t('selectLocation') ?? ''}
          description={
            t('selectLocationDescription', {
              address: `${windowProps.queryInventoryLocation?.company}, ${windowProps.queryInventoryLocation?.placeName}`,
            }) ?? ''
          }
          confirmText={t('select') ?? ''}
          cancelText={t('cancel') ?? ''}
          visible={windowProps.queryInventoryLocation !== undefined}
          onConfirm={onSelectLocation}
          onCancel={onCancelLocation}
        />
        <ToastOverlay
          classNames={{
            root: [
              styles['toast-overlay-root'],
              styles['toast-overlay-root-desktop'],
            ].join(' '),
            overlayContainer: [
              styles['toast-overlay-container'],
              styles['toast-overlay-container-desktop'],
            ].join(' '),
            toast: {
              container: [
                styles['toast-container'],
                styles['toast-container-desktop'],
              ].join(' '),
              life: [styles['toast-life'], styles['toast-life-desktop']].join(
                ' '
              ),
            },
          }}
          timeout={2500}
          toasts={windowProps.toast ? [windowProps.toast] : []}
          transition={'down'}
          align={'right'}
        />
        <BannerOverlay
          classNames={{
            root: [
              styles['banner-overlay-root'],
              styles['banner-overlay-root-desktop'],
            ].join(' '),
          }}
          transition={'up'}
          align={'right'}
          banners={windowProps.banner ? [windowProps.banner] : []}
        />
      </div>
    </ResponsiveDesktop>
  );
}
