import { OptionProps } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styles from '../modules/order-confirmed.module.scss';
import { DIContext } from './app.component';
import { OrderConfirmedSuspenseDesktopComponent } from './desktop/suspense/order-confirmed.suspense.desktop.component';
import { OrderConfirmedSuspenseMobileComponent } from './mobile/suspense/order-confirmed.suspense.mobile.component';

const OrderConfirmedDesktopComponent = React.lazy(
  () => import('./desktop/order-confirmed.desktop.component')
);
const OrderConfirmedMobileComponent = React.lazy(
  () => import('./mobile/order-confirmed.mobile.component')
);

export interface OrderConfirmedProps {}

export interface OrderConfirmedResponsiveProps {
  quantity: number;
  openRefund: boolean;
  returnReasonOptions: OptionProps[];
  shippingOption: HttpTypes.StoreShippingOption | undefined;
  setOpenRefund: (value: boolean) => void;
  formatStatus: (value: string) => string;
}

function OrderConfirmedComponent(): JSX.Element {
  const { id } = useParams();
  const { OrderConfirmedController } = React.useContext(DIContext);
  const { returnReasons, order, suspense, shippingOptions } =
    OrderConfirmedController.model;
  const [quantity, setQuantity] = React.useState<number>(0);
  const [openRefund, setOpenRefund] = React.useState<boolean>(false);
  const [returnReasonOptions, setReturnReasonOptions] = React.useState<
    OptionProps[]
  >([]);
  const [shippingOption, setShippingOption] = React.useState<
    HttpTypes.StoreShippingOption | undefined
  >(undefined);
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
    for (const returnReason of returnReasons) {
      options.push({
        id: returnReason.id,
        value: returnReason.label,
        children: () => (
          <div className={styles['option-name']}>{returnReason.label}</div>
        ),
      });
    }

    setReturnReasonOptions(options);
  }, [returnReasons]);

  React.useEffect(() => {
    if (!order || !returnReasons) {
      return;
    }

    const total =
      order.items?.reduce(
        (current: number, next: HttpTypes.StoreOrderLineItem) =>
          current + next.quantity,
        0
      ) ?? 0;
    setQuantity(total);

    for (const item of order.items ?? []) {
      OrderConfirmedController.updateRefundItem(item.id, {
        item_id: item.id,
        quantity: item.quantity,
        reason_id: returnReasons[0]?.id ?? '',
        note: '',
      });
    }
  }, [order, returnReasons]);

  React.useEffect(() => {
    const option = shippingOptions.find(
      (value) => value.id === order?.shipping_methods?.[0].shipping_option_id
    );
    setShippingOption(option);
  }, [order, shippingOptions]);

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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Home | fuoco.appdev'} />
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
          quantity={quantity}
          openRefund={openRefund}
          returnReasonOptions={returnReasonOptions}
          shippingOption={shippingOption}
          setOpenRefund={setOpenRefund}
          formatStatus={formatStatus}
        />
        <OrderConfirmedMobileComponent
          quantity={quantity}
          openRefund={openRefund}
          returnReasonOptions={returnReasonOptions}
          shippingOption={shippingOption}
          setOpenRefund={setOpenRefund}
          formatStatus={formatStatus}
        />
      </React.Suspense>
    </>
  );
}

export default observer(OrderConfirmedComponent);
