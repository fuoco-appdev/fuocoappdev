import { Button, Modal, Scroll } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { RefundItem } from '../../../shared/models/order-confirmed.model';
import styles from '../../modules/order-confirmed.module.scss';
import { DIContext } from '../app.component';
import { OrderConfirmedResponsiveProps } from '../order-confirmed.component';
import RefundItemComponent from '../refund-item.component';
import { ResponsiveDesktop } from '../responsive.component';
import ShippingItemComponent from '../shipping-item.component';
import { OrderConfirmedSuspenseDesktopComponent } from './suspense/order-confirmed.suspense.desktop.component';

function OrderConfirmedDesktopComponent({
  quantity,
  openRefund,
  returnReasonOptions,
  setOpenRefund,
  formatStatus,
  shippingOption,
}: OrderConfirmedResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const { OrderConfirmedController, StoreController, MedusaService } =
    React.useContext(DIContext);
  const { order, refundItems } = OrderConfirmedController.model;
  const { selectedRegion } = StoreController.model;

  if (!order) {
    return <OrderConfirmedSuspenseDesktopComponent />;
  }

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <Scroll
          isLoadable={false}
          isReloadable={false}
          touchScreen={true}
          loadingHeight={0}
        >
          <div
            className={[
              styles['scroll-content'],
              styles['scroll-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['left-content'],
                styles['left-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['thankyou-text'],
                    styles['thankyou-text-desktop'],
                  ].join(' ')}
                >
                  {t('thankyouForOrder')}
                </div>
                <div
                  className={[
                    styles['order-number-text'],
                    styles['order-number-text-desktop'],
                  ].join(' ')}
                >
                  {`#${order?.display_id}`}
                </div>
                <div
                  className={[
                    styles['order-id-text'],
                    styles['order-id-text-desktop'],
                  ].join(' ')}
                >
                  {order?.id}
                </div>
                <div
                  className={[
                    styles['date-container'],
                    styles['date-container-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['date-content'],
                      styles['date-content-desktop'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['date-text'],
                        styles['date-text-desktop'],
                      ].join(' ')}
                    >
                      {new Date(order?.created_at ?? Date.now()).toDateString()}
                    </div>
                    <div
                      className={[
                        styles['item-count-text'],
                        styles['item-count-text-desktop'],
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
                    styles['shipping-items-desktop'],
                  ].join(' ')}
                >
                  {order?.items
                    ?.sort(
                      (
                        current: HttpTypes.StoreOrderLineItem,
                        next: HttpTypes.StoreOrderLineItem
                      ) => {
                        return (
                          new Date(current.created_at).valueOf() -
                          new Date(next.created_at).valueOf()
                        );
                      }
                    )
                    .map((item: HttpTypes.StoreOrderLineItem) => (
                      <ShippingItemComponent key={item.id} item={item} />
                    ))}
                </div>
              </div>
            </div>
            <div
              className={[
                styles['right-content'],
                styles['right-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['content-container'],
                    styles['content-container-desktop'],
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
                        styles['header-title'],
                        styles['header-title-desktop'],
                      ].join(' ')}
                    >
                      {t('status')}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['subheader-title'],
                      styles['subheader-title-desktop'],
                    ].join(' ')}
                  >
                    {t('shipping')}
                  </div>
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-desktop'],
                    ].join(' ')}
                  >
                    {formatStatus(order?.fulfillment_status ?? '')}
                  </div>
                </div>
                <div
                  className={[
                    styles['content-container'],
                    styles['content-container-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['subheader-title'],
                      styles['subheader-title-desktop'],
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
                    styles['content-container-desktop'],
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
                        styles['header-title'],
                        styles['header-title-desktop'],
                      ].join(' ')}
                    >
                      {t('delivery')}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['subheader-title'],
                      styles['subheader-title-desktop'],
                    ].join(' ')}
                  >
                    {t('address')}
                  </div>
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-desktop'],
                    ].join(' ')}
                  >{`${order?.shipping_address?.first_name} ${order?.shipping_address?.last_name}`}</div>
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-desktop'],
                    ].join(' ')}
                  >{`${order?.shipping_address?.address_1}${
                    order?.shipping_address?.address_2 &&
                    ', ' + order?.shipping_address.address_2
                  }`}</div>
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-desktop'],
                    ].join(' ')}
                  >{`${order?.shipping_address?.city}, ${order?.shipping_address?.province} ${order?.shipping_address?.postal_code}`}</div>
                  <div
                    className={[
                      styles['detail-text'],
                      styles['detail-text-desktop'],
                    ].join(' ')}
                  >
                    {order?.shipping_address?.country_code?.toUpperCase()}
                  </div>
                </div>
                <div
                  className={[
                    styles['content-container'],
                    styles['content-container-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['subheader-title'],
                      styles['subheader-title-desktop'],
                    ].join(' ')}
                  >
                    {t('deliveryMethod')}
                  </div>
                  {order?.shipping_methods &&
                    order?.shipping_methods?.length > 0 && (
                      <div
                        className={[
                          styles['detail-text'],
                          styles['detail-text-desktop'],
                        ].join(' ')}
                        key={order?.shipping_methods[0].id}
                      >
                        {shippingOption?.name}
                      </div>
                    )}
                </div>
              </div>
              <div
                className={[
                  styles['card-container'],
                  styles['card-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['content-container'],
                    styles['content-container-desktop'],
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
                        styles['header-title'],
                        styles['header-title-desktop'],
                      ].join(' ')}
                    >
                      {t('orderSummary')}
                    </div>
                  </div>
                  <div
                    className={[
                      styles['pricing-container'],
                      styles['pricing-container-desktop'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['subtotal-container'],
                        styles['subtotal-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['subtotal-text'],
                          styles['subtotal-text-desktop'],
                        ].join(' ')}
                      >
                        {t('subtotal')}
                      </div>
                      <div
                        className={[
                          styles['subtotal-text'],
                          styles['subtotal-text-desktop'],
                        ].join(' ')}
                      >
                        {selectedRegion &&
                          MedusaService.formatAmount(
                            order?.subtotal ?? 0,
                            selectedRegion.currency_code,
                            i18n.language
                          )}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['total-detail-container'],
                        styles['total-detail-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {t('discount')}
                      </div>
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {selectedRegion &&
                          MedusaService.formatAmount(
                            -(order?.discount_total ?? 0),
                            selectedRegion.currency_code,
                            i18n.language
                          )}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['total-detail-container'],
                        styles['total-detail-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {t('shipping')}
                      </div>
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {selectedRegion &&
                          MedusaService.formatAmount(
                            order?.shipping_total ?? 0,
                            selectedRegion.currency_code,
                            i18n.language
                          )}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['total-detail-container'],
                        styles['total-detail-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {t('taxes')}
                      </div>
                      <div
                        className={[
                          styles['total-detail-text'],
                          styles['total-detail-text-desktop'],
                        ].join(' ')}
                      >
                        {selectedRegion &&
                          MedusaService.formatAmount(
                            order?.tax_total ?? 0,
                            selectedRegion.currency_code,
                            i18n.language
                          )}
                      </div>
                    </div>
                    <div
                      className={[
                        styles['total-container'],
                        styles['total-container-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['total-text'],
                          styles['total-text-desktop'],
                        ].join(' ')}
                      >
                        {t('total')}
                      </div>
                      <div
                        className={[
                          styles['total-text'],
                          styles['total-text-desktop'],
                        ].join(' ')}
                      >
                        {selectedRegion &&
                          MedusaService.formatAmount(
                            order?.total ?? 0,
                            selectedRegion.currency_code,
                            i18n.language
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
        {createPortal(
          <Modal
            classNames={{
              overlay: styles['modal-overlay'],
              modal: [styles['modal'], styles['modal-desktop']].join(' '),
            }}
            visible={openRefund}
            hideFooter={true}
            onCancel={() => setOpenRefund(false)}
          >
            <div
              className={[
                styles['refund-items-container'],
                styles['refund-items-container-desktop'],
              ].join(' ')}
            >
              {order?.items?.map((item: HttpTypes.StoreOrderLineItem) => (
                <RefundItemComponent
                  item={item}
                  refundItem={refundItems[item.id]}
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
                styles['request-refund-button-container-desktop'],
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
                  Object.values(refundItems ?? ([] as RefundItem[])).find(
                    (value: RefundItem) => value.quantity > 0
                  ) === undefined
                }
                onClick={async () => {
                  await OrderConfirmedController.createReturnAsync();
                  setOpenRefund(false);
                  // WindowController.addToast({
                  //   key: `refund-request-success-${Math.random()}`,
                  //   message: t('requestRefund') ?? '',
                  //   description: t('requestRefundSuccessMessage') ?? '',
                  //   type: 'success',
                  // });
                }}
              >
                {t('requestRefund')}
              </Button>
            </div>
          </Modal>,
          document.body
        )}
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(OrderConfirmedDesktopComponent);
