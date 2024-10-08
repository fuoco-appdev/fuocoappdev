import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/cart-variant-item.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function CartVariantItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div
        className={[
          styles['variant-container'],
          styles['variant-container-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['variant-content'],
            styles['variant-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['variant-details'],
              styles['variant-details-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['variant-thumbnail-container'],
                styles['variant-thumbnail-container-desktop'],
              ].join(' ')}
            >
              <Skeleton width={38} height={38} />
            </div>
            <div
              className={[
                styles['variant-title'],
                styles['variant-title-desktop'],
              ].join(' ')}
            >
              <Skeleton width={60} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-value'],
                styles['variant-value-desktop'],
              ].join(' ')}
            >
              <Skeleton width={40} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-price'],
                styles['variant-price-desktop'],
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
    </ResponsiveSuspenseDesktop>
  );
}
