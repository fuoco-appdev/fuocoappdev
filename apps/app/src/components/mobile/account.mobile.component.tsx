import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import * as core from '../../protobuf/core_pb';
import AccountProfileFormComponent from '../account-profile-form.component';
import { Customer } from '@medusajs/medusa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMobileEffect } from '../responsive.component';

export function AccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useMobileEffect(() => {
    const loadedLocation = windowProps.loadedLocationPath as string | undefined;
    if (loadedLocation && loadedLocation !== RoutePaths.Account) {
      if (
        loadedLocation.startsWith(RoutePaths.Account) &&
        !loadedLocation.startsWith(RoutePaths.AccountSettings)
      ) {
        AccountController.updateActiveTabId(loadedLocation);
      }
      WindowController.updateLoadedLocationPath(undefined);
    } else {
      if (!loadedLocation?.startsWith(RoutePaths.AccountSettings)) {
        navigate(props.activeTabId);
      }
    }
  }, [windowProps.loadedLocationPath]);

  const account = props.account as core.Account;
  const customer = props.customer as Customer;
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}>
        <div
          className={[
            styles['left-tab-container'],
            styles['left-tab-container-mobile'],
          ].join(' ')}
        ></div>
        <div
          className={[
            styles['right-tab-container'],
            styles['right-tab-container-mobile'],
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
                color: 'rgba(88, 40, 109, .35)',
              }}
              onClick={() =>
                setTimeout(() => navigate(RoutePaths.AccountSettings), 150)
              }
              type={'text'}
              rounded={true}
              size={'tiny'}
              touchScreen={true}
              icon={<Line.Settings size={24} color={'#2A2A5F'} />}
            />
          </div>
        </div>
      </div>
      {account?.status === 'Incomplete' && (
        <div
          className={[
            styles['incomplete-profile-container'],
            styles['incomplete-profile-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['complete-profile-title'],
              styles['complete-profile-title-mobile'],
            ].join(' ')}
          >
            {t('completeProfile')}
          </div>
          <div
            className={[
              styles['form-container'],
              styles['form-container-mobile'],
            ].join(' ')}
          >
            <AccountProfileFormComponent
              values={props.profileForm}
              errors={props.profileFormErrors}
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
              classNames={{
                container: [
                  styles['submit-button-container'],
                  styles['submit-button-container-mobile'],
                ].join(' '),
                button: [
                  styles['submit-button'],
                  styles['submit-button-mobile'],
                ].join(' '),
              }}
              block={true}
              size={'large'}
              icon={<Line.Done size={24} />}
              onClick={() => {
                AccountController.updateProfileErrors({
                  firstName: undefined,
                  lastName: undefined,
                  phoneNumber: undefined,
                });
                const errors = AccountController.getProfileFormErrors(
                  props.profileForm
                );
                if (errors) {
                  AccountController.updateProfileErrors(errors);
                  return;
                }
                AccountController.completeProfileAsync();
              }}
            >
              {t('complete')}
            </Button>
          </div>
        </div>
      )}
      {account?.status === 'Complete' && (
        <>
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
                },
              }}
              text={customer?.first_name}
              src={props.profileUrl}
              editMode={true}
              onChange={AccountController.uploadAvatarAsync}
              size={'large'}
              touchScreen={true}
            />
          </div>
          <div
            className={[styles['username'], styles['username-mobile']].join(
              ' '
            )}
          >
            {customer ? (
              `${customer?.first_name} ${customer?.last_name}`
            ) : (
              <Skeleton
                count={1}
                borderRadius={9999}
                className={[
                  styles['skeleton-user'],
                  styles['skeleton-user-mobile'],
                ].join(' ')}
              />
            )}
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
              activeId={props.activeTabId}
              classNames={{
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
                AccountController.updateActiveTabId(id);
                navigate(id);
              }}
              type={'underlined'}
              tabs={[
                {
                  id: RoutePaths.AccountOrderHistory,
                  icon: <Line.History size={24} />,
                },
                {
                  id: RoutePaths.AccountAddresses,
                  icon: <Line.LocationOn size={24} />,
                },
                {
                  id: RoutePaths.AccountEdit,
                  icon: <Line.Edit size={24} />,
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
                      props.activeTabIndex > props.prevTabIndex
                        ? styles['left-to-right-enter']
                        : styles['right-to-left-enter'],
                    enterActive:
                      props.activeTabIndex > props.prevTabIndex
                        ? styles['left-to-right-enter-active']
                        : styles['right-to-left-enter-active'],
                    exit:
                      props.activeTabIndex > props.prevTabIndex
                        ? styles['left-to-right-exit']
                        : styles['right-to-left-exit'],
                    exitActive:
                      props.activeTabIndex > props.prevTabIndex
                        ? styles['left-to-right-exit-active']
                        : styles['right-to-left-exit-active'],
                  },
                  timeout: 250,
                })
              }
            >
              <CSSTransition
                key={props.activeTabIndex}
                classNames={{
                  enter:
                    props.activeTabIndex < props.prevTabIndex
                      ? styles['left-to-right-enter']
                      : styles['right-to-left-enter'],
                  enterActive:
                    props.activeTabIndex < props.prevTabIndex
                      ? styles['left-to-right-enter-active']
                      : styles['right-to-left-enter-active'],
                  exit:
                    props.activeTabIndex < props.prevTabIndex
                      ? styles['left-to-right-exit']
                      : styles['right-to-left-exit'],
                  exitActive:
                    props.activeTabIndex < props.prevTabIndex
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
        </>
      )}
    </div>
  );
}
