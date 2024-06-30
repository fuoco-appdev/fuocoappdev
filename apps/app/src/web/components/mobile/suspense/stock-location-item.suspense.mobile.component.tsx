import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import styles from '../../stock-location-item.module.scss';

export function StockLocationItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile inheritStyles={false}>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['container'], styles['container-mobile']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-mobile']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                <Skeleton width={140} borderRadius={20} />
              </div>
              <div
                className={[styles['location'], styles['location-mobile']].join(
                  ' '
                )}
              >
                <Skeleton count={2} width={200} height={16} borderRadius={20} />
              </div>
              <div
                className={[
                  styles['description'],
                  styles['description-mobile'],
                ].join(' ')}
              >
                <Skeleton width={200} height={16} count={2} borderRadius={20} />
              </div>
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['thumbnail'],
                    styles['thumbnail-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-mobile'],
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
    </ResponsiveSuspenseMobile>
  );
}
