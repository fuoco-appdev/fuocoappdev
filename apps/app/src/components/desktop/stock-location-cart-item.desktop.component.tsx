import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
} from '@medusajs/medusa';
import styles from '../stock-location-cart-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Line, Modal } from '@fuoco.appdev/core-ui';
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
import { StockLocationCartItemResponsiveProps } from '../stock-location-cart-item.component';

export default function StockLocationCartItemDesktopComponent({
  stockLocation,
  selected,
  avatar,
  cartCount,
  onClick,
}: StockLocationCartItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
                <Avatar
                  classNames={{
                    container: !avatar
                      ? [
                          styles['no-avatar-container'],
                          styles['no-avatar-container-desktop'],
                        ].join(' ')
                      : [
                          styles['avatar-container'],
                          styles['avatar-container-desktop'],
                        ].join(' '),
                  }}
                  size={'custom'}
                  text={stockLocation.name}
                  src={avatar}
                />
                <div
                  className={[
                    styles['title'],
                    styles['title-desktop'],
                    selected && styles['title-selected'],
                  ].join(' ')}
                >
                  {stockLocation.name}
                </div>
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
                  {cartCount !== undefined && cartCount > 0 && (
                    <div
                      className={[
                        styles['cart-number-container'],
                        styles['cart-number-container-desktop'],
                        selected && styles['cart-number-container-selected'],
                      ].join(' ')}
                    >
                      <span
                        className={[
                          styles['cart-number'],
                          styles['cart-number-desktop'],
                          selected && styles['cart-number-selected'],
                        ].join(' ')}
                      >
                        {cartCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Ripples>
      </div>
    </ResponsiveDesktop>
  );
}
