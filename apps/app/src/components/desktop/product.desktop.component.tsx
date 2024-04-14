import {
  Button,
  Input,
  InputNumber,
  Line,
  Modal,
  Tabs,
} from '@fuoco.appdev/core-ui';
import { ProductTag } from '@medusajs/medusa';
import { useTranslation } from 'react-i18next';
import ProductController from '../../controllers/product.controller';
import styles from '../product.module.scss';
// @ts-ignore
import loadable from '@loadable/component';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import { formatAmount } from 'medusa-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Skeleton from 'react-loading-skeleton';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ExploreController from '../../controllers/explore.controller';
import { ProductTabType } from '../../models/product.model';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { ProductResponsiveProps } from '../product.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';
import StockLocationItemComponent from '../stock-location-item.component';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (productProps: any) => <reactMarkdown.default {...productProps} />;
  },
  { ssr: false }
);

export default function ProductDesktopComponent({
  productProps,
  accountProps,
  storeProps,
  remarkPlugins,
  translatedDescription,
  description,
  sideBarTabs,
  tabs,
  activeVariantId,
  activeDetails,
  alcohol,
  brand,
  varietals,
  producerBottler,
  format,
  region,
  residualSugar,
  type,
  tags,
  uvc,
  vintage,
  quantity,
  isLiked,
  likeCount,
  selectedStockLocation,
  setActiveDetails,
  setDescription,
  setQuantity,
  onAddToCart,
  onLikeChanged,
  formatNumberCompact,
  onStockLocationClicked,
  onSideBarScroll,
  onSideBarLoad,
  onSelectLocation,
  onCancelLocation,
}: ProductResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  useDesktopEffect(() => {
    setDescription(translatedDescription);
  }, [translatedDescription]);

  const selectedVariant = productProps.selectedVariant;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['content-container'],
              styles['content-container-desktop'],
            ].join(' ')}
            style={{ position: 'sticky', top: 0 }}
          >
            <div
              className={[
                styles['thumbnail-container'],
                styles['thumbnail-container-desktop'],
              ].join(' ')}
            >
              {!productProps.isLoading ? (
                <>
                  {productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.Wine && (
                      <img
                        className={[
                          styles['wine-thumbnail-image'],
                          styles['wine-thumbnail-image-desktop'],
                        ].join(' ')}
                        src={productProps.metadata?.thumbnail}
                      />
                    )}
                  {productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['menu-item-thumbnail-image'],
                          styles['menu-item-thumbnail-image-desktop'],
                        ].join(' ')}
                        src={productProps.metadata?.thumbnail}
                      />
                    )}
                  {!productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.Wine && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-desktop'],
                        ].join(' ')}
                        src={'../assets/images/wine-bottle.png'}
                      />
                    )}
                  {!productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-desktop'],
                        ].join(' ')}
                        src={'../assets/images/menu.png'}
                      />
                    )}
                </>
              ) : (
                <Skeleton
                  className={[
                    styles['thumbnail-image-skeleton'],
                    styles['thumbnail-image-skeleton-desktop'],
                  ].join(' ')}
                />
              )}
            </div>
          </div>
          <div
            className={[
              styles['content-container'],
              styles['content-container-desktop'],
              styles['middle-content'],
              styles['middle-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-desktop'],
                ].join(' ')}
              >
                {!productProps.isLoading ? (
                  <>
                    <div
                      className={[
                        styles['title'],
                        styles['title-desktop'],
                      ].join(' ')}
                    >
                      {productProps.metadata?.title}
                    </div>
                    <div
                      className={[
                        styles['subtitle'],
                        styles['subtitle-desktop'],
                      ].join(' ')}
                    >
                      {productProps.metadata?.subtitle}
                    </div>
                  </>
                ) : (
                  <Skeleton
                    count={1}
                    borderRadius={9999}
                    className={[
                      styles['title-skeleton'],
                      styles['title-skeleton-desktop'],
                    ].join(' ')}
                  />
                )}
              </div>
              <div
                className={[
                  styles['like-container'],
                  styles['like-container-desktop'],
                ].join(' ')}
              >
                {!productProps.isLoading ? (
                  <>
                    <Button
                      rippleProps={{
                        color: !isLiked
                          ? 'rgba(233, 33, 66, .35)'
                          : 'rgba(42, 42, 95, .35)',
                      }}
                      rounded={true}
                      disabled={
                        !accountProps.account ||
                        accountProps.account.status === 'Incomplete'
                      }
                      onClick={() => onLikeChanged(!isLiked)}
                      type={'text'}
                      icon={
                        isLiked ? (
                          <Line.Favorite size={24} color={'#E92142'} />
                        ) : (
                          <Line.FavoriteBorder size={24} color={'#2A2A5F'} />
                        )
                      }
                    />
                    <div
                      className={[
                        styles['like-count'],
                        styles['like-count-desktop'],
                      ].join(' ')}
                    >
                      {formatNumberCompact(likeCount)}
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton
                      className={[
                        styles['like-button-skeleton'],
                        styles['like-button-skeleton-desktop'],
                      ].join(' ')}
                    />
                    <Skeleton
                      borderRadius={9999}
                      className={[
                        styles['like-count-skeleton'],
                        styles['like-count-skeleton-desktop'],
                      ].join(' ')}
                    />
                  </>
                )}
              </div>
            </div>
            <div
              className={[
                styles['tags-container'],
                styles['tags-container-desktop'],
              ].join(' ')}
            >
              {!productProps.isLoading ? (
                <>
                  {tags?.map((value: ProductTag) => (
                    <div
                      className={[styles['tag'], styles['tag-desktop']].join(
                        ' '
                      )}
                    >
                      {value.value}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[1, 2, 3, 4].map(() => (
                    <Skeleton
                      className={[
                        styles['tag-skeleton'],
                        styles['tag-skeleton-desktop'],
                      ].join(' ')}
                      borderRadius={9999}
                    />
                  ))}
                </>
              )}
            </div>
            <div
              className={[
                styles['description-container'],
                styles['description-container-desktop'],
              ].join(' ')}
            >
              {!productProps.isLoading ? (
                <ReactMarkdown
                  remarkPlugins={remarkPlugins}
                  children={description}
                />
              ) : (
                <Skeleton
                  count={16}
                  borderRadius={9999}
                  className={[
                    styles['skeleton-description'],
                    styles['skeleton-description-desktop'],
                  ].join(' ')}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-desktop'],
            ].join(' ')}
          >
            <Tabs
              flex={true}
              touchScreen={true}
              activeId={productProps.activeTabId}
              classNames={{
                nav: [styles['tab-nav'], styles['tab-nav-desktop']].join(' '),
                tabButton: [
                  styles['tab-button'],
                  styles['tab-button-desktop'],
                ].join(''),
                tabOutline: [
                  styles['tab-outline'],
                  styles['tab-outline-desktop'],
                ].join(' '),
              }}
              onChange={(id) => {
                ProductController.updateActiveTabId(id as ProductTabType);
              }}
              type={'underlined'}
              tabs={sideBarTabs}
            />
          </div>
          <div
            className={[
              styles['side-bar-content'],
              styles['side-bar-content-desktop'],
            ].join(' ')}
            onScroll={onSideBarScroll}
            onLoad={onSideBarLoad}
          >
            <TransitionGroup
              component={null}
              childFactory={(child) =>
                React.cloneElement(child, {
                  classNames: {
                    enter:
                      productProps.transitionKeyIndex <
                      productProps.prevTransitionKeyIndex
                        ? styles['left-to-right-enter']
                        : styles['right-to-left-enter'],
                    enterActive:
                      productProps.transitionKeyIndex <
                      productProps.prevTransitionKeyIndex
                        ? styles['left-to-right-enter-active']
                        : styles['right-to-left-enter-active'],
                    exit:
                      productProps.transitionKeyIndex <
                      productProps.prevTransitionKeyIndex
                        ? styles['left-to-right-exit']
                        : styles['right-to-left-exit'],
                    exitActive:
                      productProps.transitionKeyIndex <
                      productProps.prevTransitionKeyIndex
                        ? styles['left-to-right-exit-active']
                        : styles['right-to-left-exit-active'],
                  },
                  timeout: 250,
                })
              }
            >
              <CSSTransition
                key={productProps.transitionKeyIndex}
                classNames={{
                  enter:
                    productProps.transitionKeyIndex >
                    productProps.prevTransitionKeyIndex
                      ? styles['left-to-right-enter']
                      : styles['right-to-left-enter'],
                  enterActive:
                    productProps.transitionKeyIndex >
                    productProps.prevTransitionKeyIndex
                      ? styles['left-to-right-enter-active']
                      : styles['right-to-left-enter-active'],
                  exit:
                    productProps.transitionKeyIndex >
                    productProps.prevTransitionKeyIndex
                      ? styles['left-to-right-exit']
                      : styles['right-to-left-exit'],
                  exitActive:
                    productProps.transitionKeyIndex >
                    productProps.prevTransitionKeyIndex
                      ? styles['left-to-right-exit-active']
                      : styles['right-to-left-exit-active'],
                }}
                timeout={250}
                unmountOnExit={false}
              >
                <div
                  style={{
                    minHeight: '100%',
                    minWidth: '100%',
                  }}
                >
                  {productProps.activeTabId === ProductTabType.Price && (
                    <div
                      className={[
                        styles['price-container'],
                        styles['price-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['price'],
                          styles['price-desktop'],
                        ].join(' ')}
                      >
                        {!productProps.isLoading ? (
                          <>
                            {selectedVariant?.original_price !==
                              selectedVariant?.calculated_price && (
                              <div
                                className={[
                                  styles['calculated-price'],
                                  styles['calculated-price-desktop'],
                                ].join(' ')}
                              >
                                {storeProps.selectedRegion &&
                                  formatAmount({
                                    amount:
                                      selectedVariant?.calculated_price ?? 0,
                                    region: storeProps.selectedRegion,
                                    includeTaxes: false,
                                  })}
                              </div>
                            )}
                            &nbsp;
                            <div
                              className={[
                                styles['original-price'],
                                styles['original-price-desktop'],
                                selectedVariant?.original_price !==
                                  selectedVariant?.calculated_price &&
                                  styles['original-price-crossed'],
                              ].join(' ')}
                            >
                              {storeProps.selectedRegion &&
                                formatAmount({
                                  amount: selectedVariant?.original_price ?? 0,
                                  region: storeProps.selectedRegion,
                                  includeTaxes: false,
                                })}
                            </div>
                            {type?.value === MedusaProductTypeNames.Wine && (
                              <>
                                &nbsp;
                                <span
                                  className={[
                                    styles['inventory-quantity'],
                                    styles['inventory-quantity-desktop'],
                                  ].join(' ')}
                                >
                                  (
                                  {
                                    productProps.selectedVariant
                                      ?.inventory_quantity
                                  }
                                  &nbsp;
                                  {t('inStock')})
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <Skeleton
                            className={[
                              styles['inventory-quantity'],
                              styles['inventory-quantity-desktop'],
                            ].join(' ')}
                            borderRadius={9999}
                            count={1}
                          />
                        )}
                      </div>
                      <div
                        className={[
                          styles['tab-container'],
                          styles['tab-container-desktop'],
                        ].join(' ')}
                      >
                        {!productProps.isLoading ? (
                          <Tabs
                            flex={true}
                            classNames={{
                              nav: styles['tab-nav'],
                              tabButton: styles['tab-button'],
                              tabOutline: styles['tab-outline'],
                            }}
                            type={'underlined'}
                            tabs={tabs}
                            activeId={activeVariantId}
                            onChange={(id) =>
                              ProductController.updateSelectedVariant(id)
                            }
                          />
                        ) : (
                          <Skeleton
                            className={[
                              styles['tabs-skeleton'],
                              styles['tabs-skeleton-desktop'],
                            ].join(' ')}
                          />
                        )}
                        {type?.value === MedusaProductTypeNames.Wine && (
                          <div
                            className={[
                              styles['options-container'],
                              styles['options-container-desktop'],
                            ].join(' ')}
                          >
                            {!productProps.isLoading ? (
                              <>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('alcohol')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {alcohol}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('brand')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {brand}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('format')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {format}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('producerBottler')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {producerBottler}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('region')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {region}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('residualSugar')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {residualSugar}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('type')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {type?.value ===
                                      MedusaProductTypeNames.Wine.toString() &&
                                      t('wine')}
                                    {type?.value ===
                                      MedusaProductTypeNames.MenuItem.toString() &&
                                      t('menuItem')}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('uvc')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {uvc}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('varietals')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {varietals}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('vintage')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {vintage}
                                  </div>
                                </div>
                              </>
                            ) : (
                              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-desktop'],
                                  ].join(' ')}
                                >
                                  <Skeleton
                                    className={[
                                      styles['option-title-skeleton'],
                                      styles['option-title-skeleton-desktop'],
                                    ].join(' ')}
                                    borderRadius={9999}
                                  />
                                  <Skeleton
                                    className={[
                                      styles['option-value-skeleton'],
                                      styles['option-value-skeleton-desktop'],
                                    ].join(' ')}
                                    borderRadius={9999}
                                  />
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                      {!productProps.isLoading ? (
                        <InputNumber
                          label={t('quantity') ?? ''}
                          classNames={{
                            formLayout: {
                              label: styles['input-form-layout-label'],
                            },
                            input: styles['input'],
                            container: styles['input-container'],
                            button: {
                              button: [
                                styles['input-button'],
                                styles['input-button-desktop'],
                              ].join(' '),
                            },
                          }}
                          iconColor={'#2A2A5F'}
                          value={quantity.toString()}
                          min={1}
                          max={
                            !productProps.selectedVariant?.allow_backorder
                              ? productProps.selectedVariant
                                  ?.inventory_quantity ?? 0
                              : undefined
                          }
                          onChange={(e) => {
                            setQuantity(parseInt(e.currentTarget.value));
                          }}
                        />
                      ) : (
                        <div className={styles['input-root-skeleton']}>
                          <Skeleton
                            className={
                              styles['input-form-layout-label-skeleton']
                            }
                            height={20}
                            width={120}
                            borderRadius={20}
                          />
                          <Skeleton style={{ height: 44 }} borderRadius={6} />
                        </div>
                      )}
                      {!productProps.isLoading ? (
                        <Button
                          classNames={{
                            container: styles['add-to-cart-button-container'],
                            button: styles['add-to-cart-button'],
                          }}
                          block={true}
                          size={'full'}
                          rippleProps={{
                            color: 'rgba(233, 33, 66, .35)',
                          }}
                          icon={
                            !productProps.selectedVariant?.purchasable ? (
                              <Line.ProductionQuantityLimits size={24} />
                            ) : (
                              <Line.AddShoppingCart size={24} />
                            )
                          }
                          disabled={!productProps.selectedVariant?.purchasable}
                          onClick={onAddToCart}
                        >
                          {!productProps.selectedVariant?.purchasable &&
                            t('outOfStock')}
                          {productProps.selectedVariant?.purchasable &&
                            t('addToCart')}
                        </Button>
                      ) : (
                        <Skeleton
                          className={[
                            styles['add-to-cart-button-skeleton'],
                            styles['add-to-cart-button-skeleton-desktop'],
                          ].join(' ')}
                        />
                      )}
                      <div
                        className={[
                          styles['tab-container'],
                          styles['tab-container-desktop'],
                        ].join(' ')}
                      >
                        {!productProps.isLoading ? (
                          <Tabs
                            classNames={{
                              tabButton: styles['tab-button'],
                              tabOutline: styles['tab-outline'],
                            }}
                            type={'underlined'}
                            tabs={[
                              {
                                id: 'information',
                                label: t('information').toString(),
                              },
                              {
                                id: 'shipping-and-returns',
                                label: t('shippingAndReturns').toString(),
                              },
                            ]}
                            activeId={activeDetails}
                            onChange={(id: string) => setActiveDetails(id)}
                          />
                        ) : (
                          <Skeleton
                            className={[
                              styles['tabs-skeleton'],
                              styles['tabs-skeleton-desktop'],
                            ].join(' ')}
                          />
                        )}
                        {!productProps.isLoading ? (
                          <>
                            {activeDetails === 'information' && (
                              <div
                                className={[
                                  styles['details-container'],
                                  styles['details-container-desktop'],
                                ].join(' ')}
                              >
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('material')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.material ?? '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('weight')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.weight &&
                                    productProps.metadata.weight > 0
                                      ? `${productProps.metadata.weight} g`
                                      : '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('countryOfOrigin')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.originCountry ??
                                      '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('dimensions')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.length &&
                                    productProps.metadata.width &&
                                    productProps.metadata.height
                                      ? `${productProps.metadata.length}L x ${productProps.metadata.width}W x ${productProps.metadata.height}H`
                                      : '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-desktop'],
                                    ].join(' ')}
                                  >
                                    {t('type')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-desktop'],
                                    ].join(' ')}
                                  >
                                    {t(type?.value ?? '-')}
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeDetails === 'shipping-and-returns' && (
                              <div
                                className={[
                                  styles['shipping-returns-container'],
                                  styles['shipping-returns-container-desktop'],
                                ].join(' ')}
                              >
                                <div
                                  className={[
                                    styles['shipping-returns-content'],
                                    styles['shipping-returns-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles[
                                        'shipping-returns-title-container'
                                      ],
                                      styles[
                                        'shipping-returns-title-container-desktop'
                                      ],
                                    ].join(' ')}
                                  >
                                    <Line.LocalShipping
                                      size={16}
                                      color={'#2A2A5F'}
                                    />
                                    <div
                                      className={[
                                        styles['shipping-returns-title'],
                                        styles[
                                          'shipping-returns-title-desktop'
                                        ],
                                      ].join(' ')}
                                    >
                                      {t('fastDelivery')}
                                    </div>
                                  </div>
                                  <div
                                    className={[
                                      styles['shipping-returns-description'],
                                      styles[
                                        'shipping-returns-description-desktop'
                                      ],
                                    ].join(' ')}
                                  >
                                    {t('fastDeliveryDescription')}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['shipping-returns-content'],
                                    styles['shipping-returns-content-desktop'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles[
                                        'shipping-returns-title-container'
                                      ],
                                      styles[
                                        'shipping-returns-title-container-desktop'
                                      ],
                                    ].join(' ')}
                                  >
                                    <Line.Replay size={16} color={'#2A2A5F'} />
                                    <div
                                      className={[
                                        styles['shipping-returns-title'],
                                        styles[
                                          'shipping-returns-title-desktop'
                                        ],
                                      ].join(' ')}
                                    >
                                      {t('easyReturns')}
                                    </div>
                                  </div>
                                  <div
                                    className={[
                                      styles['shipping-returns-description'],
                                      styles[
                                        'shipping-returns-description-desktop'
                                      ],
                                    ].join(' ')}
                                  >
                                    {t('easyReturnsDescription')}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div
                            className={[
                              styles['details-container'],
                              styles['details-container-desktop'],
                            ].join(' ')}
                          >
                            {[1, 2, 3, 4, 5, 6].map(() => (
                              <div
                                className={[
                                  styles['details-item-content'],
                                  styles['details-item-content-desktop'],
                                ].join(' ')}
                              >
                                <Skeleton
                                  className={[
                                    styles['details-title-skeleton'],
                                    styles['details-title-skeleton-desktop'],
                                  ].join(' ')}
                                  borderRadius={9999}
                                />
                                <Skeleton
                                  className={[
                                    styles['details-value-skeleton'],
                                    styles['details-value-skeleton-desktop'],
                                  ].join(' ')}
                                  borderRadius={9999}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {productProps.activeTabId === ProductTabType.Locations && (
                    <div
                      className={[
                        styles['locations-container'],
                        styles['locations-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['locations-top-bar-container'],
                          styles['locations-top-bar-container-desktop'],
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
                                value={productProps.stockLocationInput}
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
                                icon={
                                  <Line.Search size={24} color={'#2A2A5F'} />
                                }
                                onChange={(event) =>
                                  ProductController.updateStockLocationInput(
                                    event.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={[
                          styles['location-items-container'],
                          styles['location-items-container-desktop'],
                        ].join(' ')}
                      >
                        {productProps.searchedStockLocations.map(
                          (stockLocation: StockLocation, _index: number) => {
                            return (
                              <StockLocationItemComponent
                                key={stockLocation.id}
                                stockLocation={stockLocation}
                                hideDescription={true}
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
                            maxHeight:
                              productProps.hasMoreSearchedStockLocations ||
                              productProps.areSearchedStockLocationsLoading
                                ? 24
                                : 0,
                          }}
                        />
                        {!productProps.areSearchedStockLocationsLoading &&
                          productProps.searchedStockLocations.length <= 0 && (
                            <div
                              className={[
                                styles['no-searched-stock-locations-container'],
                                styles[
                                  'no-searched-stock-locations-container-desktop'
                                ],
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
                  )}
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
      {ReactDOM.createPortal(
        <>
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
              title: [
                styles['modal-title'],
                styles['modal-title-desktop'],
              ].join(' '),
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
            title={t('selectLocation') ?? ''}
            description={
              t('selectLocationDescription', {
                address: `${selectedStockLocation?.company}, ${selectedStockLocation?.placeName}`,
              }) ?? ''
            }
            confirmText={t('select') ?? ''}
            cancelText={t('cancel') ?? ''}
            visible={selectedStockLocation !== null}
            onConfirm={onSelectLocation}
            onCancel={onCancelLocation}
          />
        </>,
        document.body
      )}
    </ResponsiveDesktop>
  );
}
