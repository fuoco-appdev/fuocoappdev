import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import styles from '../../stock-location-item.module.scss';

export function StockLocationItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet inheritStyles={false}>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['container'], styles['container-tablet']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-tablet']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-tablet']].join(' ')}
              >
                <Skeleton width={140} borderRadius={20} />
              </div>
              <div
                className={[styles['location'], styles['location-tablet']].join(
                  ' '
                )}
              >
                <Skeleton count={2} width={200} height={16} borderRadius={20} />
              </div>
              <div
                className={[
                  styles['description'],
                  styles['description-tablet'],
                ].join(' ')}
              >
                <Skeleton width={200} height={16} count={2} borderRadius={20} />
              </div>
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['thumbnail'],
                    styles['thumbnail-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-tablet'],
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
    </ResponsiveSuspenseTablet>
  );
}
