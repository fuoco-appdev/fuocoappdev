import { Line } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import styles from '../stock-location-item.module.scss';
// @ts-ignore
import Ripples from 'react-ripples';
import { InventoryLocationType } from '../../models/explore.model';
import { ResponsiveTablet } from '../responsive.component';
import { StockLocationItemResponsiveProps } from '../stock-location-item.component';

export default function StockLocationItemTabletComponent({
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
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[
            styles['ripples'],
            styles['ripples-tablet'],
            selected && styles['ripples-selected'],
          ].join(' ')}
          onClick={onClick}
        >
          <div
            className={[styles['container'], styles['container-tablet']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-tablet']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-tablet']].join(
                    ' '
                  )}
                >
                  {stockLocation.name}
                </div>
                <div
                  className={[
                    styles['location'],
                    styles['location-tablet'],
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
                        styles['description-tablet'],
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
                  styles['right-details-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['thumbnail'],
                      styles['thumbnail-tablet'],
                    ].join(' ')}
                  >
                    {avatar && (
                      <img
                        className={[
                          styles['thumbnail-image'],
                          styles['thumbnail-image-tablet'],
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
                            styles['no-thumbnail-image-tablet'],
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
                            styles['no-thumbnail-image-tablet'],
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
    </ResponsiveTablet>
  );
}
