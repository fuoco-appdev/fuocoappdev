import Skeleton from 'react-loading-skeleton';
import styles from '../../account-message-item.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function AccountMessageItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-desktop']].join(
                ' '
              )}
            >
              <Skeleton
                count={1}
                borderRadius={20}
                height={20}
                width={80}
                className={[
                  styles['skeleton-user'],
                  styles['skeleton-user-desktop'],
                ].join(' ')}
              />
            </div>
            <Skeleton
              count={1}
              borderRadius={16}
              height={16}
              width={120}
              className={[
                styles['full-name'],
                styles['full-name-desktop'],
              ].join(' ')}
            />
          </div>
        </div>
        <Skeleton style={{ width: 113, height: 38 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
