import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Typography,
  Button,
  Accordion,
  Input,
  InputPhoneNumber,
  Listbox,
  InputGeocoding,
  OptionProps,
  Modal,
  LanguageSwitch,
  LanguageCode,
} from '@fuoco.appdev/core-ui';
import styles from './account.module.scss';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';

function AccountDesktopComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const navigate = useNavigate();
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(props.updatedLanguage);
  }, [props.updatedLanguage]);

  return <></>;
}

function AccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const navigate = useNavigate();
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(props.updatedLanguage);
  }, [props.updatedLanguage]);

  return <></>;
}

export default function AccountComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t } = useTranslation();

  return (
    <div className={styles['root']}>
      <ResponsiveDesktop>
        <AccountDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountMobileComponent />
      </ResponsiveMobile>
      <Modal
        title={t('deleteYourAccount') ?? ''}
        description={t('deleteYourAccountDescription') ?? ''}
        confirmText={t('delete') ?? ''}
        cancelText={t('cancel') ?? ''}
        variant={'danger'}
        size={'small'}
        classNames={{
          modal: styles['delete-modal'],
        }}
        visible={props.showDeleteModal}
        onCancel={() => AccountController.updateShowDeleteModal(false)}
        onConfirm={() => {
          AccountController.deleteAsync();
          AccountController.updateShowDeleteModal(false);
        }}
      ></Modal>
    </div>
  );
}
