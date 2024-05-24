import styles from '../../account-public-followers.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { AccountFollowItemSuspenseDesktopComponent } from './account-follow-item.suspense.desktop.component';

export function AccountPublicFollowersSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
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
