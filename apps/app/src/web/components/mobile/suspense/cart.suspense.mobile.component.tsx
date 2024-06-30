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
              styles['shopping-cart-items-container'],
              styles['shopping-cart-items-container-mobile'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map((_value: number, index: number) => {
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
