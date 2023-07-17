import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
  Address,
} from '@medusajs/medusa';
import styles from './address-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import AccountController from '../controllers/account.controller';

export interface AddressItemProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

function AddressItemDesktopComponent({
  address,
}: AddressItemProps): JSX.Element {
  return <></>;
}

function AddressItemMobileComponent({
  address,
  onEdit,
  onDelete,
}: AddressItemProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles['root']}>
      <div className={styles['container-mobile']}>
        <div className={styles['details-mobile']}>
          <div className={styles['title-container-mobile']}>
            <div className={styles['title-mobile']}>
              {`${address.address_1}`}
              {address.address_2 ? ` ${address.address_2}, ` : ', '}
              {`${address.postal_code}, ${address.city}, `}
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </div>
            <div className={styles['subtitle-mobile']}>
              {`${address.first_name} ${address.last_name}, ${address.phone}`}
              {address.company && `, ${address.company}`}
            </div>
          </div>
          <div className={styles['right-details-container']}>
            <div className={styles['right-details-content']}>
              <div>
                <Button
                  block={true}
                  classNames={{
                    button: styles['edit-button'],
                  }}
                  type={'text'}
                  rounded={true}
                  size={'tiny'}
                  icon={<Line.Edit size={24} />}
                  onClick={onEdit}
                />
              </div>
              <div>
                <Button
                  block={true}
                  classNames={{
                    button: styles['remove-button'],
                  }}
                  type={'text'}
                  rounded={true}
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

export default function AddressItemComponent(
  props: AddressItemProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AddressItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AddressItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
