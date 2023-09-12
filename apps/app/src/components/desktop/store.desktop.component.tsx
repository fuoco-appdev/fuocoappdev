import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StoreController from '../../controllers/store.controller';
import styles from '../store.module.scss';
import {
  Alert,
  Button,
  Dropdown,
  Input,
  Line,
  Tabs,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import { ProductTabs } from '../../models/store.model';
import { Country, Region, Product, SalesChannel } from '@medusajs/medusa';
import ProductPreviewComponent from '../product-preview.component';
import ReactCountryFlag from 'react-country-flag';
import HomeController from '../../controllers/home.controller';
import { InventoryLocation } from '../../models/home.model';
import { StoreResponsiveProps } from '../store.component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';

export function StoreDesktopComponent({
  previewsContainerRef,
  openFilter,
  countryOptions,
  regionOptions,
  cellarOptions,
  selectedCountryId,
  selectedRegionId,
  selectedCellarId,
  setOpenFilter,
  setSelectedCountryId,
  setSelectedRegionId,
  setSelectedCellarId,
}: StoreResponsiveProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);
  const [homeLocalProps] = useObservable(
    HomeController.model.localStore ?? Store.prototype
  );
  const { t, i18n } = useTranslation();

  return (
    <div
      ref={rootRef}
      className={[styles['root'], styles['root-desktop']].join(' ')}
    >
      <div
        className={[
          styles['left-content'],
          styles['left-content-desktop'],
        ].join(' ')}
      >
        <div
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
                  value={props.input}
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
                    StoreController.updateInput(event.target.value)
                  }
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
                  tabButton: styles['tab-button'],
                  selectedTabButton: styles['selected-tab-button'],
                  tabSliderPill: styles['tab-slider-pill'],
                }}
                removable={true}
                type={'pills'}
                activeId={props.selectedTab}
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
            </div>
          </div>
          <div
            className={[
              styles['top-bar-right-content'],
              styles['top-bar-right-content-desktop'],
            ].join(' ')}
          >
            <div>
              <Button
                classNames={{
                  container: styles['filter-container'],
                  button: styles['filter-button'],
                }}
                onClick={() => setOpenFilter(!openFilter)}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                block={true}
                icon={
                  openFilter ? (
                    <Line.Close size={24} color={'#fff'} />
                  ) : (
                    <Line.FilterList size={24} color={'#fff'} />
                  )
                }
                rounded={true}
              />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
          ref={previewsContainerRef}
        >
          {props.previews.map((preview: PricedProduct, index: number) => (
            <ProductPreviewComponent
              parentRef={rootRef}
              key={index}
              preview={preview}
              onClick={() => {
                StoreController.updateSelectedPreview(preview);
              }}
              onRest={() => {
                navigate(`${RoutePaths.Store}/${preview.id}`);
              }}
            />
          ))}
          {homeLocalProps.selectedInventoryLocationId &&
            props.hasMorePreviews && (
              <img
                src={'../assets/svg/ring-resize-dark.svg'}
                className={styles['loading-ring']}
              />
            )}
          {!homeLocalProps.selectedInventoryLocationId && (
            <div
              className={[
                styles['no-inventory-location-container'],
                styles['no-inventory-location-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-desktop'],
                ].join(' ')}
              >
                {t('chooseASalesChannel')}
              </div>
              <div
                className={[
                  styles['no-items-container'],
                  styles['no-items-container-desktop'],
                ].join(' ')}
              >
                <Button
                  classNames={{
                    button: styles['outline-button'],
                  }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  size={'large'}
                  onClick={() =>
                    setTimeout(() => navigate(RoutePaths.Home), 150)
                  }
                >
                  {t('home')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <CSSTransition
        nodeRef={sideBarRef}
        in={openFilter && Boolean(sideBarRef.current)}
        timeout={300}
        classNames={{
          appear: styles['side-bar-appear'],
          appearActive: styles['side-bar-appear-active'],
          appearDone: styles['side-bar-appear-done'],
          enter: styles['side-bar-enter'],
          enterActive: styles['side-bar-enter-active'],
          enterDone: styles['side-bar-enter-done'],
          exit: styles['side-bar-exit'],
          exitActive: styles['side-bar-exit-active'],
          exitDone: styles['side-bar-exit-done'],
        }}
      >
        <div
          ref={sideBarRef}
          className={[
            styles['filter-content'],
            styles['filter-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['filter-top-container'],
              styles['filter-top-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['filter-title'],
                styles['filter-title-desktop'],
              ].join(' ')}
            >
              {t('filter')}
            </div>
            <Listbox
              classNames={{
                formLayout: {
                  label: styles['listbox-form-layout-label'],
                },
                listbox: styles['listbox'],
                chevron: styles['listbox-chevron'],
                label: styles['listbox-label'],
              }}
              label={t('country') ?? ''}
              options={countryOptions}
              selectedId={selectedCountryId}
              onChange={(index: number, id: string) => setSelectedCountryId(id)}
            />
            <Listbox
              classNames={{
                formLayout: {
                  label: styles['listbox-form-layout-label'],
                },
                listbox: styles['listbox'],
                chevron: styles['listbox-chevron'],
                label: styles['listbox-label'],
              }}
              label={t('region') ?? ''}
              options={regionOptions}
              selectedId={selectedRegionId}
              onChange={(index: number, id: string) => setSelectedRegionId(id)}
            />
            <Listbox
              classNames={{
                formLayout: {
                  label: styles['listbox-form-layout-label'],
                },
                listbox: styles['listbox'],
                chevron: styles['listbox-chevron'],
                label: styles['listbox-label'],
              }}
              label={t('cellar') ?? ''}
              options={cellarOptions}
              selectedId={selectedCellarId}
              onChange={(index: number, id: string) => setSelectedCellarId(id)}
            />
          </div>

          <Button
            classNames={{
              container: [
                styles['apply-button-container'],
                styles['apply-button-container-desktop'],
              ].join(' '),
              button: styles['apply-button'],
            }}
            rippleProps={{
              color: 'rgba(233, 33, 66, .35)',
            }}
            block={true}
            size={'large'}
            onClick={() => {
              if (
                selectedRegionId.length <= 0 ||
                selectedCellarId.length <= 0
              ) {
                return;
              }

              StoreController.applyFilterAsync(
                selectedRegionId,
                selectedCellarId
              );
              setTimeout(() => setOpenFilter(false), 250);
            }}
          >
            {t('apply')}
          </Button>
        </div>
      </CSSTransition>
    </div>
  );
}