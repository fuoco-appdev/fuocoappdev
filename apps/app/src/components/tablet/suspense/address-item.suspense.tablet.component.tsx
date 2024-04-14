import Skeleton from 'react-loading-skeleton';
import styles from '../../address-item.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function AddressItemSuspenseTabletComponent(): JSX.Element {
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
              className={[
                styles['title-container'],
                styles['title-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                className={[styles['title'], styles['title-tablet']].join(' ')}
                width={200}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['subtitle'], styles['subtitle-tablet']].join(
                  ' '
                )}
                width={120}
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
                <div>
                  <Skeleton
                    style={{ width: 40, height: 40 }}
                    borderRadius={40}
                  />
                </div>
                <div>
                  <Skeleton
                    style={{ width: 40, height: 40 }}
                    borderRadius={40}
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
