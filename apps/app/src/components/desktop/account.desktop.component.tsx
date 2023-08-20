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
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import { useTranslation } from 'react-i18next';
import * as core from '../../protobuf/core_pb';
import AccountProfileFormComponent from '../account-profile-form.component';
import { Customer } from '@medusajs/medusa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AccountOrderHistoryComponent from '../account-order-history.component';
import AccountAddressesComponent from '../account-addresses.component';

export function AccountDesktopComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadedLocation = windowProps.loadedHash as string | undefined;
    if (loadedLocation && loadedLocation !== `#${RoutePaths.Account}`) {
      const formattedLocation = loadedLocation.replace('#', '');
      if (
        formattedLocation.startsWith(RoutePaths.Account) &&
        !formattedLocation.startsWith(RoutePaths.AccountSettings)
      ) {
        AccountController.updateActiveTabId(formattedLocation);
      }
      WindowController.updateLoadedHash(undefined);
      navigate(formattedLocation);
    } else {
      if (!loadedLocation?.startsWith(`#${RoutePaths.AccountSettings}`)) {
        navigate(RoutePaths.Account);
      }
    }

    if (location.hash.startsWith(`#${RoutePaths.Account}/access_token=`)) {
      navigate(RoutePaths.Account);
    }
  }, [location.hash, windowProps.loadedLocation]);

  const account = props.account as core.Account;
  const customer = props.customer as Customer;
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}>
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
              rippleProps={{
                color: 'rgba(88, 40, 109, .35)',
              }}
              onClick={() =>
                setTimeout(() => navigate(RoutePaths.AccountSettings), 150)
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
      {account?.status === 'Incomplete' && (
        <div
          className={[
            styles['incomplete-profile-container'],
            styles['incomplete-profile-container-desktop'],
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
                },
              }}
              text={customer?.first_name}
              src={props.profileUrl}
              editMode={true}
              onChange={AccountController.uploadAvatarAsync}
              size={'large'}
            />
          </div>
          <div
            className={[styles['username'], styles['username-desktop']].join(
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
                  styles['skeleton-user-desktop'],
                ].join(' ')}
              />
            )}
          </div>
          <div
            className={[styles['content'], styles['content-desktop']].join(' ')}
          >
            <div
              className={[
                styles['left-content'],
                styles['left-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                  styles['left-card-container-desktop'],
                ].join(' ')}
              >
                <AccountOrderHistoryComponent />
              </div>
            </div>
            <div
              className={[
                styles['right-content'],
                styles['right-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                ].join(' ')}
              >
                <AccountAddressesComponent />
              </div>
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                ].join(' ')}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
