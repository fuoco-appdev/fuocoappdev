import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { Order, LineItem } from '@medusajs/medusa';
import { OrderItemDesktopComponent } from './desktop/order-item.desktop.component';
import { OrderItemMobileComponent } from './mobile/order-item.mobile.component';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [fulfillmentStatus, setFulfillmentStatus] = useState<string>('');
  const { t, i18n } = useTranslation();

  const getNumberOfItems = (items: LineItem[]) => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  useEffect(() => {
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

  return (
    <>
      <ResponsiveDesktop>
        <OrderItemDesktopComponent
          order={order}
          fulfillmentStatus={fulfillmentStatus}
          getNumberOfItems={getNumberOfItems}
          onClick={onClick}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <OrderItemMobileComponent
          order={order}
          fulfillmentStatus={fulfillmentStatus}
          getNumberOfItems={getNumberOfItems}
          onClick={onClick}
        />
      </ResponsiveMobile>
    </>
  );
}
