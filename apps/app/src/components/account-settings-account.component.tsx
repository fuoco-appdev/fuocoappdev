import { useState } from 'react';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountSettingsAccountDesktopComponent } from './desktop/account-settings-account.desktop.component';
import { AccountSettingsAccountMobileComponent } from './mobile/account-settings-account.mobile.component';
import { WindowLocalState } from '../models/window.model';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import AccountController from '../controllers/account.controller';
import { Store } from '@ngneat/elf';
import { AccountState } from '../models/account.model';

export interface AccountSettingsAccountResponsiveProps {
  accountProps: AccountState;
  windowLocalProps: WindowLocalState;
  updatePasswordError: string | undefined;
  setUpdatePasswordError: (value: string | undefined) => void;
  confirmPasswordError: string | undefined;
  setConfirmPasswordError: (value: string | undefined) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  isLanguageOpen: boolean;
  setIsLanguageOpen: (value: boolean) => void;
}

export default function AccountSettingsAccountComponent(): JSX.Element {
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const [accountProps] = useObservable(AccountController.model.store);
  const [updatePasswordError, setUpdatePasswordError] = useState<
    string | undefined
  >(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  return (
    <>
      <ResponsiveDesktop inheritStyles={false}>
        <AccountSettingsAccountDesktopComponent
          accountProps={accountProps}
          windowLocalProps={windowLocalProps}
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountSettingsAccountMobileComponent
          accountProps={accountProps}
          windowLocalProps={windowLocalProps}
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveMobile>
    </>
  );
}
