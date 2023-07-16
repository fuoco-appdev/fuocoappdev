import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import styles from './window.module.scss';
import {
  Alert,
  Avatar,
  Button,
  Dropdown,
  LanguageCode,
  LanguageSwitch,
  Line,
  ToastOverlay,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Customer } from '@medusajs/medusa';
import AccountController from '../controllers/account.controller';

function WindowDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(WindowController.model.store);
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  return (
    <div className={styles['root-desktop']}>
      <div className={styles['content-container-desktop']}>
        <img
          src={'../assets/svg/logo.svg'}
          className={styles['logo-desktop']}
        />
        <div className={styles['not-supported-text-desktop']}>
          {t('desktopNotSupported')}
        </div>
      </div>
    </div>
  );
}

function WindowTabletComponent(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(WindowController.model.store);
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  return (
    <div className={styles['root-tablet']}>
      <div className={styles['content-container-tablet']}>
        <img src={'../assets/svg/logo.svg'} className={styles['logo-tablet']} />
        <div className={styles['not-supported-text-tablet']}>
          {t('tabletNotSupported')}
        </div>
      </div>
    </div>
  );
}

function WindowMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [props] = useObservable(WindowController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => WindowController.updateCurrentPosition(position),
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  useEffect(() => {
    WindowController.addToast(undefined);
  }, [props.toast]);

  const account = props.account as core.Account;
  const customer = accountProps.customer as Customer;
  return (
    <div className={styles['root']}>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['bottom-bar']}>
        {!props.hideCartButton && (
          <div className={styles['shopping-cart-container']}>
            <div className={styles['shopping-cart-container-details']}>
              <Button
                classNames={{
                  container: styles['shopping-cart-button-container'],
                  button: styles['shopping-cart-button'],
                }}
                rippleProps={{
                  color: 'rgba(88, 40, 109, .35)',
                }}
                onClick={() => {
                  if (props.activeRoute === RoutePaths.Cart) {
                    navigate(-1);
                  } else {
                    navigate(RoutePaths.Cart);
                  }
                }}
                type={'primary'}
                rounded={true}
                size={'small'}
                touchScreen={true}
                icon={
                  props.activeRoute !== RoutePaths.Cart ? (
                    <Line.ShoppingCart size={22} color={'#2A2A5F'} />
                  ) : (
                    <Line.Close size={22} color={'#2A2A5F'} />
                  )
                }
              />
              {props.activeRoute !== RoutePaths.Cart && props.cartCount > 0 && (
                <div className={styles['cart-number-container']}>
                  <span className={styles['cart-number']}>
                    {props.cartCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {props.showNavigateBack && (
          <div className={styles['navigation-back-container']}>
            <div className={styles['tab-button-container']}>
              <Button
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                onClick={() => setTimeout(() => navigate(-1), 150)}
                type={'text'}
                rounded={true}
                size={'tiny'}
                touchScreen={true}
                icon={
                  <Line.ArrowBack size={24} color={'rgba(252, 245, 227, 1)'} />
                }
              />
            </div>
            {props.hideCartButton && (
              <div className={styles['navigation-back-text-container']}>
                {props.activeRoute === RoutePaths.Checkout && t('checkout')}
                {props.activeRoute === RoutePaths.OrderConfirmedWithId &&
                  t('confirmedOrder')}
              </div>
            )}
          </div>
        )}
        {!props.showNavigateBack && (
          <div className={styles['tab-container']}>
            <div className={styles['left-tab-container']}>
              <div className={styles['tab-button-container']}>
                <Button
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  onClick={() => navigate(RoutePaths.Home)}
                  disabled={props.activeRoute === RoutePaths.Cart}
                  type={'text'}
                  rounded={true}
                  size={'tiny'}
                  touchScreen={true}
                  icon={
                    <Line.Home
                      size={24}
                      color={
                        props.activeRoute === RoutePaths.Home ||
                        props.activeRoute === RoutePaths.Default
                          ? 'rgba(252, 245, 227, 1)'
                          : 'rgba(252, 245, 227, .6)'
                      }
                    />
                  }
                />
              </div>
              <div className={styles['tab-button-container']}>
                <Button
                  rippleProps={{
                    color: 'rgba(252, 245, 227, .35)',
                  }}
                  onClick={() => navigate(RoutePaths.Store)}
                  disabled={props.activeRoute === RoutePaths.Cart}
                  type={'text'}
                  rounded={true}
                  size={'tiny'}
                  touchScreen={true}
                  icon={
                    <Line.Storefront
                      size={24}
                      color={
                        props.activeRoute === RoutePaths.Store
                          ? 'rgba(252, 245, 227, 1)'
                          : 'rgba(252, 245, 227, .6)'
                      }
                    />
                  }
                />
              </div>
              {/* <div className={styles['tab-button-container']}>
                  <Button
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    onClick={() => navigate(RoutePaths.Events)}
                    disabled={props.activeRoute === RoutePaths.Cart}
                    type={'text'}
                    rounded={true}
                    size={'tiny'}
                    touchScreen={true}
                    icon={
                      <Line.Event
                        size={24}
                        color={
                          props.activeRoute === RoutePaths.Events
                            ? 'rgba(252, 245, 227, 1)'
                            : 'rgba(252, 245, 227, .6)'
                        }
                      />
                    }
                  />
                </div> */}
            </div>
            <div className={styles['right-tab-container']}>
              {!props.account && (
                <>
                  <div className={styles['tab-button-container']}>
                    <LanguageSwitch
                      touchScreen={true}
                      supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                      hideText={true}
                      language={localProps.language}
                      onChange={(value) =>
                        WindowController.updateLanguage(value)
                      }
                    />
                  </div>
                  <div className={styles['tab-button-container']}>
                    <Button
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      disabled={props.activeRoute === RoutePaths.Cart}
                      onClick={() => setOpenMore(true)}
                      type={'text'}
                      rounded={true}
                      size={'tiny'}
                      touchScreen={true}
                      icon={
                        <Line.MoreVert
                          size={24}
                          color={
                            props.activeRoute === RoutePaths.Cart
                              ? 'rgba(252, 245, 227, .6)'
                              : 'rgba(252, 245, 227, 1)'
                          }
                        />
                      }
                    />
                  </div>
                </>
              )}
              {props.account && (
                <>
                  {/* <div className={styles['tab-button-container']}>
                    <Button
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      onClick={() => navigate(RoutePaths.Notifications)}
                      disabled={props.activeRoute === RoutePaths.Cart}
                      type={'text'}
                      rounded={true}
                      size={'tiny'}
                      touchScreen={true}
                      icon={
                        <Line.Notifications
                          size={24}
                          color={
                            props.activeRoute === RoutePaths.Notifications
                              ? 'rgba(252, 245, 227, 1)'
                              : 'rgba(252, 245, 227, .6)'
                          }
                        />
                      }
                    />
                  </div> */}
                  <div className={styles['tab-button-container']}>
                    <Button
                      rippleProps={{
                        color: 'rgba(252, 245, 227, .35)',
                      }}
                      onClick={() => navigate(RoutePaths.Account)}
                      disabled={props.activeRoute === RoutePaths.Cart}
                      type={'text'}
                      rounded={true}
                      size={'tiny'}
                      touchScreen={true}
                      icon={
                        account?.status === 'Incomplete' ? (
                          <Line.AccountCircle
                            size={24}
                            color={
                              props.activeRoute.startsWith(
                                `${RoutePaths.Account}/`
                              )
                                ? 'rgba(252, 245, 227, 1)'
                                : 'rgba(252, 245, 227, .6)'
                            }
                          />
                        ) : (
                          <div
                            className={
                              props.activeRoute.startsWith(
                                `${RoutePaths.Account}/`
                              )
                                ? styles['avatar-container-selected']
                                : undefined
                            }
                          >
                            <Avatar
                              classNames={{
                                container: styles['avatar-container'],
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
      <ToastOverlay
        classNames={{
          root: styles['toast-overlay-root'],
          overlayContainer: styles['toast-overlay-container'],
          toast: {
            life: styles['toast-life'],
          },
        }}
        timeout={2500}
        toasts={props.toast ? [props.toast] : []}
        transition={'down'}
        align={'center'}
        touchScreen={true}
      />
      <Dropdown
        open={openMore}
        touchScreen={true}
        onClose={() => setOpenMore(false)}
      >
        <Dropdown.Item
          onClick={() => {
            navigate(RoutePaths.Signin);
            setOpenMore(false);
          }}
        >
          <Dropdown.Icon>
            <Line.Login size={24} color={'#2A2A5F'} />
          </Dropdown.Icon>
          <span className={styles['dropdown-text']}>{t('signin')}</span>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            navigate(RoutePaths.Signup);
            setOpenMore(false);
          }}
        >
          <Dropdown.Icon>
            <Line.PersonAdd size={24} color={'#2A2A5F'} />
          </Dropdown.Icon>
          <span className={styles['dropdown-text']}>{t('signup')}</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [props] = useObservable(WindowController.model.store);
  const isMounted = useRef<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isMounted.current) {
      WindowController.updateIsLoading(true);
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location.pathname, props.authState]);

  useEffect(() => {
    if (props.authState === 'SIGNED_IN') {
      if (props.activeRoute === RoutePaths.ResetPassword) {
        return;
      }

      navigate(RoutePaths.Account);
    } else if (props.authState === 'SIGNED_OUT') {
      navigate(RoutePaths.Signin);
    } else if (props.authState === 'USER_DELETED') {
      navigate(RoutePaths.Signup);
    } else if (props.authState === 'PASSWORD_RECOVERY') {
      navigate(RoutePaths.ResetPassword);
    }
  }, [props.authState]);

  return (
    <div className={styles['root']}>
      <ResponsiveDesktop>
        <WindowDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <WindowTabletComponent />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <WindowMobileComponent />
      </ResponsiveMobile>
      <LoadingComponent isVisible={props.isLoading} />
    </div>
  );
}
