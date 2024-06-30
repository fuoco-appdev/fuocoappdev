import { OptionProps } from '@fuoco.appdev/core-ui';
import { lazy } from '@loadable/component';
import { LineItem, ReturnReason } from '@medusajs/medusa';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import OrderConfirmedController from '../../controllers/order-confirmed.controller';
import StoreController from '../../controllers/store.controller';
import { OrderConfirmedState } from '../../models/order-confirmed.model';
import { StoreState } from '../../models/store.model';
import { OrderConfirmedSuspenseDesktopComponent } from './desktop/suspense/order-confirmed.suspense.desktop.component';
import { OrderConfirmedSuspenseMobileComponent } from './mobile/suspense/order-confirmed.suspense.mobile.component';
import styles from './order-confirmed.module.scss';

const OrderConfirmedDesktopComponent = lazy(
  () => import('./desktop/order-confirmed.desktop.component')
);
const OrderConfirmedMobileComponent = lazy(
  () => import('./mobile/order-confirmed.mobile.component')
);

export interface OrderConfirmedProps { }

export interface OrderConfirmedResponsiveProps {
  orderConfirmedProps: OrderConfirmedState;
  storeProps: StoreState;
  quantity: number;
  openRefund: boolean;
  returnReasonOptions: OptionProps[];
  setOpenRefund: (value: boolean) => void;
  formatStatus: (value: string) => string;
}

export default function OrderConfirmedComponent(): JSX.Element {
  const { id } = useParams();
  const [orderConfirmedProps] = useObservable(
    OrderConfirmedController.model.store
  );
  const [storeProps] = useObservable(StoreController.model.store);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [openRefund, setOpenRefund] = React.useState<boolean>(false);
  const [returnReasonOptions, setReturnReasonOptions] = React.useState<
    OptionProps[]
  >([]);
  const isRenderedRef = React.useRef<boolean>(false);
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    renderCountRef.current += 1;
    OrderConfirmedController.load(renderCountRef.current);

    if (!isRenderedRef.current) {
      isRenderedRef.current = true;
      OrderConfirmedController.requestOrderAsync(id ?? '');
    }

    return () => {
      OrderConfirmedController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    const options: {
      id: string;
      value: string;
      children: () => JSX.Element;
    }[] = [];
    for (const returnReason of orderConfirmedProps.returnReasons as ReturnReason[]) {
      options.push({
        id: returnReason.id,
        value: returnReason.label,
        children: () => (
          <div className={styles['option-name']}>{returnReason.label}</div>
        ),
      });
    }

    setReturnReasonOptions(options);
  }, [orderConfirmedProps.returnReasons]);

  React.useEffect(() => {
    if (!orderConfirmedProps.order || !orderConfirmedProps.returnReasons) {
      return;
    }

    setQuantity(
      orderConfirmedProps.order.items.reduce(
        (current: number, next: LineItem) => current + next.quantity,
        0
      )
    );

    for (const item of orderConfirmedProps.order.items as LineItem[]) {
      OrderConfirmedController.updateRefundItem(item.id, {
        item_id: item.id,
        quantity: item.quantity,
        reason_id: orderConfirmedProps.returnReasons[0]?.id ?? '',
        note: '',
      });
    }
  }, [orderConfirmedProps.order, orderConfirmedProps.returnReasons]);

  const formatStatus = (str: string | undefined) => {
    const formatted = str?.split('_').join(' ');
    return formatted?.toLowerCase() ?? '';
  };

  const suspenceComponent = (
    <>
      <OrderConfirmedSuspenseDesktopComponent />
      <OrderConfirmedSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Home | Cruthology'} />
        <meta
          name="description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Cruthology'} />
        <meta
          property="og:description"
          content={
            'Elevate your wine journey with Cruthology and join a community of enthusiasts who appreciate the artistry and craftsmanship behind every bottle. Welcome to the intersection of wine, culture, and luxury.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <OrderConfirmedDesktopComponent
          orderConfirmedProps={orderConfirmedProps}
          storeProps={storeProps}
          quantity={quantity}
          openRefund={openRefund}
          returnReasonOptions={returnReasonOptions}
          setOpenRefund={setOpenRefund}
          formatStatus={formatStatus}
        />
        <OrderConfirmedMobileComponent
          orderConfirmedProps={orderConfirmedProps}
          storeProps={storeProps}
          quantity={quantity}
          openRefund={openRefund}
          returnReasonOptions={returnReasonOptions}
          setOpenRefund={setOpenRefund}
          formatStatus={formatStatus}
        />
      </React.Suspense>
    </>
  );
}
