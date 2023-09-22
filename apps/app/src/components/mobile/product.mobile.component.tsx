import { Typography, Button, Tabs } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from '../product.module.scss';
import ProductController from '../../controllers/product.controller';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductTag } from '@medusajs/medusa';
import WindowController from '../../controllers/window.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import Skeleton from 'react-loading-skeleton';
import { ProductResponsiveProps } from '../product.component';
import { useEffect, useState, lazy } from 'react';
import { useMobileEffect } from '../responsive.component';

const ReactMarkdown = lazy(() => import('react-markdown'));

export function ProductMobileComponent({
  remarkPlugins,
  description,
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
  uvc,
  vintage,
  setActiveDetails,
  setDescription,
}: ProductResponsiveProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [disableShowMore, setDisableShowMore] = useState<boolean>(false);

  useMobileEffect(() => {
    if (props.description.length < 356) {
      setDisableShowMore(true);
      setDescription(props.description);
    } else {
      setDisableShowMore(false);
      if (!showMore) {
        let index = 355;
        let shortDescription = props.description.substring(0, index);
        if (shortDescription.endsWith('.')) {
          shortDescription += '..';
        } else {
          shortDescription += '...';
        }
        setDescription(shortDescription);
      } else {
        setDescription(props.description);
      }
    }
  }, [props.description, showMore]);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div
        className={[
          styles['thumbnail-container'],
          styles['thumbnail-container-mobile'],
        ].join(' ')}
      >
        {!props.isLoading ? (
          <img
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-mobile'],
            ].join(' ')}
            src={props.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
        ) : (
          <Skeleton
            className={[
              styles['thumbnail-image-skeleton'],
              styles['thumbnail-image-skeleton-mobile'],
            ].join(' ')}
          />
        )}
      </div>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <div
          className={[
            styles['header-container'],
            styles['header-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-mobile'],
            ].join(' ')}
          >
            {!props.isLoading ? (
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                {props.title}
              </div>
            ) : (
              <Skeleton
                count={1}
                borderRadius={9999}
                className={[
                  styles['title-skeleton'],
                  styles['title-skeleton-mobile'],
                ].join(' ')}
              />
            )}
            <div
              className={[styles['subtitle'], styles['subtitle-mobile']].join(
                ' '
              )}
            >
              {props.subtitle}
            </div>
          </div>
          {/* <div className={styles['like-container-mobile']}>
              <div className={styles['like-count-mobile']}>{props.likeCount}</div>
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
            styles['description-container-mobile'],
          ].join(' ')}
        >
          {!props.isLoading ? (
            <ReactMarkdown
              remarkPlugins={remarkPlugins}
              children={description}
            />
          ) : (
            <Skeleton
              count={6}
              borderRadius={9999}
              className={[
                styles['skeleton-description'],
                styles['skeleton-description-mobile'],
              ].join(' ')}
            />
          )}
          {!props.isLoading && props.description && !disableShowMore && (
            <div
              className={[
                styles['show-more-container'],
                styles['show-more-container-mobile'],
              ].join(' ')}
            >
              <Typography.Link
                className={[
                  styles['show-more-link'],
                  styles['show-more-link-mobile'],
                ].join(' ')}
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? t('showMore') : t('showLess')}
              </Typography.Link>
            </div>
          )}
        </div>
        <div className={[styles['price'], styles['price-mobile']].join(' ')}>
          {!props.isLoading ? (
            <>
              {storeProps.selectedRegion &&
                formatAmount({
                  amount: props.selectedVariant?.calculated_price ?? 0,
                  region: storeProps.selectedRegion,
                  includeTaxes: false,
                })}
              &nbsp;
              <span
                className={[
                  styles['inventory-quantity'],
                  styles['inventory-quantity-mobile'],
                ].join(' ')}
              >
                ({props.selectedVariant?.inventory_quantity}&nbsp;{t('inStock')}
                )
              </span>
            </>
          ) : (
            <Skeleton
              className={[
                styles['inventory-quantity'],
                styles['inventory-quantity-mobile'],
              ].join(' ')}
              borderRadius={9999}
              count={1}
            />
          )}
        </div>
        <div
          className={[
            styles['tags-container'],
            styles['tags-container-mobile'],
          ].join(' ')}
        >
          {!props.isLoading ? (
            <>
              {props.tags.map((value: ProductTag) => (
                <div
                  className={[styles['tag'], styles['tag-mobile']].join(' ')}
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
                    styles['tag-skeleton-mobile'],
                  ].join(' ')}
                  borderRadius={9999}
                />
              ))}
            </>
          )}
        </div>
        <div
          className={[
            styles['tab-container'],
            styles['tab-container-mobile'],
          ].join(' ')}
        >
          {!props.isLoading ? (
            <Tabs
              flex={true}
              classNames={{
                tabButton: styles['tab-button'],
                tabOutline: styles['tab-outline'],
              }}
              type={'underlined'}
              tabs={tabs}
              touchScreen={true}
              activeId={activeVariantId}
              onChange={(id) => ProductController.updateSelectedVariant(id)}
            />
          ) : (
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-mobile'],
              ].join(' ')}
            />
          )}
          <div
            className={[
              styles['options-container'],
              styles['options-container-mobile'],
            ].join(' ')}
          >
            {!props.isLoading ? (
              <>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('alcohol')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {alcohol}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('brand')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {brand}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('format')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {format}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('producerBottler')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {producerBottler}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('region')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {region}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('residualSugar')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {residualSugar}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('type')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {type}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('uvc')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {uvc}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('varietals')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
                    ].join(' ')}
                  >
                    {varietals}
                  </div>
                </div>
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['option-title'],
                      styles['option-title-mobile'],
                    ].join(' ')}
                  >
                    {t('vintage')}
                  </div>
                  <div
                    className={[
                      styles['option-value'],
                      styles['option-value-mobile'],
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
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['option-title-skeleton'],
                      styles['option-title-skeleton-mobile'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['option-value-skeleton'],
                      styles['option-value-skeleton-mobile'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        {!props.isLoading ? (
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
              !props.selectedVariant?.purchasable ? (
                <Line.ProductionQuantityLimits size={24} />
              ) : (
                <Line.AddShoppingCart size={24} />
              )
            }
            disabled={!props.selectedVariant?.purchasable}
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
            {!props.selectedVariant?.purchasable && t('outOfStock')}
            {props.selectedVariant?.purchasable && t('addToCart')}
          </Button>
        ) : (
          <Skeleton
            className={[
              styles['add-to-cart-button-skeleton'],
              styles['add-to-cart-button-skeleton-mobile'],
            ].join(' ')}
          />
        )}
        <div
          className={[
            styles['tab-container'],
            styles['tab-container-mobile'],
          ].join(' ')}
        >
          {!props.isLoading ? (
            <Tabs
              flex={true}
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
              touchScreen={true}
              activeId={activeDetails}
              onChange={(id: string) => setActiveDetails(id)}
            />
          ) : (
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-mobile'],
              ].join(' ')}
            />
          )}
          {!props.isLoading ? (
            <>
              {activeDetails === 'information' && (
                <div
                  className={[
                    styles['details-container'],
                    styles['details-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['details-item-content'],
                      styles['details-item-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['details-item-title'],
                        styles['details-item-title-mobile'],
                      ].join(' ')}
                    >
                      {t('material')}
                    </div>
                    <div
                      className={[
                        styles['details-item-value'],
                        styles['details-item-value-mobile'],
                      ].join(' ')}
                    >
                      {props.material}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['details-item-content'],
                      styles['details-item-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['details-item-title'],
                        styles['details-item-title-mobile'],
                      ].join(' ')}
                    >
                      {t('weight')}
                    </div>
                    <div
                      className={[
                        styles['details-item-value'],
                        styles['details-item-value-mobile'],
                      ].join(' ')}
                    >
                      {props.weight}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['details-item-content'],
                      styles['details-item-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['details-item-title'],
                        styles['details-item-title-mobile'],
                      ].join(' ')}
                    >
                      {t('countryOfOrigin')}
                    </div>
                    <div
                      className={[
                        styles['details-item-value'],
                        styles['details-item-value-mobile'],
                      ].join(' ')}
                    >
                      {props.countryOrigin}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['details-item-content'],
                      styles['details-item-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['details-item-title'],
                        styles['details-item-title-mobile'],
                      ].join(' ')}
                    >
                      {t('dimensions')}
                    </div>
                    <div
                      className={[
                        styles['details-item-value'],
                        styles['details-item-value-mobile'],
                      ].join(' ')}
                    >
                      {props.dimensions}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['details-item-content'],
                      styles['details-item-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['details-item-title'],
                        styles['details-item-title-mobile'],
                      ].join(' ')}
                    >
                      {t('type')}
                    </div>
                    <div
                      className={[
                        styles['details-item-value'],
                        styles['details-item-value-mobile'],
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
                    styles['shipping-returns-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['shipping-returns-content'],
                      styles['shipping-returns-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['shipping-returns-title-container'],
                        styles['shipping-returns-title-container-mobile'],
                      ].join(' ')}
                    >
                      <Line.LocalShipping size={16} color={'#2A2A5F'} />
                      <div
                        className={[
                          styles['shipping-returns-title'],
                          styles['shipping-returns-title-mobile'],
                        ].join(' ')}
                      >
                        {t('fastDelivery')}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['shipping-returns-description'],
                        styles['shipping-returns-description-mobile'],
                      ].join(' ')}
                    >
                      {t('fastDeliveryDescription')}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['shipping-returns-content'],
                      styles['shipping-returns-content-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['shipping-returns-title-container'],
                        styles['shipping-returns-title-container-mobile'],
                      ].join(' ')}
                    >
                      <Line.Replay size={16} color={'#2A2A5F'} />
                      <div
                        className={[
                          styles['shipping-returns-title'],
                          styles['shipping-returns-title-mobile'],
                        ].join(' ')}
                      >
                        {t('easyReturns')}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['shipping-returns-description'],
                        styles['shipping-returns-description-mobile'],
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
    </div>
  );
}
