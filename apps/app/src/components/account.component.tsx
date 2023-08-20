import { useEffect } from 'react';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import { useObservable } from '@ngneat/use-observable';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';
import { AccountMobileComponent } from './mobile/account.mobile.component';
import { AccountDesktopComponent } from './desktop/account.desktop.component';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AccountComponent(): JSX.Element {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AccountController.updateErrorStrings({
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  return (
    <>
      <ResponsiveDesktop>
        <AccountDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
