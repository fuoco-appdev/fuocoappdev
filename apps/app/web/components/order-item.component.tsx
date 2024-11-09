import { LineItem, Order } from '@medusajs/medusa';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { OrderItemSuspenseDesktopComponent } from './desktop/suspense/order-item.suspense.desktop.component';
import { OrderItemSuspenseMobileComponent } from './mobile/suspense/order-item.suspense.mobile.component';

const OrderItemDesktopComponent = React.lazy(
  () => import('./desktop/order-item.desktop.component')
);
const OrderItemMobileComponent = React.lazy(
  () => import('./mobile/order-item.mobile.component')
);

export interface OrderItemProps {
  order: Order;
  onClick: () => void;
}

export interface OrderItemResponsiveProps extends OrderItemProps {
  fulfillmentStatus: string;
  getNumberOfItems: (items: LineItem[]) => number;
}

export default function OrderItemComponent({
  order,
  onClick,
}: OrderItemProps): JSX.Element {
  const [fulfillmentStatus, setFulfillmentStatus] = React.useState<string>('');
  const { t, i18n } = useTranslation();

  const getNumberOfItems = (items: LineItem[]) => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  React.useEffect(() => {
    if (order.fulfillment_status === 'canceled')
      setFulfillmentStatus(t('canceled') ?? '');
    else if (order.fulfillment_status === 'fulfilled')
      setFulfillmentStatus(t('fulfilled') ?? '');
    else if (order.fulfillment_status === 'not_fulfilled')
      setFulfillmentStatus(t('notFulfilled') ?? '');
    else if (order.fulfillment_status === 'partially_fulfilled')
      setFulfillmentStatus(t('partiallyFulfilled') ?? '');
    else if (order.fulfillment_status === 'partially_returned')
      setFulfillmentStatus(t('partiallyReturned') ?? '');
    else if (order.fulfillment_status === 'partially_shipped')
      setFulfillmentStatus(t('partiallyShipped') ?? '');
    else if (order.fulfillment_status === 'requires_action')
      setFulfillmentStatus(t('requiresAction') ?? '');
    else if (order.fulfillment_status === 'returned')
      setFulfillmentStatus(t('returned') ?? '');
    else if (order.fulfillment_status === 'shipped')
      setFulfillmentStatus(t('shipped') ?? '');
  }, [order, i18n.language]);

  const suspenceComponent = (
    <>
      <OrderItemSuspenseDesktopComponent />
      <OrderItemSuspenseMobileComponent />
    </>
  );

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <OrderItemDesktopComponent
        order={order}
        fulfillmentStatus={fulfillmentStatus}
        getNumberOfItems={getNumberOfItems}
        onClick={onClick}
      />
      <OrderItemMobileComponent
        order={order}
        fulfillmentStatus={fulfillmentStatus}
        getNumberOfItems={getNumberOfItems}
        onClick={onClick}
      />
    </React.Suspense>
  );
}