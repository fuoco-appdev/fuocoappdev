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
import * as core from '../protobuf/core_pb';
import AccountProfileFormComponent from './account-profile-form.component';

function AccountDesktopComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  return <></>;
}

function AccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AccountController.updateErrorStrings({
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  const account = props.account as core.Account;
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
      {account?.status === 'Incomplete' && (
        <div className={styles['incomplete-profile-container']}>
          <div className={styles['complete-profile-title']}>
            {t('completeProfile')}
          </div>
          <div className={styles['form-container']}>
            <AccountProfileFormComponent
              values={props.profileForm}
              errors={props.profileFormErrors}
              onChangeCallbacks={{
                firstName: (event) =>
                  AccountController.updateProfile({
                    firstName: event.target.value,
                  }),
                lastName: (event) =>
                  AccountController.updateProfile({
                    lastName: event.target.value,
                  }),
                phoneNumber: (value, event, formattedValue) =>
                  AccountController.updateProfile({
                    phoneNumber: value,
                  }),
              }}
            />
          </div>
          <div>
            <Button
              classNames={{
                container: styles['submit-button-container'],
                button: styles['submit-button'],
              }}
              block={true}
              size={'large'}
              icon={<Line.Done size={24} />}
              onClick={() => {
                AccountController.updateProfileErrors({
                  firstName: undefined,
                  lastName: undefined,
                  phoneNumber: undefined,
                });
                const errors = AccountController.getProfileFormErrors(
                  props.profileForm
                );
                if (errors) {
                  AccountController.updateProfileErrors(errors);
                  return;
                }
                AccountController.completeProfileAsync();
              }}
            >
              {t('complete')}
            </Button>
          </div>
        </div>
      )}
      {account?.status === 'Complete' && (
        <>
          <div className={styles['avatar-container']}>
            <Avatar editMode={true} size={'large'} />
          </div>
        </>
      )}
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
