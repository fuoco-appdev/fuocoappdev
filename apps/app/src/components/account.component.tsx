import { useEffect } from 'react';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';
import { AccountMobileComponent } from './mobile/account.mobile.component';
import { AccountDesktopComponent } from './desktop/account.desktop.component';
import { Helmet } from 'react-helmet';
import { AccountState } from '../models/account.model';
import { WindowState } from '../models/window.model';
import { StoreState } from '../models/store.model';

export interface AccountResponsiveProps {
  windowProps: WindowState;
  accountProps: AccountState;
  storeProps: StoreState;
}

export default function AccountComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [accountProps] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);

  useEffect(() => {
    AccountController.updateErrorStrings({
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <ResponsiveDesktop>
        <AccountDesktopComponent
          accountProps={accountProps}
          windowProps={windowProps}
          storeProps={storeProps}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountMobileComponent
          accountProps={accountProps}
          windowProps={windowProps}
          storeProps={storeProps}
        />
      </ResponsiveMobile>
    </>
  );
}
