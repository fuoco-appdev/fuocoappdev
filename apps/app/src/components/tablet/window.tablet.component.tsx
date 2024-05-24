import {
  Avatar,
  BannerOverlay,
  Button,
  LanguageSwitch,
  Line,
  Modal,
  Solid,
  Tabs,
  ToastOverlay,
  Typography,
} from '@fuoco.appdev/core-ui';
import { Customer } from '@medusajs/medusa';
import { LanguageCode } from 'iso-639-1';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AccountController from '../../controllers/account.controller';
import WindowController from '../../controllers/window.controller';
import { AccountResponse } from '../../protobuf/account_pb';
import { RoutePathsType, useQuery } from '../../route-paths';
import { ResponsiveTablet, useDesktopEffect } from '../responsive.component';
import { WindowResponsiveProps } from '../window.component';
import styles from '../window.module.scss';
;

export default function WindowTabletComponent({
  windowProps,
  windowLocalProps,
  accountProps,
  accountPublicProps,
  exploreProps,
  productProps,
  isLanguageOpen,
  setIsLanguageOpen,
  onSelectLocation,
  onCancelLocation,
  onSidebarTabsChanged,
  onNavigateBack,
}: WindowResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const sideBarRef = React.useRef<HTMLDivElement | null>(null);
  const navigationBackRef = React.useRef<HTMLDivElement | null>(null);
  const [date, setDate] = React.useState<Date | null>(null);

  useDesktopEffect(() => {
    setDate(new Date(Date.now()));
  }, []);

  const account = windowProps.account as AccountResponse;
  const customer = accountProps.customer as Customer;
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
        >
          <div
            className={[
              styles['top-bar-left-content'],
              styles['top-bar-left-content-tablet'],
            ].join(' ')}
          >
            <div className={[styles['top-bar-button-container']].join(' ')}>
              <Button
                touchScreen={true}
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() =>
                  WindowController.updateIsSideBarOpen(
                    !windowLocalProps.isSideBarOpen
                  )
                }
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Menu size={24} color={'rgba(252, 245, 227, 1)'} />}
              />
            </div>
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-tablet'],
              ].join(' ')}
            >
              <img src={'../assets/svg/logo.svg'} />
              <img
                className={[
                  styles['logo-text'],
                  styles['logo-text-tablet'],
                ].join(' ')}
                src={'../assets/svg/logo-text-light.svg'}
              />
            </div>
          </div>
          <div
            className={[
              styles['top-bar-right-content'],
              styles['top-bar-right-content-tablet'],
            ].join(' ')}
          >
            {!windowProps.account && (
              <div
                className={[
                  styles['top-bar-button-container'],
                  styles['top-bar-button-container-tablet'],
                ].join(' ')}
              >
                <LanguageSwitch
                  open={isLanguageOpen}
                  onOpen={() => setIsLanguageOpen(true)}
                  onClose={() => setIsLanguageOpen(false)}
                  supportedLanguages={[
                    { isoCode: 'en', countryCode: 'GB' },
                    { isoCode: 'fr', countryCode: 'FR' },
                  ]}
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  hideText={true}
                  language={windowLocalProps.languageCode as LanguageCode}
                  onChange={(isoCode: string, info) =>
                    WindowController.updateLanguageInfo(isoCode, info)
                  }
                />
              </div>
            )}
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-tablet'],
              ].join(' ')}
            >
              <Button
                touchScreen={true}
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() =>
                  navigate({
                    pathname: RoutePathsType.Help,
                    search: query.toString(),
                  })
                }
                type={'text'}
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
                styles['shopping-cart-container-details-tablet'],
              ].join(' ')}
            >
              <Button
                touchScreen={true}
                classNames={{
                  container: [
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-tablet'],
                  ].join(' '),
                }}
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() =>
                  setTimeout(
                    () =>
                      navigate({
                        pathname: RoutePathsType.Cart,
                        search: query.toString(),
                      }),
                    75
                  )
                }
                type={'text'}
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
                    styles['cart-number-container-tablet'],
                  ].join(' ')}
                >
                  <span
                    className={[
                      styles['cart-number'],
                      styles['cart-number-tablet'],
                    ].join(' ')}
                  >
                    {windowProps.cartCount}
                  </span>
                </div>
              )}
            </div>
            {windowProps.account && (
              <>
                <div
                  className={[
                    styles['top-bar-button-container'],
                    styles['top-bar-button-container-tablet'],
                  ].join(' ')}
                >
                  <Button
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    onClick={() =>
                      navigate({
                        pathname: RoutePathsType.SettingsAccount,
                        search: query.toString(),
                      })
                    }
                    floatingLabel={t('settings') ?? ''}
                    type={'text'}
                    rounded={true}
                    size={'tiny'}
                    icon={!windowProps.activeRoute?.startsWith(RoutePathsType.Settings) ? (
                      <Line.Settings
                        size={24}
                        color={'rgba(252, 245, 227, .8)'}
                      />
                    ) : (
                      <Solid.Settings
                        size={24}
                        color={'rgba(252, 245, 227, 1)'}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={[styles['content'], styles['content-tablet']].join(' ')}
        >
          <CSSTransition
            nodeRef={sideBarRef}
            in={windowLocalProps.isSideBarOpen && Boolean(sideBarRef.current)}
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
              className={[styles['side-bar'], styles['side-bar-tablet']].join(
                ' '
              )}
            >
              <Tabs
                activeId={windowProps.activeTabsId}
                direction={'vertical'}
                type={'nav'}
                onChange={onSidebarTabsChanged}
                classNames={{
                  tabOutline: [
                    styles['tab-outline'],
                    windowLocalProps.isSideBarOpen
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
                    id: RoutePathsType.Explore,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Explore ? (
                        <Solid.Explore size={24} />
                      ) : (
                        <Line.Explore size={24} />
                      ),
                    label: windowLocalProps.isSideBarOpen
                      ? t('explore') ?? ''
                      : undefined,
                  },
                  {
                    id: RoutePathsType.Store,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Store ? (
                        <Solid.Store size={24} />
                      ) : (
                        <Line.Store size={24} />
                      ),
                    label: windowLocalProps.isSideBarOpen
                      ? t('store') ?? ''
                      : undefined,
                  },
                  ...(!windowProps.account ? [{
                    id: RoutePathsType.Signup,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Signup ? (
                        <Solid.PersonAdd size={24} />
                      ) : (
                        <Line.PersonAdd size={24} />
                      ),
                    label: windowLocalProps.isSideBarOpen
                      ? t('signup') ?? ''
                      : undefined,
                  }, {
                    id: RoutePathsType.Signin,
                    icon:
                      windowProps.activeRoute === RoutePathsType.Signin ? (
                        <Line.Login size={24} />
                      ) : (
                        <Line.Login size={24} />
                      ),
                    label: windowLocalProps.isSideBarOpen
                      ? t('signin') ?? ''
                      : undefined,
                  }] : []),
                  ...(windowProps.account ? [{
                    id: RoutePathsType.Notifications,
                    icon: <div
                      className={[
                        styles['notification-container-details'],
                        styles['notification-container-details-tablet'],
                      ].join(' ')}
                    >{windowProps.activeRoute !== RoutePathsType.Notifications ? (
                      <Line.Notifications
                        size={24}
                      />
                    ) : (
                      <Solid.Notifications
                        size={24}
                      />
                    )}
                      {windowProps.unseenNotificationsCount > 0 && (
                        <div
                          className={[
                            styles['notification-status-container'],
                            styles['notification-status-container-tablet'],
                          ].join(' ')}
                        />
                      )}
                    </div>,
                    label: windowLocalProps.isSideBarOpen
                      ? t('notifications') ?? ''
                      : undefined,
                  },
                  {
                    id: RoutePathsType.Account,
                    icon:
                      account?.status === 'Incomplete' ? (
                        <Line.AccountCircle
                          size={24}
                          color={
                            windowProps.activeRoute?.startsWith(
                              RoutePathsType.Account
                            ) &&
                              !WindowController.isLocationAccountWithId(
                                location.pathname
                              )
                              ? '#85267A'
                              : '#2A2A5F'
                          }
                        />
                      ) : (
                        <Avatar
                          classNames={{
                            container: accountProps?.profileUrl
                              ? [
                                styles['avatar-container'],
                                styles['avatar-container-tablet'],
                              ].join(' ')
                              : [
                                styles['no-avatar-container'],
                                styles['no-avatar-container-tablet'],
                              ].join(' '),
                          }}
                          size={'custom'}
                          text={customer?.first_name}
                          src={accountProps?.profileUrl}
                          touchScreen={true}
                        />
                      ),
                    label: windowLocalProps.isSideBarOpen ? account?.status !== 'Incomplete'
                      ? account.username
                      : t('profile') ?? undefined : undefined,
                  },
                  ] : []),
                ]}
              />
              {windowLocalProps.isSideBarOpen && (
                <div
                  className={[
                    styles['side-bar-bottom-content'],
                    styles['side-bar-bottom-content-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['side-bar-link-container'],
                      styles['side-bar-link-container-tablet'],
                    ].join(' ')}
                  >
                    <Typography.Link
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        navigate({
                          pathname: RoutePathsType.TermsOfService,
                          search: query.toString(),
                        });
                        e.preventDefault();
                      }}
                    >
                      {t('termsOfService')}
                    </Typography.Link>
                    <Typography.Link
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        navigate({
                          pathname: RoutePathsType.PrivacyPolicy,
                          search: query.toString(),
                        });
                        e.preventDefault();
                      }}
                    >
                      {t('privacyPolicy')}
                    </Typography.Link>
                  </div>
                  <div
                    className={[
                      styles['copyright-text'],
                      styles['copyright-text-tablet'],
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
              styles['right-content-tablet'],
            ].join(' ')}
          >
            {windowProps.showNavigateBack && (<div
              className={[
                styles['navigation-back-container'],
                styles['navigation-back-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['navigation-back-left-content'],
                  styles['navigation-back-left-content-tablet'],
                ].join(' ')}
              >
                <Button
                  touchScreen={true}
                  classNames={{
                    button: styles['button'],
                  }}
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  rounded={true}
                  size={'tiny'}
                  disabled={!windowProps.showNavigateBack}
                  onClick={onNavigateBack}
                  type={'text'}
                  icon={<Line.ArrowBack size={24} color={'#2A2A5F'} />}
                />
              </div>
              <div
                className={[
                  styles['navigation-back-center-content'],
                  styles['navigation-back-center-content-tablet'],
                ].join(' ')}
              >
                {windowProps.activeRoute?.startsWith(
                  `${RoutePathsType.Store}/`
                ) &&
                  (<>{exploreProps.selectedInventoryLocation && (
                    <Avatar
                      classNames={{
                        container: !exploreProps
                          .selectedInventoryLocation?.avatar
                          ? [
                            styles['no-avatar-container'],
                            styles['no-avatar-container-tablet'],
                          ].join(' ')
                          : [
                            styles['avatar-container'],
                            styles['avatar-container-tablet'],
                          ].join(' '),
                      }}
                      size={'custom'}
                      text={
                        exploreProps.selectedInventoryLocation
                          ?.company ?? ''
                      }
                      src={
                        exploreProps.selectedInventoryLocation?.avatar
                      }
                      touchScreen={true}
                    />)}
                    <div
                      className={[styles['navigation-back-title']].join(
                        ' '
                      )}
                    >
                      {exploreProps.selectedInventoryLocation && `${exploreProps.selectedInventoryLocation
                        ?.company ?? ''} - `}
                      {productProps.metadata?.subtitle}
                    </div>
                  </>)}
                {windowProps.activeRoute ===
                  RoutePathsType.EmailConfirmation && (
                    <>
                      <Line.Email size={24} />
                      <div
                        className={[styles['navigation-back-title']].join(' ')}
                      >
                        {t('emailConfirmation')}
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
                {WindowController.isLocationAccountWithId(
                  location.pathname ?? ''
                ) && (
                    <div
                      className={[styles['navigation-back-title']].join(' ')}
                      style={{ textTransform: 'lowercase' }}
                    >
                      {accountPublicProps.account?.username ?? ''}
                    </div>
                  )}
                {WindowController.isLocationAccountStatusWithId(
                  location.pathname ?? ''
                ) && (
                    <div
                      className={[styles['navigation-back-title']].join(' ')}
                      style={{ textTransform: 'lowercase' }}
                    >
                      {accountPublicProps.account?.username ?? ''}
                    </div>
                  )}
                {windowProps.activeRoute?.startsWith(
                  RoutePathsType.Settings
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
                {windowProps.activeRoute === RoutePathsType.Cart && (
                  <>
                    <Line.ShoppingCart size={22} />
                    <div
                      className={[styles['navigation-back-title']].join(
                        ' '
                      )}
                    >
                      {t('shoppingCarts')}
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
                  styles['navigation-back-right-content-tablet'],
                ].join(' ')}
              >
                {windowProps.activeRoute?.startsWith(
                  RoutePathsType.Settings
                ) && (
                    <Button
                      touchScreen={true}
                      classNames={{
                        button: styles['button'],
                      }}
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      rounded={true}
                      onClick={() => AccountController.logoutAsync()}
                      type={'text'}
                      icon={<Line.Logout size={24} color={'#2A2A5F'} />}
                    />
                  )}
              </div>
            </div>)}
            <Outlet />
          </div>
        </div>
        {ReactDOM.createPortal(
          <>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-tablet'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-tablet']].join(' '),
                text: [styles['modal-text'], styles['modal-text-tablet']].join(
                  ' '
                ),
                title: [
                  styles['modal-title'],
                  styles['modal-title-tablet'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-tablet'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-tablet'],
                  styles['modal-address-footer-button-container-tablet'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-tablet'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-tablet'],
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
              touchScreen={true}
              classNames={{
                root: [
                  styles['toast-overlay-root'],
                  styles['toast-overlay-root-tablet'],
                ].join(' '),
                overlayContainer: [
                  styles['toast-overlay-container'],
                  styles['toast-overlay-container-tablet'],
                ].join(' '),
                toast: {
                  container: [
                    styles['toast-container'],
                    styles['toast-container-tablet'],
                  ].join(' '),
                  description: [
                    styles['toast-description'],
                    styles['toast-description-tablet'],
                  ].join(' '),
                  life: [
                    styles['toast-life'],
                    styles['toast-life-tablet'],
                  ].join(' '),
                },
              }}
              timeout={2500}
              toasts={windowProps.toast ? [windowProps.toast] : []}
              transition={'down'}
              align={'right'}
            />
          </>,
          document.body
        )}
        <BannerOverlay
          classNames={{
            root: [
              styles['banner-overlay-root'],
              styles['banner-overlay-root-tablet'],
            ].join(' '),
          }}
          transition={'up'}
          align={'right'}
          banners={windowProps.banner ? [windowProps.banner] : []}
        />
      </div>
    </ResponsiveTablet>
  );
}
