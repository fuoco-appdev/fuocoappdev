import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
} from '@medusajs/medusa';
import styles from '../stock-location-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop } from '../responsive.component';
import { StockLocationItemResponsiveProps } from '../stock-location-item.component';
import { InventoryLocationType } from 'src/models/explore.model';

export default function StockLocationItemDesktopComponent({
  stockLocation,
  avatar,
  onClick,
}: StockLocationItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[styles['ripples'], styles['ripples-desktop']].join(' ')}
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
                  {Object.keys(stockLocation?.metadata ?? {}).includes(
                    'place_name'
                  ) && (stockLocation?.metadata?.['place_name'] as string)}
                </div>
                {Object.keys(stockLocation?.metadata ?? {}).includes(
                  'description'
                ) && (
                  <div
                    className={[
                      styles['description'],
                      styles['description-desktop'],
                    ].join(' ')}
                  >
                    {(stockLocation?.metadata?.['description'] as string).slice(
                      0,
                      60
                    )}
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
                    {Object.keys(stockLocation?.metadata ?? {}).includes(
                      'type'
                    ) &&
                      (stockLocation?.metadata?.['type'] as string) ===
                        InventoryLocationType.Cellar && (
                        <img
                          className={[
                            styles['thumbnail-image'],
                            styles['thumbnail-image-desktop'],
                          ].join(' ')}
                          src={avatar || '../assets/images/selected-cellar.png'}
                        />
                      )}
                    {Object.keys(stockLocation?.metadata ?? {}).includes(
                      'type'
                    ) &&
                      (stockLocation?.metadata?.['type'] as string) ===
                        InventoryLocationType.Restaurant && (
                        <img
                          className={[
                            styles['thumbnail-image'],
                            styles['thumbnail-image-desktop'],
                          ].join(' ')}
                          src={
                            avatar || '../assets/images/selected-restaurant.png'
                          }
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
