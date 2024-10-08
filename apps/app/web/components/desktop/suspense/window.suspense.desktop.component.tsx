import { Typography } from '@fuoco.appdev/web-components';
import Skeleton from 'react-loading-skeleton';
import { Outlet } from 'react-router-dom';
import styles from '../../../modules/window.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function WindowSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['top-bar-left-content'],
              styles['top-bar-left-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-desktop'],
              ].join(' ')}
            >
              <img src={'../assets/svg/logo.svg'} />
              <Typography.Title
                className={[
                  styles['logo-title'],
                  styles['logo-title-desktop'],
                ].join(' ')}
                level={3}
              >
                fuoco.appdev
              </Typography.Title>
            </div>
          </div>
          <div
            className={[
              styles['top-bar-right-content'],
              styles['top-bar-right-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['shopping-cart-container-details'],
                styles['shopping-cart-container-details-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 49, height: 49 }} borderRadius={49} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 49, height: 49 }} borderRadius={49} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 49, height: 49 }} borderRadius={49} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 49, height: 49 }} borderRadius={49} />
            </div>
            <div
              className={[
                styles['top-bar-button-container'],
                styles['top-bar-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 49, height: 49 }} borderRadius={49} />
            </div>
          </div>
        </div>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          <div
            className={[
              styles['right-content'],
              styles['right-content-desktop'],
            ].join(' ')}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
