import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountEditDesktopComponent } from './desktop/account-edit.desktop.component';
import { AccountEditMobileComponent } from './mobile/account-edit.mobile.component';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import { useTranslation } from 'react-i18next';

export interface AccountEditResponsiveProps {
  onSaveAsync: () => void;
}

export default function AccountEditComponent(): JSX.Element {
  const { t, i18n } = useTranslation();

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

  return (
    <>
      <ResponsiveDesktop>
        <AccountEditDesktopComponent onSaveAsync={onSaveAsync} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountEditMobileComponent onSaveAsync={onSaveAsync} />
      </ResponsiveMobile>
    </>
  );
}
