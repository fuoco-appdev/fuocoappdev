import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-edit.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import AccountProfileFormComponent from './account-profile-form.component';
import WindowController from '../controllers/window.controller';

function AccountEditDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);

  return <></>;
}

function AccountEditMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles['root']}>
      <div className={styles['edit-text-container']}>
        <div className={styles['edit-text']}>{t('edit')}</div>
      </div>
      <div className={styles['profile-form-container']}>
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
      <div className={styles['save-button-container']}>
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
          onClick={async () => {
            await AccountController.updateCustomerAsync(
              AccountController.model.profileForm
            );
            WindowController.addToast({
              key: `update-customer-${Math.random()}`,
              message: t('successfullyUpdatedUser') ?? '',
              description: t('successfullyUpdatedUserDescription') ?? '',
              type: 'success',
            });
          }}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
}

export default function AccountEditComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountEditDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountEditMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
