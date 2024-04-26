import Skeleton from 'react-loading-skeleton';
import styles from '../../cart.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { CartItemSuspenseDesktopComponent } from './cart-item.suspense.desktop.component';
import { StockLocationCartItemSuspenseDesktopComponent } from './stock-location-cart-item.suspense.desktop.component';

export function CartSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['shopping-carts-container'],
            styles['shopping-carts-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['shopping-cart-items-container'],
              styles['shopping-cart-items-container-desktop'],
            ].join(' ')}
          >
            {[1, 1, 1, 1, 1].map((_value: number, index: number) => {
              return (
                <StockLocationCartItemSuspenseDesktopComponent key={index} />
              );
            })}
          </div>
        </div>
        <div
          className={[
            styles['cart-container'],
            styles['cart-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['account-container'],
              styles['account-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['already-have-an-account-title'],
                styles['already-have-an-account-title-desktop'],
              ].join(' ')}
              width={156}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['already-have-an-account-description'],
                styles['already-have-an-account-description-desktop'],
              ].join(' ')}
              width={400}
              borderRadius={20}
            />
            <div
              className={[
                styles['sign-in-button-container'],
                styles['sign-in-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton width={96} height={48} borderRadius={6} />
            </div>
          </div>
          <div
            className={[styles['content'], styles['content-desktop']].join(' ')}
          >
            <div
              className={[
                styles['card-container'],
                styles['card-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['shopping-cart-container'],
                  styles['shopping-cart-container-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['shopping-cart-title-skeleton'],
                    styles['shopping-cart-title-skeleton-desktop'],
                  ].join(' ')}
                  width={156}
                  borderRadius={20}
                />
                <div
                  className={[
                    styles['shopping-cart-items'],
                    styles['shopping-cart-items-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['tabs-container-skeleton'],
                      styles['tabs-container-skeleton-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton
                      style={{ height: 36, width: 100 }}
                      borderRadius={36}
                    />
                    <Skeleton
                      style={{ height: 36, width: 100 }}
                      borderRadius={36}
                    />
                  </div>
                  {[1, 2].map(() => (
                    <CartItemSuspenseDesktopComponent />
                  ))}
                </div>
              </div>
            </div>
            <div
              className={[
                styles['card-container'],
                styles['card-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['pricing-container'],
                  styles['pricing-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['subtotal-container'],
                    styles['subtotal-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-container-skeleton'],
                    styles['total-container-skeleton-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-desktop'],
                    ].join(' ')}
                    width={62}
                    borderRadius={20}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['discount-container'],
                  styles['discount-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['discount-input-container'],
                    styles['discount-input-container-desktop'],
                  ].join(' ')}
                >
                  <div className={styles['input-root-skeleton']}>
                    <Skeleton
                      className={styles['input-form-layout-label-skeleton']}
                      height={20}
                      width={120}
                      borderRadius={20}
                    />
                    <Skeleton style={{ height: 44 }} borderRadius={6} />
                  </div>
                </div>
                <div
                  className={[
                    styles['apply-button-container-skeleton'],
                    styles['apply-button-container-skeleton-desktop'],
                  ].join(' ')}
                >
                  <Skeleton width={96} height={44} borderRadius={6} />
                </div>
              </div>
              <div
                className={[
                  styles['go-to-checkout-container'],
                  styles['go-to-checkout-container-desktop'],
                ].join(' ')}
              >
                <Skeleton height={48} borderRadius={6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
