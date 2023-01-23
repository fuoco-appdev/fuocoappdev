import React, { useEffect, useState } from 'react';
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
} from '@fuoco.appdev/core-ui';
import styles from './account.module.scss';
import { Strings } from '../strings';
import AccountController from '../controllers/account.controller';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function AccountDesktopComponent({
  languageOptions,
  defaultLanguageIndex,
}: {
  languageOptions: OptionProps[];
  defaultLanguageIndex: number;
}): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const [languageIconLit, setLanguageIconLit] = useState<boolean>(false);

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
            styles['animated-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[styles['content'], styles['content-desktop']].join(' ')}
            ref={containerRef}
          >
            <div className={styles['header-bar']}>
              <Typography.Title className={styles['account-title']} level={2}>
                {Strings.account}
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
                  {Strings.deleteAccount}
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
                    {Strings.updatePassword}
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
                  onClick={() => AccountController.saveAsync()}
                >
                  {Strings.save}
                </Button>
              </div>
            </div>
            <Accordion
              className={[
                styles['accordion'],
                styles['accordion-desktop'],
              ].join(' ')}
              defaultActiveId={[Strings.profile, Strings.personalInformation]}
            >
              <Accordion.Item
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-desktop'],
                  ].join(' '),
                }}
                id={Strings.profile}
                label={Strings.profile}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {Strings.thisInfoWillBePublic}
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
                    label={Strings.company}
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
                id={Strings.personalInformation}
                label={Strings.personalInformation}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {Strings.thisInfoWillBePrivate}
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
                    label={Strings.emailAddress}
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
                    label={Strings.phoneNumber}
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
                    label={Strings.location}
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
                    mapboxAccessToken={
                      'pk.eyJ1IjoibHVjYXNmdW9jbyIsImEiOiJjbGFjeWl5YWMwM2MyM3ZueW5xNnRnbWFiIn0.SKWlyHhXNfAwdTLqfIdLYQ'
                    }
                  />
                  <Listbox
                    classNames={{
                      formLayout: {
                        root: [
                          styles['info-input'],
                          styles['info-input-desktop'],
                        ].join(' '),
                      },
                    }}
                    icon={
                      <IconGlobe
                        stroke={languageIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    label={Strings.language}
                    options={languageOptions}
                    onChange={(index, id, value) =>
                      AccountController.updateLanguage(value)
                    }
                    onMouseEnter={() => setLanguageIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setLanguageIconLit(false);
                      }
                    }}
                    onFocus={() => setLanguageIconLit(true)}
                    onBlur={() => setLanguageIconLit(false)}
                    defaultIndex={defaultLanguageIndex}
                  />
                </div>
              </Accordion.Item>
            </Accordion>
          </div>
        </animated.div>
      )
  );
}

function AccountMobileComponent({
  languageOptions,
  defaultLanguageIndex,
}: {
  languageOptions: OptionProps[];
  defaultLanguageIndex: number;
}): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const containerRef = React.createRef<HTMLDivElement>();
  const [companyIconLit, setCompanyIconLit] = useState<boolean>(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [locationIconLit, setLocationIconLit] = useState<boolean>(false);
  const [languageIconLit, setLanguageIconLit] = useState<boolean>(false);

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
                {Strings.account}
              </Typography.Title>
            </div>
            <Accordion
              className={[styles['accordion'], styles['accordion-mobile']].join(
                ' '
              )}
              defaultActiveId={[Strings.profile, Strings.personalInformation]}
            >
              <Accordion.Item
                id={Strings.profile}
                label={Strings.profile}
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-mobile'],
                  ].join(' '),
                }}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {Strings.thisInfoWillBePublic}
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
                    label={Strings.company}
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
                id={Strings.personalInformation}
                label={Strings.personalInformation}
                classNames={{
                  panel: [
                    styles['accordion-item'],
                    styles['accordion-item-mobile'],
                  ].join(' '),
                }}
              >
                <Typography.Text className={styles['accordion-description']}>
                  {Strings.thisInfoWillBePrivate}
                </Typography.Text>
                <div className={styles['info-container']}>
                  <Input
                    classNames={{
                      root: [
                        styles['info-input'],
                        styles['info-input-mobile'],
                      ].join(' '),
                    }}
                    label={Strings.emailAddress}
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
                    label={Strings.phoneNumber}
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
                    label={Strings.location}
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
                    mapboxAccessToken={
                      'pk.eyJ1IjoibHVjYXNmdW9jbyIsImEiOiJjbGFjeWl5YWMwM2MyM3ZueW5xNnRnbWFiIn0.SKWlyHhXNfAwdTLqfIdLYQ'
                    }
                  />
                  <Listbox
                    touchScreen={true}
                    classNames={{
                      formLayout: {
                        root: [
                          styles['info-input'],
                          styles['info-input-mobile'],
                        ].join(' '),
                      },
                    }}
                    icon={
                      <IconGlobe
                        stroke={languageIconLit ? '#4AFFFF' : '#d1d5db'}
                      />
                    }
                    label={Strings.language}
                    options={languageOptions}
                    onChange={(index, id, value) =>
                      AccountController.updateLanguage(value)
                    }
                    onMouseEnter={() => setLanguageIconLit(true)}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        setLanguageIconLit(false);
                      }
                    }}
                    onFocus={() => setLanguageIconLit(true)}
                    onBlur={() => setLanguageIconLit(false)}
                    defaultIndex={defaultLanguageIndex}
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
                  {Strings.deleteAccount}
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
                    {Strings.updatePassword}
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
                <span className={styles['button-text']}>{Strings.save}</span>
              </Button>
            </div>
          </div>
        </animated.div>
      )
  );
}

export default function AccountComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const [defaultLanguageIndex, setDefaultLanguageIndex] = useState<number>(0);
  const languageOptions: OptionProps[] = [];
  const languages: Record<string, string> = {};
  for (const language of Strings.getAvailableLanguages()) {
    Strings.setLanguage(language);
    languageOptions.push({
      value: Strings.locale,
      children: () => (
        <span className={styles['dropdown-label']}>{Strings.locale}</span>
      ),
    });
    languages[Strings.locale] = language;
  }

  useEffect(() => {
    languageOptions.forEach((option: OptionProps, index: number) => {
      if (option.value === props.updatedLanguage) {
        Strings.setLanguage(languages[option.value]);
        setDefaultLanguageIndex(index);
      }
    });
  }, [props.updatedLanguage]);

  return (
    <div className={styles['root']}>
      <ResponsiveDesktop>
        <AccountDesktopComponent
          languageOptions={languageOptions}
          defaultLanguageIndex={defaultLanguageIndex}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountMobileComponent
          languageOptions={languageOptions}
          defaultLanguageIndex={defaultLanguageIndex}
        />
      </ResponsiveMobile>
      <Modal
        title={Strings.deleteYourAccount}
        description={Strings.deleteYourAccountDescription}
        confirmText={Strings.delete}
        cancelText={Strings.cancel}
        variant={'danger'}
        size={'small'}
        classNames={{
          modal: styles['delete-modal'],
        }}
        visible={props.showDeleteModal}
        onCancel={() => AccountController.updateShowDeleteModal(false)}
        onConfirm={() => {
          AccountController.deleteAsync();
          navigate(RoutePaths.Signin);
        }}
      ></Modal>
    </div>
  );
}
