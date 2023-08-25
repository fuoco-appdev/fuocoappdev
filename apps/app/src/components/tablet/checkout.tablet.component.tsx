import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import styles from './checkout.module.scss';
import {
  Button,
  Checkbox,
  OptionProps,
  Line,
  Radio,
  Input,
  Solid,
  Dropdown,
  FormLayout,
} from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import CheckoutController from '../../controllers/checkout.controller';
import AddressFormComponent, {
  AddressFormErrors,
  AddressFormValues,
} from '../address-form.component';
import { RadioProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/radio/radio';
import StoreController from '../../controllers/store.controller';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { ProviderType, ShippingType } from '../../models/checkout.model';
import CartController from '../../controllers/cart.controller';
import {
  Discount,
  GiftCard,
  PaymentSession,
  Customer,
  Cart,
} from '@medusajs/medusa';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../route-paths';
import WindowController from '../../controllers/window.controller';
import AccountController from '../../controllers/account.controller';
import {
  Elements,
  useElements,
  useStripe,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import SecretsService from '../../services/secrets.service';
