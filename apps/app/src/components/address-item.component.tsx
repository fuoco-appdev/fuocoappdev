import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
  Address,
} from '@medusajs/medusa';
import styles from './order-item.module.scss';
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

export interface AddressItemProps {
  address: Address;
}

function AddressItemDesktopComponent({
  address,
}: AddressItemProps): JSX.Element {
  return <></>;
}

function AddressItemMobileComponent({
  address,
}: AddressItemProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles['root']}>
      <div className={styles['container-mobile']}>
        <div className={styles['details-mobile']}>
          <div className={styles['title-container-mobile']}>
            <div className={styles['title-mobile']}></div>
          </div>
          <div className={styles['right-details-container']}>
            <div className={styles['right-details-content']}></div>
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
