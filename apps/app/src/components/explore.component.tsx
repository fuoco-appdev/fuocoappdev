import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType, useQuery } from '../route-paths';
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
import { ExploreSuspenseDesktopComponent } from './desktop/suspense/explore.suspense.desktop.component';
import { ExploreSuspenseMobileComponent } from './mobile/suspense/explore.suspense.mobile.component';
import React from 'react';
import { lazy } from '@loadable/component';
import { ExploreSuspenseTabletComponent } from './tablet/suspense/explore.suspense.tablet.component';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import mapboxgl from 'mapbox-gl';
import { DeepLTranslationsResponse } from '../protobuf/deepl_pb';
import DeeplService from '../services/deepl.service';

const ExploreDesktopComponent = lazy(
  () => import('./desktop/explore.desktop.component')
);
const ExploreTabletComponent = lazy(
  () => import('./tablet/explore.tablet.component')
);
const ExploreMobileComponent = lazy(
  () => import('./mobile/explore.mobile.component')
);

export interface ExploreResponsiveProps {
  exploreProps: ExploreState;
  exploreLocalProps: ExploreLocalState;
  mapRef: React.Ref<MapRef> | undefined;
  selectedPoint: InventoryLocation | null;
  setMapStyleLoaded: (value: boolean) => void;
  setSelectedPoint: (value: InventoryLocation | null) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onScrollLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onStockLocationClicked: (stockLocation: InventoryLocation | null) => void;
  onGoToStore: (stockLocation: InventoryLocation) => void;
}

export default function ExploreComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const [exploreProps] = useObservable(ExploreController.model.store);
  const [exploreLocalProps] = useObservable(
    ExploreController.model.localStore ?? Store.prototype
  );
  const [mapStyleLoaded, setMapStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<InventoryLocation | null>(
    null
  );
  const mapRef = useRef<MapRef | null>(null);
  const renderCountRef = useRef<number>(0);
  const location = useLocation();
  const { i18n } = useTranslation();

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (
      scrollOffset > 16 ||
      !ExploreController.model.hasMoreSearchedStockLocations
    ) {
      return;
    }

    ExploreController.onNextScrollAsync();
  };

  const onScrollLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (exploreProps.searchedStockLocationScrollPosition) {
      e.currentTarget.scrollTop =
        exploreProps.searchedStockLocationScrollPosition as number;
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
    ExploreController.updateSelectedInventoryLocation(stockLocation);
    navigate({ pathname: RoutePathsType.Store, search: query.toString() });
  };

  const updateTranslatedDescriptionAsync = async (value: InventoryLocation) => {
    if (i18n.language !== 'en') {
      const selectedPointCopy = { ...value };
      const response: DeepLTranslationsResponse =
        await DeeplService.translateAsync(value.description, i18n.language);
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

  useEffect(() => {
    renderCountRef.current += 1;
    ExploreController.load(renderCountRef.current);
    ExploreController.loadStockLocationsAsync();

    return () => {
      ExploreController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      return;
    }

    if (location.pathname === RoutePathsType.Default) {
      navigate({ pathname: RoutePathsType.Explore, search: query.toString() });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedPoint) {
      return;
    }

    updateTranslatedDescriptionAsync(selectedPoint);
  }, [selectedPoint]);

  useLayoutEffect(() => {
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
      <ExploreSuspenseTabletComponent />
      <ExploreSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Explore | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Explore | Cruthology'} />
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
        <meta property="og:title" content={'Explore | Cruthology'} />
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
          exploreProps={exploreProps}
          exploreLocalProps={exploreLocalProps}
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onStockLocationClicked={onStockLocationClicked}
          onGoToStore={onGoToStore}
        />
        <ExploreTabletComponent
          exploreProps={exploreProps}
          exploreLocalProps={exploreLocalProps}
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onStockLocationClicked={onStockLocationClicked}
          onGoToStore={onGoToStore}
        />
        <ExploreMobileComponent
          exploreProps={exploreProps}
          exploreLocalProps={exploreLocalProps}
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onStockLocationClicked={onStockLocationClicked}
          onGoToStore={onGoToStore}
        />
      </React.Suspense>
    </>
  );
}
