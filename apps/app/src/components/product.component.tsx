import { Auth, Typography, Button, Tabs, Solid } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './product.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ProductController from '../controllers/product.controller';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ProductOption,
  ProductOptions,
  ProductTag,
} from '../models/product.model';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';

export interface ProductProps {}

function ProductDesktopComponent({}: ProductProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

function ProductMobileComponent({}: ProductProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [disableShowMore, setDisableShowMore] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [activeVariant, setActiveVariant] = useState<string | undefined>();
  const [alcohol, setAlcohol] = useState<string | undefined>('');
  const [brand, setBrand] = useState<string | undefined>('');
  const [code, setCode] = useState<string | undefined>('');
  const [format, setFormat] = useState<string | undefined>('');
  const [region, setRegion] = useState<string | undefined>('');
  const [residualSugar, setResidualSugar] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');
  const [uvc, setUVC] = useState<string | undefined>('');
  const [vintage, setVintage] = useState<string | undefined>('');
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
      tabProps = tabProps.sort();
      setTabs(tabProps);

      const selectedVariant = tabProps.length > 0 ? tabProps[0].id : undefined;
      setActiveVariant(selectedVariant);
      ProductController.updateSelectedVariant(selectedVariant ?? '');
    }
  }, [props.options]);

  useEffect(() => {
    const alcoholOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Alcohol
    );
    const codeOption = ProductController.model.options.find(
      (value) => value.title === ProductOptions.Code
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
      const alcoholValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === alcoholOption?.id
      );
      const codeValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === codeOption?.id
      );
      const formatValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === formatOption?.id
      );
      const residualSugarValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === residualSugarOption?.id
      );
      const typeValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === typeOption?.id
      );
      const uvcValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === uvcOption?.id
      );
      const vintageValue = props.selectedVariant.options.find(
        (value: ProductOption) => value.option_id === vintageOption?.id
      );

      setAlcohol(alcoholValue?.value);
      setBrand(props.metadata?.brand);
      setCode(codeValue?.value);
      setFormat(formatValue?.value);
      setRegion(props.metadata?.region);
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
          <div className={styles['like-container-mobile']}>
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
          </div>
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
          {props.price} &nbsp;
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
              <div className={styles['option-title-mobile']}>{t('code')}</div>
              <div className={styles['option-value-mobile']}>{code}</div>
            </div>
            <div className={styles['option-content-mobile']}>
              <div className={styles['option-title-mobile']}>{t('format')}</div>
              <div className={styles['option-value-mobile']}>{format}</div>
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
                {t('vintage')}
              </div>
              <div className={styles['option-value-mobile']}>{vintage}</div>
            </div>
          </div>
        </div>
        <Button
          classNames={{ button: styles['add-to-cart-button-mobile'] }}
          block={true}
          size={'full'}
          rippleProps={{
            color: 'rgba(233, 33, 66, .35)',
          }}
          icon={<Line.AddShoppingCart size={24} />}
          disabled={props.selectedVariant?.inventory_quantity < 0}
          onClick={() => ProductController.addToCartAsync()}
        >
          {props.selectedVariant?.inventory_quantity > 0
            ? t('addToCart')
            : t('outOfStock')}
        </Button>
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
