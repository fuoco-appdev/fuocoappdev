import Skeleton from 'react-loading-skeleton';
import styles from '../../notifications.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { NotificationItemSuspenseMobileComponent } from './notification-item.suspense.mobile.component';

export function NotificationsSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}
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
              <Skeleton width={140} height={20} borderRadius={20} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-content-skeleton'],
            styles['scroll-content-skeleton-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (value: number, _index: number) => {
              return <NotificationItemSuspenseMobileComponent key={value} />;
            }
          )}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
