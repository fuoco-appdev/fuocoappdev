import React, {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../explore.module.scss';
import { Alert, Button, Input, Line } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import Map, { MapRef, Marker, Popup } from 'react-map-gl';
import ConfigService from '../../services/config.service';
import { InventoryLocation } from '../../models/explore.model';
import { ExploreResponsiveProps } from '../explore.component';
import ExploreController from '../../controllers/explore.controller';
import { ResponsiveDesktop } from '../responsive.component';
import { StockLocation } from '@medusajs/stock-location/dist/models';

export default function ExploreDesktopComponent({
  exploreProps,
  exploreLocalProps,
  mapRef,
  selectedPoint,
  setMapStyleLoaded,
  setSelectedPoint,
  onScroll,
  onScrollLoad,
}: ExploreResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = createRef<HTMLDivElement>();
  let prevScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-desktop'],
          ].join(' ')}
        >
          <div
            ref={topBarRef}
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-desktop'],
                  ].join(' ')}
                >
                  <Input
                    value={exploreProps.input}
                    classNames={{
                      container: [
                        styles['search-input-container'],
                        styles['search-input-container-desktop'],
                      ].join(' '),
                      input: [
                        styles['search-input'],
                        styles['search-input-desktop'],
                      ].join(' '),
                    }}
                    placeholder={t('search') ?? ''}
                    icon={<Line.Search size={24} color={'#2A2A5F'} />}
                    onChange={(event) =>
                      ExploreController.updateInput(event.target.value)
                    }
                  />
                </div>
              </div>
              {/* <div
                className={[
                  styles['tab-container'],
                  styles['tab-container-desktop'],
                ].join(' ')}
              >
                <Tabs
                  classNames={{
                    tabButton: styles['tab-button'],
                    selectedTabButton: styles['selected-tab-button'],
                    tabSliderPill: styles['tab-slider-pill'],
                  }}
                  removable={true}
                  type={'pills'}
                  activeId={storeProps.selectedTab}
                  onChange={(id: string) =>
                    StoreController.updateSelectedTabAsync(
                      id.length > 0 ? (id as ProductTabs) : undefined
                    )
                  }
                  tabs={[
                    {
                      id: ProductTabs.White,
                      label: t('white') ?? 'White',
                    },
                    {
                      id: ProductTabs.Red,
                      label: t('red') ?? 'Red',
                    },
                    {
                      id: ProductTabs.Rose,
                      label: t('rose') ?? 'Rosé',
                    },
                    {
                      id: ProductTabs.Spirits,
                      label: t('spirits') ?? 'Spirits',
                    },
                  ]}
                />
              </div> */}
            </div>
          </div>
          <div
            className={[
              styles['scroll-container'],
              styles['scroll-container-desktop'],
            ].join(' ')}
            style={{ height: window.innerHeight }}
            onScroll={(e) => {
              onScroll(e);
              const elementHeight = topBarRef.current?.clientHeight ?? 0;
              const scrollTop = e.currentTarget.scrollTop;
              if (prevScrollTop > scrollTop) {
                yPosition += prevScrollTop - scrollTop;
                if (yPosition >= 0) {
                  yPosition = 0;
                }

                topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
              } else {
                yPosition -= scrollTop - prevScrollTop;
                if (yPosition <= -elementHeight) {
                  yPosition = -elementHeight;
                }

                topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
              }

              prevScrollTop = e.currentTarget.scrollTop;
            }}
            ref={scrollContainerRef}
            onLoad={onScrollLoad}
          >
            {exploreProps.searchedStockLocations.map(
              (stockLocation: StockLocation, index: number) => {
                return <div />;
              }
            )}
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
              style={{
                display:
                  exploreProps.hasMoreSearchedStockLocations ||
                  exploreProps.areSearchedStockLocationsLoading
                    ? 'flex'
                    : 'none',
              }}
            />
            {!exploreProps.areSearchedStockLocationsLoading &&
              exploreProps.searchedStockLocations.length <= 0 && (
                <div
                  className={[
                    styles['no-searched-stock-locations-container'],
                    styles['no-searched-stock-locations-container-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['no-items-text'],
                      styles['no-items-text-desktop'],
                    ].join(' ')}
                  >
                    {t('noStockLocationsFound')}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-desktop'],
          ].join(' ')}
        >
          {exploreProps.isSelectedInventoryLocationLoaded && (
            <Map
              style={{ minWidth: '100%', minHeight: '100%' }}
              mapboxAccessToken={process.env['MAPBOX_ACCESS_TOKEN']}
              ref={mapRef}
              interactive={true}
              initialViewState={{
                longitude:
                  exploreProps.selectedInventoryLocation?.coordinates.lng,
                latitude:
                  exploreProps.selectedInventoryLocation?.coordinates.lat,
                zoom: 13,
              }}
              longitude={exploreProps.longitude}
              latitude={exploreProps.latitude}
              zoom={exploreProps.zoom ?? 13}
              mapStyle={ConfigService.mapbox.style_url}
              onMove={(e) => ExploreController.onMapMove(e.viewState)}
              onLoad={(e) => setMapStyleLoaded(e.target ? true : false)}
            >
              {exploreProps.inventoryLocations?.map(
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
                        exploreProps.selectedInventoryLocation?.placeName !==
                        point.placeName
                          ? '../assets/images/unselected-cellar.png'
                          : '../assets/images/selected-cellar.png'
                      }
                      className={[
                        styles['marker'],
                        styles['marker-desktop'],
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
                      styles['marker-popup-desktop'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['company'],
                        styles['company-desktop'],
                      ].join(' ')}
                    >
                      {selectedPoint.company}
                    </div>
                    <div
                      className={[
                        styles['address'],
                        styles['address-desktop'],
                      ].join(' ')}
                    >
                      {selectedPoint.placeName}
                    </div>
                    <div
                      className={[
                        styles['select-button-container'],
                        styles['select-button-container-desktop'],
                      ].join(' ')}
                    >
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
                            exploreProps.selectedInventoryLocation?.placeName
                          }
                          type={'text'}
                          onClick={() =>
                            ExploreController.updateSelectedInventoryLocation(
                              selectedPoint
                            )
                          }
                        >
                          {selectedPoint?.placeName !==
                          exploreProps.selectedInventoryLocation?.placeName
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
    </ResponsiveDesktop>
  );
}
