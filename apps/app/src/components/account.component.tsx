import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Typography,
  Button,
  IconDelete,
  IconEdit3,
  IconSave,
  Accordion,
  Input,
  InputPhoneNumber,
  Listbox,
  InputGeocoding,
  IconMail,
  IconBriefcase,
  IconGlobe,
  OptionProps,
  IconMapPin,
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
  const [show, setShow] = useState<boolean>(false);
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(props.updatedLanguage);
  }, [props.updatedLanguage]);

  useLayoutEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className={[
            styles['animated-content'],
            styles['animated-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[styles['content'], styles['content-desktop']].join(' ')}
            ref={containerRef}
          >
            <div className={styles['header-bar']}>
              <Typography.Title className={styles['account-title']} level={2}>
                {t('account')}
              </Typography.Title>
              <div className={styles['header-button-container']}>
                <Button
                  classNames={{
                    container: styles['header-button'],
                  }}
                  danger={true}
                  type={'primary'}
                  size={'tiny'}
                  onClick={() => AccountController.updateShowDeleteModal(true)}
                  icon={<IconDelete />}
                >
                  {t('deleteAccount')}
                </Button>
                {!props.isUpdatePasswordDisabled && (
                  <Button
                    classNames={{
                      container: styles['header-button'],
                    }}
                    type={'primary'}
                    size={'tiny'}
                    icon={<IconEdit3 />}
                    onClick={() => navigate(RoutePaths.ResetPassword)}
                  >
                    {t('updatePassword')}
                  </Button>
                )}
                <Button
                  classNames={{
                    container: styles['header-button'],
                  }}
                  type={'primary'}
                  size={'tiny'}
                  icon={<IconSave />}
                  disabled={props.isSaveDisabled}
                  onClick={async () => {
                    await AccountController.saveAsync();
                    WindowController.updateToasts([
                      {
                        key: `${Math.random()}`,
                        message: t('settingsSaved') ?? '',
                        description: t('savedDescription') ?? '',
                        type: 'success',
                        closable: true,
                      },
                    ]);
                  }}
                >
                  {t('save')}
                </Button>
              </div>
            </div>
            <Accordion
              className={[
                styles['accordion'],
                styles['accordion-desktop'],
              ].join(' ')}
              defaultActiveId={[
                t('profile') ?? '',
                t('personalInformation') ?? '',
              ]}
            >
              <Accordion.Item
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-desktop'],
                  ].join(' '),
                }}
                id={t('profile') ?? ''}
                label={t('profile') ?? ''}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {t('thisInfoWillBePublic')}
                </Typography.Text>
                <div
                  className={[
                    styles['info-container'],
                    styles['info-container-desktop'],
                  ].join(' ')}
                >
                  <Input
                    classNames={{
                      root: [
                        styles['info-input'],
                        styles['info-input-desktop'],
                      ].join(' '),
                    }}
                    label={t('company') ?? ''}
                    icon={
                      <IconBriefcase
                        stroke={companyIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setCompanyIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setCompanyIconLit(false);
                      }
                    }}
                    onFocus={() => setCompanyIconLit(true)}
                    onBlur={() => setCompanyIconLit(false)}
                    defaultValue={props.updatedCompany}
                    onChange={(event) =>
                      AccountController.updateCompany(event.currentTarget.value)
                    }
                  />
                </div>
              </Accordion.Item>
              <Accordion.Item
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-desktop'],
                  ].join(' '),
                }}
                id={t('personalInformation') ?? ''}
                label={t('personalInformation') ?? ''}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {t('thisInfoWillBePrivate')}
                </Typography.Text>
                <div
                  className={[
                    styles['info-container'],
                    styles['info-container-desktop'],
                  ].join(' ')}
                >
                  <Input
                    classNames={{
                      root: [
                        styles['info-input'],
                        styles['info-input-desktop'],
                      ].join(' '),
                    }}
                    label={t('emailAddress') ?? ''}
                    disabled={props.isEmailAddressDisabled}
                    icon={
                      <IconMail
                        stroke={emailAddressIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setEmailAddressIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setEmailAddressIconLit(false);
                      }
                    }}
                    onFocus={() => setEmailAddressIconLit(true)}
                    onBlur={() => setEmailAddressIconLit(false)}
                    defaultValue={props.updatedEmailAddress}
                    onChange={(event) =>
                      AccountController.updateEmailAddress(
                        event.currentTarget.value
                      )
                    }
                  />
                  <InputPhoneNumber
                    className={[
                      styles['info-input'],
                      styles['info-input-desktop'],
                    ].join(' ')}
                    label={t('phoneNumber') ?? ''}
                    country={'ca'}
                    parentRef={containerRef}
                    defaultValue={props.updatedPhoneNumber}
                    onChange={(value) =>
                      AccountController.updatePhoneNumber(value)
                    }
                  />
                  <InputGeocoding
                    className={[
                      styles['info-input'],
                      styles['info-input-desktop'],
                    ].join(' ')}
                    label={t('location') ?? ''}
                    parentRef={containerRef}
                    icon={
                      <IconMapPin
                        stroke={locationIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setLocationIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setLocationIconLit(false);
                      }
                    }}
                    onFocus={() => setLocationIconLit(true)}
                    onBlur={() => setLocationIconLit(false)}
                    defaultCoordinates={props.updatedLocation}
                    onLocationChanged={(value, data) =>
                      AccountController.updateLocation(value, data)
                    }
                    mapboxAccessToken={props.mapboxAccessToken}
                  />
                  <LanguageSwitch
                    language={i18n.language as LanguageCode}
                    label={t('language') ?? ''}
                    type={'listbox'}
                    supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                    parentRef={containerRef}
                    classNames={{
                      formLayout: {
                        root: [
                          styles['info-input'],
                          styles['info-input-desktop'],
                        ].join(' '),
                      },
                    }}
                    onChange={(code) => AccountController.updateLanguage(code)}
                  />
                </div>
              </Accordion.Item>
            </Accordion>
          </div>
        </animated.div>
      )
  );
}

function AccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(props.updatedLanguage);
  }, [props.updatedLanguage]);

  useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return transitions(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className={[
            styles['animated-content'],
            styles['animated-content-mobile'],
          ].join(' ')}
        >
          <div
            className={[styles['content'], styles['content-mobile']].join(' ')}
            ref={containerRef}
          >
            <div
              className={[
                styles['header-bar'],
                styles['header-bar-mobile'],
              ].join(' ')}
            >
              <Typography.Title
                className={[
                  styles['account-title'],
                  styles['account-title-mobile'],
                ].join(' ')}
                level={2}
              >
                {t('account')}
              </Typography.Title>
            </div>
            <Accordion
              className={[styles['accordion'], styles['accordion-mobile']].join(
                ' '
              )}
              defaultActiveId={[
                t('profile') ?? '',
                t('personalInformation') ?? '',
              ]}
            >
              <Accordion.Item
                id={t('profile') ?? ''}
                label={t('profile') ?? ''}
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-mobile'],
                  ].join(' '),
                }}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {t('thisInfoWillBePublic')}
                </Typography.Text>
                <div
                  className={[
                    styles['info-container'],
                    styles['info-container-mobile'],
                  ].join(' ')}
                >
                  <Input
                    classNames={{
                      root: [
                        styles['info-input'],
                        styles['info-input-mobile'],
                      ].join(' '),
                    }}
                    label={t('company') ?? ''}
                    icon={
                      <IconBriefcase
                        stroke={companyIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setCompanyIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setCompanyIconLit(false);
                      }
                    }}
                    onFocus={() => setCompanyIconLit(true)}
                    onBlur={() => setCompanyIconLit(false)}
                    defaultValue={props.updatedCompany}
                    onChange={(event) =>
                      AccountController.updateCompany(event.currentTarget.value)
                    }
                  />
                </div>
              </Accordion.Item>
              <Accordion.Item
                id={t('personalInformation') ?? ''}
                label={t('personalInformation') ?? ''}
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-mobile'],
                  ].join(' '),
                }}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {t('thisInfoWillBePrivate')}
                </Typography.Text>
                <div className={styles['info-container']}>
                  <Input
                    classNames={{
                      root: [
                        styles['info-input'],
                        styles['info-input-mobile'],
                      ].join(' '),
                    }}
                    label={t('emailAddress') ?? ''}
                    disabled={props.isEmailAddressDisabled}
                    icon={
                      <IconMail
                        stroke={emailAddressIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setEmailAddressIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setEmailAddressIconLit(false);
                      }
                    }}
                    onFocus={() => setEmailAddressIconLit(true)}
                    onBlur={() => setEmailAddressIconLit(false)}
                    defaultValue={props.updatedEmailAddress}
                    onChange={(event) =>
                      AccountController.updateEmailAddress(
                        event.currentTarget.value
                      )
                    }
                  />
                  <InputPhoneNumber
                    touchScreen={true}
                    className={[
                      styles['info-input'],
                      styles['info-input-mobile'],
                    ].join(' ')}
                    label={t('phoneNumber') ?? ''}
                    country={'ca'}
                    parentRef={containerRef}
                    defaultValue={props.updatedPhoneNumber}
                    onChange={(value) =>
                      AccountController.updatePhoneNumber(value)
                    }
                  />
                  <InputGeocoding
                    touchScreen={true}
                    className={[
                      styles['info-input'],
                      styles['info-input-mobile'],
                    ].join(' ')}
                    label={t('location') ?? ''}
                    parentRef={containerRef}
                    icon={
                      <IconMapPin
                        stroke={locationIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    onMouseEnter={() => setLocationIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setLocationIconLit(false);
                      }
                    }}
                    onFocus={() => setLocationIconLit(true)}
                    onBlur={() => setLocationIconLit(false)}
                    defaultCoordinates={props.updatedLocation}
                    onLocationChanged={(value, data) =>
                      AccountController.updateLocation(value, data)
                    }
                    mapboxAccessToken={props.mapboxAccessToken}
                  />
                  <LanguageSwitch
                    language={i18n.language as LanguageCode}
                    label={t('language') ?? ''}
                    type={'listbox'}
                    touchScreen={true}
                    supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                    parentRef={containerRef}
                    classNames={{
                      formLayout: {
                        root: [
                          styles['info-input'],
                          styles['info-input-mobile'],
                        ].join(' '),
                      },
                    }}
                    onChange={(code) => AccountController.updateLanguage(code)}
                  />
                </div>
              </Accordion.Item>
            </Accordion>
            <div className={styles['button-container-mobile']}>
              <Button
                classNames={{
                  container: styles['header-button'],
                }}
                block={true}
                danger={true}
                type={'primary'}
                size={'large'}
                onClick={() => AccountController.updateShowDeleteModal(true)}
              >
                <span className={styles['button-text']}>
                  {t('deleteAccount')}
                </span>
              </Button>
              {!props.isUpdatePasswordDisabled && (
                <Button
                  classNames={{
                    container: styles['header-button'],
                  }}
                  block={true}
                  type={'primary'}
                  size={'large'}
                  onClick={() => navigate(RoutePaths.ResetPassword)}
                >
                  <span className={styles['button-text']}>
                    {t('updatePassword')}
                  </span>
                </Button>
              )}
              <Button
                classNames={{
                  container: styles['header-button'],
                }}
                block={true}
                type={'primary'}
                size={'large'}
                disabled={props.isSaveDisabled}
                onClick={() => AccountController.saveAsync()}
              >
                <span className={styles['button-text']}>{t('save')}</span>
              </Button>
            </div>
          </div>
        </animated.div>
      )
  );
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
