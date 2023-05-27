import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import styles from './window.module.scss';
import {
  Alert,
  Button,
  Dropdown,
  LanguageCode,
  LanguageSwitch,
  Line,
  Solid,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';

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

  return <></>;
}

function WindowMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [props] = useObservable(WindowController.model.store);
  const { t, i18n } = useTranslation();
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  return (
    <div className={styles['root']}>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['bottom-bar']}>
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
                <span className={styles['cart-number']}>{props.cartCount}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles['tab-container']}>
          <div className={styles['left-tab-container']}>
            {!props.showNavigateBack && (
              <>
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
                <div className={styles['tab-button-container']}>
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
                </div>
              </>
            )}
            {props.showNavigateBack && (
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
                    <Line.ArrowBack
                      size={24}
                      color={'rgba(252, 245, 227, 1)'}
                    />
                  }
                />
              </div>
            )}
          </div>
          <div className={styles['right-tab-container']}>
            {!props.isAuthenticated && !props.showNavigateBack && (
              <>
                <div className={styles['tab-button-container']}>
                  <LanguageSwitch
                    touchScreen={true}
                    supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                    hideText={true}
                    language={localProps.language}
                    onChange={(value) => WindowController.updateLanguage(value)}
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
            {props.isAuthenticated && (
              <>
                <div className={styles['tab-button-container']}>
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
                </div>
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
                      <Line.AccountCircle
                        size={24}
                        color={
                          props.activeRoute === RoutePaths.Account
                            ? 'rgba(252, 245, 227, 1)'
                            : 'rgba(252, 245, 227, .6)'
                        }
                      />
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
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
  const confirmEmailTransitionStyle = useSpring({
    from: { y: -200 },
    to: props.showConfirmEmailAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });
  const passwordResetTransitionStyle = useSpring({
    from: { y: -200 },
    to: props.showPasswordResetAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });

  useEffect(() => {
    if (!isMounted.current) {
      WindowController.checkUserIsAuthenticatedAsync();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location, props.authState]);

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
      <ResponsiveMobile>
        <WindowMobileComponent />
      </ResponsiveMobile>
      <Alert
        className={styles['alert']}
        style={confirmEmailTransitionStyle}
        title={t('emailConfirmation')}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() => WindowController.updateShowConfirmEmailAlert(false)}
      >
        {t('emailConfirmationDescription')}
      </Alert>
      <Alert
        className={styles['alert']}
        style={passwordResetTransitionStyle}
        title={t('passwordReset')}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() =>
          WindowController.updateShowPasswordResetAlert(false)
        }
      >
        {t('passwordResetDescription')}
      </Alert>
      <LoadingComponent isVisible={props.isLoading} />
    </div>
  );
}
