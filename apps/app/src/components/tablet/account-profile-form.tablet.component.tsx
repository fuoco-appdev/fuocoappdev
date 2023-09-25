import {
  useEffect,
  useLayoutEffect,
  useRef,
  ChangeEvent,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-profile-form.module.scss';
import { Alert, Input, InputPhoneNumber } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import StoreController from '../../controllers/store.controller';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { AccountProfileFormResponsiveProps } from '../account-profile-form.component';

export function AccountProfileFormTabletComponent({
  values,
  errors,
  onChangeCallbacks,
}: AccountProfileFormResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return <></>;
}
