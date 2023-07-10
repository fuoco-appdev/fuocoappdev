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
  Line,
  Avatar,
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
  const { t, i18n } = useTranslation();

  return <></>;
}

function AccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles['root-mobile']}>
      <div className={styles['top-bar-mobile']}>
        <div className={styles['left-tab-container']}></div>
        <div className={styles['right-tab-container']}>
          <div className={styles['tab-button-container']}>
            <Button
              rippleProps={{
                color: 'rgba(88, 40, 109, .35)',
              }}
              onClick={() => console.log('')}
              type={'text'}
              rounded={true}
              size={'tiny'}
              touchScreen={true}
              icon={<Line.Settings size={24} color={'#2A2A5F'} />}
            />
          </div>
        </div>
      </div>
      <div className={styles['avatar-container']}>
        <Avatar editMode={true} size={'large'} />
      </div>
    </div>
  );
}

export default function AccountComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t } = useTranslation();

  return (
    <>
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
        onCancel={() => console.log('cancel')}
        onConfirm={() => {
          AccountController.deleteAsync();
        }}
      ></Modal>
    </>
  );
}
