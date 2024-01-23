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
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import { StockLocationItemResponsiveProps } from '../stock-location-item.component';
import { InventoryLocationType } from 'src/models/explore.model';

export default function StockLocationItemMobileComponent({
  stockLocation,
  avatar,
  onClick,
}: StockLocationItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[styles['ripples'], styles['ripples-mobile']].join(' ')}
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
                  ) && (stockLocation?.metadata?.['place_name'] as string)}
                </div>
                {Object.keys(stockLocation?.metadata ?? {}).includes(
                  'description'
                ) && (
                  <div
                    className={[
                      styles['description'],
                      styles['description-mobile'],
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
                    {Object.keys(stockLocation?.metadata ?? {}).includes(
                      'type'
                    ) &&
                      (stockLocation?.metadata?.['type'] as string) ===
                        InventoryLocationType.Cellar && (
                        <img
                          className={[
                            styles['thumbnail-image'],
                            styles['thumbnail-image-mobile'],
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
                            styles['thumbnail-image-mobile'],
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
    </ResponsiveMobile>
  );
}
