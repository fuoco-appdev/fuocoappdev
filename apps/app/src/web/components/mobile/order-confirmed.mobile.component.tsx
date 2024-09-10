import { LineItem } from '@medusajs/medusa';
import { useTranslation } from 'react-i18next';
import OrderConfirmedController from '../../../controllers/order-confirmed.controller';
import styles from '../../modules/order-confirmed.module.scss';
import ShippingItemComponent from '../shipping-item.component';
// @ts-ignore
import { Button, Dropdown, Scroll } from '@fuoco.appdev/web-components';
import { formatAmount } from 'medusa-react';
import { createPortal } from 'react-dom';
import WindowController from '../../../controllers/window.controller';
import { RefundItem } from '../../../models/order-confirmed.model';
import { OrderConfirmedResponsiveProps } from '../order-confirmed.component';
import RefundItemComponent from '../refund-item.component';
import { ResponsiveMobile } from '../responsive.component';
import { OrderConfirmedSuspenseMobileComponent } from './suspense/order-confirmed.suspense.mobile.component';

export default function OrderConfirmedMobileComponent({
  orderConfirmedProps,
  storeProps,
  quantity,
  openRefund,
  returnReasonOptions,
  setOpenRefund,
  formatStatus,
}: OrderConfirmedResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  const order = orderConfirmedProps.order;
  if (!order) {
    return <OrderConfirmedSuspenseMobileComponent />;
  }

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Scroll
          isLoadable={false}
          isReloadable={false}
          touchScreen={true}
          loadingHeight={0}
        >
          <div
            className={[
              styles['scroll-container'],
              styles['scroll-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['card-container'],
                styles['card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['thankyou-text'],
                  styles['thankyou-text-mobile'],
                ].join(' ')}
              >
                {t('thankyouForOrder')}
              </div>
              <div
                className={[
                  styles['order-number-text'],
                  styles['order-number-text-mobile'],
                ].join(' ')}
              >
                {`#${orderConfirmedProps.order?.display_id}`}
              </div>
              <div
                className={[
                  styles['order-id-text'],
                  styles['order-id-text-mobile'],
                ].join(' ')}
              >
                {orderConfirmedProps.order?.id}
              </div>
              <div
                className={[
                  styles['date-container'],
                  styles['date-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['date-content'],
                    styles['date-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['date-text'],
                      styles['date-text-mobile'],
                    ].join(' ')}
                  >
                    {new Date(order.created_at ?? Date.now()).toDateString()}
                  </div>
                  <div
                    className={[
                      styles['item-count-text'],
                      styles['item-count-text-mobile'],
                    ].join(' ')}
                  >{`${quantity} ${
                    quantity !== 1 ? t('items') : t('item')
                  }`}</div>
                </div>
                <div>
                  <Button
                    classNames={{ button: styles['button'] }}
                    type={'text'}
                    size={'small'}
                    touchScreen={true}
                    rippleProps={{ color: 'rgba(133, 38, 122, .35)' }}
                    onClick={() => setOpenRefund(true)}
                  >
                    {t('refund')}
                  </Button>
                </div>
              </div>
              <div
                className={[
                  styles['shipping-items'],
                  styles['shipping-items-mobile'],
                ].join(' ')}
              >
                {order.items
                  ?.sort((current: LineItem, next: LineItem) => {
                    return (
                      new Date(current.created_at).valueOf() -
                      new Date(next.created_at).valueOf()
                    );
                  })
                  .map((item: LineItem) => (
                    <ShippingItemComponent
                      key={item.id}
                      item={item}
                      storeProps={storeProps}
                    />
                  ))}
              </div>
            </div>
            <div
              className={[
                styles['card-container'],
                styles['card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['content-container'],
                  styles['content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['header-container'],
                    styles['header-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['header-title'],
                      styles['header-title-mobile'],
                    ].join(' ')}
                  >
                    {t('status')}
                  </div>
                </div>
                <div
                  className={[
                    styles['subheader-title'],
                    styles['subheader-title-mobile'],
                  ].join(' ')}
                >
                  {t('shipping')}
                </div>
                <div
                  className={[
                    styles['detail-text'],
                    styles['detail-text-mobile'],
                  ].join(' ')}
                >
                  {formatStatus(order?.fulfillment_status ?? '')}
                </div>
              </div>
              <div
                className={[
                  styles['content-container'],
                  styles['content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['subheader-title'],
                    styles['subheader-title-mobile'],
                  ].join(' ')}
                >
                  {t('payment')}
                </div>
                <div className={styles['detail-text']}>
                  {formatStatus(order?.payment_status ?? '')}
                </div>
              </div>
              <div
                className={[
                  styles['content-container'],
                  styles['content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['header-container'],
                    styles['header-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['header-title'],
                      styles['header-title-mobile'],
                    ].join(' ')}
                  >
                    {t('delivery')}
                  </div>
                </div>
                <div
                  className={[
                    styles['subheader-title'],
                    styles['subheader-title-mobile'],
                  ].join(' ')}
                >
                  {t('address')}
                </div>
                <div
                  className={[
                    styles['detail-text'],
                    styles['detail-text-mobile'],
                  ].join(' ')}
                >{`${order?.shipping_address?.first_name} ${order?.shipping_address?.last_name}`}</div>
                <div
                  className={[
                    styles['detail-text'],
                    styles['detail-text-mobile'],
                  ].join(' ')}
                >{`${order?.shipping_address?.address_1}${
                  order?.shipping_address?.address_2 &&
                  ', ' + order?.shipping_address.address_2
                }`}</div>
                <div
                  className={[
                    styles['detail-text'],
                    styles['detail-text-mobile'],
                  ].join(' ')}
                >{`${order?.shipping_address?.city}, ${order?.shipping_address?.province} ${order?.shipping_address?.postal_code}`}</div>
                <div
                  className={[
                    styles['detail-text'],
                    styles['detail-text-mobile'],
                  ].join(' ')}
                >
                  {order?.shipping_address?.country_code?.toUpperCase()}
                </div>
              </div>
              <div
                className={[
                  styles['content-container'],
                  styles['content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['subheader-title'],
                    styles['subheader-title-mobile'],
                  ].join(' ')}
                >
                  {t('deliveryMethod')}
                </div>
                {order?.shipping_methods &&
                  order?.shipping_methods?.length > 0 && (
                    <div
                      className={[
                        styles['detail-text'],
                        styles['detail-text-mobile'],
                      ].join(' ')}
                      key={order?.shipping_methods[0].id}
                    >
                      {order?.shipping_methods[0].shipping_option.name}
                    </div>
                  )}
              </div>
            </div>
            <div
              className={[
                styles['card-container'],
                styles['card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['content-container'],
                  styles['content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['header-container'],
                    styles['header-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['header-title'],
                      styles['header-title-mobile'],
                    ].join(' ')}
                  >
                    {t('orderSummary')}
                  </div>
                </div>
                <div
                  className={[
                    styles['pricing-container'],
                    styles['pricing-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['subtotal-container'],
                      styles['subtotal-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['subtotal-text'],
                        styles['subtotal-text-mobile'],
                      ].join(' ')}
                    >
                      {t('subtotal')}
                    </div>
                    <div
                      className={[
                        styles['subtotal-text'],
                        styles['subtotal-text-mobile'],
                      ].join(' ')}
                    >
                      {storeProps.selectedRegion &&
                        formatAmount({
                          amount: orderConfirmedProps.order?.subtotal ?? 0,
                          region: storeProps.selectedRegion,
                          includeTaxes: false,
                        })}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['total-detail-container'],
                      styles['total-detail-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {t('discount')}
                    </div>
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {storeProps.selectedRegion &&
                        formatAmount({
                          amount: -(order?.discount_total ?? 0),
                          region: storeProps.selectedRegion,
                          includeTaxes: false,
                        })}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['total-detail-container'],
                      styles['total-detail-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {t('shipping')}
                    </div>
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {storeProps.selectedRegion &&
                        formatAmount({
                          amount:
                            orderConfirmedProps.order?.shipping_total ?? 0,
                          region: storeProps.selectedRegion,
                          includeTaxes: false,
                        })}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['total-detail-container'],
                      styles['total-detail-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {t('taxes')}
                    </div>
                    <div
                      className={[
                        styles['total-detail-text'],
                        styles['total-detail-text-mobile'],
                      ].join(' ')}
                    >
                      {storeProps.selectedRegion &&
                        formatAmount({
                          amount: orderConfirmedProps.order?.tax_total ?? 0,
                          region: storeProps.selectedRegion,
                          includeTaxes: false,
                        })}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['total-container'],
                      styles['total-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['total-text'],
                        styles['total-text-mobile'],
                      ].join(' ')}
                    >
                      {t('total')}
                    </div>
                    <div
                      className={[
                        styles['total-text'],
                        styles['total-text-mobile'],
                      ].join(' ')}
                    >
                      {storeProps.selectedRegion &&
                        formatAmount({
                          amount: orderConfirmedProps.order?.total ?? 0,
                          region: storeProps.selectedRegion,
                          includeTaxes: true,
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
      {createPortal(
        <>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={openRefund}
            touchScreen={true}
            onClose={() => setOpenRefund(false)}
          >
            <div
              className={[
                styles['refund-items-container'],
                styles['refund-items-container-mobile'],
              ].join(' ')}
            >
              {order?.items?.map((item: LineItem) => (
                <RefundItemComponent
                  item={item}
                  refundItem={orderConfirmedProps.refundItems[item.id]}
                  returnReasonOptions={returnReasonOptions}
                  onChanged={(value) =>
                    OrderConfirmedController.updateRefundItem(item.id, value)
                  }
                />
              ))}
            </div>
            <div
              className={[
                styles['request-refund-button-container'],
                styles['request-refund-button-container-mobile'],
              ].join(' ')}
            >
              <Button
                block={true}
                size={'large'}
                classNames={{
                  button: styles['refund-button'],
                }}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                disabled={
                  Object.values(
                    orderConfirmedProps.refundItems ?? ([] as RefundItem[])
                  ).find((value: RefundItem) => value.quantity > 0) ===
                  undefined
                }
                onClick={async () => {
                  await OrderConfirmedController.createReturnAsync();
                  setOpenRefund(false);
                  WindowController.addToast({
                    key: `refund-request-success-${Math.random()}`,
                    message: t('requestRefund') ?? '',
                    description: t('requestRefundSuccessMessage') ?? '',
                    type: 'success',
                  });
                }}
              >
                {t('requestRefund')}
              </Button>
            </div>
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
