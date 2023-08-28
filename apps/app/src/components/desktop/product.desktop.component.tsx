import { Typography, Button, Tabs } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../product.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ProductController from '../../controllers/product.controller';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductTag } from '@medusajs/medusa';
import WindowController from '../../controllers/window.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ProductResponsiveProps } from '../product.component';
import { useEffect } from 'react';

export function ProductDesktopComponent({
  description,
  tabs,
  activeVariant,
  activeDetails,
  alcohol,
  brand,
  varietals,
  producerBottler,
  format,
  region,
  residualSugar,
  type,
  uvc,
  vintage,
  hasQuantityLimit,
  setActiveDetails,
  setDescription,
}: ProductResponsiveProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const { t } = useTranslation();

  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div
        className={[
          styles['content-container'],
          styles['content-container-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-desktop'],
          ].join(' ')}
        >
          <img
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-desktop'],
            ].join(' ')}
            src={props.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
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
            {props.title?.length > 0 ? (
              <div
                className={[styles['title'], styles['title-desktop']].join(' ')}
              >
                {props.title}
              </div>
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
            <div
              className={[styles['subtitle'], styles['subtitle-desktop']].join(
                ' '
              )}
            >
              {props.subtitle}
            </div>
          </div>
          {/* <div className={styles['like-container-desktop']}>
                <div className={styles['like-count-desktop']}>{props.likeCount}</div>
                <Button
                  rippleProps={{
                    color: !props.isLiked
                      ? 'rgba(233, 33, 66, .35)'
                      : 'rgba(42, 42, 95, .35)',
                  }}
                  rounded={true}
                  onClick={() => ProductController.updateIsLiked(!props.isLiked)}
                  type={'text'}
                  icon={
                    props.isLiked ? (
                      <Line.Favorite size={24} color={'#E92142'} />
                    ) : (
                      <Line.FavoriteBorder size={24} color={'#2A2A5F'} />
                    )
                  }
                />
              </div> */}
        </div>
        <div
          className={[
            styles['description-container'],
            styles['description-container-desktop'],
          ].join(' ')}
        >
          {description.length > 0 ? (
            <ReactMarkdown remarkPlugins={[gfm]} children={description} />
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
      <div
        className={[
          styles['content-container'],
          styles['content-container-desktop'],
          styles['right-content'],
          styles['right-content-desktop'],
        ].join(' ')}
      >
        <div className={[styles['price'], styles['price-desktop']].join(' ')}>
          {storeProps.selectedRegion &&
            formatAmount({
              amount: props.price?.amount ?? 0,
              region: storeProps.selectedRegion,
              includeTaxes: false,
            })}
          &nbsp;
          <span
            className={[
              styles['inventory-quantity'],
              styles['inventory-quantity-desktop'],
            ].join(' ')}
          >
            ({props.selectedVariant?.inventory_quantity}&nbsp;{t('inStock')})
          </span>
        </div>
        <div
          className={[
            styles['tags-container'],
            styles['tags-container-desktop'],
          ].join(' ')}
        >
          {props.tags.map((value: ProductTag) => (
            <div className={[styles['tag'], styles['tag-desktop']].join(' ')}>
              {value.value}
            </div>
          ))}
        </div>
        <div
          className={[
            styles['tab-container'],
            styles['tab-container-desktop'],
          ].join(' ')}
        >
          <Tabs
            flex={true}
            classNames={{
              tabButton: styles['tab-button'],
              tabOutline: styles['tab-outline'],
            }}
            type={'underlined'}
            tabs={tabs}
            activeId={activeVariant}
            onChange={ProductController.updateSelectedVariant}
          />
          <div
            className={[
              styles['options-container'],
              styles['options-container-desktop'],
            ].join(' ')}
          >
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
                {type}
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
          </div>
        </div>
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
            hasQuantityLimit ||
            props.selectedVariant?.inventory_quantity <= 0 ? (
              <Line.ProductionQuantityLimits size={24} />
            ) : (
              <Line.AddShoppingCart size={24} />
            )
          }
          disabled={
            hasQuantityLimit || props.selectedVariant?.inventory_quantity <= 0
          }
          onClick={() =>
            ProductController.addToCartAsync(
              props.selectedVariant?.id,
              1,
              () =>
                WindowController.addToast({
                  key: `add-to-cart-${Math.random()}`,
                  message: t('addedToCart') ?? '',
                  description:
                    t('addedToCartDescription', {
                      item: props.title,
                    }) ?? '',
                  type: 'success',
                }),
              (error) =>
                WindowController.addToast({
                  key: `add-to-cart-${Math.random()}`,
                  message: error.name,
                  description: error.message,
                  type: 'error',
                })
            )
          }
        >
          {props.selectedVariant?.inventory_quantity <= 0 && t('outOfStock')}
          {hasQuantityLimit && t('quantityLimit')}
          {props.selectedVariant?.inventory_quantity > 0 &&
            !hasQuantityLimit &&
            t('addToCart')}
        </Button>
        <div
          className={[
            styles['tab-container'],
            styles['tab-container-desktop'],
          ].join(' ')}
        >
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
                  {props.material}
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
                  {props.weight}
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
                  {props.countryOrigin}
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
                  {props.dimensions}
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
                  {props.type}
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
                    styles['shipping-returns-title-container'],
                    styles['shipping-returns-title-container-desktop'],
                  ].join(' ')}
                >
                  <Line.LocalShipping size={16} color={'#2A2A5F'} />
                  <div
                    className={[
                      styles['shipping-returns-title'],
                      styles['shipping-returns-title-desktop'],
                    ].join(' ')}
                  >
                    {t('fastDelivery')}
                  </div>
                </div>
                <div
                  className={[
                    styles['shipping-returns-description'],
                    styles['shipping-returns-description-desktop'],
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
                    styles['shipping-returns-title-container'],
                    styles['shipping-returns-title-container-desktop'],
                  ].join(' ')}
                >
                  <Line.Replay size={16} color={'#2A2A5F'} />
                  <div
                    className={[
                      styles['shipping-returns-title'],
                      styles['shipping-returns-title-desktop'],
                    ].join(' ')}
                  >
                    {t('easyReturns')}
                  </div>
                </div>
                <div
                  className={[
                    styles['shipping-returns-description'],
                    styles['shipping-returns-description-desktop'],
                  ].join(' ')}
                >
                  {t('easyReturnsDescription')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
