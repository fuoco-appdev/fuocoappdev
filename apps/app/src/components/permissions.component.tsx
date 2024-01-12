import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { MapRef } from 'react-map-gl';
import {
  ExploreLocalState,
  ExploreState,
  InventoryLocation,
} from '../models/explore.model';
import { Helmet } from 'react-helmet';
import { useObservable } from '@ngneat/use-observable';
import ExploreController from '../controllers/explore.controller';
import { Store } from '@ngneat/elf';
import React from 'react';
import { lazy } from '@loadable/component';
import { PermissionsState } from '../models/permissions.model';
import PermissionsController from '../controllers/permissions.controller';
import { WindowState } from '../models/window.model';
import WindowController from '../controllers/window.controller';

const PermissionsDesktopComponent = lazy(
  () => import('./desktop/permissions.desktop.component')
);
const PermissionsTabletComponent = lazy(
  () => import('./tablet/permissions.tablet.component')
);
const PermissionsMobileComponent = lazy(
  () => import('./mobile/permissions.mobile.component')
);

export interface PermissionsResponsiveProps {
  permissionsProps: PermissionsState;
  windowProps: WindowState;
  onAccessLocationChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinueAsync: () => void;
}

export default function PermissionsComponent(): JSX.Element {
  const [permissionsProps] = useObservable(PermissionsController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const navigate = useNavigate();

  const onAccessLocationChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      navigator.geolocation.getCurrentPosition(
        (position) => PermissionsController.updateCurrentPosition(position),
        (error) => console.error(error)
      );
    } else {
      PermissionsController.updateCurrentPosition(undefined);
    }
  };

  const onContinueAsync = async () => {
    if (windowProps.loadedLocationPath !== RoutePathsType.Permissions) {
      navigate(windowProps.loadedLocationPath ?? RoutePathsType.Explore);
    } else {
      navigate(RoutePathsType.Explore);
    }
  };

  const updateDefaultInventoryLocationAsync = async () => {
    if (!ExploreController.model.selectedInventoryLocation) {
      const defaultInventoryLocation =
        await ExploreController.getDefaultInventoryLocationAsync();
      WindowController.updateQueryInventoryLocation(
        defaultInventoryLocation?.id
      );
    }
  };

  useLayoutEffect(() => {
    return () => {
      updateDefaultInventoryLocationAsync();
    };
  }, []);

  const suspenceComponent = (
    <>
      {/* <PermissionsSuspenseDesktopComponent />
      <PermissionsSuspenseTabletComponent />
      <PermissionsSuspenseMobileComponent /> */}
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Permissions | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Permissions | Cruthology'} />
        <meta
          name="description"
          content={
            'Enhance your Cruthology Wine Club experience by granting app permissions.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Permissions | Cruthology'} />
        <meta
          property="og:description"
          content={
            'Enhance your Cruthology Wine Club experience by granting app permissions.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <PermissionsDesktopComponent
          permissionsProps={permissionsProps}
          windowProps={windowProps}
          onAccessLocationChecked={onAccessLocationChecked}
          onContinueAsync={onContinueAsync}
        />
        <PermissionsTabletComponent
          permissionsProps={permissionsProps}
          windowProps={windowProps}
          onAccessLocationChecked={onAccessLocationChecked}
          onContinueAsync={onContinueAsync}
        />
        <PermissionsMobileComponent
          permissionsProps={permissionsProps}
          windowProps={windowProps}
          onAccessLocationChecked={onAccessLocationChecked}
          onContinueAsync={onContinueAsync}
        />
      </React.Suspense>
    </>
  );
}
