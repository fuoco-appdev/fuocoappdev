import Skeleton from 'react-loading-skeleton';
import styles from '../../cart.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { StockLocationCartItemSuspenseMobileComponent } from './stock-location-cart-item.suspense.mobile.component';

export function CartSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['shopping-carts-container'],
            styles['shopping-carts-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-mobile'],
            ].join(' ')}
          >
            <Skeleton width={24} height={24} borderRadius={24} />
            <div
              className={[
                styles['shopping-carts-title'],
                styles['shopping-carts-title-mobile'],
              ].join(' ')}
            >
              <Skeleton width={80} height={20} borderRadius={20} />
            </div>
          </div>
          <div
            className={[
              styles['shopping-cart-items-container'],
              styles['shopping-cart-items-container-mobile'],
            ].join(' ')}
          >
            {[1, 1, 1, 1].map((_value: number, index: number) => {
              return (
                <StockLocationCartItemSuspenseMobileComponent key={index} />
              );
            })}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
