import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../home.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import Map, { MapRef, Marker, Popup } from 'react-map-gl';
import SecretsService from '../../services/secrets.service';
import ConfigService from '../../services/config.service';
import { InventoryLocation } from '../../models/home.model';
import { HomeResponsiveProps } from '../home.component';
import HomeController from '../../controllers/home.controller';
import { ResponsiveTablet } from '../responsive.component';

export default function HomeTabletComponent({
  homeProps,
  homeLocalProps,
  mapRef,
  selectedPoint,
  setMapStyleLoaded,
  setSelectedPoint,
}: HomeResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['content-container'],
            styles['content-container-tablet'],
          ].join(' ')}
        >
          <img
            src={'../assets/images/vineyard1.png'}
            className={[
              styles['background-image'],
              styles['background-image-tablet'],
            ].join(' ')}
          />
          <div
            className={[
              styles['background-filter'],
              styles['background-filter-tablet'],
            ].join(' ')}
          />
          <div
            className={[styles['content'], styles['content-tablet']].join(' ')}
          >
            <img
              src={'../assets/svg/logo.svg'}
              className={[styles['logo'], styles['logo-tablet']].join(' ')}
            />
            <img
              src={'../assets/svg/logo-text.svg'}
              className={[styles['logo-text'], styles['logo-text-tablet']].join(
                ' '
              )}
            />
            <div
              className={[
                styles['call-to-action-text'],
                styles['call-to-action-text-tablet'],
              ].join(' ')}
            >
              {t('utilizeSearchEngineDescription', {
                product_count: homeProps.wineCount,
              })}
            </div>
            <div>
              <Button
                touchScreen={true}
                classNames={{
                  button: styles['shop-now-button'],
                }}
                rippleProps={{
                  color: 'rgba(252, 245, 227, .35)',
                }}
                size={'large'}
                onClick={() =>
                  setTimeout(() => navigate(RoutePathsType.Store), 75)
                }
              >
                {t('shopNow')}
              </Button>
            </div>
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-tablet'],
          ].join(' ')}
        >
          {homeProps.accessToken && (
            <Map
              style={{ borderRadius: 6, minWidth: '100%' }}
              mapboxAccessToken={homeProps.accessToken}
              ref={mapRef}
              initialViewState={{
                longitude: homeLocalProps.longitude,
                latitude: homeLocalProps.latitude,
                zoom: homeLocalProps.zoom,
              }}
              mapStyle={ConfigService.mapbox.style_url}
              onMove={(e) => HomeController.onMapMove(e.viewState)}
              onLoad={(e) => setMapStyleLoaded(e.target ? true : false)}
            >
              {homeProps.inventoryLocations?.map(
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
                        homeProps.selectedInventoryLocation?.placeName !==
                        point.placeName
                          ? '../assets/svg/cruthology-pin.svg'
                          : '../assets/svg/cruthology-selected-pin.svg'
                      }
                      className={[
                        styles['marker'],
                        styles['marker-tablet'],
                      ].join(' ')}
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
                  <div
                    className={[
                      styles['marker-popup'],
                      styles['marker-popup-tablet'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['company'],
                        styles['company-tablet'],
                      ].join(' ')}
                    >
                      {selectedPoint.company}
                    </div>
                    <div
                      className={[
                        styles['address'],
                        styles['address-tablet'],
                      ].join(' ')}
                    >
                      {selectedPoint.placeName}
                    </div>
                    <div
                      className={[
                        styles['select-button-container'],
                        styles['select-button-container-tablet'],
                      ].join(' ')}
                    >
                      <div>
                        <Button
                          touchScreen={true}
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
                            homeProps.selectedInventoryLocation?.placeName
                          }
                          type={'text'}
                          onClick={() =>
                            HomeController.updateSelectedInventoryLocation(
                              selectedPoint
                            )
                          }
                        >
                          {selectedPoint?.placeName !==
                          homeProps.selectedInventoryLocation?.placeName
                            ? t('select')
                            : t('selected')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Popup>
              )}
            </Map>
          )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}
