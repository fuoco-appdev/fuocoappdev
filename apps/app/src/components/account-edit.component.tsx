import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountEditDesktopComponent } from './desktop/account-edit.desktop.component';
import { AccountEditMobileComponent } from './mobile/account-edit.mobile.component';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import StoreController from '../controllers/store.controller';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { AuthenticatedComponent } from './authenticated.component';

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

  return (
    <>
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
    </>
  );
}
