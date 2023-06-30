import { Auth, Typography, Button, Tabs, Solid } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './product.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ProductController from '../controllers/product.controller';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductOptions } from '../models/product.model';
import {
  ProductOptionValue,
  ProductTag,
  ProductOption,
} from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import WindowController from '../controllers/window.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';

export interface ProductProps {}

function ProductDesktopComponent({}: ProductProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

function ProductMobileComponent({}: ProductProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [disableShowMore, setDisableShowMore] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [activeVariant, setActiveVariant] = useState<string | undefined>();
  const [activeDetails, setActiveDetails] = useState<string | undefined>(
    'information'
  );
  const [alcohol, setAlcohol] = useState<string | undefined>('');
  const [brand, setBrand] = useState<string | undefined>('');
  const [varietals, setVarietals] = useState<string | undefined>('');
  const [producerBottler, setProducerBottler] = useState<string | undefined>(
    ''
  );
  const [format, setFormat] = useState<string | undefined>('');
  const [region, setRegion] = useState<string | undefined>('');
  const [residualSugar, setResidualSugar] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');
  const [uvc, setUVC] = useState<string | undefined>('');
  const [vintage, setVintage] = useState<string | undefined>('');
  const [hasQuantityLimit, setHasQuantityLimit] = useState<boolean>(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    ProductController.requestProductAsync(id ?? '');
  }, []);

  useEffect(() => {
    let tabProps: TabProps[] = [];
    const vintageOption = props.options.find(
      (value: ProductOption) => value.title === ProductOptions.Vintage
    );
    if (vintageOption) {
      for (const variant of vintageOption.values) {
        tabProps.push({ id: variant.variant_id, label: variant.value });
      }
      tabProps = tabProps.sort((n1, n2) => {
        if (n1.label && n2.label) {
          return n1.label < n2.label ? 1 : -1;
        }

        return 1;
      });
      setTabs(tabProps);

      const selectedVariant = tabProps.length > 0 ? tabProps[0].id : undefined;
      setActiveVariant(selectedVariant);
      ProductController.updateSelectedVariant(selectedVariant ?? '');
    }
  }, [props.options]);

  useEffect(() => {
    const availablePrices = ProductController.getAvailablePrices(
      props.selectedVariant?.prices,
      props.selectedVariant
    );
    setHasQuantityLimit(!availablePrices || availablePrices?.length <= 0);
  }, [props.selectedVariant]);

  useEffect(() => {
    const alcoholOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Alcohol
    );
    const formatOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Format
    );
    const residualSugarOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.ResidualSugar
    );
    const typeOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Type
    );
    const uvcOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.UVC
    );
    const vintageOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Vintage
    );

    if (props.selectedVariant?.options) {
      const variant = props.selectedVariant as PricedVariant;
      const alcoholValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === alcoholOption?.id
      );
      const formatValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === formatOption?.id
      );
      const residualSugarValue = variant.options?.find(
        (value: ProductOptionValue) =>
          value.option_id === residualSugarOption?.id
      );
      const typeValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === typeOption?.id
      );
      const uvcValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === uvcOption?.id
      );
      const vintageValue = variant.options?.find(
        (value: ProductOptionValue) => value.option_id === vintageOption?.id
      );

      setBrand(variant.metadata?.['brand'] as string);
      setRegion(variant.metadata?.['region'] as string);
      setVarietals(variant.metadata?.['varietals'] as string);
      setProducerBottler(variant.metadata?.['producer_bottler'] as string);
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setType(typeValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [props.selectedVariant, props.metadata]);

  useEffect(() => {
    if (props.description.length < 356) {
      setDisableShowMore(true);
    } else {
      setDisableShowMore(false);
      if (!showMore) {
        let index = props.description.indexOf('\n');
        if (index > 355) {
          index = 355;
        }
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
      <div className={styles['thumbnail-container-mobile']}>
        <img
          className={styles['thumbnail-image-mobile']}
          src={props.thumbnail || '../assets/svg/wine-bottle.svg'}
        />
      </div>
      <div className={styles['content-mobile']}>
        <div className={styles['header-container-mobile']}>
          <div className={styles['title-container-mobile']}>
            <div className={styles['title']}>{props.title}</div>
            <div className={styles['subtitle']}>{props.subtitle}</div>
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
        <div className={styles['description-container-mobile']}>
          <ReactMarkdown remarkPlugins={[gfm]} children={description} />
          {props.description && !disableShowMore && (
            <div className={styles['show-more-container-mobile']}>
              <Typography.Link
                className={styles['show-more-link']}
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? t('showMore') : t('showLess')}
              </Typography.Link>
            </div>
          )}
        </div>
        <div className={styles['price-mobile']}>
          {storeProps.selectedRegion &&
            formatAmount({
              amount: props.price?.amount ?? 0,
              region: storeProps.selectedRegion,
              includeTaxes: false,
            })}
          &nbsp;
          <span className={styles['inventory-quantity-mobile']}>
            ({props.selectedVariant?.inventory_quantity}&nbsp;{t('inStock')})
          </span>
        </div>
        <div className={styles['tags-container-mobile']}>
          {props.tags.map((value: ProductTag) => (
            <div className={styles['tag-mobile']}>{value.value}</div>
          ))}
        </div>
        <div className={styles['tab-container-mobile']}>
          <Tabs
            flex={true}
            classNames={{
              tabButton: styles['tab-button'],
              tabOutline: styles['tab-outline'],
            }}
            type={'underlined'}
            tabs={tabs}
            touchScreen={true}
            activeId={activeVariant}
            onChange={ProductController.updateSelectedVariant}
          />
          <div className={styles['options-container-mobile']}>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>
                {t('alcohol')}
              </div>
              <div className={styles['option-value-mobile']}>{alcohol}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('brand')}</div>
              <div className={styles['option-value-mobile']}>{brand}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('format')}</div>
              <div className={styles['option-value-mobile']}>{format}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>
                {t('producerBottler')}
              </div>
              <div className={styles['option-value-mobile']}>
                {producerBottler}
              </div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('region')}</div>
              <div className={styles['option-value-mobile']}>{region}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>
                {t('residualSugar')}
              </div>
              <div className={styles['option-value-mobile']}>
                {residualSugar}
              </div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('type')}</div>
              <div className={styles['option-value-mobile']}>{type}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('uvc')}</div>
              <div className={styles['option-value-mobile']}>{uvc}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>
                {t('varietals')}
              </div>
              <div className={styles['option-value-mobile']}>{varietals}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>
                {t('vintage')}
              </div>
              <div className={styles['option-value-mobile']}>{vintage}</div>
            </div>
          </div>
        </div>
        <Button
          classNames={{
            container: styles['add-to-cart-button-container-mobile'],
            button: styles['add-to-cart-button-mobile'],
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
        <div className={styles['tab-container-mobile']}>
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
            onChange={(id) => setActiveDetails(id)}
          />
          {activeDetails === 'information' && (
            <div className={styles['details-container-mobile']}>
              <div className={styles['details-item-content-mobile']}>
                <div className={styles['details-item-title-mobile']}>
                  {t('material')}
                </div>
                <div className={styles['details-item-value-mobile']}>
                  {props.material}
                </div>
              </div>
              <div className={styles['details-item-content-mobile']}>
                <div className={styles['details-item-title-mobile']}>
                  {t('weight')}
                </div>
                <div className={styles['details-item-value-mobile']}>
                  {props.weight}
                </div>
              </div>
              <div className={styles['details-item-content-mobile']}>
                <div className={styles['details-item-title-mobile']}>
                  {t('countryOfOrigin')}
                </div>
                <div className={styles['details-item-value-mobile']}>
                  {props.countryOrigin}
                </div>
              </div>
              <div className={styles['details-item-content-mobile']}>
                <div className={styles['details-item-title-mobile']}>
                  {t('dimensions')}
                </div>
                <div className={styles['details-item-value-mobile']}>
                  {props.dimensions}
                </div>
              </div>
              <div className={styles['details-item-content-mobile']}>
                <div className={styles['details-item-title-mobile']}>
                  {t('type')}
                </div>
                <div className={styles['details-item-value-mobile']}>
                  {props.type}
                </div>
              </div>
            </div>
          )}
          {activeDetails === 'shipping-and-returns' && (
            <div className={styles['shipping-returns-container-mobile']}>
              <div className={styles['shipping-returns-content-mobile']}>
                <div
                  className={styles['shipping-returns-title-container-mobile']}
                >
                  <Line.LocalShipping size={16} color={'#2A2A5F'} />
                  <div className={styles['shipping-returns-title-mobile']}>
                    {t('fastDelivery')}
                  </div>
                </div>
                <div className={styles['shipping-returns-description-mobile']}>
                  {t('fastDeliveryDescription')}
                </div>
              </div>
              <div className={styles['shipping-returns-content-mobile']}>
                <div
                  className={styles['shipping-returns-title-container-mobile']}
                >
                  <Line.Replay size={16} color={'#2A2A5F'} />
                  <div className={styles['shipping-returns-title-mobile']}>
                    {t('easyReturns')}
                  </div>
                </div>
                <div className={styles['shipping-returns-description-mobile']}>
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

export default function ProductComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <ProductDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ProductMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
