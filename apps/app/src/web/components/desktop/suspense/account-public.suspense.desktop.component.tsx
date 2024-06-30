import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import styles from '../../account-public.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function AccountPublicSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['scroll-content'],
            styles['scroll-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-content'],
              styles['top-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['status-container'],
                styles['status-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['avatar-content'],
                  styles['avatar-content-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['avatar-container'],
                    styles['avatar-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    style={{ width: 96, height: 96 }}
                    borderRadius={96}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['followers-status-container'],
                  styles['followers-status-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={[styles['username'], styles['username-desktop']].join(
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
                  styles['skeleton-user-desktop'],
                ].join(' ')}
              />
            </div>
            <div
              className={[
                styles['follow-button-container'],
                styles['follow-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton count={1} borderRadius={6} height={38} width={120} />
              <Skeleton count={1} borderRadius={6} height={38} width={120} />
            </div>
          </div>
          <div
            className={[
              styles['tabs-container-skeleton'],
              styles['tabs-container-skeleton-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
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
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
