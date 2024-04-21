import Skeleton from 'react-loading-skeleton';
import styles from '../../account-add-friends.module.scss';
import { AccountFollowItemSuspenseDesktopComponent } from '../../desktop/suspense/account-follow-item.suspense.desktop.component';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function AccountAddFriendsSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['side-bar-container'],
            styles['side-bar-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['filter-title'],
              styles['filter-title-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={styles['input-form-layout-label-skeleton']}
              height={20}
              width={120}
              borderRadius={20}
            />
          </div>
          <div
            className={[
              styles['search-container'],
              styles['search-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['search-input-root'],
                styles['search-input-root-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ height: 46 }} borderRadius={46} />
            </div>
          </div>
          <div className={styles['input-root-skeleton']}>
            <Skeleton
              className={styles['input-form-layout-label-skeleton']}
              height={20}
              width={120}
              borderRadius={20}
            />
            <Skeleton style={{ height: 44 }} borderRadius={6} />
          </div>
          <div className={styles['input-root-skeleton']}>
            <Skeleton
              className={styles['input-form-layout-label-skeleton']}
              height={20}
              width={120}
              borderRadius={20}
            />
            <Skeleton style={{ height: 4 }} borderRadius={0} />
          </div>
          <div className={styles['input-root-skeleton']}>
            <Skeleton
              className={styles['input-form-layout-label-skeleton']}
              height={20}
              width={120}
              borderRadius={20}
            />
            <div
              className={[
                styles['sex-options'],
                styles['sex-options-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ height: 42 }} borderRadius={6} />
              <Skeleton style={{ height: 42 }} borderRadius={6} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
        >
          <div className={[styles['title'], styles['title-tablet']].join(' ')}>
            <Skeleton count={1} borderRadius={14} height={14} width={80} />
          </div>
          <div
            className={[
              styles['result-items-container'],
              styles['result-items-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map(() => (
              <AccountFollowItemSuspenseDesktopComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
