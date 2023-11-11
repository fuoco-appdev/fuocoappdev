import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-edit.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import AccountProfileFormComponent from '../account-profile-form.component';
import WindowController from '../../controllers/window.controller';
import { AccountEditResponsiveProps } from '../account-edit.component';
import { ResponsiveMobile, ResponsiveTablet } from '../responsive.component';

export default function AccountEditTabletComponent({
  storeProps,
  accountProps,
  onSaveAsync,
}: AccountEditResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['edit-text-container'],
            styles['edit-text-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[styles['edit-text'], styles['edit-text-tablet']].join(
              ' '
            )}
          >
            {t('edit')}
          </div>
        </div>
        <div
          className={[
            styles['profile-form-container'],
            styles['profile-form-container-tablet'],
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
        <div
          className={[
            styles['save-button-container'],
            styles['save-button-container-tablet'],
          ].join(' ')}
        >
          <Button
            classNames={{
              button: styles['save-button'],
            }}
            rippleProps={{
              color: 'rgba(233, 33, 66, .35)',
            }}
            touchScreen={true}
            block={true}
            size={'large'}
            onClick={onSaveAsync}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </ResponsiveTablet>
  );
}
