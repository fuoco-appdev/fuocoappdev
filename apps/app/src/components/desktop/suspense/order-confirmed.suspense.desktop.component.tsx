import Skeleton from 'react-loading-skeleton';
import styles from '../../order-confirmed.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { ShippingItemSuspenseDesktopComponent } from './shipping-item.suspense.desktop.component';

export function OrderConfirmedSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-container'],
              styles['card-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['thankyou-text'],
                styles['thankyou-text-desktop'],
              ].join(' ')}
              width={260}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['order-number-text'],
                styles['order-number-text-desktop'],
              ].join(' ')}
              width={80}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['order-id-text'],
                styles['order-id-text-desktop'],
              ].join(' ')}
              width={180}
              borderRadius={20}
            />
            <div
              className={[
                styles['date-container'],
                styles['date-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['date-content'],
                  styles['date-content-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['date-text'],
                    styles['date-text-desktop'],
                  ].join(' ')}
                  width={180}
                  borderRadius={20}
                />
                <Skeleton
                  className={[
                    styles['item-count-text'],
                    styles['item-count-text-desktop'],
                  ].join(' ')}
                  width={40}
                  borderRadius={20}
                />
              </div>
              <div>
                <Skeleton width={80} height={28} />
              </div>
            </div>
            <div
              className={[
                styles['shipping-items'],
                styles['shipping-items-desktop'],
              ].join(' ')}
            >
              {[1, 2].map(() => (
                <ShippingItemSuspenseDesktopComponent />
              ))}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-container'],
              styles['card-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['content-container'],
                styles['content-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-desktop'],
                  ].join(' ')}
                  width={120}
                  borderRadius={20}
                />
              </div>
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-desktop'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={180}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-desktop'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-desktop'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={styles['detail-text']}
                width={180}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-desktop'],
                  ].join(' ')}
                  width={120}
                  borderRadius={20}
                />
              </div>
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-desktop'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-desktop'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-desktop'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
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
                styles['content-container'],
                styles['content-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-desktop'],
                  ].join(' ')}
                  width={140}
                  borderRadius={20}
                />
              </div>
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
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-desktop'],
                    ].join(' ')}
                    width={140}
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
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={140}
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
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={140}
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
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-desktop'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-container'],
                    styles['total-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-desktop'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-desktop'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
