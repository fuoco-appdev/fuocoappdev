import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import styles from '../../account-public-status.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function AccountPublicStatusSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['tabs-container-skeleton'],
              styles['tabs-container-skeleton-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-tablet'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-tablet'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
          </div>
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-tablet'],
            ].join(' ')}
          >
            <div style={{ minWidth: '100%', minHeight: '100%' }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
