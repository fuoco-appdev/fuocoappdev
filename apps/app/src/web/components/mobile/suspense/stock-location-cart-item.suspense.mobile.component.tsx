import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import styles from '../../stock-location-cart-item.module.scss';

export function StockLocationCartItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop inheritStyles={false}>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['container'], styles['container-mobile']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-mobile']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-mobile'],
              ].join(' ')}
            >
              <Skeleton width={40} height={40} borderRadius={40} />
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                <Skeleton width={140} borderRadius={20} />
              </div>
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-mobile'],
                ].join(' ')}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
