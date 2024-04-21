import Skeleton from 'react-loading-skeleton';
import styles from '../../cart-item.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function CartVariantItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div
        className={[
          styles['variant-container'],
          styles['variant-container-tablet'],
        ].join(' ')}
      >
        <div
          className={[
            styles['variant-content'],
            styles['variant-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['variant-details'],
              styles['variant-details-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['variant-thumbnail-container'],
                styles['variant-thumbnail-container-tablet'],
              ].join(' ')}
            >
              <Skeleton width={38} height={38} />
            </div>
            <div
              className={[
                styles['variant-title'],
                styles['variant-title-tablet'],
              ].join(' ')}
            >
              <Skeleton width={60} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-value'],
                styles['variant-value-tablet'],
              ].join(' ')}
            >
              <Skeleton width={40} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-price'],
                styles['variant-price-tablet'],
              ].join(' ')}
            >
              <Skeleton width={60} height={22} borderRadius={22} />
            </div>
          </div>

          <Skeleton width={24} height={24} borderRadius={24} />
        </div>
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
    </ResponsiveSuspenseTablet>
  );
}
