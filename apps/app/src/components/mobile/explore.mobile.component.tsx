import React, {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ExploreController from '../../controllers/explore.controller';
import styles from '../explore.module.scss';
import {
  Alert,
  Button,
  Dropdown,
  Input,
  Line,
  Modal,
  Tabs,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import Map, { MapRef, Marker, Popup } from 'react-map-gl';
import ConfigService from '../../services/config.service';
import {
  ExploreTabs,
  InventoryLocation,
  InventoryLocationType,
} from '../../models/explore.model';
import { ExploreResponsiveProps } from '../explore.component';
import { ExploreSuspenseMobileComponent } from './suspense/explore.suspense.mobile.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import StockLocationItemComponent from '../stock-location-item.component';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import { createPortal } from 'react-dom';

export default function ExploreMobileComponent({
  exploreProps,
  exploreLocalProps,
  mapRef,
  selectedPoint,
  setMapStyleLoaded,
  setSelectedPoint,
  onScroll,
  onScrollLoad,
  onStockLocationClicked,
  onGoToStore,
}: ExploreResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = createRef<HTMLDivElement>();
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  let prevScrollTop = 0;
  let yPosition = 0;

  useMobileEffect(() => {
    if (!exploreProps.selectedTab) {
      return;
    }

    setIsSearchFocused(true);
  }, [exploreProps.selectedTab]);

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            ref={topBarRef}
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-mobile'],
              ].join(' ')}
            >
              <img
                className={[styles['logo'], styles['logo-mobile']].join(' ')}
                src={'../assets/svg/logo.svg'}
              />
              <img
                className={[
                  styles['logo-text'],
                  styles['logo-text-mobile'],
                ].join(' ')}
                src={'../assets/svg/logo-text-dark.svg'}
              />
            </div>
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-mobile'],
                  ].join(' ')}
                >
                  <Input
                    value={exploreProps.input}
                    classNames={{
                      container: [
                        styles['search-input-container'],
                        styles['search-input-container-mobile'],
                      ].join(' '),
                      input: [
                        styles['search-input'],
                        styles['search-input-mobile'],
                      ].join(' '),
                    }}
                    placeholder={t('search') ?? ''}
                    icon={<Line.Search size={24} color={'#2A2A5F'} />}
                    onChange={(event) =>
                      ExploreController.updateInput(event.target.value)
                    }
                    onFocus={() => setIsSearchFocused(true)}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['tab-container'],
                  styles['tab-container-desktop'],
                ].join(' ')}
              >
                <Tabs
                  classNames={{
                    nav: styles['tab-nav'],
                    tabButton: styles['tab-button'],
                    selectedTabButton: styles['selected-tab-button'],
                    tabSliderPill: styles['tab-slider-pill'],
                  }}
                  removable={true}
                  type={'pills'}
                  activeId={exploreProps.selectedTab}
                  onChange={(id: string) =>
                    ExploreController.updateSelectedTabAsync(
                      id.length > 0 ? (id as ExploreTabs) : undefined
                    )
                  }
                  tabs={[
                    {
                      id: ExploreTabs.Cellar,
                      label: t('cellar') ?? 'Cellar',
                    },
                    {
                      id: ExploreTabs.Restaurant,
                      label: t('restaurant') ?? 'Restaurant',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          {isSearchFocused && (
            <div
              className={[
                styles['scroll-container'],
                styles['scroll-container-mobile'],
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
                  return (
                    <StockLocationItemComponent
                      key={stockLocation.id}
                      stockLocation={stockLocation}
                      onClick={async () =>
                        onStockLocationClicked(
                          await ExploreController.getInventoryLocationAsync(
                            stockLocation
                          )
                        )
                      }
                    />
                  );
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
              {!exploreProps.hasMoreSearchedStockLocations &&
                exploreProps.searchedStockLocations.length <= 0 && (
                  <div
                    className={[
                      styles['no-searched-stock-locations-container'],
                      styles['no-searched-stock-locations-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['no-items-text'],
                        styles['no-items-text-mobile'],
                      ].join(' ')}
                    >
                      {t('noStockLocationsFound')}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-mobile'],
          ].join(' ')}
        >
          <Map
            style={{ minWidth: '100%', minHeight: '100%' }}
            mapboxAccessToken={process.env['MAPBOX_ACCESS_TOKEN']}
            ref={mapRef}
            interactive={true}
            initialViewState={{
              longitude:
                exploreProps.selectedInventoryLocation?.coordinates.lng ?? 0,
              latitude:
                exploreProps.selectedInventoryLocation?.coordinates.lat ?? 0,
              zoom: 13,
            }}
            longitude={exploreProps.longitude ?? 0}
            latitude={exploreProps.latitude ?? 0}
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
                  {point.type === InventoryLocationType.Cellar && (
                    <img
                      src={
                        exploreProps.selectedInventoryLocation?.id !== point.id
                          ? '../assets/images/unselected-cellar.png'
                          : '../assets/images/selected-cellar.png'
                      }
                      className={[
                        styles['marker'],
                        styles['marker-mobile'],
                      ].join(' ')}
                    />
                  )}
                  {point.type === InventoryLocationType.Restaurant && (
                    <img
                      src={
                        exploreProps.selectedInventoryLocation?.id !== point.id
                          ? '../assets/images/unselected-restaurant.png'
                          : '../assets/images/selected-restaurant.png'
                      }
                      className={[
                        styles['marker'],
                        styles['marker-mobile'],
                      ].join(' ')}
                    />
                  )}
                </Marker>
              )
            )}
          </Map>
        </div>
        {isSearchFocused && (
          <div
            className={[
              styles['floating-button-container'],
              styles['floating-button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                container: [
                  styles['map-button-container'],
                  styles['map-button-container-mobile'],
                ].join(' '),
                button: [
                  styles['map-button'],
                  styles['map-button-mobile'],
                ].join(' '),
              }}
              rippleProps={{
                color: 'rgba(88, 40, 109, .35)',
              }}
              onClick={() => setTimeout(() => setIsSearchFocused(false), 150)}
              type={'primary'}
              rounded={true}
              size={'small'}
              touchScreen={true}
              icon={<Line.Map size={24} />}
            />
          </div>
        )}
      </div>
      {createPortal(
        <>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={Boolean(selectedPoint)}
            touchScreen={true}
            onClose={() => setSelectedPoint(null)}
          >
            {selectedPoint && (
              <div
                className={[
                  styles['dropdown-content'],
                  styles['dropdown-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[styles['company'], styles['company-mobile']].join(
                    ' '
                  )}
                >
                  {selectedPoint.company}
                </div>
                <div
                  className={[styles['address'], styles['address-mobile']].join(
                    ' '
                  )}
                >
                  <Line.Place size={18} />
                  {t(selectedPoint.type as string)}
                  &nbsp;
                  {selectedPoint.placeName}
                </div>
                <div
                  className={[
                    styles['description'],
                    styles['description-mobile'],
                  ].join(' ')}
                >
                  {selectedPoint.description}
                </div>
                <div
                  className={[
                    styles['go-to-store-button-container'],
                    styles['go-to-store-button-container-mobile'],
                  ].join(' ')}
                >
                  <div>
                    <Button
                      classNames={{
                        button: styles['go-to-store-button'],
                      }}
                      rippleProps={{
                        color: 'rgba(133, 38, 122, .35)',
                      }}
                      icon={<Line.Store size={24} />}
                      block={true}
                      size={'large'}
                      type={'primary'}
                      onClick={() => onGoToStore(selectedPoint)}
                    >
                      {t('goToStore')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
