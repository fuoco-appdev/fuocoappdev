import { useEffect, useRef, useState } from 'react';
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
import { WindowMobileComponent } from './mobile/window.mobile.component';
import { WindowDesktopComponent } from './desktop/window.desktop.component';
import { WindowTabletComponent } from './tablet/window.tablet.component';
import { WindowLocalState, WindowState } from '../models/window.model';
import { AccountState } from '../models/account.model';

export interface WindowResponsiveProps {
  windowProps: WindowState;
  windowLocalProps: WindowLocalState;
  accountProps: AccountState;
  openMore: boolean;
  isLanguageOpen: boolean;
  setOpenMore: (value: boolean) => void;
  setIsLanguageOpen: (value: boolean) => void;
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const isMounted = useRef<boolean>(false);
  const { i18n } = useTranslation();
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  useEffect(() => {
    if (!isMounted.current) {
      WindowController.updateIsLoading(true);
      isMounted.current = true;
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
    navigator.geolocation.getCurrentPosition(
      (position) => WindowController.updateCurrentPosition(position),
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    i18n.changeLanguage(windowLocalProps.languageInfo?.isoCode);
  }, [windowLocalProps.languageInfo]);

  useEffect(() => {
    WindowController.addToast(undefined);
  }, [windowProps.toast]);

  return (
    <>
      <ResponsiveDesktop>
        <WindowDesktopComponent
          windowProps={windowProps}
          windowLocalProps={windowLocalProps}
          accountProps={accountProps}
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <WindowTabletComponent
          windowProps={windowProps}
          windowLocalProps={windowLocalProps}
          accountProps={accountProps}
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <WindowMobileComponent
          windowProps={windowProps}
          windowLocalProps={windowLocalProps}
          accountProps={accountProps}
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveMobile>
      <LoadingComponent isVisible={windowProps.isLoading} />
    </>
  );
}
