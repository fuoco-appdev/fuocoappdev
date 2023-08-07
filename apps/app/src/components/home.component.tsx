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
import { Alert, Button } from '@fuoco.appdev/core-ui';
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
import SecretsService from '../services/secrets.service';
import ConfigService from '../services/config.service';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { InventoryLocation } from '../models/home.model';

function HomeDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);

  return <></>;
}

function HomeMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);
  const [localProps] = useObservable(
    HomeController.model.localStore ?? HomeController.model.store
  );
  const mapRef = useRef<MapRef | null>(null);
  const { t, i18n } = useTranslation();
  const [mapStyleLoaded, setMapStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<InventoryLocation | null>(
    null
  );

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
    <div className={styles['root']}>
      <div className={styles['content-container']}>
        <img
          src={'../assets/images/vineyard1.png'}
          className={styles['background-image']}
        />
        <div className={styles['background-filter']} />
        <div className={styles['content']}>
          <img src={'../assets/svg/logo.svg'} className={styles['logo']} />
          <img
            src={'../assets/svg/logo-text.svg'}
            className={styles['logo-text']}
          />
          <div className={styles['call-to-action-text']}>
            {t('utilizeSearchEngineDescription', {
              product_count: props.wineCount,
            })}
          </div>
          <div>
            <Button
              classNames={{
                button: styles['shop-now-button'],
              }}
              rippleProps={{
                color: 'rgba(252, 245, 227, .35)',
              }}
              size={'large'}
              onClick={() => setTimeout(() => navigate(RoutePaths.Store), 150)}
            >
              {t('shopNow')}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles['map-container']}>
        <Map
          mapboxAccessToken={SecretsService.mapboxAccessToken}
          ref={mapRef}
          initialViewState={{
            longitude: localProps.longitude,
            latitude: localProps.latitude,
            zoom: localProps.zoom,
          }}
          mapStyle={ConfigService.mapbox.style_url}
          onMove={(e) => HomeController.onMapMove(e.viewState)}
          onLoad={(e) => setMapStyleLoaded(e.target ? true : false)}
        >
          {props.inventoryLocations?.map(
            (point: InventoryLocation, index: number) => (
              <Marker
                key={`marker-${index}`}
                latitude={point.coordinates.lat}
                longitude={point.coordinates.lng}
                anchor={'bottom'}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedPoint(point);
                }}
              >
                <img
                  src={
                    props.selectedInventoryLocation?.placeName !==
                    point.placeName
                      ? '../assets/svg/cruthology-pin.svg'
                      : '../assets/svg/cruthology-selected-pin.svg'
                  }
                  className={styles['marker']}
                />
              </Marker>
            )
          )}
          {selectedPoint && (
            <Popup
              anchor={'top'}
              onClose={() => setSelectedPoint(null)}
              latitude={selectedPoint.coordinates.lat}
              longitude={selectedPoint.coordinates.lng}
            >
              <div className={styles['marker-popup']}>
                <div className={styles['company']}>{selectedPoint.company}</div>
                <div className={styles['address']}>
                  {selectedPoint.placeName}
                </div>
                <div className={styles['select-button-container']}>
                  <div>
                    <Button
                      classNames={{
                        button: styles['select-button'],
                      }}
                      rippleProps={{
                        color: 'rgba(133, 38, 122, .35)',
                      }}
                      block={false}
                      size={'tiny'}
                      disabled={
                        selectedPoint?.placeName ===
                        props.selectedInventoryLocation?.placeName
                      }
                      type={'text'}
                      onClick={() =>
                        HomeController.updateSelectedInventoryLocation(
                          selectedPoint
                        )
                      }
                    >
                      {selectedPoint?.placeName !==
                      props.selectedInventoryLocation?.placeName
                        ? t('select')
                        : t('selected')}
                    </Button>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
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
