import { ResponsiveSuspenseTablet } from '../../../components/responsive.component';
import styles from '../../account-order-history.module.scss';
import { OrderItemSuspenseTabletComponent } from './order-item.suspense.tablet.component';

export function AccountOrderHistorySuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-tablet']].join(' ')}>
          <div
            className={[
              styles['items-container'],
              styles['items-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => (
              <OrderItemSuspenseTabletComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
