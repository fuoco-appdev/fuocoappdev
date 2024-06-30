import Skeleton from 'react-loading-skeleton';
import styles from '../../account-add-friends.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { AccountFollowItemSuspenseDesktopComponent } from './account-follow-item.suspense.desktop.component';

export function AccountAddFriendsSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['side-bar-container'],
            styles['side-bar-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['filter-title'],
              styles['filter-title-desktop'],
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
              styles['search-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['search-input-root'],
                styles['search-input-root-desktop'],
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
                styles['sex-options-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ height: 42 }} borderRadius={6} />
              <Skeleton style={{ height: 42 }} borderRadius={6} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-content'],
            styles['scroll-content-desktop'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
        >
          <div className={[styles['title'], styles['title-desktop']].join(' ')}>
            <Skeleton count={1} borderRadius={14} height={14} width={80} />
          </div>
          <div
            className={[
              styles['result-items-container'],
              styles['result-items-container-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map(() => (
              <AccountFollowItemSuspenseDesktopComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
