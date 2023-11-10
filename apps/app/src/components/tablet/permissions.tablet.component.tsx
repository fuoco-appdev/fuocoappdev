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
  Checkbox,
} from '@fuoco.appdev/core-ui';
import styles from '../permissions.module.scss';
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
import AccountEditComponent from '../account-edit.component';
import {
  ResponsiveDesktop,
  ResponsiveTablet,
  useDesktopEffect,
} from '../responsive.component';
import { AccountResponsiveProps } from '../account.component';
import { createPortal } from 'react-dom';
import { PermissionsResponsiveProps } from '../permissions.component';
import PermissionsController from 'src/controllers/permissions.controller';

export default function PermissionsTabletComponent({
  permissionsProps,
  windowProps,
  onAccessLocationChecked,
  onContinueAsync,
}: PermissionsResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['permissions-container'],
            styles['permissions-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['permissions-content'],
              styles['permissions-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['permissions-title'],
                styles['permissions-title-tablet'],
              ].join(' ')}
            >
              {t('permissions')}
            </div>
            <div
              className={[
                styles['form-container'],
                styles['form-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['permission-checkbox-container'],
                  styles['permission-checkbox-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['permission-checkbox-title-container'],
                    styles['permission-checkbox-title-container-tablet'],
                  ].join(' ')}
                >
                  <Line.LocationOn size={24} />
                  <div
                    className={[
                      styles['permission-checkbox-title'],
                      styles['permission-checkbox-title-tablet'],
                    ].join(' ')}
                  >
                    {t('accessLocation')}
                  </div>
                </div>
                <Checkbox
                  checked={permissionsProps.accessLocation}
                  onChange={onAccessLocationChecked}
                  classNames={{
                    checkbox: styles['checkbox'],
                    labelContainerLabel:
                      styles['checkbox-label-container-label'],
                    descriptionLabel: styles['checkbox-description-label'],
                  }}
                  id={'location'}
                  name={'location'}
                  label={t('accessLocationDescription') ?? ''}
                />
              </div>
            </div>
            <div>
              <Button
                classNames={{
                  container: [
                    styles['submit-button-container'],
                    styles['submit-button-container-tablet'],
                  ].join(' '),
                  button: [
                    styles['submit-button'],
                    styles['submit-button-tablet'],
                  ].join(' '),
                }}
                disabled={!permissionsProps.accessLocation}
                block={true}
                size={'large'}
                onClick={onContinueAsync}
              >
                {t('continue')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveTablet>
  );
}
