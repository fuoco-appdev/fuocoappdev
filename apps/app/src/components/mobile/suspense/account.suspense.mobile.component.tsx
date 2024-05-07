import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import styles from '../../account.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function AccountSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}
        >
          <div
            className={[
              styles['left-tab-container'],
              styles['left-tab-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['username-container'],
                styles['username-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['username'], styles['username-mobile']].join(
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
                    styles['skeleton-user-mobile'],
                  ].join(' ')}
                />
              </div>
            </div>
          </div>
          <div
            className={[
              styles['right-tab-container'],
              styles['right-tab-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-content'],
              styles['top-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['status-container'],
                styles['status-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['avatar-content'],
                  styles['avatar-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['avatar-container'],
                    styles['avatar-container-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    style={{ width: 96, height: 96 }}
                    borderRadius={96}
                  />
                </div>
              </div>
            </div>
            <div
              className={[styles['username'], styles['username-mobile']].join(
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
                  styles['skeleton-user-mobile'],
                ].join(' ')}
              />
            </div>
            <div
              className={[
                styles['followers-status-container'],
                styles['followers-status-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['followers-status-item'],
                  styles['followers-status-item-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-value'],
                    styles['followers-status-value-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={30} height={19} borderRadius={19} />
                </div>
                <div
                  className={[
                    styles['followers-status-name'],
                    styles['followers-status-name-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={55} height={19} borderRadius={19} />
                </div>
              </div>
              <div
                className={[
                  styles['followers-status-item'],
                  styles['followers-status-item-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-value'],
                    styles['followers-status-value-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={30} height={19} borderRadius={19} />
                </div>
                <div
                  className={[
                    styles['followers-status-name'],
                    styles['followers-status-name-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={55} height={19} borderRadius={19} />
                </div>
              </div>
              <div
                className={[
                  styles['followers-status-item'],
                  styles['followers-status-item-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-value'],
                    styles['followers-status-value-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={30} height={19} borderRadius={19} />
                </div>
                <div
                  className={[
                    styles['followers-status-name'],
                    styles['followers-status-name-mobile'],
                  ].join(' ')}
                >
                  <Skeleton width={55} height={19} borderRadius={19} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={[
              styles['tabs-container-skeleton'],
              styles['tabs-container-skeleton-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
          </div>
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-mobile'],
            ].join(' ')}
          >
            <div style={{ minWidth: '100%', minHeight: '100%' }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
