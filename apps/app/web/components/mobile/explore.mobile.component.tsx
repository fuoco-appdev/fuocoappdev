import {
  Button,
  Dropdown,
  Input,
  Line,
  Scroll,
  Tabs,
} from '@fuoco.appdev/web-components';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import Map, { Marker } from 'react-map-gl';
import Slider from 'react-slick';
import ExploreController from '../../../shared/controllers/explore.controller';
import {
  ExploreTabs,
  InventoryLocation,
  InventoryLocationType,
} from '../../../shared/models/explore.model';
import ConfigService from '../../../shared/services/config.service';
import styles from '../../modules/explore.module.scss';
import { ExploreResponsiveProps } from '../explore.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import StockLocationItemComponent from '../stock-location-item.component';
export default function ExploreMobileComponent({
  exploreProps,
  mapRef,
  selectedPoint,
  setMapStyleLoaded,
  setSelectedPoint,
  onScrollLoad,
  onStockLocationClicked,
  onGoToStore,
}: ExploreResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const [isSearchFocused, setIsSearchFocused] = React.useState<boolean>(true);
  const [isLogoLoaded, setIsLogoLoaded] = React.useState<boolean>(false);
  const [isLogoTextLoaded, setIsLogoTextLoaded] =
    React.useState<boolean>(false);
  let prevScrollTop = 0;
  let yPosition = 0;

  useMobileEffect(() => {
    if (!exploreProps.selectedTab) {
      return;
    }

    setIsSearchFocused(true);
  }, [exploreProps.selectedTab]);

  useMobileEffect(() => {
    if (!isSearchFocused) {
      ExploreController.updateSelectedTabAsync(undefined);
    }
  }, [isSearchFocused]);

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['search-root'], styles['search-root-mobile']].join(
            ' '
          )}
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
                onLoad={() => setIsLogoLoaded(true)}
              />
              {!isLogoLoaded && (
                <Skeleton
                  className={[styles['logo'], styles['logo-mobile']].join(' ')}
                  style={{ display: isLogoLoaded ? 'block' : 'none' }}
                  borderRadius={32}
                  height={32}
                  width={32}
                />
              )}
              <img
                className={[
                  styles['logo-text'],
                  styles['logo-text-mobile'],
                ].join(' ')}
                style={{ display: isLogoTextLoaded ? 'block' : 'none' }}
                src={'../assets/svg/logo-text-dark.svg'}
                onLoad={() => setIsLogoTextLoaded(true)}
              />
              {!isLogoTextLoaded && (
                <Skeleton
                  className={[
                    styles['logo-text'],
                    styles['logo-text-mobile'],
                  ].join(' ')}
                  width={128}
                  borderRadius={28}
                />
              )}
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
            <Scroll
              classNames={{
                scrollContainer: [
                  styles['scroll-container'],
                  styles['scroll-container-mobile'],
                ].join(' '),
                reloadContainer: [
                  styles['scroll-reload-container'],
                  styles['scroll-reload-container-mobile'],
                ].join(' '),
                loadContainer: [
                  styles['scroll-load-container'],
                  styles['scroll-load-container-mobile'],
                ].join(' '),
                pullIndicator: [
                  styles['pull-indicator'],
                  styles['pull-indicator-mobile'],
                ].join(' '),
              }}
              touchScreen={true}
              loadingHeight={56}
              reloadComponent={
                <img
                  src={'../assets/svg/ring-resize-dark.svg'}
                  className={styles['loading-ring']}
                />
              }
              isReloading={exploreProps.areSearchedStockLocationsReloading}
              isLoadable={exploreProps.hasMoreSearchedStockLocations}
              showIndicatorThreshold={56}
              pullIndicatorComponent={
                <div className={[styles['pull-indicator-container']].join(' ')}>
                  <Line.ArrowDownward size={24} />
                </div>
              }
              onReload={() => ExploreController.reloadStockLocationsAsync()}
              loadComponent={
                <img
                  src={'../assets/svg/ring-resize-dark.svg'}
                  className={styles['loading-ring']}
                />
              }
              isLoading={exploreProps.areSearchedStockLocationsLoading}
              onLoad={() => ExploreController.onNextScrollAsync()}
              onScroll={(progress, scrollRef, contentRef) => {
                const elementHeight = topBarRef.current?.clientHeight ?? 0;
                const scrollTop =
                  contentRef.current?.getBoundingClientRect().top ?? 0;
                if (prevScrollTop <= scrollTop) {
                  yPosition -= prevScrollTop - scrollTop;
                  if (yPosition >= 0) {
                    yPosition = 0;
                  }

                  topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                } else {
                  yPosition += scrollTop - prevScrollTop;
                  if (yPosition <= -elementHeight) {
                    yPosition = -elementHeight;
                  }

                  topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                }

                prevScrollTop = scrollTop;
              }}
            >
              <div
                className={[
                  styles['scroll-content'],
                  styles['scroll-content-mobile'],
                ].join(' ')}
                ref={scrollContainerRef}
                onLoad={onScrollLoad}
              >
                {exploreProps.searchedStockLocations.map(
                  (stockLocation: StockLocation, _index: number) => {
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
                {!exploreProps.areSearchedStockLocationsLoading &&
                  !exploreProps.areSearchedStockLocationsReloading &&
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
            </Scroll>
          )}
          <div
            className={[
              styles['map-container'],
              styles['map-container-mobile'],
            ].join(' ')}
          >
            <Map
              style={{
                minWidth: '100%',
                minHeight: '100vh',
                width: '100%',
                height: '100%',
              }}
              mapboxAccessToken={import.meta.env['MAPBOX_ACCESS_TOKEN']}
              ref={mapRef}
              interactive={true}
              initialViewState={{
                longitude: exploreProps.longitude ?? 0,
                latitude: exploreProps.latitude ?? 0,
                zoom: 15,
              }}
              longitude={exploreProps.longitude ?? 0}
              latitude={exploreProps.latitude ?? 0}
              zoom={exploreProps.zoom ?? 15}
              mapStyle={ConfigService.mapbox.style_url}
              onMove={(e) => ExploreController.onMapMove(e.viewState)}
              onLoad={(e) => {
                setMapStyleLoaded(e.target ? true : false);
                e.target.resize();
              }}
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
                          exploreProps.selectedInventoryLocation?.id !==
                          point.id
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
                          exploreProps.selectedInventoryLocation?.id !==
                          point.id
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
        </div>
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
              button: [styles['map-button'], styles['map-button-mobile']].join(
                ' '
              ),
            }}
            rippleProps={{
              color: 'rgba(88, 40, 109, .35)',
            }}
            onClick={() =>
              setTimeout(() => setIsSearchFocused(!isSearchFocused), 150)
            }
            type={'primary'}
            rounded={true}
            size={'small'}
            touchScreen={true}
            icon={
              isSearchFocused ? (
                <Line.Map size={24} />
              ) : (
                <Line.Search size={24} />
              )
            }
          />
        </div>
      </div>
      {ReactDOM.createPortal(
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
                {selectedPoint.thumbnails &&
                  selectedPoint.thumbnails.length > 0 && (
                    <div style={{ width: '100%', height: 282 }}>
                      <Slider
                        dots={true}
                        speed={250}
                        slidesToShow={1}
                        slidesToScroll={1}
                        className={[
                          styles['slider'],
                          styles['slider-mobile'],
                        ].join(' ')}
                      >
                        {selectedPoint.thumbnails.map((value) => (
                          <img src={value} height={282} />
                        ))}
                      </Slider>
                    </div>
                  )}
                <div
                  className={[
                    styles['info-container'],
                    styles['info-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['company'],
                      styles['company-mobile'],
                    ].join(' ')}
                  >
                    {selectedPoint.company}
                  </div>
                  <div
                    className={[
                      styles['address'],
                      styles['address-mobile'],
                    ].join(' ')}
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
              </div>
            )}
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
