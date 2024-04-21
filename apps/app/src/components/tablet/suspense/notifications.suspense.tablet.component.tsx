import Skeleton from 'react-loading-skeleton';
import styles from '../../notifications.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import { NotificationItemSuspenseTabletComponent } from './notification-item.suspense.tablet.component';

export function NotificationsSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
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
              <Skeleton width={140} height={20} borderRadius={20} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (value: number, _index: number) => {
              return <NotificationItemSuspenseTabletComponent key={value} />;
            }
          )}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
