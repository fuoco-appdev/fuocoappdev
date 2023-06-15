import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './order-confirmed.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { LineItem, ShippingMethod } from '@medusajs/medusa';
import OrderConfirmedController from '../controllers/order-confirmed.controller';
import StoreController from '../controllers/store.controller';
import { useParams } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import ShippingItemComponent from './shipping-item.component';
// @ts-ignore
import { formatAmount } from 'medusa-react';

export interface OrderConfirmedProps {}

function OrderConfirmedDesktopComponent({}: OrderConfirmedProps): JSX.Element {
  return <div></div>;
}

function OrderConfirmedMobileComponent({}: OrderConfirmedProps): JSX.Element {
  const { t } = useTranslation();
  const { id } = useParams();
  const [props] = useObservable(OrderConfirmedController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [quantity, setQuantity] = useState<number>(0);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      isRenderedRef.current = true;
      OrderConfirmedController.requestOrderAsync(id ?? '');
    }
  }, []);

  useEffect(() => {
    if (props.order) {
      setQuantity(
        props.order.items.reduce(
          (current: number, next: LineItem) => current + next.quantity,
          0
        )
      );
    }
  }, [props.order]);

  const formatStatus = (str: string) => {
    const formatted = str.split('_').join(' ');

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    props.order && (
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div className={styles['thankyou-text']}>{t('thankyouForOrder')}</div>
        <div className={styles['order-number-text']}>
          {`#${props.order?.display_id}`}
        </div>
        <div className={styles['order-id-text']}>{props.order?.id}</div>
        <div className={styles['date-container']}>
          <div className={styles['date-text']}>
            {new Date(props.order?.created_at).toDateString()}
          </div>
          <div className={styles['item-count-text']}>{`${quantity} ${
            quantity !== 1 ? t('items') : t('item')
          }`}</div>
        </div>
        <div className={styles['shipping-items']}>
          {props.order?.items
            .sort((current: LineItem, next: LineItem) => {
              return (
                new Date(current.created_at).valueOf() -
                new Date(next.created_at).valueOf()
              );
            })
            .map((item: LineItem) => (
              <ShippingItemComponent key={item.id} item={item} />
            ))}
        </div>
        <div className={styles['content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('status')}</div>
          </div>
          <div className={styles['subheader-title']}>{t('shipping')}</div>
          <div className={styles['detail-text']}>
            {formatStatus(props.order?.fulfillment_status)}
          </div>
        </div>
        <div className={styles['content-container']}>
          <div className={styles['subheader-title']}>{t('payment')}</div>
          <div className={styles['detail-text']}>
            {formatStatus(props.order?.payment_status)}
          </div>
        </div>
        <div className={styles['content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('delivery')}</div>
          </div>
          <div className={styles['subheader-title']}>{t('address')}</div>
          <div
            className={styles['detail-text']}
          >{`${props.order?.shipping_address.first_name} ${props.order?.shipping_address.last_name}`}</div>
          <div className={styles['detail-text']}>{`${
            props.order?.shipping_address.address_1
          }${
            props.order?.shipping_address.address_2 &&
            ', ' + props.order?.shipping_address.address_2
          }`}</div>
          <div
            className={styles['detail-text']}
          >{`${props.order?.shipping_address.city}, ${props.order?.shipping_address.province} ${props.order?.shipping_address.postal_code}`}</div>
          <div className={styles['detail-text']}>
            {props.order?.shipping_address.country_code?.toUpperCase()}
          </div>
        </div>
        <div className={styles['content-container']}>
          <div className={styles['subheader-title']}>{t('deliveryMethod')}</div>
          {props.order?.shipping_methods.map((value: ShippingMethod) => {
            return (
              <div className={styles['detail-text']} key={value.id}>
                {value.shipping_option.name}
              </div>
            );
          })}
        </div>
        <div className={styles['content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('orderSummary')}</div>
          </div>
          <div className={styles['pricing-container']}>
            <div className={styles['subtotal-container']}>
              <div className={styles['subtotal-text']}>{t('subtotal')}</div>
              <div className={styles['subtotal-text']}>
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: props.order?.subtotal ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
            </div>
            <div className={styles['total-detail-container']}>
              <div className={styles['total-detail-text']}>{t('discount')}</div>
              <div className={styles['total-detail-text']}>
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: -props.order?.discount_total ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
            </div>
            <div className={styles['total-detail-container']}>
              <div className={styles['total-detail-text']}>{t('shipping')}</div>
              <div className={styles['total-detail-text']}>
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: props.order?.shipping_total ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
            </div>
            <div className={styles['total-detail-container']}>
              <div className={styles['total-detail-text']}>{t('taxes')}</div>
              <div className={styles['total-detail-text']}>
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: props.order?.tax_total ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: false,
                  })}
              </div>
            </div>
            <div className={styles['total-container']}>
              <div className={styles['total-text']}>{t('total')}</div>
              <div className={styles['total-text']}>
                {storeProps.selectedRegion &&
                  formatAmount({
                    amount: props.order?.total ?? 0,
                    region: storeProps.selectedRegion,
                    includeTaxes: true,
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default function OrderConfirmedComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <OrderConfirmedDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <OrderConfirmedMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
