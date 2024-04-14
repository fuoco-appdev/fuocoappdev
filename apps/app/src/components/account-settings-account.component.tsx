import { lazy } from '@loadable/component';
import { Store } from '@ngneat/elf';
import { useObservable } from '@ngneat/use-observable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AccountController from '../controllers/account.controller';
import StoreController from '../controllers/store.controller';
import WindowController from '../controllers/window.controller';
import { AccountState } from '../models/account.model';
import { StoreState } from '../models/store.model';
import { WindowLocalState } from '../models/window.model';
import { AuthenticatedComponent } from './authenticated.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const AccountSettingsAccountDesktopComponent = lazy(
  () => import('./desktop/account-settings-account.desktop.component')
);
const AccountSettingsAccountTabletComponent = lazy(
  () => import('./tablet/account-settings-account.tablet.component')
);
const AccountSettingsAccountMobileComponent = lazy(
  () => import('./mobile/account-settings-account.mobile.component')
);

export interface AccountSettingsAccountResponsiveProps {
  accountProps: AccountState;
  storeProps: StoreState;
  windowLocalProps: WindowLocalState;
  updatePasswordError: string | undefined;
  setUpdatePasswordError: (value: string | undefined) => void;
  confirmPasswordError: string | undefined;
  setConfirmPasswordError: (value: string | undefined) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  isLanguageOpen: boolean;
  setIsLanguageOpen: (value: boolean) => void;
  onGeneralInformationSaveAsync: () => void;
}

export default function AccountSettingsAccountComponent(): JSX.Element {
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const [accountProps] = useObservable(AccountController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [updatePasswordError, setUpdatePasswordError] = React.useState<
    string | undefined
  >(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<
    string | undefined
  >(undefined);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const onGeneralInformationSaveAsync = async () => {
    const updated = await AccountController.updateGeneralInfoAsync(
      AccountController.model.profileForm
    );
    if (!updated) {
      return;
    }

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
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountSettingsAccountDesktopComponent
          accountProps={accountProps}
          storeProps={storeProps}
          windowLocalProps={windowLocalProps}
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          onGeneralInformationSaveAsync={onGeneralInformationSaveAsync}
        />
        <AccountSettingsAccountTabletComponent
          accountProps={accountProps}
          storeProps={storeProps}
          windowLocalProps={windowLocalProps}
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          onGeneralInformationSaveAsync={onGeneralInformationSaveAsync}
        />
        <AccountSettingsAccountMobileComponent
          accountProps={accountProps}
          storeProps={storeProps}
          windowLocalProps={windowLocalProps}
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          onGeneralInformationSaveAsync={onGeneralInformationSaveAsync}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
