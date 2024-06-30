import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import styles from '../../stock-location-item.module.scss';

export function StockLocationItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop inheritStyles={false}>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['container'], styles['container-desktop']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-desktop']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-desktop']].join(' ')}
              >
                <Skeleton width={140} borderRadius={20} />
              </div>
              <div
                className={[
                  styles['location'],
                  styles['location-desktop'],
                ].join(' ')}
              >
                <Skeleton count={2} width={200} height={16} borderRadius={20} />
              </div>
              <div
                className={[
                  styles['description'],
                  styles['description-desktop'],
                ].join(' ')}
              >
                <Skeleton width={200} height={16} count={2} borderRadius={20} />
              </div>
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['thumbnail'],
                    styles['thumbnail-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-desktop'],
                    ].join(' ')}
                    width={56}
                    height={56}
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
