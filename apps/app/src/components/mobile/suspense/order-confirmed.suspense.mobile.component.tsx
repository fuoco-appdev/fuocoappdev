import Skeleton from 'react-loading-skeleton';
import styles from '../../order-confirmed.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { ShippingItemSuspenseMobileComponent } from './shipping-item.suspense.mobile.component';

export function OrderConfirmedSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Skeleton
          className={[
            styles['thankyou-text'],
            styles['thankyou-text-mobile'],
          ].join(' ')}
          width={260}
          borderRadius={20}
        />
        <Skeleton
          className={[
            styles['order-number-text'],
            styles['order-number-text-mobile'],
          ].join(' ')}
          width={80}
          borderRadius={20}
        />
        <Skeleton
          className={[
            styles['order-id-text'],
            styles['order-id-text-mobile'],
          ].join(' ')}
          width={180}
          borderRadius={20}
        />
        <div
          className={[
            styles['date-container'],
            styles['date-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['date-content'],
              styles['date-content-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['date-text'], styles['date-text-mobile']].join(
                ' '
              )}
              width={180}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['item-count-text'],
                styles['item-count-text-mobile'],
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
            styles['shipping-items-mobile'],
          ].join(' ')}
        >
          {[1, 2].map(() => (
            <ShippingItemSuspenseMobileComponent />
          ))}
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['header-container-skeleton'],
              styles['header-container-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['header-title'],
                styles['header-title-mobile'],
              ].join(' ')}
              width={120}
              borderRadius={20}
            />
          </div>
          <Skeleton
            className={[
              styles['subheader-title'],
              styles['subheader-title-mobile'],
            ].join(' ')}
            width={120}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={180}
            borderRadius={20}
          />
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-mobile'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['subheader-title'],
              styles['subheader-title-mobile'],
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
            styles['content-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['header-container-skeleton'],
              styles['header-container-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['header-title'],
                styles['header-title-mobile'],
              ].join(' ')}
              width={120}
              borderRadius={20}
            />
          </div>
          <Skeleton
            className={[
              styles['subheader-title'],
              styles['subheader-title-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-mobile'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['subheader-title'],
              styles['subheader-title-mobile'],
            ].join(' ')}
            width={120}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['detail-text'],
              styles['detail-text-mobile'],
            ].join(' ')}
            width={140}
            borderRadius={20}
          />
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['header-container-skeleton'],
              styles['header-container-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['header-title'],
                styles['header-title-mobile'],
              ].join(' ')}
              width={140}
              borderRadius={20}
            />
          </div>
          <div
            className={[
              styles['pricing-container'],
              styles['pricing-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['subtotal-container'],
                styles['subtotal-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-container'],
                styles['total-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-text'],
                  styles['total-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-text'],
                  styles['total-text-mobile'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
