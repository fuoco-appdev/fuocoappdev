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
import { AccountState } from '../models/account.model';
import { AccountEditSuspenseTabletComponent } from './tablet/suspense/account-edit.suspense.tablet.component';

const AccountEditDesktopComponent = lazy(
  () => import('./desktop/account-edit.desktop.component')
);
const AccountEditTabletComponent = lazy(
  () => import('./tablet/account-edit.tablet.component')
);
const AccountEditMobileComponent = lazy(
  () => import('./mobile/account-edit.mobile.component')
);

export interface AccountEditResponsiveProps {
  storeProps: StoreState;
  accountProps: AccountState;
  onSaveAsync: () => void;
}

export default function AccountEditComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [storeProps] = useObservable(StoreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);

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
      <AccountEditSuspenseDesktopComponent />
      <AccountEditSuspenseTabletComponent />
      <AccountEditSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountEditDesktopComponent
          storeProps={storeProps}
          accountProps={accountProps}
          onSaveAsync={onSaveAsync}
        />
        <AccountEditTabletComponent
          storeProps={storeProps}
          accountProps={accountProps}
          onSaveAsync={onSaveAsync}
        />
        <AccountEditMobileComponent
          storeProps={storeProps}
          accountProps={accountProps}
          onSaveAsync={onSaveAsync}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
