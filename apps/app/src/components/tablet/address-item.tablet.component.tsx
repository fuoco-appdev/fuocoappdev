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
