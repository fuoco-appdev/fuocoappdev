import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import StoreController from '../controllers/store.controller';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import { AccountEditSuspenseDesktopComponent } from './desktop/suspense/account-edit.suspense.desktop.component';
import React from 'react';
import { AccountEditSuspenseMobileComponent } from './mobile/suspense/account-edit.suspense.mobile.component';

const AccountEditDesktopComponent = lazy(
  () => import('./desktop/account-edit.desktop.component')
);
const AccountEditMobileComponent = lazy(
  () => import('./mobile/account-edit.mobile.component')
);

export interface AccountEditResponsiveProps {
  storeProps: StoreState;
  onSaveAsync: () => void;
}

export default function AccountEditComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [storeProps] = useObservable(StoreController.model.store);

  const onSaveAsync = async () => {
    await AccountController.updateCustomerAsync(
      AccountController.model.profileForm
    );
    WindowController.addToast({
      key: `update-customer-${Math.random()}`,
      message: t('successfullyUpdatedUser') ?? '',
      description: t('successfullyUpdatedUserDescription') ?? '',
      type: 'success',
    });
  };

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <AccountEditSuspenseDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <AccountEditSuspenseMobileComponent />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <ResponsiveDesktop>
          <AccountEditDesktopComponent
            storeProps={storeProps}
            onSaveAsync={onSaveAsync}
          />
        </ResponsiveDesktop>
        <ResponsiveMobile>
          <AccountEditMobileComponent
            storeProps={storeProps}
            onSaveAsync={onSaveAsync}
          />
        </ResponsiveMobile>
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
