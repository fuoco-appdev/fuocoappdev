import styles from '../shipping-item.module.scss';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { ShippingItemResponsiveProps } from '../shipping-item.component';

export default function ShippingItemMobileComponent({
  storeProps,
  item,
  vintage,
  hasReducedPrice,
  discountPercentage,
}: ShippingItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      key={item.variant_id}
      className={[styles['container'], styles['container-mobile']].join(' ')}
    >
      <div className={[styles['details'], styles['details-mobile']].join(' ')}>
        <div
          className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
            ' '
          )}
        >
          <img
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-mobile'],
            ].join(' ')}
            src={item.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
        </div>
        <div
          className={[
            styles['title-container'],
            styles['title-container-mobile'],
          ].join(' ')}
        >
          <div className={[styles['title'], styles['title-mobile']].join(' ')}>
            {item.title}
          </div>
          <div
            className={[styles['variant'], styles['variant-mobile']].join(' ')}
          >{`${t('vintage')}: ${vintage}`}</div>
        </div>
        <div
          className={[
            styles['quantity-details-container'],
            styles['quantity-details-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['quantity-container'],
              styles['quantity-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-text'],
                styles['quantity-text-mobile'],
              ].join(' ')}
            >
              {t('quantity')}
            </div>
            <div
              className={[
                styles['quantity-buttons'],
                styles['quantity-buttons-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['quantity'], styles['quantity-mobile']].join(
                  ' '
                )}
              >
                {item.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={[
          styles['pricing-details-container'],
          styles['pricing-details-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['pricing'],
            styles['pricing-mobile'],
            hasReducedPrice
              ? [
                  styles['pricing-canceled'],
                  styles['pricing-canceled-mobile'],
                ].join(' ')
              : '',
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
            <div
              className={[
                styles['discount-pricing'],
                styles['discount-pricing-mobile'],
              ].join(' ')}
            >
              {storeProps.selectedRegion &&
                formatAmount({
                  amount: (item.subtotal ?? 0) - (item.discount_total ?? 0),
                  region: storeProps.selectedRegion,
                  includeTaxes: false,
                })}
            </div>
            <div
              className={[
                styles['discount-percentage'],
                styles['discount-percentage-mobile'],
              ].join(' ')}
            >
              -{discountPercentage}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}
