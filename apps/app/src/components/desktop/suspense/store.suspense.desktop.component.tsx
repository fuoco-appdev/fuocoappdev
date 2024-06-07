import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import styles from '../../store.module.scss';
import { ProductPreviewSuspenseDesktopComponent } from './product-preview.suspense.desktop.component';

export function StoreSuspenseDesktopComponent(): JSX.Element {
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
              styles['top-bar-container'],
              styles['top-bar-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['sales-location-container'],
                  styles['sales-location-container-desktop'],
                ].join(' ')}
              >
                <Skeleton height={24} width={24} borderRadius={24} />
                <div
                  className={[
                    styles['sales-location-title'],
                    styles['sales-location-title-desktop'],
                  ].join(' ')}
                >
                  <Skeleton height={20} width={140} borderRadius={20} />
                </div>
              </div>
            </div>
            <div
              className={[
                styles['top-bar-middle-content'],
                styles['top-bar-middle-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['search-input-container-skeleton'],
                      styles['search-input-container-skeleton-desktop'],
                    ].join(' ')}
                    height={46}
                    width={556}
                    borderRadius={46}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['tab-container-skeleton'],
                  styles['tab-container-skeleton-desktop'],
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
                styles['top-bar-right-content'],
                styles['top-bar-right-content-desktop'],
              ].join(' ')}
            >
              <div>
                <Skeleton style={{ width: 48, height: 48 }} borderRadius={48} />
              </div>
            </div>
          </div>
          <div
            className={[
              styles['scroll-content-skeleton'],
              styles['scroll-content-skeleton-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_value, index) => (
              <ProductPreviewSuspenseDesktopComponent key={index} />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
