import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/product-preview.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function ProductPreviewSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile inheritStyles={false} style={{ width: '100%' }}>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['animated-root'],
            styles['animated-root-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['left-content'],
              styles['left-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-content'],
                styles['top-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['thumbnail-content'],
                  styles['thumbnail-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['thumbnail-container'],
                    styles['thumbnail-container-mobile'],
                  ].join(' ')}
                  style={{
                    height: '56px',
                    width: '56px',
                    borderRadius: '6px',
                  }}
                >
                  <Skeleton
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-mobile'],
                    ].join(' ')}
                  />
                </div>
                <div
                  className={[
                    styles['title-container'],
                    styles['title-container-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['product-title'],
                      styles['product-title-mobile'],
                    ].join(' ')}
                    width={156}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['product-subtitle'],
                      styles['product-subtitle-mobile'],
                    ].join(' ')}
                    width={100}
                    borderRadius={20}
                  />
                </div>
              </div>
            </div>
            <div
              className={[
                styles['product-description-skeleton'],
                styles['product-description-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton count={4} borderRadius={20} />
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['price-container'],
                styles['price-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['product-price'],
                  styles['product-price-mobile'],
                ].join(' ')}
                width={40}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['status-content-container'],
                styles['status-content-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['like-status-container'],
                  styles['like-status-container-mobile'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['like-status-button-skeleton'],
                    styles['like-status-button-skeleton-mobile'],
                  ].join(' ')}
                />
                <Skeleton
                  borderRadius={9999}
                  className={[
                    styles['like-status-count-skeleton'],
                    styles['like-status-count-skeleton-mobile'],
                  ].join(' ')}
                />
              </div>
            </div>
            <Skeleton width={46} height={46} borderRadius={46} />
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
