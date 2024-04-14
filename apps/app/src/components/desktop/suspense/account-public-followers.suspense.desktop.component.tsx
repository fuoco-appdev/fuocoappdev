import Skeleton from 'react-loading-skeleton';
import styles from '../../account-public-followers.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { AccountFollowItemSuspenseDesktopComponent } from './account-follow-item.suspense.desktop.component';

export function AccountPublicFollowersSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
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
            <Skeleton
              className={[
                styles['search-input-container-skeleton'],
                styles['search-input-container-skeleton-desktop'],
              ].join(' ')}
              height={46}
              width={556}
              borderRadius={46}
            />
          </div>
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
    </ResponsiveSuspenseDesktop>
  );
}
