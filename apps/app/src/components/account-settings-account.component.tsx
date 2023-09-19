import { useState } from 'react';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountSettingsAccountDesktopComponent } from './desktop/account-settings-account.desktop.component';
import { AccountSettingsAccountMobileComponent } from './mobile/account-settings-account.mobile.component';

export interface AccountSettingsAccountResponsiveProps {
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
