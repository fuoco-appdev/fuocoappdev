import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import styles from '../order-confirmed.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { LineItem, ShippingMethod, ReturnReason } from '@medusajs/medusa';
import OrderConfirmedController from '../../controllers/order-confirmed.controller';
import StoreController from '../../controllers/store.controller';
import { useParams } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import ShippingItemComponent from '../shipping-item.component';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { Button, Dropdown, OptionProps } from '@fuoco.appdev/core-ui';
import RefundItemComponent from '../refund-item.component';
import { RefundItem } from '../../models/order-confirmed.model';
import WindowController from '../../controllers/window.controller';

export function OrderConfirmedDesktopComponent(): JSX.Element {
  return <div></div>;
}
