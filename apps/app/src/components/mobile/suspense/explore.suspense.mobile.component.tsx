import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../explore.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function ExploreSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['logo-container'],
                  styles['logo-container-mobile'],
                ].join(' ')}
              >
                <img
                  className={[styles['logo'], styles['logo-mobile']].join(' ')}
                  src={'../assets/svg/logo.svg'}
                />
                <img
                  className={[
                    styles['logo-text'],
                    styles['logo-text-mobile'],
                  ].join(' ')}
                  src={'../assets/svg/logo-text-dark.svg'}
                />
              </div>
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['search-input-container-skeleton'],
                      styles['search-input-container-skeleton-mobile'],
                    ].join(' ')}
                    height={46}
                    borderRadius={46}
                  />
                </div>
              </div>
              {/* <div
                className={[
                  styles['tab-container'],
                  styles['tab-container-mobile'],
                ].join(' ')}
              >
                <Tabs
                  classNames={{
                    tabButton: styles['tab-button'],
                    selectedTabButton: styles['selected-tab-button'],
                    tabSliderPill: styles['tab-slider-pill'],
                  }}
                  removable={true}
                  type={'pills'}
                  activeId={storeProps.selectedTab}
                  onChange={(id: string) =>
                    StoreController.updateSelectedTabAsync(
                      id.length > 0 ? (id as ProductTabs) : undefined
                    )
                  }
                  tabs={[
                    {
                      id: ProductTabs.White,
                      label: t('white') ?? 'White',
                    },
                    {
                      id: ProductTabs.Red,
                      label: t('red') ?? 'Red',
                    },
                    {
                      id: ProductTabs.Rose,
                      label: t('rose') ?? 'Rosé',
                    },
                    {
                      id: ProductTabs.Spirits,
                      label: t('spirits') ?? 'Spirits',
                    },
                  ]}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-mobile'],
          ].join(' ')}
        ></div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
