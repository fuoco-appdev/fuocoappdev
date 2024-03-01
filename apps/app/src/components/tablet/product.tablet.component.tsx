import {
  Typography,
  Button,
  Tabs,
  InputNumber,
  Input,
  Modal,
} from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../product.module.scss';
import ProductController from '../../controllers/product.controller';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductTag, ProductType } from '@medusajs/medusa';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import ExploreController from '../../controllers/explore.controller';
import Skeleton from 'react-loading-skeleton';
import { ProductResponsiveProps } from '../product.component';
import {
  ResponsiveDesktop,
  ResponsiveTablet,
  useDesktopEffect,
  useTabletEffect,
} from '../responsive.component';
import loadable from '@loadable/component';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { ProductTabType } from 'src/models/product.model';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { cloneElement } from 'react';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import StockLocationItemComponent from '../stock-location-item.component';
import { createPortal } from 'react-dom';

const ReactMarkdown = loadable(
  async () => {
    const reactMarkdown = await import('react-markdown');
    return (productProps: any) => <reactMarkdown.default {...productProps} />;
  },
  { ssr: false }
);

export default function ProductTabletComponent({
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
  setSelectedStockLocation,
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

  useTabletEffect(() => {
    setDescription(translatedDescription ?? '');
  }, [translatedDescription]);

  const selectedVariant = productProps.selectedVariant;
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['content-container'],
              styles['content-container-tablet'],
            ].join(' ')}
            style={{ position: 'sticky', top: 0 }}
          >
            <div
              className={[
                styles['thumbnail-container'],
                styles['thumbnail-container-tablet'],
              ].join(' ')}
            >
              {!productProps.isLoading ? (
                <>
                  {productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.Wine && (
                      <img
                        className={[
                          styles['wine-thumbnail-image'],
                          styles['wine-thumbnail-image-tablet'],
                        ].join(' ')}
                        src={productProps.metadata?.thumbnail}
                      />
                    )}
                  {productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['menu-item-thumbnail-image'],
                          styles['menu-item-thumbnail-image-tablet'],
                        ].join(' ')}
                        src={productProps.metadata?.thumbnail}
                      />
                    )}
                  {!productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.Wine && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-tablet'],
                        ].join(' ')}
                        src={'../assets/images/wine-bottle.png'}
                      />
                    )}
                  {!productProps.metadata?.thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-tablet'],
                        ].join(' ')}
                        src={'../assets/images/menu.png'}
                      />
                    )}
                </>
              ) : (
                <Skeleton
                  className={[
                    styles['thumbnail-image-skeleton'],
                    styles['thumbnail-image-skeleton-tablet'],
                  ].join(' ')}
                />
              )}
            </div>
          </div>
          <div
            className={[
              styles['content-container'],
              styles['content-container-tablet'],
              styles['middle-content'],
              styles['middle-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container'],
                styles['header-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-tablet'],
                ].join(' ')}
              >
                {!productProps.isLoading ? (
                  <>
                    <div
                      className={[styles['title'], styles['title-tablet']].join(
                        ' '
                      )}
                    >
                      {productProps.metadata?.title}
                    </div>
                    <div
                      className={[
                        styles['subtitle'],
                        styles['subtitle-tablet'],
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
                      styles['title-skeleton-tablet'],
                    ].join(' ')}
                  />
                )}
              </div>
              <div
                className={[
                  styles['like-container'],
                  styles['like-container-tablet'],
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
                        styles['like-count-tablet'],
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
                        styles['like-button-skeleton-tablet'],
                      ].join(' ')}
                    />
                    <Skeleton
                      borderRadius={9999}
                      className={[
                        styles['like-count-skeleton'],
                        styles['like-count-skeleton-tablet'],
                      ].join(' ')}
                    />
                  </>
                )}
              </div>
            </div>
            <div
              className={[
                styles['tags-container'],
                styles['tags-container-tablet'],
              ].join(' ')}
            >
              {!productProps.isLoading ? (
                <>
                  {tags?.map((value: ProductTag) => (
                    <div
                      className={[styles['tag'], styles['tag-tablet']].join(
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
                        styles['tag-skeleton-tablet'],
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
                styles['description-container-tablet'],
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
                    styles['skeleton-description-tablet'],
                  ].join(' ')}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-tablet'],
            ].join(' ')}
          >
            <Tabs
              flex={true}
              touchScreen={true}
              activeId={productProps.activeTabId}
              classNames={{
                nav: [styles['tab-nav'], styles['tab-nav-tablet']].join(' '),
                tabButton: [
                  styles['tab-button'],
                  styles['tab-button-tablet'],
                ].join(''),
                tabOutline: [
                  styles['tab-outline'],
                  styles['tab-outline-tablet'],
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
              styles['side-bar-content-tablet'],
            ].join(' ')}
            onScroll={onSideBarScroll}
            onLoad={onSideBarLoad}
          >
            <TransitionGroup
              component={null}
              childFactory={(child) =>
                cloneElement(child, {
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
                        styles['price-container-tablet'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['price'],
                          styles['price-tablet'],
                        ].join(' ')}
                      >
                        {!productProps.isLoading ? (
                          <>
                            {selectedVariant?.original_price !==
                              selectedVariant?.calculated_price && (
                              <div
                                className={[
                                  styles['calculated-price'],
                                  styles['calculated-price-tablet'],
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
                                styles['original-price-tablet'],
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
                                    styles['inventory-quantity-tablet'],
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
                              styles['inventory-quantity-tablet'],
                            ].join(' ')}
                            borderRadius={9999}
                            count={1}
                          />
                        )}
                      </div>
                      <div
                        className={[
                          styles['tab-container'],
                          styles['tab-container-tablet'],
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
                              styles['tabs-skeleton-tablet'],
                            ].join(' ')}
                          />
                        )}
                        {type?.value === MedusaProductTypeNames.Wine && (
                          <div
                            className={[
                              styles['options-container'],
                              styles['options-container-tablet'],
                            ].join(' ')}
                          >
                            {!productProps.isLoading ? (
                              <>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('alcohol')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {alcohol}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('brand')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {brand}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('format')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {format}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('producerBottler')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {producerBottler}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('region')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {region}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('residualSugar')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {residualSugar}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('type')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
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
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('uvc')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {uvc}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('varietals')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {varietals}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['option-content'],
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['option-title'],
                                      styles['option-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('vintage')}
                                  </div>
                                  <div
                                    className={[
                                      styles['option-value'],
                                      styles['option-value-tablet'],
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
                                    styles['option-content-tablet'],
                                  ].join(' ')}
                                >
                                  <Skeleton
                                    className={[
                                      styles['option-title-skeleton'],
                                      styles['option-title-skeleton-tablet'],
                                    ].join(' ')}
                                    borderRadius={9999}
                                  />
                                  <Skeleton
                                    className={[
                                      styles['option-value-skeleton'],
                                      styles['option-value-skeleton-tablet'],
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
                                styles['input-button-tablet'],
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
                            styles['add-to-cart-button-skeleton-tablet'],
                          ].join(' ')}
                        />
                      )}
                      <div
                        className={[
                          styles['tab-container'],
                          styles['tab-container-tablet'],
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
                              styles['tabs-skeleton-tablet'],
                            ].join(' ')}
                          />
                        )}
                        {!productProps.isLoading ? (
                          <>
                            {activeDetails === 'information' && (
                              <div
                                className={[
                                  styles['details-container'],
                                  styles['details-container-tablet'],
                                ].join(' ')}
                              >
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('material')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.material ?? '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('weight')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-tablet'],
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
                                    styles['details-item-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('countryOfOrigin')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-tablet'],
                                    ].join(' ')}
                                  >
                                    {productProps.metadata?.originCountry ??
                                      '-'}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['details-item-content'],
                                    styles['details-item-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('dimensions')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-tablet'],
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
                                    styles['details-item-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles['details-item-title'],
                                      styles['details-item-title-tablet'],
                                    ].join(' ')}
                                  >
                                    {t('type')}
                                  </div>
                                  <div
                                    className={[
                                      styles['details-item-value'],
                                      styles['details-item-value-tablet'],
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
                                  styles['shipping-returns-container-tablet'],
                                ].join(' ')}
                              >
                                <div
                                  className={[
                                    styles['shipping-returns-content'],
                                    styles['shipping-returns-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles[
                                        'shipping-returns-title-container'
                                      ],
                                      styles[
                                        'shipping-returns-title-container-tablet'
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
                                        styles['shipping-returns-title-tablet'],
                                      ].join(' ')}
                                    >
                                      {t('fastDelivery')}
                                    </div>
                                  </div>
                                  <div
                                    className={[
                                      styles['shipping-returns-description'],
                                      styles[
                                        'shipping-returns-description-tablet'
                                      ],
                                    ].join(' ')}
                                  >
                                    {t('fastDeliveryDescription')}
                                  </div>
                                </div>
                                <div
                                  className={[
                                    styles['shipping-returns-content'],
                                    styles['shipping-returns-content-tablet'],
                                  ].join(' ')}
                                >
                                  <div
                                    className={[
                                      styles[
                                        'shipping-returns-title-container'
                                      ],
                                      styles[
                                        'shipping-returns-title-container-tablet'
                                      ],
                                    ].join(' ')}
                                  >
                                    <Line.Replay size={16} color={'#2A2A5F'} />
                                    <div
                                      className={[
                                        styles['shipping-returns-title'],
                                        styles['shipping-returns-title-tablet'],
                                      ].join(' ')}
                                    >
                                      {t('easyReturns')}
                                    </div>
                                  </div>
                                  <div
                                    className={[
                                      styles['shipping-returns-description'],
                                      styles[
                                        'shipping-returns-description-tablet'
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
                              styles['details-container-tablet'],
                            ].join(' ')}
                          >
                            {[1, 2, 3, 4, 5, 6].map(() => (
                              <div
                                className={[
                                  styles['details-item-content'],
                                  styles['details-item-content-tablet'],
                                ].join(' ')}
                              >
                                <Skeleton
                                  className={[
                                    styles['details-title-skeleton'],
                                    styles['details-title-skeleton-tablet'],
                                  ].join(' ')}
                                  borderRadius={9999}
                                />
                                <Skeleton
                                  className={[
                                    styles['details-value-skeleton'],
                                    styles['details-value-skeleton-tablet'],
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
                        styles['locations-container-tablet'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['locations-top-bar-container'],
                          styles['locations-top-bar-container-tablet'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['top-bar-left-content'],
                            styles['top-bar-left-content-tablet'],
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
                                value={productProps.stockLocationInput}
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
                          styles['location-items-container-tablet'],
                        ].join(' ')}
                      >
                        {productProps.searchedStockLocations.map(
                          (stockLocation: StockLocation, index: number) => {
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
                                  'no-searched-stock-locations-container-tablet'
                                ],
                              ].join(' ')}
                            >
                              <div
                                className={[
                                  styles['no-items-text'],
                                  styles['no-items-text-tablet'],
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
      {createPortal(
        <>
          <Modal
            classNames={{
              overlay: [
                styles['modal-overlay'],
                styles['modal-overlay-tablet'],
              ].join(' '),
              modal: [styles['modal'], styles['modal-tablet']].join(' '),
              text: [styles['modal-text'], styles['modal-text-tablet']].join(
                ' '
              ),
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
    </ResponsiveTablet>
  );
}
