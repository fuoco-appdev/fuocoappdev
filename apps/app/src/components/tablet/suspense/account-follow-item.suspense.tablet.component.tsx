import Skeleton from 'react-loading-skeleton';
import styles from '../../account-follow-item.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function AccountFollowItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-tablet']].join(
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
                  styles['skeleton-user-tablet'],
                ].join(' ')}
              />
            </div>
            <Skeleton
              count={1}
              borderRadius={16}
              height={16}
              width={120}
              className={[styles['full-name'], styles['full-name-tablet']].join(
                ' '
              )}
            />
          </div>
        </div>
        <Skeleton style={{ width: 113, height: 38 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseTablet>
  );
}
