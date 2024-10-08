import styles from '../../../modules/account-order-history.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { OrderItemSuspenseDesktopComponent } from './order-item.suspense.desktop.component';

export function AccountOrderHistorySuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-desktop']].join(' ')}>
          <div
            className={[
              styles['items-container'],
              styles['items-container-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => (
              <OrderItemSuspenseDesktopComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
