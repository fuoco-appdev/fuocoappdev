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
  Avatar,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
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
import ExploreController from '../../controllers/explore.controller';
import {
  InventoryLocation,
  InventoryLocationType,
} from '../../models/explore.model';
import { StoreResponsiveProps } from '../store.component';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { ResponsiveMobile } from '../responsive.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import { MedusaProductTypeNames } from 'src/types/medusa.type';
import ReactDOM, { createPortal } from 'react-dom';
import ProductController from '../../controllers/product.controller';
import Skeleton from 'react-loading-skeleton';

export default function StoreMobileComponent({
  windowProps,
  storeProps,
  accountProps,
  exploreProps,
  exploreLocalProps,
  openFilter,
  openCartVariants,
  countryOptions,
  regionOptions,
  salesLocationOptions,
  variantQuantities,
  selectedCountryId,
  selectedRegionId,
  selectedSalesLocationId,
  tabs,
  isPreviewLoading,
  setIsPreviewLoading,
  setOpenFilter,
  setOpenCartVariants,
  setVariantQuantities,
  setSelectedCountryId,
  setSelectedRegionId,
  setSelectedSalesLocationId,
  onPreviewsScroll,
  onPreviewsLoad,
  onAddToCart,
  onProductPreviewAddToCart,
  onProductPreviewClick,
  onProductPreviewLikeChanged,
  onProductPreviewRest,
}: StoreResponsiveProps): JSX.Element {
  const previewsContainerRef = createRef<HTMLDivElement>();
  const rootRef = createRef<HTMLDivElement>();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const categoryButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
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
              styles['top-bar-top-content'],
              styles['top-bar-top-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['sales-location-container'],
                styles['sales-location-container-mobile'],
              ].join(' ')}
            >
              {exploreProps.selectedInventoryLocation && (
                <>
                  <Avatar
                    classNames={{
                      container: !exploreProps.selectedInventoryLocation?.avatar
                        ? [
                            styles['no-avatar-container'],
                            styles['no-avatar-container-mobile'],
                          ].join(' ')
                        : [
                            styles['avatar-container'],
                            styles['avatar-container-mobile'],
                          ].join(' '),
                    }}
                    size={'custom'}
                    text={exploreProps.selectedInventoryLocation?.company ?? ''}
                    src={exploreProps.selectedInventoryLocation?.avatar}
                  />
                  <div
                    className={[
                      styles['sales-location-title'],
                      styles['sales-location-title-mobile'],
                    ].join(' ')}
                  >
                    {exploreProps.selectedInventoryLocation?.company ?? ''}
                  </div>
                </>
              )}
              {!exploreProps.selectedInventoryLocation && (
                <>
                  <Skeleton width={28} height={28} borderRadius={28} />
                  <Skeleton
                    className={[
                      styles['sales-location-title'],
                      styles['sales-location-title-mobile'],
                    ].join(' ')}
                    width={120}
                    borderRadius={20}
                  />
                </>
              )}
            </div>
          </div>

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
              tabs={tabs}
            />
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
          ].join(' ')}
          style={{
            height: window.innerHeight,
          }}
          onScroll={(e) => {
            onPreviewsScroll(e);
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = e.currentTarget.scrollTop;
            if (prevPreviewScrollTop >= scrollTop) {
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
          {storeProps.products.map((product: Product, index: number) => {
            const pricedProduct = Object.keys(
              storeProps.pricedProducts
            ).includes(product.id ?? '')
              ? storeProps.pricedProducts[product.id ?? '']
              : null;
            const productLikesMetadata =
              storeProps.productLikesMetadata?.find(
                (value) => value.productId === product.id
              ) ?? null;
            return (
              <ProductPreviewComponent
                parentRef={rootRef}
                key={index}
                storeProps={storeProps}
                accountProps={accountProps}
                purchasable={true}
                thumbnail={product.thumbnail ?? undefined}
                title={product.title ?? undefined}
                subtitle={product.subtitle ?? undefined}
                description={product.description ?? undefined}
                type={product.type ?? undefined}
                pricedProduct={pricedProduct}
                isLoading={
                  isPreviewLoading &&
                  storeProps.selectedPricedProduct?.id === pricedProduct?.id
                }
                likesMetadata={
                  productLikesMetadata ??
                  core.ProductLikesMetadataResponse.prototype
                }
                onClick={() =>
                  pricedProduct &&
                  onProductPreviewClick(
                    previewsContainerRef.current?.scrollTop ?? 0,
                    pricedProduct,
                    productLikesMetadata
                  )
                }
                onRest={() => onProductPreviewRest(product)}
                onAddToCart={() =>
                  pricedProduct &&
                  onProductPreviewAddToCart(pricedProduct, productLikesMetadata)
                }
                onLikeChanged={(isLiked: boolean) =>
                  pricedProduct &&
                  onProductPreviewLikeChanged(isLiked, pricedProduct)
                }
              />
            );
          })}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight:
                exploreLocalProps.selectedInventoryLocationId &&
                (storeProps.hasMorePreviews || storeProps.isLoading)
                  ? 24
                  : 0,
            }}
          />
          {!exploreLocalProps.selectedInventoryLocationId && (
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
                    setTimeout(
                      () =>
                        navigate({
                          pathname: RoutePathsType.Explore,
                          search: query.toString(),
                        }),
                      75
                    )
                  }
                >
                  {t('explore')}
                </Button>
              </div>
            </div>
          )}
        </div>
        {createPortal(
          <>
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
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
                  onChange={(index: number, id: string) =>
                    setSelectedCountryId(id)
                  }
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
                  onChange={(index: number, id: string) =>
                    setSelectedRegionId(id)
                  }
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
                  label={t('location') ?? ''}
                  options={salesLocationOptions}
                  selectedId={selectedSalesLocationId}
                  onChange={(index: number, id: string) =>
                    setSelectedSalesLocationId(id)
                  }
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
                      selectedSalesLocationId.length <= 0
                    ) {
                      return;
                    }

                    StoreController.applyFilterAsync(
                      selectedRegionId,
                      selectedSalesLocationId
                    );
                    setTimeout(() => setOpenFilter(false), 250);
                  }}
                >
                  {t('apply')}
                </Button>
              </div>
            </Dropdown>
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
              open={
                openCartVariants &&
                storeProps.selectedPricedProduct !== undefined
              }
              touchScreen={true}
              onClose={() => {
                setOpenCartVariants(false);
                setIsPreviewLoading(false);
              }}
            >
              <div
                className={[
                  styles['add-variants-container'],
                  styles['add-variants-container-mobile'],
                ].join(' ')}
              >
                {storeProps.selectedPricedProduct?.variants.map((variant) => {
                  return (
                    <CartVariantItemComponent
                      productType={
                        storeProps.selectedPricedProduct?.type
                          ?.value as MedusaProductTypeNames
                      }
                      key={variant.id}
                      product={storeProps.selectedPricedProduct}
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
          </>,
          document.body
        )}
      </div>
    </ResponsiveMobile>
  );
}
