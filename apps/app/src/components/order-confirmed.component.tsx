import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './order-confirmed.module.scss';

export interface OrderConfirmedProps {}

function OrderConfirmedDesktopComponent({}: OrderConfirmedProps): JSX.Element {
  return <div></div>;
}

function OrderConfirmedMobileComponent({}: OrderConfirmedProps): JSX.Element {
  return <div className={styles['root']}></div>;
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
