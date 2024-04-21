import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import { ResponsiveSuspenseTablet } from '../../../components/responsive.component';
import styles from '../../account-public.module.scss';

export function AccountPublicSuspenseTabletComponent(): JSX.Element {
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
              styles['top-content'],
              styles['top-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['avatar-container'],
                styles['avatar-container-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 96, height: 96 }} borderRadius={96} />
            </div>
            <div
              className={[styles['username'], styles['username-tablet']].join(
                ' '
              )}
            >
              <Skeleton
                count={1}
                borderRadius={20}
                height={20}
                width={120}
                className={[
                  styles['skeleton-user'],
                  styles['skeleton-user-tablet'],
                ].join(' ')}
              />
            </div>
            <div
              className={[
                styles['follow-button-container'],
                styles['follow-button-container-tablet'],
              ].join(' ')}
            >
              <Skeleton count={1} borderRadius={6} height={38} width={120} />
            </div>
          </div>
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
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-tablet'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-tablet'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
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
