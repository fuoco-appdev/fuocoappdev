import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
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

export interface WindowResponsiveProps {
  openMore: boolean;
  isLanguageOpen: boolean;
  setOpenMore: (value: boolean) => void;
  setIsLanguageOpen: (value: boolean) => void;
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [props] = useObservable(WindowController.model.store);
  const isMounted = useRef<boolean>(false);
  const { i18n } = useTranslation();
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [localProps] = useObservable(
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
  }, [location.pathname, props.authState]);

  useEffect(() => {
    if (props.authState === 'SIGNED_OUT') {
      navigate(RoutePathsType.Signin);
    } else if (props.authState === 'USER_DELETED') {
      navigate(RoutePathsType.Signup);
    } else if (props.authState === 'PASSWORD_RECOVERY') {
      navigate(RoutePathsType.ResetPassword);
    }
  }, [props.authState]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => WindowController.updateCurrentPosition(position),
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localProps.languageInfo?.isoCode);
  }, [localProps.languageInfo]);

  useEffect(() => {
    WindowController.addToast(undefined);
  }, [props.toast]);

  return (
    <>
      <ResponsiveDesktop>
        <WindowDesktopComponent
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <WindowTabletComponent
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <WindowMobileComponent
          openMore={openMore}
          isLanguageOpen={isLanguageOpen}
          setOpenMore={setOpenMore}
          setIsLanguageOpen={setIsLanguageOpen}
        />
      </ResponsiveMobile>
      <LoadingComponent isVisible={props.isLoading} />
    </>
  );
}
