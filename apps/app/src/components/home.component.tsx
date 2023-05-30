import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HomeController from '../controllers/home.controller';
import styles from './home.module.scss';
import { Alert } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import Map, { MapRef, Marker, Popup } from 'react-map-gl';
import ConfigService from '../services/config.service';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function HomeDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);

  return <></>;
}

function HomeMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);
  const mapRef = useRef<MapRef | null>(null);
  const { t, i18n } = useTranslation();
  const [mapStyleLoaded, setMapStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<mapboxgl.LngLat | null>(
    null
  );

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
    <Map
      mapboxAccessToken={ConfigService.mapbox.access_token}
      ref={mapRef}
      initialViewState={{
        longitude: props.longitude,
        latitude: props.latitude,
        zoom: props.zoom,
      }}
      mapStyle={ConfigService.mapbox.style_url}
      onMove={(e) => HomeController.onMapMove(e.viewState)}
      onStyleData={(e) => setMapStyleLoaded(e.target ? true : false)}
    >
      {props.salesChannelPoints.map((point: mapboxgl.LngLat, index: number) => (
        <Marker
          key={`marker-${index}`}
          latitude={point.lat}
          longitude={point.lng}
          anchor={'bottom'}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedPoint(point);
          }}
        >
          <img
            src={'../assets/svg/cruthology-pin.svg'}
            className={styles['marker']}
          />
        </Marker>
      ))}
      {selectedPoint && (
        <Popup
          anchor={'top'}
          onClose={() => setSelectedPoint(null)}
          latitude={selectedPoint.lat}
          longitude={selectedPoint.lng}
        >
          <div className={styles['marker-popup']}></div>
        </Popup>
      )}
    </Map>
  );
}

export default function HomeComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <HomeDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <HomeMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
