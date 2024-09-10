import styles from '../../../modules/account-public-followers.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { AccountFollowItemSuspenseMobileComponent } from './account-follow-item.suspense.mobile.component';

export function AccountPublicFollowersSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4].map(() => (
            <AccountFollowItemSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
