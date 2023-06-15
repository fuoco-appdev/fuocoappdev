import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from './shipping-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';

export interface ShippingItemProps {
  item: LineItem;
}

function ShippingItemDesktopComponent({
  item,
}: ShippingItemProps): JSX.Element {
  return <></>;
}

function ShippingItemMobileComponent({ item }: ShippingItemProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const [vintage, setVintage] = useState<string>('');
  const [hasReducedPrice, setHasReducedPrice] = useState<boolean>(
    (item.discount_total ?? 0) > 0
  );
  const [discountPercentage, setDiscountPercentage] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const vintageOption = item.variant.product.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');

    const subtotal = item?.subtotal ?? 0;
    const difference = subtotal - (item?.discount_total ?? 0);
    const percentage = (difference / subtotal) * 100;
    setDiscountPercentage((100 - percentage).toFixed());

    setHasReducedPrice((item.discount_total ?? 0) > 0);
  }, [item]);

  return (
    <div key={item.variant_id} className={styles['container-mobile']}>
      <div className={styles['details-mobile']}>
        <div className={styles['thumbnail-mobile']}>
          <img
            className={styles['thumbnail-image-mobile']}
            src={item.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
        </div>
        <div className={styles['title-container-mobile']}>
          <div className={styles['title-mobile']}>{item.title}</div>
          <div className={styles['variant-mobile']}>{`${t(
            'vintage'
          )}: ${vintage}`}</div>
        </div>
        <div className={styles['quantity-details-container-mobile']}>
          <div className={styles['quantity-container-mobile']}>
            <div className={styles['quantity-text-mobile']}>
              {t('quantity')}
            </div>
            <div className={styles['quantity-buttons-mobile']}>
              <div className={styles['quantity']}>{item.quantity}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['pricing-details-container']}>
        <div
          className={[
            styles['pricing'],
            hasReducedPrice ? styles['pricing-canceled'] : '',
          ].join(' ')}
        >
          {hasReducedPrice && `${t('original')}:`} &nbsp;
          {storeProps.selectedRegion &&
            formatAmount({
              amount: item.subtotal ?? 0,
              region: storeProps.selectedRegion,
              includeTaxes: false,
            })}
        </div>
        {hasReducedPrice && (
          <>
            <div className={styles['discount-pricing']}>
              {storeProps.selectedRegion &&
                formatAmount({
                  amount: (item.subtotal ?? 0) - (item.discount_total ?? 0),
                  region: storeProps.selectedRegion,
                  includeTaxes: false,
                })}
            </div>
            <div className={styles['discount-percentage']}>
              -{discountPercentage}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ShippingItemComponent(
  props: ShippingItemProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <ShippingItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ShippingItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
