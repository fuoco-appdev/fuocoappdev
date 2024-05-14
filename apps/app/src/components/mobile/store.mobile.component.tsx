import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Line,
  Listbox,
  Scroll,
  Tabs
} from '@fuoco.appdev/core-ui';
import { Product } from '@medusajs/medusa';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import StoreController from '../../controllers/store.controller';
import { ProductTabs } from '../../models/store.model';
import { ProductLikesMetadataResponse } from '../../protobuf/product-like_pb';
import { RoutePathsType, useQuery } from '../../route-paths';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import { StoreResponsiveProps } from '../store.component';
import styles from '../store.module.scss';

export default function StoreMobileComponent({
  storeProps,
  accountProps,
  exploreProps,
  windowProps,
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
  onRemoveSalesChannel
}: StoreResponsiveProps): JSX.Element {
  const previewsContainerRef = React.createRef<HTMLDivElement>();
  const rootRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const bottomBarRef = React.useRef<HTMLDivElement | null>(null);
  const [showBottomBar, setShowBottomBar] = useState<boolean>(false);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  useMobileEffect(() => {
    setShowBottomBar(exploreLocalProps.selectedInventoryLocationId !== undefined);
  }, [exploreLocalProps.selectedInventoryLocationId]);
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
                  container: styles['rounded-container'],
                  button: styles['rounded-button'],
                }}
                onClick={() => setOpenFilter(true)}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                type={'text'}
                block={true}
                icon={<Line.FilterList size={24} />}
                rounded={true}
              />
            </div>
            <div
              className={[
                styles['shopping-cart-container-details'],
                styles['shopping-cart-container-details-mobile'],
              ].join(' ')}
            >
              <Button
                classNames={{
                  container: styles['rounded-container'],
                  button: styles['rounded-button'],
                }}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                onClick={() =>
                  setTimeout(
                    () =>
                      navigate({
                        pathname: RoutePathsType.Cart,
                        search: query.toString(),
                      }),
                    150
                  )
                }
                type={'text'}
                touchScreen={true}
                rounded={true}
                size={'tiny'}
                icon={
                  <Line.ShoppingCart
                    size={24}
                  />
                }
              />
              {windowProps.cartCount > 0 && (
                <div
                  className={[
                    styles['cart-number-container'],
                    styles['cart-number-container-mobile'],
                  ].join(' ')}
                >
                  <span
                    className={[
                      styles['cart-number'],
                      styles['cart-number-mobile'],
                    ].join(' ')}
                  >
                    {windowProps.cartCount}
                  </span>
                </div>
              )}
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
        <Scroll
          classNames={{
            root: [styles['scroll-root'], styles['scroll-root-mobile']].join(' '),
            reloadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' '),
            loadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' ')
          }}
          touchScreen={true}
          reloadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isReloading={storeProps.isReloading}
          onReload={() => StoreController.reloadProductsAsync()}
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isLoading={storeProps.isLoading}
          onLoad={() => StoreController.onNextScrollAsync()}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = contentRef.current?.getBoundingClientRect().top ?? 0;
            if (prevPreviewScrollTop <= scrollTop) {
              yPosition -= prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition += scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = scrollTop;
          }}
        >
          <div
            className={[
              styles['scroll-container'],
              styles['scroll-container-mobile'],
            ].join(' ')}
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
                  showPricingDetails={storeProps.selectedSalesChannel !== undefined}
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
                    productLikesMetadata ?? ProductLikesMetadataResponse.prototype
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
          </div>
        </Scroll>
        <CSSTransition
          nodeRef={bottomBarRef}
          in={!showBottomBar}
          classNames={{
            enter: styles['bottom-bar-enter'],
            enterActive: styles['bottom-bar-enter-active'],
            enterDone: styles['bottom-bar-enter-done'],
            exit: styles['bottom-bar-exit'],
            exitActive: styles['bottom-bar-exit-active'],
            exitDone: styles['bottom-bar-exit-done'],
          }}
          timeout={150}
        >
          <div
            className={[
              styles['bottom-bar-container'],
              styles['bottom-bar-container-mobile'],
            ].join(' ')}
            ref={bottomBarRef}
          >
            <div style={{ width: 46, height: 46 }} />
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
            <div>
              <Button
                classNames={{
                  container: styles['rounded-container'],
                  button: styles['rounded-button'],
                }}
                onClick={onRemoveSalesChannel}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                type={'text'}
                block={true}
                icon={<Line.Close size={24} />}
                rounded={true}
              />
            </div>
          </div>
        </CSSTransition>
        {ReactDOM.createPortal(
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
                  onChange={(_index: number, id: string) =>
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
                  onChange={(_index: number, id: string) =>
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
                  onChange={(_index: number, id: string) =>
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
