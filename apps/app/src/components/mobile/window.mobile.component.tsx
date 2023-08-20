import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WindowController from '../../controllers/window.controller';
import styles from '../window.module.scss';
import {
  Avatar,
  Button,
  Dropdown,
  LanguageSwitch,
  Line,
  ToastOverlay,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import { Customer } from '@medusajs/medusa';
import AccountController from '../../controllers/account.controller';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { WindowResponsiveProps } from '../window.component';

export function WindowMobileComponent({
  openMore,
  isLanguageOpen,
  setOpenMore,
  setIsLanguageOpen,
}: WindowResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(WindowController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const { t } = useTranslation();
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  const account = props.account as core.Account;
  const customer = accountProps.customer as Customer;
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <TransitionGroup
          component={null}
          childFactory={(child) =>
            React.cloneElement(child, {
              classNames: {
                enter:
                  props.transitionKeyIndex < props.prevTransitionKeyIndex
                    ? styles['left-to-right-enter']
                    : styles['right-to-left-enter'],
                enterActive:
                  props.transitionKeyIndex < props.prevTransitionKeyIndex
                    ? styles['left-to-right-enter-active']
                    : styles['right-to-left-enter-active'],
                exit:
                  props.transitionKeyIndex < props.prevTransitionKeyIndex
                    ? styles['left-to-right-exit']
                    : styles['right-to-left-exit'],
                exitActive:
                  props.transitionKeyIndex < props.prevTransitionKeyIndex
                    ? styles['left-to-right-exit-active']
                    : styles['right-to-left-exit-active'],
              },
              timeout: 250,
            })
          }
        >
          <CSSTransition
            key={props.transitionKeyIndex}
            classNames={{
              enter:
                props.transitionKeyIndex > props.prevTransitionKeyIndex
                  ? styles['left-to-right-enter']
                  : styles['right-to-left-enter'],
              enterActive:
                props.transitionKeyIndex > props.prevTransitionKeyIndex
                  ? styles['left-to-right-enter-active']
                  : styles['right-to-left-enter-active'],
              exit:
                props.transitionKeyIndex > props.prevTransitionKeyIndex
                  ? styles['left-to-right-exit']
                  : styles['right-to-left-exit'],
              exitActive:
                props.transitionKeyIndex > props.prevTransitionKeyIndex
                  ? styles['left-to-right-exit-active']
                  : styles['right-to-left-exit-active'],
            }}
            timeout={250}
            unmountOnExit={true}
          >
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className={[styles['bottom-bar-mobile']].join(' ')}>
        {!props.hideCartButton && (
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
                  color: 'rgba(88, 40, 109, .35)',
                }}
                onClick={() => {
                  if (props.activeRoute === RoutePaths.Cart) {
                    navigate(-1);
                  } else {
                    setTimeout(() => navigate(RoutePaths.Cart), 150);
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
                    {props.cartCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {props.showNavigateBack && (
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
              <div
                className={[
                  styles['navigation-back-text-container'],
                  styles['navigation-back-text-container-mobile'],
                ].join(' ')}
              >
                {props.activeRoute === RoutePaths.TermsOfService &&
                  t('termsOfService')}
                {props.activeRoute === RoutePaths.PrivacyPolicy &&
                  t('privacyPolicy')}
                {props.activeRoute === RoutePaths.Checkout && t('checkout')}
                {props.activeRoute === RoutePaths.OrderConfirmedWithId &&
                  t('confirmedOrder')}
                {props.activeRoute === RoutePaths.AccountSettings &&
                  t('settings')}
                {props.activeRoute === RoutePaths.AccountSettingsAccount &&
                  t('security')}
              </div>
            )}
          </div>
        )}
        {!props.showNavigateBack && (
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
            <div
              className={[
                styles['right-tab-container'],
                styles['right-tab-container-mobile'],
              ].join(' ')}
            >
              {!props.account && (
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
                      hideText={true}
                      language={localProps.languageCode}
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
                              props.activeRoute?.startsWith(
                                `${RoutePaths.Account}/`
                              )
                                ? 'rgba(252, 245, 227, 1)'
                                : 'rgba(252, 245, 227, .6)'
                            }
                          />
                        ) : (
                          <div
                            className={
                              props.activeRoute?.startsWith(
                                `${RoutePaths.Account}/`
                              )
                                ? [
                                    styles['avatar-container-selected'],
                                    styles['avatar-container-selected-mobile'],
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
            life: [styles['toast-life'], styles['toast-life-mobile']].join(' '),
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
            navigate(RoutePaths.Signup);
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
    </div>
  );
}
