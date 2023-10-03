import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
  Address,
} from '@medusajs/medusa';
import styles from '../address-item.module.scss';
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
import { RoutePathsType } from '../../route-paths';
import AccountController from '../../controllers/account.controller';
import { AddressItemProps } from '../address-item.component';

export default function AddressItemMobileComponent({
  address,
  onEdit,
  onDelete,
}: AddressItemProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div
        className={[styles['container'], styles['container-mobile']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-mobile']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-mobile']].join(' ')}
            >
              {`${address.address_1}`}
              {address.address_2 ? ` ${address.address_2}, ` : ', '}
              {`${address.postal_code}, ${address.city}, `}
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </div>
            <div
              className={[styles['subtitle'], styles['subtitle-mobile']].join(
                ' '
              )}
            >
              {`${address.first_name} ${address.last_name}, ${address.phone}`}
              {address.company && `, ${address.company}`}
            </div>
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
              <div>
                <Button
                  block={true}
                  classNames={{
                    button: [styles['button'], styles['button-mobile']].join(
                      ' '
                    ),
                  }}
                  type={'text'}
                  rounded={true}
                  touchScreen={true}
                  size={'tiny'}
                  icon={<Line.Edit size={24} />}
                  onClick={onEdit}
                />
              </div>
              <div>
                <Button
                  block={true}
                  classNames={{
                    button: [styles['button'], styles['button-mobile']].join(
                      ' '
                    ),
                  }}
                  type={'text'}
                  rounded={true}
                  touchScreen={true}
                  size={'tiny'}
                  icon={<Line.Delete size={24} />}
                  onClick={onDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
