import Skeleton from 'react-loading-skeleton';
import styles from '../../order-item.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function OrderItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
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
              className={[styles['thumbnail'], styles['thumbnail-tablet']].join(
                ' '
              )}
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
            <div
              className={[
                styles['title-container'],
                styles['title-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                className={[styles['title'], styles['title-tablet']].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['status'], styles['status-tablet']].join(
                  ' '
                )}
                width={80}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['status'], styles['status-tablet']].join(
                  ' '
                )}
                width={80}
                borderRadius={20}
              />
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
                <Skeleton
                  className={[styles['pricing'], styles['pricing-tablet']].join(
                    ' '
                  )}
                  width={40}
                  borderRadius={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
