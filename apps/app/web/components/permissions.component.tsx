import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';

const PermissionsDesktopComponent = React.lazy(
  () => import('./desktop/permissions.desktop.component')
);
const PermissionsMobileComponent = React.lazy(
  () => import('./mobile/permissions.mobile.component')
);

export interface PermissionsResponsiveProps {
  onAccessLocationChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinueAsync: () => void;
}

function PermissionsComponent(): JSX.Element {
  const { PermissionsController, WindowController, ExploreController } =
    React.useContext(DIContext);
  const { suspense } = PermissionsController.model;
  const { loadedLocationPath } = WindowController.model;
  const renderCountRef = React.useRef<number>(0);
  const navigate = useNavigate();
  const query = useQuery();

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
    if (loadedLocationPath !== RoutePathsType.Permissions) {
      navigate({
        pathname: loadedLocationPath ?? RoutePathsType.Explore,
        search: query.toString(),
      });
    } else {
      navigate({ pathname: RoutePathsType.Explore, search: query.toString() });
    }
  };

  const updateDefaultInventoryLocationAsync = async () => {
    if (!ExploreController.model.selectedInventoryLocation) {
      const defaultInventoryLocation =
        await ExploreController.getDefaultInventoryLocationAsync();
      await WindowController.updateQueryInventoryLocationAsync(
        defaultInventoryLocation?.id,
        query
      );
    }
  };

  React.useEffect(() => {
    renderCountRef.current += 1;

    PermissionsController.load(renderCountRef.current);

    return () => {
      PermissionsController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useLayoutEffect(() => {
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Permissions | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Permissions | fuoco.appdev'} />
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
        <meta property="og:title" content={'Permissions | fuoco.appdev'} />
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
          onAccessLocationChecked={onAccessLocationChecked}
          onContinueAsync={onContinueAsync}
        />
        <PermissionsMobileComponent
          onAccessLocationChecked={onAccessLocationChecked}
          onContinueAsync={onContinueAsync}
        />
      </React.Suspense>
    </>
  );
}

export default observer(PermissionsComponent);
