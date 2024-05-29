import Skeleton from 'react-loading-skeleton';
import styles from '../../explore.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { StockLocationItemSuspenseDesktopComponent } from './stock-location-item.suspense.desktop.component';

export function ExploreSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['search-root'],
            styles['search-root-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['search-input-container-skeleton'],
                      styles['search-input-container-skeleton-desktop'],
                    ].join(' ')}
                    height={46}
                    borderRadius={46}
                  />
                </div>
              </div>
              {/* <div
                className={[
                  styles['tab-container'],
                  styles['tab-container-desktop'],
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
          <div
            className={[
              styles['scroll-content'],
              styles['scroll-content-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => {
              return <StockLocationItemSuspenseDesktopComponent />;
            })}
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-desktop'],
          ].join(' ')}
        ></div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
