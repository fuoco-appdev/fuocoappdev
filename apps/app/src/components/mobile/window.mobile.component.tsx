import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WindowController from '../../controllers/window.controller';
import styles from '../window.module.scss';
import {
  Avatar,
  BannerOverlay,
  Button,
  Dropdown,
  LanguageSwitch,
  Line,
  Modal,
  Solid,
  ToastOverlay,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import { Customer } from '@medusajs/medusa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { WindowResponsiveProps } from '../window.component';
import { useRef, useState } from 'react';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import { WindowSuspenseMobileComponent } from './suspense/window.suspense.mobile.component';
import { createPortal } from 'react-dom';

export default function WindowMobileComponent({
  windowProps,
  windowLocalProps,
  accountProps,
  accountPublicProps,
  exploreProps,
  openMore,
  isLanguageOpen,
  setOpenMore,
  setIsLanguageOpen,
  onSelectLocation,
  onCancelLocation,
  onNavigateBack,
}: WindowResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const outletRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const [switchBottomBar, setSwitchBottomBar] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<RoutePathsType | undefined>(
    windowProps.activeRoute
  );

  useMobileEffect(() => {
    setSwitchBottomBar(true);
  }, [windowProps.transitionKeyIndex, windowProps.scaleKeyIndex]);

  useMobileEffect(() => {
    setTimeout(() => setActiveRoute(windowProps.activeRoute), 75);
  }, [windowProps.activeRoute]);

  const account = windowProps.account as core.AccountResponse;
  const customer = accountProps.customer as Customer;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          <TransitionGroup
            component={null}
            childFactory={(child) =>
              React.cloneElement(child, {
                classNames: {
                  enter:
                    windowProps.transitionKeyIndex <
                    windowProps.prevTransitionKeyIndex
                      ? styles['left-to-right-enter']
                      : styles['right-to-left-enter'],
                  enterActive:
                    windowProps.transitionKeyIndex <
                    windowProps.prevTransitionKeyIndex
                      ? styles['left-to-right-enter-active']
                      : styles['right-to-left-enter-active'],
                  exit:
                    windowProps.transitionKeyIndex <
                    windowProps.prevTransitionKeyIndex
                      ? styles['left-to-right-exit']
                      : styles['right-to-left-exit'],
                  exitActive:
                    windowProps.transitionKeyIndex <
                    windowProps.prevTransitionKeyIndex
                      ? styles['left-to-right-exit-active']
                      : styles['right-to-left-exit-active'],
                },
                timeout: 250,
              })
            }
          >
            <CSSTransition
              key={windowProps.transitionKeyIndex}
              classNames={{
                enter:
                  windowProps.transitionKeyIndex >
                  windowProps.prevTransitionKeyIndex
                    ? styles['left-to-right-enter']
                    : styles['right-to-left-enter'],
                enterActive:
                  windowProps.transitionKeyIndex >
                  windowProps.prevTransitionKeyIndex
                    ? styles['left-to-right-enter-active']
                    : styles['right-to-left-enter-active'],
                exit:
                  windowProps.transitionKeyIndex >
                  windowProps.prevTransitionKeyIndex
                    ? styles['left-to-right-exit']
                    : styles['right-to-left-exit'],
                exitActive:
                  windowProps.transitionKeyIndex >
                  windowProps.prevTransitionKeyIndex
                    ? styles['left-to-right-exit-active']
                    : styles['right-to-left-exit-active'],
              }}
              timeout={250}
              unmountOnExit={false}
            >
              <div style={{ minWidth: '100%', minHeight: '100%' }}>
                <Outlet />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <CSSTransition
          nodeRef={bottomBarRef}
          in={switchBottomBar}
          classNames={{
            enter: styles['bottom-bar-enter'],
            enterActive: styles['bottom-bar-enter-active'],
            enterDone: styles['bottom-bar-enter-done'],
            exit: styles['bottom-bar-exit'],
            exitActive: styles['bottom-bar-exit-active'],
            exitDone: styles['bottom-bar-exit-done'],
          }}
          timeout={150}
          onEnter={() => setTimeout(() => setSwitchBottomBar(false), 75)}
        >
          <div
            ref={bottomBarRef}
            className={[styles['bottom-bar-container-mobile']].join(' ')}
          >
            <div className={[styles['bottom-bar-mobile']].join(' ')}>
              {!windowProps.hideCartButton && (
                <div
                  className={[
                    styles['shopping-cart-container'],
                    styles['shopping-cart-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['shopping-cart-container-details'],
                      styles['shopping-cart-container-details-mobile'],
                    ].join(' ')}
                  >
                    <Button
                      classNames={{
                        container: [
                          styles['shopping-cart-button-container'],
                          styles['shopping-cart-button-container-mobile'],
                        ].join(' '),
                        button: [
                          styles['shopping-cart-button'],
                          styles['shopping-cart-button-mobile'],
                        ].join(' '),
                      }}
                      rippleProps={{
                        color: 'rgba(42, 42, 95, .35)',
                      }}
                      onClick={() => {
                        if (activeRoute === RoutePathsType.Cart) {
                          navigate(-1);
                        } else {
                          setTimeout(
                            () =>
                              navigate({
                                pathname: RoutePathsType.Cart,
                                search: query.toString(),
                              }),
                            75
                          );
                        }
                      }}
                      type={'primary'}
                      rounded={true}
                      size={'small'}
                      touchScreen={true}
                      icon={
                        windowProps.activeRoute !== RoutePathsType.Cart ? (
                          <Line.ShoppingCart size={22} color={'#2A2A5F'} />
                        ) : (
                          <Line.Close size={22} color={'#2A2A5F'} />
                        )
                      }
                    />
                    {windowProps.activeRoute !== RoutePathsType.Cart &&
                      windowProps.cartCount > 0 && (
                        <div
                          className={[
                            styles['cart-number-container'],
                            styles['cart-number-container-mobile'],
                          ].join(' ')}
                        >
                          <span
                            className={[
                              styles['cart-number'],
                              styles['cart-number-mobile'],
                            ].join(' ')}
                          >
                            {windowProps.cartCount}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              )}
              {windowProps.showNavigateBack && (
                <div
                  className={[
                    styles['navigation-back-container'],
                    styles['navigation-back-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['tab-button-container'],
                      styles['tab-button-container-mobile'],
                    ].join(' ')}
                  >
                    <Button
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      onClick={() => {
                        onNavigateBack();
                      }}
                      type={'text'}
                      rounded={true}
                      size={'tiny'}
                      touchScreen={true}
                      icon={
                        <Line.ArrowBack
                          size={24}
                          color={'rgba(252, 245, 227, 1)'}
                        />
                      }
                    />
                  </div>
                  {windowProps.hideCartButton && (
                    <div
                      className={[
                        styles['navigation-back-text-container'],
                        styles['navigation-back-text-container-mobile'],
                      ].join(' ')}
                    >
                      {activeRoute?.startsWith(`${RoutePathsType.Store}/`) &&
                        exploreProps.selectedInventoryLocation && (
                          <>
                            <Avatar
                              classNames={{
                                container: !exploreProps
                                  .selectedInventoryLocation?.avatar
                                  ? [
                                      styles['no-avatar-container'],
                                      styles['no-avatar-container-mobile'],
                                    ].join(' ')
                                  : [
                                      styles['avatar-container'],
                                      styles['avatar-container-mobile'],
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
                            />
                            <div
                              className={[styles['navigation-back-title']].join(
                                ' '
                              )}
                            >
                              {exploreProps.selectedInventoryLocation
                                ?.company ?? ''}
                            </div>
                          </>
                        )}
                      {activeRoute === RoutePathsType.AccountHelp && (
                        <>
                          <Line.HelpOutline size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('help')}
                          </div>
                        </>
                      )}
                      {activeRoute === RoutePathsType.TermsOfService && (
                        <>
                          <Line.Gavel size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('termsOfService')}
                          </div>
                        </>
                      )}
                      {activeRoute === RoutePathsType.PrivacyPolicy && (
                        <>
                          <Line.Gavel size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('privacyPolicy')}
                          </div>
                        </>
                      )}
                      {activeRoute === RoutePathsType.Checkout && (
                        <>
                          <Line.ShoppingCart size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('checkout')}
                          </div>
                        </>
                      )}
                      {activeRoute === RoutePathsType.OrderConfirmedWithId && (
                        <>
                          <Line.ShoppingCart size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('orderConfirmed')}
                          </div>
                        </>
                      )}
                      {activeRoute === RoutePathsType.AccountAddFriends && (
                        <>
                          <Line.PersonAddAlt1 size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('addFriends')}
                          </div>
                        </>
                      )}
                      {WindowController.isLocationAccountWithId(
                        location.pathname ?? ''
                      ) && (
                        <div
                          className={[styles['navigation-back-title']].join(
                            ' '
                          )}
                          style={{ textTransform: 'lowercase' }}
                        >
                          {accountPublicProps.account?.username ?? ''}
                        </div>
                      )}
                      {WindowController.isLocationAccountStatusWithId(
                        location.pathname ?? ''
                      ) && (
                        <div
                          className={[styles['navigation-back-title']].join(
                            ' '
                          )}
                          style={{ textTransform: 'lowercase' }}
                        >
                          {accountPublicProps.account?.username ?? ''}
                        </div>
                      )}
                      {activeRoute === RoutePathsType.AccountSettings && (
                        <>
                          <Line.Settings size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('settings')}
                          </div>
                        </>
                      )}
                      {activeRoute ===
                        RoutePathsType.AccountSettingsAccount && (
                        <>
                          <Line.Person size={22} />
                          <div
                            className={[styles['navigation-back-title']].join(
                              ' '
                            )}
                          >
                            {t('account')}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
              {!windowProps.showNavigateBack && (
                <div
                  className={[
                    styles['tab-container'],
                    styles['tab-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['left-tab-container'],
                      styles['left-tab-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['tab-button-container'],
                        styles['tab-button-container-mobile'],
                      ].join(' ')}
                    >
                      <Button
                        rippleProps={{
                          color: 'rgba(252, 245, 227, .35)',
                        }}
                        onClick={() =>
                          navigate({
                            pathname: RoutePathsType.Explore,
                            search: query.toString(),
                          })
                        }
                        disabled={
                          windowProps.activeRoute === RoutePathsType.Cart
                        }
                        type={'text'}
                        rounded={true}
                        size={'tiny'}
                        touchScreen={true}
                        icon={
                          windowProps.activeRoute === RoutePathsType.Explore ||
                          windowProps.activeRoute === RoutePathsType.Default ? (
                            <Solid.Explore
                              size={24}
                              color={'rgba(252, 245, 227, 1)'}
                            />
                          ) : (
                            <Line.Explore
                              size={24}
                              color={'rgba(252, 245, 227, .6)'}
                            />
                          )
                        }
                      />
                    </div>
                    <div
                      className={[
                        styles['tab-button-container'],
                        styles['tab-button-container-mobile'],
                      ].join(' ')}
                    >
                      <Button
                        rippleProps={{
                          color: 'rgba(252, 245, 227, .35)',
                        }}
                        onClick={() =>
                          navigate({
                            pathname: RoutePathsType.Store,
                            search: query.toString(),
                          })
                        }
                        disabled={
                          windowProps.activeRoute === RoutePathsType.Cart
                        }
                        type={'text'}
                        rounded={true}
                        size={'tiny'}
                        touchScreen={true}
                        icon={
                          windowProps.activeRoute === RoutePathsType.Store ? (
                            <Solid.Store
                              size={24}
                              color={'rgba(252, 245, 227, 1)'}
                            />
                          ) : (
                            <Line.Store
                              size={24}
                              color={'rgba(252, 245, 227, .6)'}
                            />
                          )
                        }
                      />
                    </div>
                    {/* <div className={styles['tab-button-container']}>
                    <Button
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      onClick={() => navigate(RoutePathsType.Events)}
                      disabled={windowProps.activeRoute === RoutePathsType.Cart}
                      type={'text'}
                      rounded={true}
                      size={'tiny'}
                      touchScreen={true}
                      icon={
                        <Line.Event
                          size={24}
                          color={
                            windowProps.activeRoute === RoutePathsType.Events
                              ? 'rgba(252, 245, 227, 1)'
                              : 'rgba(252, 245, 227, .6)'
                          }
                        />
                      }
                    />
                  </div> */}
                  </div>
                  <div
                    className={[
                      styles['right-tab-container'],
                      styles['right-tab-container-mobile'],
                    ].join(' ')}
                  >
                    {!windowProps.account && (
                      <>
                        <div
                          className={[
                            styles['tab-button-container'],
                            styles['tab-button-container-mobile'],
                          ].join(' ')}
                        >
                          <LanguageSwitch
                            open={isLanguageOpen}
                            onOpen={() => setIsLanguageOpen(true)}
                            onClose={() => setIsLanguageOpen(false)}
                            touchScreen={true}
                            supportedLanguages={[
                              { isoCode: 'en', countryCode: 'GB' },
                              { isoCode: 'fr', countryCode: 'FR' },
                            ]}
                            rippleProps={{
                              color: 'rgba(252, 245, 227, .35)',
                            }}
                            hideText={true}
                            language={windowLocalProps.languageCode}
                            onChange={(isoCode, info) =>
                              WindowController.updateLanguageInfo(isoCode, info)
                            }
                          />
                        </div>
                        <div
                          className={[
                            styles['tab-button-container'],
                            styles['tab-button-container-mobile'],
                          ].join(' ')}
                        >
                          <Button
                            rippleProps={{
                              color: 'rgba(252, 245, 227, .35)',
                            }}
                            disabled={
                              windowProps.activeRoute === RoutePathsType.Cart
                            }
                            onClick={() => setOpenMore(true)}
                            type={'text'}
                            rounded={true}
                            size={'tiny'}
                            touchScreen={true}
                            icon={
                              <Line.MoreVert
                                size={24}
                                color={
                                  windowProps.activeRoute ===
                                  RoutePathsType.Cart
                                    ? 'rgba(252, 245, 227, .6)'
                                    : 'rgba(252, 245, 227, 1)'
                                }
                              />
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
                            styles['tab-button-container'],
                            styles['tab-button-container-mobile'],
                          ].join(' ')}
                        >
                          <Button
                            rippleProps={{
                              color: 'rgba(252, 245, 227, .35)',
                            }}
                            onClick={() =>
                              navigate({
                                pathname: RoutePathsType.AccountLikes,
                                search: query.toString(),
                              })
                            }
                            disabled={
                              windowProps.activeRoute === RoutePathsType.Cart
                            }
                            type={'text'}
                            rounded={true}
                            size={'tiny'}
                            touchScreen={true}
                            icon={
                              account?.status === 'Incomplete' ? (
                                <Line.AccountCircle
                                  size={24}
                                  color={
                                    windowProps.activeRoute?.startsWith(
                                      `${RoutePathsType.Account}/`
                                    ) &&
                                    !WindowController.isLocationAccountWithId(
                                      location.pathname
                                    )
                                      ? 'rgba(252, 245, 227, 1)'
                                      : 'rgba(252, 245, 227, .6)'
                                  }
                                />
                              ) : (
                                <div
                                  className={
                                    windowProps.activeRoute?.startsWith(
                                      `${RoutePathsType.Account}/`
                                    ) &&
                                    !WindowController.isLocationAccountWithId(
                                      location.pathname
                                    )
                                      ? [
                                          styles['avatar-container-selected'],
                                          styles[
                                            'avatar-container-selected-mobile'
                                          ],
                                        ].join(' ')
                                      : undefined
                                  }
                                >
                                  <Avatar
                                    classNames={{
                                      container: [
                                        styles['avatar-container'],
                                        styles['avatar-container-mobile'],
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
              )}
            </div>
          </div>
        </CSSTransition>
        <ToastOverlay
          classNames={{
            root: [
              styles['toast-overlay-root'],
              styles['toast-overlay-root-mobile'],
            ].join(' '),
            overlayContainer: [
              styles['toast-overlay-container'],
              styles['toast-overlay-container-mobile'],
            ].join(' '),
            toast: {
              life: [styles['toast-life'], styles['toast-life-mobile']].join(
                ' '
              ),
            },
          }}
          timeout={2500}
          toasts={windowProps.toast ? [windowProps.toast] : []}
          transition={'down'}
          align={'center'}
          touchScreen={true}
        />
        {createPortal(
          <>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-mobile'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-mobile']].join(' '),
                text: [styles['modal-text'], styles['modal-text-mobile']].join(
                  ' '
                ),
                title: [
                  styles['modal-title'],
                  styles['modal-title-mobile'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-mobile'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-mobile'],
                  styles['modal-address-footer-button-container-mobile'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-mobile'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-mobile'],
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
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
              open={openMore}
              touchScreen={true}
              onClose={() => setOpenMore(false)}
            >
              <Dropdown.Item
                onClick={() => {
                  navigate({
                    pathname: RoutePathsType.Help,
                    search: query.toString(),
                  });
                  setOpenMore(false);
                }}
              >
                <Dropdown.Icon>
                  <Line.HelpOutline size={24} color={'#2A2A5F'} />
                </Dropdown.Icon>
                <span
                  className={[
                    styles['dropdown-text'],
                    styles['dropdown-text-mobile'],
                  ].join(' ')}
                >
                  {t('help')}
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate({
                    pathname: RoutePathsType.Signin,
                    search: query.toString(),
                  });
                  setOpenMore(false);
                }}
              >
                <Dropdown.Icon>
                  <Line.Login size={24} color={'#2A2A5F'} />
                </Dropdown.Icon>
                <span
                  className={[
                    styles['dropdown-text'],
                    styles['dropdown-text-mobile'],
                  ].join(' ')}
                >
                  {t('signin')}
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate({
                    pathname: RoutePathsType.Signup,
                    search: query.toString(),
                  });
                  setOpenMore(false);
                }}
              >
                <Dropdown.Icon>
                  <Line.PersonAdd size={24} color={'#2A2A5F'} />
                </Dropdown.Icon>
                <span
                  className={[
                    styles['dropdown-text'],
                    styles['dropdown-text-mobile'],
                  ].join(' ')}
                >
                  {t('signup')}
                </span>
              </Dropdown.Item>
            </Dropdown>
          </>,
          document.body
        )}
        <BannerOverlay
          classNames={{
            root: [
              styles['banner-overlay-root'],
              styles['banner-overlay-root-mobile'],
            ].join(' '),
          }}
          touchScreen={true}
          transition={'up'}
          align={'center'}
          banners={windowProps.banner ? [windowProps.banner] : []}
        />
      </div>
    </ResponsiveMobile>
  );
}
