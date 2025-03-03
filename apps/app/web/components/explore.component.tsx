import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { MapRef } from 'react-map-gl';
import { useLocation, useNavigate } from 'react-router-dom';
import { InventoryLocation } from '../../shared/models/explore.model';
import { DeepLTranslationsResponse } from '../../shared/protobuf/deepl_pb';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { ExploreSuspenseDesktopComponent } from './desktop/suspense/explore.suspense.desktop.component';
import { ExploreSuspenseMobileComponent } from './mobile/suspense/explore.suspense.mobile.component';

const ExploreDesktopComponent = React.lazy(
  () => import('./desktop/explore.desktop.component')
);
const ExploreMobileComponent = React.lazy(
  () => import('./mobile/explore.mobile.component')
);

export interface ExploreResponsiveProps {
  mapRef: React.Ref<MapRef> | undefined;
  selectedPoint: InventoryLocation | null;
  setMapStyleLoaded: (value: boolean) => void;
  setSelectedPoint: (value: InventoryLocation | null) => void;
  onScrollLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onStockLocationClicked: (stockLocation: InventoryLocation | null) => void;
  onGoToStore: (stockLocation: InventoryLocation) => void;
}

function ExploreComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { ExploreController, DeepLService } = React.useContext(DIContext);
  const { suspense, searchedStockLocationScrollPosition } =
    ExploreController.model;
  const [mapStyleLoaded, setMapStyleLoaded] = React.useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] =
    React.useState<InventoryLocation | null>(null);
  const mapRef = React.useRef<MapRef | null>(null);
  const renderCountRef = React.useRef<number>(0);
  const location = useLocation();
  const { i18n } = useTranslation();

  const onScrollLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (searchedStockLocationScrollPosition) {
      e.currentTarget.scrollTop = searchedStockLocationScrollPosition as number;
      ExploreController.updateSearchedStockLocationScrollPosition(undefined);
    }
  };

  const onStockLocationClicked = (stockLocation: InventoryLocation | null) => {
    if (stockLocation?.coordinates) {
      ExploreController.updateCoordinates(stockLocation.coordinates);
      setSelectedPoint(stockLocation);
    }
  };

  const onGoToStore = (stockLocation: InventoryLocation) => {
    ExploreController.updateSelectedInventoryLocationId(stockLocation.id);
    navigate({ pathname: RoutePathsType.Store, search: query.toString() });
  };

  const updateTranslatedDescriptionAsync = async (value: InventoryLocation) => {
    if (i18n.language !== 'en') {
      const selectedPointCopy = { ...value };
      const response: DeepLTranslationsResponse =
        await DeepLService.translateAsync(value.description, i18n.language);
      if (response.translations.length <= 0) {
        return;
      }

      const firstTranslation = response.translations[0];
      selectedPointCopy.description = firstTranslation.text;

      if (JSON.stringify(selectedPointCopy) !== JSON.stringify(value)) {
        setSelectedPoint(selectedPointCopy);
      }
    }
  };

  React.useEffect(() => {
    renderCountRef.current += 1;
    ExploreController.load(renderCountRef.current);
    ExploreController.loadStockLocationsAsync();

    return () => {
      ExploreController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      return;
    }

    if (location.pathname === RoutePathsType.Default) {
      navigate({ pathname: RoutePathsType.Explore, search: query.toString() });
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (!selectedPoint) {
      return;
    }

    updateTranslatedDescriptionAsync(selectedPoint);
  }, [selectedPoint]);

  React.useLayoutEffect(() => {
    const labels = [
      'country-label',
      'state-label',
      'settlement-major-label',
      'settlement-subdivision-label',
    ];

    if (mapStyleLoaded) {
      labels.map((label) => {
        mapRef?.current
          ?.getMap()
          .setLayoutProperty(label, 'text-field', [
            'get',
            `name_${i18n.language}`,
          ]);
      });
    }
  }, [mapStyleLoaded, i18n.language]);

  const suspenceComponent = (
    <>
      <ExploreSuspenseDesktopComponent />
      <ExploreSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Explore | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Explore | fuoco.appdev'} />
        <meta
          name="description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Explore | fuoco.appdev'} />
        <meta
          property="og:description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ExploreDesktopComponent
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
          onScrollLoad={onScrollLoad}
          onStockLocationClicked={onStockLocationClicked}
          onGoToStore={onGoToStore}
        />
        <ExploreMobileComponent
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
          onScrollLoad={onScrollLoad}
          onStockLocationClicked={onStockLocationClicked}
          onGoToStore={onGoToStore}
        />
      </React.Suspense>
    </>
  );
}

export default observer(ExploreComponent);
