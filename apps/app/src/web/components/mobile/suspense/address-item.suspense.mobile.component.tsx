import Skeleton from 'react-loading-skeleton';
import styles from '../../address-item.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function AddressItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
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
              <Skeleton
                className={[styles['title'], styles['title-mobile']].join(' ')}
                width={200}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['subtitle'], styles['subtitle-mobile']].join(
                  ' '
                )}
                width={120}
                borderRadius={20}
              />
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
    </ResponsiveSuspenseMobile>
  );
}
