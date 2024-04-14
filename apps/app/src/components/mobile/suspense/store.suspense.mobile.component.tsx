import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import styles from '../../store.module.scss';
import { ProductPreviewSuspenseMobileComponent } from './product-preview.suspense.mobile.component';

export function StoreSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['top-bar-container'],
            styles['top-bar-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-top-content'],
              styles['top-bar-top-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['sales-location-container'],
                styles['sales-location-container-mobile'],
              ].join(' ')}
            >
              <Skeleton width={28} height={28} borderRadius={28} />
              <Skeleton
                className={[
                  styles['sales-location-title'],
                  styles['sales-location-title-mobile'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
            </div>
          </div>
          <div
            className={[
              styles['search-container'],
              styles['search-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['search-input-root'],
                styles['search-input-root-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['search-input-container-skeleton'],
                  styles['search-input-container-skeleton-mobile'],
                ].join(' ')}
                height={46}
                borderRadius={46}
              />
            </div>
            <div>
              <Skeleton style={{ width: 48, height: 48 }} borderRadius={40} />
            </div>
          </div>
          <div
            className={[
              styles['tab-container-skeleton'],
              styles['tab-container-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
            <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
            <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
            <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
