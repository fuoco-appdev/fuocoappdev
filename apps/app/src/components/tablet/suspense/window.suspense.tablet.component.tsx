import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import styles from '../../window.module.scss';

export function WindowSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
        >
          <div
            className={[
              styles['top-bar-left-content'],
              styles['top-bar-left-content-tablet'],
            ].join(' ')}
          >
            <div className={[styles['top-bar-button-container']].join(' ')}>
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-tablet'],
              ].join(' ')}
            >
              <img src={'../assets/svg/logo.svg'} />
              <img
                className={[
                  styles['logo-text'],
                  styles['logo-text-tablet'],
                ].join(' ')}
                src={'../assets/svg/logo-text-light.svg'}
              />
            </div>
          </div>
          <div
            className={[
              styles['top-bar-right-content'],
              styles['top-bar-right-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['shopping-cart-container-details'],
                styles['shopping-cart-container-details-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
          </div>
        </div>
        <div
          className={[styles['content'], styles['content-tablet']].join(' ')}
        >
          <div
            className={[styles['side-bar'], styles['side-bar-tablet']].join(
              ' '
            )}
          >
            <div
              className={[
                styles['skeleton-tabs'],
                styles['skeleton-tabs-tablet'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 56, height: 56 }} borderRadius={6} />
              <Skeleton style={{ width: 56, height: 56 }} borderRadius={6} />
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-tablet'],
            ].join(' ')}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
