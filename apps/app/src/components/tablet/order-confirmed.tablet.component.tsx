import { LineItem } from '@medusajs/medusa';
import { useTranslation } from 'react-i18next';
import OrderConfirmedController from '../../controllers/order-confirmed.controller';
import styles from '../order-confirmed.module.scss';
import ShippingItemComponent from '../shipping-item.component';
// @ts-ignore
import { Button, Modal } from '@fuoco.appdev/core-ui';
import { formatAmount } from 'medusa-react';
import WindowController from '../../controllers/window.controller';
import { RefundItem } from '../../models/order-confirmed.model';
import { OrderConfirmedResponsiveProps } from '../order-confirmed.component';
import RefundItemComponent from '../refund-item.component';
import { ResponsiveTablet } from '../responsive.component';
import { OrderConfirmedSuspenseTabletComponent } from './suspense/order-confirmed.suspense.tablet.component';

export default function OrderConfirmedTabletComponent({
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
    return <OrderConfirmedSuspenseTabletComponent />;
  }

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
              styles['card-container'],
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['thankyou-text'],
                styles['thankyou-text-tablet'],
              ].join(' ')}
            >
              {t('thankyouForOrder')}
            </div>
            <div
              className={[
                styles['order-number-text'],
                styles['order-number-text-tablet'],
              ].join(' ')}
            >
              {`#${order?.display_id}`}
            </div>
            <div
              className={[
                styles['order-id-text'],
                styles['order-id-text-tablet'],
              ].join(' ')}
            >
              {order?.id}
            </div>
            <div
              className={[
                styles['date-container'],
                styles['date-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['date-content'],
                  styles['date-content-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['date-text'],
                    styles['date-text-tablet'],
                  ].join(' ')}
                >
                  {new Date(order?.created_at ?? Date.now()).toDateString()}
                </div>
                <div
                  className={[
                    styles['item-count-text'],
                    styles['item-count-text-tablet'],
                  ].join(' ')}
                >{`${quantity} ${
                  quantity !== 1 ? t('items') : t('item')
                }`}</div>
              </div>
              <div>
                <Button
                  touchScreen={true}
                  classNames={{ button: styles['button'] }}
                  type={'text'}
                  size={'small'}
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
                styles['shipping-items-tablet'],
              ].join(' ')}
            >
              {order?.items
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
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-container'],
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
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
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                >
                  {t('status')}
                </div>
              </div>
              <div
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
              >
                {t('shipping')}
              </div>
              <div
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
              >
                {formatStatus(order?.fulfillment_status ?? '')}
              </div>
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
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
                styles['content-container-tablet'],
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
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                >
                  {t('delivery')}
                </div>
              </div>
              <div
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
              >
                {t('address')}
              </div>
              <div
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
              >{`${order?.shipping_address?.first_name} ${order?.shipping_address?.last_name}`}</div>
              <div
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
              >{`${order?.shipping_address?.address_1}${
                order?.shipping_address?.address_2 &&
                ', ' + order?.shipping_address.address_2
              }`}</div>
              <div
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
              >{`${order?.shipping_address?.city}, ${order?.shipping_address?.province} ${order?.shipping_address?.postal_code}`}</div>
              <div
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
              >
                {order?.shipping_address?.country_code?.toUpperCase()}
              </div>
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
              >
                {t('deliveryMethod')}
              </div>
              {order?.shipping_methods &&
                order?.shipping_methods?.length > 0 && (
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-tablet'],
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
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
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
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                >
                  {t('orderSummary')}
                </div>
              </div>
              <div
                className={[
                  styles['pricing-container'],
                  styles['pricing-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['subtotal-container'],
                    styles['subtotal-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-tablet'],
                    ].join(' ')}
                  >
                    {t('subtotal')}
                  </div>
                  <div
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-tablet'],
                    ].join(' ')}
                  >
                    {storeProps.selectedRegion &&
                      formatAmount({
                        amount: order?.subtotal ?? 0,
                        region: storeProps.selectedRegion,
                        includeTaxes: false,
                      })}
                  </div>
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                  >
                    {t('discount')}
                  </div>
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
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
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                  >
                    {t('shipping')}
                  </div>
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                  >
                    {storeProps.selectedRegion &&
                      formatAmount({
                        amount: order?.shipping_total ?? 0,
                        region: storeProps.selectedRegion,
                        includeTaxes: false,
                      })}
                  </div>
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                  >
                    {t('taxes')}
                  </div>
                  <div
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                  >
                    {storeProps.selectedRegion &&
                      formatAmount({
                        amount: order?.tax_total ?? 0,
                        region: storeProps.selectedRegion,
                        includeTaxes: false,
                      })}
                  </div>
                </div>
                <div
                  className={[
                    styles['total-container'],
                    styles['total-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['total-text'],
                      styles['total-text-tablet'],
                    ].join(' ')}
                  >
                    {t('total')}
                  </div>
                  <div
                    className={[
                      styles['total-text'],
                      styles['total-text-tablet'],
                    ].join(' ')}
                  >
                    {storeProps.selectedRegion &&
                      formatAmount({
                        amount: order?.total ?? 0,
                        region: storeProps.selectedRegion,
                        includeTaxes: true,
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          classNames={{
            overlay: styles['modal-overlay'],
            modal: [styles['modal'], styles['modal-tablet']].join(' '),
          }}
          visible={openRefund}
          hideFooter={true}
          onCancel={() => setOpenRefund(false)}
        >
          <div
            className={[
              styles['refund-items-container'],
              styles['refund-items-container-tablet'],
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
              styles['request-refund-button-container-tablet'],
            ].join(' ')}
          >
            <Button
              touchScreen={true}
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
                ).find((value: RefundItem) => value.quantity > 0) === undefined
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
        </Modal>
      </div>
    </ResponsiveTablet>
  );
}
