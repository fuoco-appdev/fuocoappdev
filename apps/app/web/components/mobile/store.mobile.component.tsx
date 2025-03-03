import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Line,
  Listbox,
  Scroll,
  Tabs,
} from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ProductTabs } from '../../../shared/models/store.model';
import { ProductLikesMetadataResponse } from '../../../shared/protobuf/product-like_pb';
import { RoutePathsType } from '../../../shared/route-paths-type';
import { MedusaProductTypeNames } from '../../../shared/types/medusa.type';
import styles from '../../modules/store.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import { StoreResponsiveProps } from '../store.component';

function StoreMobileComponent({
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
  onPreviewsLoad,
  onAddToCart,
  onProductPreviewAddToCart,
  onProductPreviewClick,
  onProductPreviewLikeChanged,
  onProductPreviewRest,
  onRemoveSalesChannel,
}: StoreResponsiveProps): JSX.Element {
  const previewsContainerRef = React.createRef<HTMLDivElement>();
  const rootRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const bottomBarRef = React.useRef<HTMLDivElement | null>(null);
  const [showBottomBar, setShowBottomBar] = useState<boolean>(false);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { ExploreController, StoreController, WindowController } =
    React.useContext(DIContext);
  const {
    input,
    selectedTab,
    hasMorePreviews,
    isLoading,
    products,
    pricedProducts,
    productLikesMetadata,
    selectedSalesChannel,
    selectedPricedProduct,
    isReloading,
  } = StoreController.model;
  const { cartCount } = WindowController.model;
  const { selectedInventoryLocation, selectedInventoryLocationId } =
    ExploreController.model;
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  useMobileEffect(() => {
    setShowBottomBar(selectedInventoryLocationId !== undefined);
  }, [selectedInventoryLocationId]);

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
                value={input}
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
                icon={<Line.ShoppingCart size={24} />}
              />
              {cartCount > 0 && (
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
                    {cartCount}
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
              activeId={selectedTab}
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
          isLoadable={hasMorePreviews}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={
            <div className={[styles['pull-indicator-container']].join(' ')}>
              <Line.ArrowDownward size={24} />
            </div>
          }
          reloadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isReloading={isReloading}
          onReload={() => StoreController.reloadProductsAsync()}
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isLoading={isLoading}
          onLoad={() => StoreController.onNextScrollAsync()}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop =
              contentRef.current?.getBoundingClientRect().top ?? 0;
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
              styles['scroll-content'],
              styles['scroll-content-mobile'],
            ].join(' ')}
            ref={previewsContainerRef}
            onLoad={(e) => {
              onPreviewsLoad(e);
            }}
          >
            {products.map((product: HttpTypes.StoreProduct, index: number) => {
              const pricedProduct = Object.keys(pricedProducts).includes(
                product.id ?? ''
              )
                ? pricedProducts[product.id ?? '']
                : null;
              const metadata =
                productLikesMetadata?.find(
                  (value) => value.productId === product.id
                ) ?? null;
              return (
                <ProductPreviewComponent
                  parentRef={rootRef}
                  key={index}
                  purchasable={true}
                  showPricingDetails={selectedSalesChannel !== undefined}
                  thumbnail={product.thumbnail ?? undefined}
                  title={product.title ?? undefined}
                  subtitle={product.subtitle ?? undefined}
                  description={product.description ?? undefined}
                  type={product.type ?? undefined}
                  pricedProduct={pricedProduct}
                  isLoading={
                    isPreviewLoading &&
                    selectedPricedProduct?.id === pricedProduct?.id
                  }
                  likesMetadata={
                    metadata ?? ProductLikesMetadataResponse.prototype
                  }
                  onClick={() =>
                    pricedProduct &&
                    onProductPreviewClick(
                      previewsContainerRef.current?.scrollTop ?? 0,
                      pricedProduct,
                      metadata
                    )
                  }
                  onRest={() => onProductPreviewRest(product)}
                  onAddToCart={() =>
                    pricedProduct &&
                    onProductPreviewAddToCart(pricedProduct, metadata)
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
              {selectedInventoryLocation && (
                <>
                  <Avatar
                    classNames={{
                      container: !selectedInventoryLocation?.avatar
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
                    text={selectedInventoryLocation?.company ?? ''}
                    src={selectedInventoryLocation?.avatar}
                  />
                  <div
                    className={[
                      styles['sales-location-title'],
                      styles['sales-location-title-mobile'],
                    ].join(' ')}
                  >
                    {selectedInventoryLocation?.company ?? ''}
                  </div>
                </>
              )}
              {!selectedInventoryLocation && (
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
              open={openCartVariants && selectedPricedProduct !== undefined}
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
                {selectedPricedProduct?.variants?.map((variant) => {
                  return (
                    <CartVariantItemComponent
                      productType={
                        selectedPricedProduct?.type
                          ?.value as MedusaProductTypeNames
                      }
                      key={variant.id}
                      product={selectedPricedProduct}
                      variant={variant}
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

export default observer(StoreMobileComponent);
