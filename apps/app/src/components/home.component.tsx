import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { MapRef } from 'react-map-gl';
import { InventoryLocation } from '../models/home.model';
import { HomeDesktopComponent } from './desktop/home.desktop.component';
import { HomeMobileComponent } from './mobile/home.mobile.component';

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
  const { i18n } = useTranslation();

  useEffect(() => {
    if (location.hash === '') {
      navigate(RoutePaths.Home);
    }
  }, []);

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
