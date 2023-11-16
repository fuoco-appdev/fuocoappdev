import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import AccountController from '../controllers/account.controller';
import styles from './window.module.scss';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { WindowLocalState, WindowState } from '../models/window.model';
import { AccountState } from '../models/account.model';
import { lazy } from '@loadable/component';
import { useQuery } from '../route-paths';
import { WindowSuspenseDesktopComponent } from './desktop/suspense/window.suspense.desktop.component';
import { WindowSuspenseMobileComponent } from './mobile/suspense/window.suspense.mobile.component';
import HomeController from '../controllers/home.controller';
import { WindowSuspenseTabletComponent } from './tablet/suspense/window.suspense.tablet.component';
import PermissionsController from '../controllers/permissions.controller';
import { PermissionsState } from '../models/permissions.model';
import { HomeState } from '../models/home.model';

const WindowDesktopComponent = lazy(
  () => import('./desktop/window.desktop.component')
);
const WindowTabletComponent = lazy(
  () => import('./tablet/window.tablet.component')
);
const WindowMobileComponent = lazy(
  () => import('./mobile/window.mobile.component')
);

export interface WindowResponsiveProps {
  windowProps: WindowState;
  windowLocalProps: WindowLocalState;
  accountProps: AccountState;
  permissionsProps: PermissionsState;
  homeProps: HomeState;
  openMore: boolean;
  isLanguageOpen: boolean;
  setOpenMore: (value: boolean) => void;
  setIsLanguageOpen: (value: boolean) => void;
  onSelectLocation: () => void;
  onCancelLocation: () => void;
  onSidebarTabsChanged: (id: string) => void;
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);
  const [homeLocalProps] = useObservable(
    HomeController.model.localStore ?? Store.prototype
  );
  const [accountProps] = useObservable(AccountController.model.store);
  const [permissionsProps] = useObservable(PermissionsController.model.store);
  const [homeProps] = useObservable(HomeController.model.store);
  const isMounted = useRef<boolean>(false);
  const { i18n } = useTranslation();
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  const onCancelLocation = () => {
    query.delete('sales_location');
    WindowController.updateQueryInventoryLocation(undefined);
  };

  const onSelectLocation = () => {
    HomeController.updateSelectedInventoryLocationId(
      windowProps.queryInventoryLocation.id
    );
    onCancelLocation();
  };

  const onSidebarTabsChanged = (id: string) => {
    navigate(id);
  };

  useEffect(() => {
    if (!isMounted.current) {
      WindowController.updateIsLoading(true);
      isMounted.current = true;
    }

    const salesLocationId = query.get('sales_location');
    if (
      salesLocationId &&
      salesLocationId !== homeLocalProps.selectedInventoryLocationId
    ) {
      WindowController.updateQueryInventoryLocation(salesLocationId);
    }
  }, []);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location.pathname, windowProps.authState]);

  useEffect(() => {
    if (windowProps.authState === 'SIGNED_OUT') {
      navigate(RoutePathsType.Signin);
    } else if (windowProps.authState === 'USER_DELETED') {
      navigate(RoutePathsType.Signup);
    } else if (windowProps.authState === 'PASSWORD_RECOVERY') {
      navigate(RoutePathsType.ResetPassword);
    }
  }, [windowProps.authState]);

  useEffect(() => {
    i18n.changeLanguage(windowLocalProps.languageInfo?.isoCode);
  }, [windowLocalProps.languageInfo]);

  useEffect(() => {
    WindowController.addToast(undefined);
  }, [windowProps.toast]);

  useEffect(() => {
    if (permissionsProps.arePermissionsActive === undefined) {
      return;
    }

    if (!permissionsProps.arePermissionsActive) {
      navigate(RoutePathsType.Permissions);
    }
  }, [permissionsProps.arePermissionsActive]);

  const suspenseComponent = (
    <>
      <WindowSuspenseDesktopComponent />
      <WindowSuspenseTabletComponent />
      <WindowSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenseComponent;
  }

  return (
    <React.Suspense fallback={suspenseComponent}>
      <WindowDesktopComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountProps={accountProps}
        permissionsProps={permissionsProps}
        homeProps={homeProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
      />
      <WindowTabletComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountProps={accountProps}
        permissionsProps={permissionsProps}
        homeProps={homeProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
      />
      <WindowMobileComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountProps={accountProps}
        permissionsProps={permissionsProps}
        homeProps={homeProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
      />
    </React.Suspense>
  );
}
