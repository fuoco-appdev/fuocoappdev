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
  Modal,
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
import ProductController from '../../controllers/product.controller';
import { InventoryLocation } from '../../models/explore.model';
import { StoreResponsiveProps } from '../store.component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { formatAmount } from 'medusa-react';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';
import CartVariantItemComponent from '../cart-variant-item.component';
import { MedusaProductTypeNames } from 'src/types/medusa.type';
import { createPortal } from 'react-dom';

export default function StoreTabletComponent({
  windowProps,
  storeProps,
  accountProps,
  exploreProps,
  exploreLocalProps,
  openFilter,
  openCartVariants,
  countryOptions,
  regionOptions,
  cellarOptions,
  variantQuantities,
  selectedCountryId,
  selectedRegionId,
  selectedCellarId,
  tabs,
  setOpenFilter,
  setOpenCartVariants,
  setSelectedCountryId,
  setSelectedRegionId,
  setSelectedCellarId,
  setVariantQuantities,
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
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveTablet>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-tablet']].join(' ')}
      >
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <div
            ref={topBarRef}
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-tablet'],
              ].join(' ')}
            >
              {exploreProps.selectedInventoryLocation && (
                <div
                  className={[
                    styles['sales-location-container'],
                    styles['sales-location-container-tablet'],
                  ].join(' ')}
                >
                  <Avatar
                    classNames={{
                      container: !exploreProps.selectedInventoryLocation?.avatar
                        ? [
                            styles['no-avatar-container'],
                            styles['no-avatar-container-tablet'],
                          ].join(' ')
                        : [
                            styles['avatar-container'],
                            styles['avatar-container-tablet'],
                          ].join(' '),
                    }}
                    size={'custom'}
                    text={exploreProps.selectedInventoryLocation?.company ?? ''}
                    src={exploreProps.selectedInventoryLocation?.avatar}
                  />
                  <div
                    className={[
                      styles['sales-location-title'],
                      styles['sales-location-title-tablet'],
                    ].join(' ')}
                  >
                    {exploreProps.selectedInventoryLocation?.company ?? ''}
                  </div>
                </div>
              )}
            </div>
            <div
              className={[
                styles['top-bar-middle-content'],
                styles['top-bar-middle-content-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-tablet'],
                  ].join(' ')}
                >
                  <Input
                    value={storeProps.input}
                    classNames={{
                      container: [
                        styles['search-input-container'],
                        styles['search-input-container-tablet'],
                      ].join(' '),
                      input: [
                        styles['search-input'],
                        styles['search-input-tablet'],
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
                  styles['tab-container-tablet'],
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
                styles['top-bar-right-content'],
                styles['top-bar-right-content-tablet'],
              ].join(' ')}
            >
              <div>
                <Button
                  touchScreen={true}
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
              styles['scroll-container-tablet'],
            ].join(' ')}
            style={{ height: window.innerHeight }}
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
            onLoad={onPreviewsLoad}
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
                  thumbnail={product.thumbnail ?? undefined}
                  title={product.title ?? undefined}
                  subtitle={product.subtitle ?? undefined}
                  description={product.description ?? undefined}
                  pricedProduct={pricedProduct}
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
                  onRest={() =>
                    pricedProduct && onProductPreviewRest(pricedProduct)
                  }
                  onAddToCart={() =>
                    pricedProduct &&
                    onProductPreviewAddToCart(
                      pricedProduct,
                      productLikesMetadata
                    )
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
                display:
                  exploreLocalProps.selectedInventoryLocationId &&
                  (storeProps.hasMorePreviews || storeProps.isLoading)
                    ? 'flex'
                    : 'none',
              }}
            />
            {!exploreLocalProps.selectedInventoryLocationId && (
              <div
                className={[
                  styles['no-inventory-location-container'],
                  styles['no-inventory-location-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-tablet'],
                  ].join(' ')}
                >
                  {t('chooseASalesChannel')}
                </div>
                <div
                  className={[
                    styles['no-items-container'],
                    styles['no-items-container-tablet'],
                  ].join(' ')}
                >
                  <Button
                    touchScreen={true}
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
              styles['filter-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['filter-top-container'],
                styles['filter-top-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['filter-title'],
                  styles['filter-title-tablet'],
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
                label={t('cellar') ?? ''}
                options={cellarOptions}
                selectedId={selectedCellarId}
                onChange={(index: number, id: string) =>
                  setSelectedCellarId(id)
                }
              />
            </div>

            <Button
              touchScreen={true}
              classNames={{
                container: [
                  styles['apply-button-container'],
                  styles['apply-button-container-tablet'],
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
      {createPortal(
        <Modal
          classNames={{
            overlay: [
              styles['modal-overlay'],
              styles['modal-overlay-tablet'],
            ].join(' '),
            modal: [styles['modal'], styles['modal-tablet']].join(' '),
            text: [styles['modal-text'], styles['modal-text-tablet']].join(' '),
            title: [styles['modal-title'], styles['modal-title-tablet']].join(
              ' '
            ),
            description: [
              styles['modal-description'],
              styles['modal-description-tablet'],
            ].join(' '),
            footerButtonContainer: [
              styles['modal-footer-button-container'],
              styles['modal-footer-button-container-tablet'],
              styles['modal-address-footer-button-container-tablet'],
            ].join(' '),
            cancelButton: {
              button: [
                styles['modal-cancel-button'],
                styles['modal-cancel-button-tablet'],
              ].join(' '),
            },
            confirmButton: {
              button: [
                styles['modal-confirm-button'],
                styles['modal-confirm-button-tablet'],
              ].join(' '),
            },
          }}
          title={t('addVariant') ?? ''}
          visible={openCartVariants}
          onCancel={() => setOpenCartVariants(false)}
          hideFooter={true}
        >
          <div
            className={[
              styles['add-variants-container'],
              styles['add-variants-container-tablet'],
            ].join(' ')}
          >
            {storeProps.selectedPricedProduct?.variants.map((variant) => {
              return (
                <CartVariantItemComponent
                  productType={MedusaProductTypeNames.Wine}
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
              touchScreen={true}
              classNames={{
                container: [
                  styles['add-to-cart-button-container'],
                  styles['add-to-cart-button-container-tablet'],
                ].join(' '),
                button: [
                  styles['add-to-cart-button'],
                  styles['add-to-cart-button-tablet'],
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
    </ResponsiveTablet>
  );
}
