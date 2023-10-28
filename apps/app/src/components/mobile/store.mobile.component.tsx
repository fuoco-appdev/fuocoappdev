import {
  ReactNode,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import { RoutePathsType } from '../../route-paths';
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
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { ResponsiveMobile } from '../responsive.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import { MedusaProductTypeNames } from 'src/types/medusa.type';

export default function StoreMobileComponent({
  storeProps,
  homeProps,
  homeLocalProps,
  openFilter,
  openCartVariants,
  countryOptions,
  regionOptions,
  cellarOptions,
  variantQuantities,
  selectedCountryId,
  selectedRegionId,
  selectedCellarId,
  setOpenFilter,
  setOpenCartVariants,
  setVariantQuantities,
  setSelectedCountryId,
  setSelectedRegionId,
  setSelectedCellarId,
  onPreviewsScroll,
  onPreviewsLoad,
  onAddToCart,
}: StoreResponsiveProps): JSX.Element {
  const previewsContainerRef = createRef<HTMLDivElement>();
  const rootRef = createRef<HTMLDivElement>();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveMobile>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-mobile']].join(' ')}
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
                value={storeProps.input}
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
                  StoreController.updateInput(event.target.value)
                }
              />
            </div>
            <div>
              <Button
                classNames={{
                  container: styles['filter-container'],
                  button: styles['filter-button'],
                }}
                onClick={() => setOpenFilter(true)}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                block={true}
                icon={<Line.FilterList size={24} color={'#fff'} />}
                rounded={true}
              />
            </div>
          </div>
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-mobile'],
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
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
          ].join(' ')}
          onScroll={(e) => {
            onPreviewsScroll(e);
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = e.currentTarget.scrollTop;
            if (prevPreviewScrollTop > scrollTop) {
              yPosition += prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition -= scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = e.currentTarget.scrollTop;
          }}
          ref={previewsContainerRef}
          onLoad={(e) => {
            onPreviewsLoad(e);
          }}
        >
          {storeProps.previews.map((preview: PricedProduct, index: number) => (
            <ProductPreviewComponent
              parentRef={rootRef}
              key={index}
              storeProps={storeProps}
              preview={preview}
              onClick={() => {
                StoreController.updateScrollPosition(
                  previewsContainerRef.current?.scrollTop ?? 0
                );
                StoreController.updateSelectedPreview(preview);
              }}
              onRest={() => {
                navigate(`${RoutePathsType.Store}/${preview.id}`);
              }}
              onAddToCart={() => {
                StoreController.updateSelectedPreview(preview);
                setOpenCartVariants(true);
              }}
            />
          ))}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              display:
                homeLocalProps.selectedInventoryLocationId &&
                storeProps.hasMorePreviews
                  ? 'flex'
                  : 'none',
            }}
          />
          {!homeLocalProps.selectedInventoryLocationId && (
            <div
              className={[
                styles['no-inventory-location-container'],
                styles['no-inventory-location-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['no-items-text'],
                  styles['no-items-text-mobile'],
                ].join(' ')}
              >
                {t('chooseASalesChannel')}
              </div>
              <div
                className={[
                  styles['no-items-container'],
                  styles['no-items-container-mobile'],
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
                    setTimeout(() => navigate(RoutePathsType.Home), 75)
                  }
                >
                  {t('home')}
                </Button>
              </div>
            </div>
          )}
        </div>
        <Dropdown
          open={openFilter}
          touchScreen={true}
          onClose={() => setOpenFilter(false)}
        >
          <div
            className={[
              styles['filter-content'],
              styles['filter-content-mobile'],
            ].join(' ')}
          >
            <Listbox
              classNames={{
                formLayout: {
                  label: styles['listbox-form-layout-label'],
                },
                listbox: styles['listbox'],
                chevron: styles['listbox-chevron'],
                label: styles['listbox-label'],
              }}
              touchScreen={true}
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
              touchScreen={true}
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
              touchScreen={true}
              label={t('cellar') ?? ''}
              options={cellarOptions}
              selectedId={selectedCellarId}
              onChange={(index: number, id: string) => setSelectedCellarId(id)}
            />
            <Button
              classNames={{
                container: [
                  styles['apply-button-container'],
                  styles['apply-button-container-mobile'],
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
        </Dropdown>
        <Dropdown
          open={openCartVariants}
          touchScreen={true}
          onClose={() => setOpenCartVariants(false)}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-mobile'],
            ].join(' ')}
          >
            {storeProps.selectedPreview?.variants.map((variant) => {
              return (
                <CartVariantItemComponent
                  productType={MedusaProductTypeNames.Wine}
                  key={variant.id}
                  product={storeProps.selectedPreview}
                  variant={variant}
                  storeProps={storeProps}
                  variantQuantities={variantQuantities}
                  setVariantQuantities={setVariantQuantities}
                />
              );
            })}
            <Button
              classNames={{
                container: [
                  styles['add-to-cart-button-container'],
                  styles['add-to-cart-button-container-mobile'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-mobile'],
                ].join(' '),
              }}
              block={true}
              size={'full'}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              icon={<Line.AddShoppingCart size={24} />}
              disabled={
                Object.values(variantQuantities).reduce((current, next) => {
                  return current + next;
                }, 0) <= 0
              }
              onClick={onAddToCart}
            >
              {t('addToCart')}
            </Button>
          </div>
        </Dropdown>
      </div>
    </ResponsiveMobile>
  );
}
