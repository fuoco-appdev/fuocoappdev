/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  Button,
  Input,
  Line,
  Listbox,
  Modal,
  Scroll,
  Tabs,
} from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { ProductTabs } from '../../../shared/models/store.model';
import { ProductLikesMetadataResponse } from '../../../shared/protobuf/product-like_pb';
import { MedusaProductTypeNames } from '../../../shared/types/medusa.type';
import styles from '../../modules/store.module.scss';
import { DIContext } from '../app.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import ProductPreviewComponent from '../product-preview.component';
import { ResponsiveDesktop } from '../responsive.component';
import { StoreResponsiveProps } from '../store.component';

function StoreDesktopComponent({
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
  setSelectedCountryId,
  setSelectedRegionId,
  setSelectedSalesLocationId,
  setVariantQuantities,
  onPreviewsLoad,
  onAddToCart,
  onProductPreviewAddToCart,
  onProductPreviewClick,
  onProductPreviewLikeChanged,
  onProductPreviewRest,
  onRemoveSalesChannel,
}: StoreResponsiveProps): JSX.Element {
  const { ExploreController, StoreController } = React.useContext(DIContext);
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
  } = StoreController.model;
  const { selectedInventoryLocation } = ExploreController.model;
  const previewsContainerRef = React.createRef<HTMLDivElement>();
  const rootRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const sideBarRef = React.useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveDesktop>
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
              {selectedInventoryLocation && (
                <>
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
                  <div
                    className={[
                      styles['sales-location-container'],
                      styles['sales-location-container-desktop'],
                    ].join(' ')}
                  >
                    <Avatar
                      classNames={{
                        container: !selectedInventoryLocation?.avatar
                          ? [
                              styles['no-avatar-container'],
                              styles['no-avatar-container-desktop'],
                            ].join(' ')
                          : [
                              styles['avatar-container'],
                              styles['avatar-container-desktop'],
                            ].join(' '),
                      }}
                      size={'custom'}
                      text={selectedInventoryLocation?.company ?? ''}
                      src={selectedInventoryLocation?.avatar}
                    />
                    <div
                      className={[
                        styles['sales-location-title'],
                        styles['sales-location-title-desktop'],
                      ].join(' ')}
                    >
                      {selectedInventoryLocation?.company ?? ''}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={[
                styles['top-bar-middle-content'],
                styles['top-bar-middle-content-desktop'],
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
                    value={input}
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
            <div
              className={[
                styles['top-bar-right-content'],
                styles['top-bar-right-content-desktop'],
              ].join(' ')}
            >
              <div>
                <Button
                  classNames={{
                    container: styles['rounded-container'],
                    button: styles['rounded-button'],
                  }}
                  onClick={() => setOpenFilter(!openFilter)}
                  rippleProps={{
                    color: 'rgba(42, 42, 95, .35)',
                  }}
                  icon={
                    openFilter ? (
                      <Line.Close size={24} />
                    ) : (
                      <Line.FilterList size={24} />
                    )
                  }
                  rounded={true}
                />
              </div>
            </div>
          </div>
          <Scroll
            loadComponent={
              <img
                src={'../assets/svg/ring-resize-dark.svg'}
                className={styles['loading-ring']}
              />
            }
            loadingHeight={56}
            showIndicatorThreshold={56}
            reloadThreshold={96}
            pullIndicatorComponent={
              <div className={[styles['pull-indicator-container']].join(' ')}>
                <Line.ArrowDownward size={24} />
              </div>
            }
            isLoadable={hasMorePreviews}
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
                styles['scroll-content-desktop'],
              ].join(' ')}
              ref={previewsContainerRef}
              onLoad={onPreviewsLoad}
            >
              {products.map(
                (product: HttpTypes.StoreProduct, index: number) => {
                  const pricedProduct = Object.keys(pricedProducts).includes(
                    product.id ?? ''
                  )
                    ? pricedProducts[product.id ?? '']
                    : null;
                  const currentProductLikesMetadata =
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
                        currentProductLikesMetadata ??
                        ProductLikesMetadataResponse.prototype
                      }
                      onClick={() =>
                        pricedProduct &&
                        onProductPreviewClick(
                          previewsContainerRef.current?.scrollTop ?? 0,
                          pricedProduct,
                          currentProductLikesMetadata
                        )
                      }
                      onRest={() => onProductPreviewRest(product)}
                      onAddToCart={() =>
                        pricedProduct &&
                        onProductPreviewAddToCart(
                          pricedProduct,
                          currentProductLikesMetadata
                        )
                      }
                      onLikeChanged={(isLiked: boolean) =>
                        pricedProduct &&
                        onProductPreviewLikeChanged(isLiked, pricedProduct)
                      }
                    />
                  );
                }
              )}
            </div>
          </Scroll>
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
                label={t('location') ?? ''}
                options={salesLocationOptions}
                selectedId={selectedSalesLocationId}
                onChange={(_index: number, id: string) =>
                  setSelectedSalesLocationId(id)
                }
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
        </CSSTransition>
      </div>
      {ReactDOM.createPortal(
        <Modal
          classNames={{
            overlay: [
              styles['modal-overlay'],
              styles['modal-overlay-desktop'],
            ].join(' '),
            modal: [styles['modal'], styles['modal-desktop']].join(' '),
            text: [styles['modal-text'], styles['modal-text-desktop']].join(
              ' '
            ),
            title: [styles['modal-title'], styles['modal-title-desktop']].join(
              ' '
            ),
            description: [
              styles['modal-description'],
              styles['modal-description-desktop'],
            ].join(' '),
            footerButtonContainer: [
              styles['modal-footer-button-container'],
              styles['modal-footer-button-container-desktop'],
              styles['modal-address-footer-button-container-desktop'],
            ].join(' '),
            cancelButton: {
              button: [
                styles['modal-cancel-button'],
                styles['modal-cancel-button-desktop'],
              ].join(' '),
            },
            confirmButton: {
              button: [
                styles['modal-confirm-button'],
                styles['modal-confirm-button-desktop'],
              ].join(' '),
            },
          }}
          title={t('addVariant') ?? ''}
          visible={openCartVariants}
          onCancel={() => {
            setOpenCartVariants(false);
            setIsPreviewLoading(false);
          }}
          hideFooter={true}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-desktop'],
            ].join(' ')}
          >
            {selectedPricedProduct?.variants?.map((variant) => {
              return (
                <CartVariantItemComponent
                  productType={
                    selectedPricedProduct?.type?.value as MedusaProductTypeNames
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
                  styles['add-to-cart-button-container-desktop'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-desktop'],
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
        </Modal>,
        document.body
      )}
    </ResponsiveDesktop>
  );
}

export default observer(StoreDesktopComponent);
