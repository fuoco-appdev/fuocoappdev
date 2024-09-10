import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import styles from '../../../modules/account-public-status.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function AccountPublicStatusSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['tabs-container-skeleton'],
            styles['tabs-container-skeleton-desktop'],
          ].join(' ')}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
          </div>
          <Skeleton height={46} width={556} borderRadius={46} />
        </div>
        <div
          className={[
            styles['outlet-container'],
            styles['outlet-container-desktop'],
          ].join(' ')}
        >
          <div style={{ minWidth: '100%', minHeight: '100%' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
