import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const SettingsAccountDesktopComponent = React.lazy(
  () => import('./desktop/settings-account.desktop.component')
);
const SettingsAccountMobileComponent = React.lazy(
  () => import('./mobile/settings-account.mobile.component')
);

export interface SettingsAccountResponsiveProps {
  updatePasswordError: string | undefined;
  setUpdatePasswordError: (value: string | undefined) => void;
  confirmPasswordError: string | undefined;
  setConfirmPasswordError: (value: string | undefined) => void;
  isLanguageOpen: boolean;
  setIsLanguageOpen: (value: boolean) => void;
  onGeneralInformationSaveAsync: () => void;
}

function SettingsAccountComponent(): JSX.Element {
  const { AccountController } = React.useContext(DIContext);
  const { suspense } = AccountController.model;
  const [updatePasswordError, setUpdatePasswordError] = React.useState<
    string | undefined
  >(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<
    string | undefined
  >(undefined);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const onGeneralInformationSaveAsync = async () => {
    const updated = await AccountController.updateGeneralInfoAsync(
      AccountController.model.profileForm
    );
    if (!updated) {
      return;
    }

    // WindowController.addToast({
    //   key: `update-customer-${Math.random()}`,
    //   message: t('successfullyUpdatedUser') ?? '',
    //   description: t('successfullyUpdatedUserDescription') ?? '',
    //   type: 'success',
    // });
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <SettingsAccountDesktopComponent
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          onGeneralInformationSaveAsync={onGeneralInformationSaveAsync}
        />
        <SettingsAccountMobileComponent
          updatePasswordError={updatePasswordError}
          setUpdatePasswordError={setUpdatePasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
          isLanguageOpen={isLanguageOpen}
          setIsLanguageOpen={setIsLanguageOpen}
          onGeneralInformationSaveAsync={onGeneralInformationSaveAsync}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}

export default observer(SettingsAccountComponent);
