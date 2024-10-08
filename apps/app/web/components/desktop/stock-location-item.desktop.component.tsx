import { Line } from '@fuoco.appdev/web-components';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/stock-location-item.module.scss';
// @ts-ignore
import Ripples from 'react-ripples';
import { InventoryLocationType } from '../../../shared/models/explore.model';
import { ResponsiveDesktop } from '../responsive.component';
import { StockLocationItemResponsiveProps } from '../stock-location-item.component';

export default function StockLocationItemDesktopComponent({
  stockLocation,
  selected,
  placeName,
  description,
  avatar,
  hideDescription,
  onClick,
}: StockLocationItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[
            styles['ripples'],
            styles['ripples-desktop'],
            selected && styles['ripples-selected'],
          ].join(' ')}
          onClick={onClick}
        >
          <div
            className={[styles['container'], styles['container-desktop']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-desktop']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-desktop']].join(
                    ' '
                  )}
                >
                  {stockLocation.name}
                </div>
                <div
                  className={[
                    styles['location'],
                    styles['location-desktop'],
                  ].join(' ')}
                >
                  <Line.Place size={18} />
                  {Object.keys(stockLocation?.metadata ?? {}).includes(
                    'type'
                  ) && t(stockLocation?.metadata?.['type'] as string)}
                  &nbsp;
                  {placeName}
                </div>
                {!hideDescription &&
                  Object.keys(stockLocation?.metadata ?? {}).includes(
                    'description'
                  ) && (
                    <div
                      className={[
                        styles['description'],
                        styles['description-desktop'],
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
                  styles['right-details-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['thumbnail'],
                      styles['thumbnail-desktop'],
                    ].join(' ')}
                  >
                    {avatar && (
                      <img
                        className={[
                          styles['thumbnail-image'],
                          styles['thumbnail-image-desktop'],
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
                            styles['no-thumbnail-image-desktop'],
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
                            styles['no-thumbnail-image-desktop'],
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
    </ResponsiveDesktop>
  );
}
