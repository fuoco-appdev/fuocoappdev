import { Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import styles from '../stock-location-item.module.scss';
// @ts-ignore
import Ripples from 'react-ripples';
import { InventoryLocationType } from '../../../models/explore.model';
import { ResponsiveMobile } from '../responsive.component';
import { StockLocationItemResponsiveProps } from '../stock-location-item.component';

export default function StockLocationItemMobileComponent({
  stockLocation,
  selected,
  hideDescription,
  placeName,
  description,
  avatar,
  onClick,
}: StockLocationItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[
            styles['ripples'],
            styles['ripples-mobile'],
            selected && styles['ripples-selected'],
          ].join(' ')}
          onClick={onClick}
        >
          <div
            className={[styles['container'], styles['container-mobile']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-mobile']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-mobile']].join(
                    ' '
                  )}
                >
                  {stockLocation.name}
                </div>
                <div
                  className={[
                    styles['location'],
                    styles['location-mobile'],
                  ].join(' ')}
                >
                  <Line.Place size={18} />
                  {Object.keys(stockLocation?.metadata ?? {}).includes(
                    'type'
                  ) && t(stockLocation?.metadata?.['type'] as string)}
                  &nbsp;
                  {Object.keys(stockLocation?.metadata ?? {}).includes(
                    'place_name'
                  ) && placeName}
                </div>
                {!hideDescription &&
                  Object.keys(stockLocation?.metadata ?? {}).includes(
                    'description'
                  ) && (
                    <div
                      className={[
                        styles['description'],
                        styles['description-mobile'],
                      ].join(' ')}
                    >
                      {description.slice(0, 60)}
                      ...
                    </div>
                  )}
              </div>
              <div
                className={[
                  styles['right-details-container'],
                  styles['right-details-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['thumbnail'],
                      styles['thumbnail-mobile'],
                    ].join(' ')}
                  >
                    {avatar && (
                      <img
                        className={[
                          styles['thumbnail-image'],
                          styles['thumbnail-image-mobile'],
                        ].join(' ')}
                        src={avatar}
                      />
                    )}
                    {!avatar &&
                      Object.keys(stockLocation?.metadata ?? {}).includes(
                        'type'
                      ) &&
                      (stockLocation?.metadata?.['type'] as string) ===
                      InventoryLocationType.Cellar && (
                        <img
                          className={[
                            styles['no-thumbnail-image'],
                            styles['no-thumbnail-image-mobile'],
                          ].join(' ')}
                          src={'../assets/images/selected-cellar.png'}
                        />
                      )}
                    {!avatar &&
                      Object.keys(stockLocation?.metadata ?? {}).includes(
                        'type'
                      ) &&
                      (stockLocation?.metadata?.['type'] as string) ===
                      InventoryLocationType.Restaurant && (
                        <img
                          className={[
                            styles['no-thumbnail-image'],
                            styles['no-thumbnail-image-mobile'],
                          ].join(' ')}
                          src={'../assets/images/selected-restaurant.png'}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Ripples>
      </div>
    </ResponsiveMobile>
  );
}
