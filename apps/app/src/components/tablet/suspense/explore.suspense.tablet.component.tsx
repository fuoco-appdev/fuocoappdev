import Skeleton from 'react-loading-skeleton';
import styles from '../../explore.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import { StockLocationItemSuspenseTabletComponent } from './stock-location-item.suspense.tablet.component';

export function ExploreSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['search-input-container-skeleton'],
                      styles['search-input-container-skeleton-tablet'],
                    ].join(' ')}
                    height={46}
                    borderRadius={46}
                  />
                </div>
              </div>
              {/* <div
                className={[
                  styles['tab-container'],
                  styles['tab-container-tablet'],
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
              styles['scroll-container'],
              styles['scroll-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => {
              return <StockLocationItemSuspenseTabletComponent />;
            })}
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-tablet'],
          ].join(' ')}
        ></div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
