import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { MapRef } from 'react-map-gl';
import { InventoryLocation } from '../models/home.model';
import { HomeDesktopComponent } from './desktop/home.desktop.component';
import { HomeMobileComponent } from './mobile/home.mobile.component';
import { Helmet } from 'react-helmet';

export interface HomeResponsiveProps {
  mapRef: React.Ref<MapRef> | undefined;
  selectedPoint: InventoryLocation | null;
  setMapStyleLoaded: (value: boolean) => void;
  setSelectedPoint: (value: InventoryLocation | null) => void;
}

export default function HomeComponent(): JSX.Element {
  const navigate = useNavigate();
  const [mapStyleLoaded, setMapStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<InventoryLocation | null>(
    null
  );
  const mapRef = useRef<MapRef | null>(null);
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (location.hash.startsWith(`#access_token=`)) {
      return;
    }

    if (location.pathname === RoutePathsType.Default) {
      navigate(RoutePathsType.Home);
    }
  }, [location.pathname]);

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

  return (
    <>
      <Helmet>
        <title>Home | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Home | Cruthology'} />
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
        <meta property="og:title" content={'Home | Cruthology'} />
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
      <ResponsiveDesktop>
        <HomeDesktopComponent
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <HomeMobileComponent
          mapRef={mapRef}
          selectedPoint={selectedPoint}
          setMapStyleLoaded={setMapStyleLoaded}
          setSelectedPoint={setSelectedPoint}
        />
      </ResponsiveMobile>
    </>
  );
}
