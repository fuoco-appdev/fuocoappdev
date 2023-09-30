import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../home.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function HomeSuspenseDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div
        className={[
          styles['content-container'],
          styles['content-container-desktop'],
        ].join(' ')}
      >
        <Skeleton
          className={[
            styles['background-image'],
            styles['background-image-desktop'],
          ].join(' ')}
        />
      </div>
      <Skeleton
        className={[
          styles['map-container'],
          styles['map-container-desktop'],
        ].join(' ')}
      />
    </div>
  );
}
