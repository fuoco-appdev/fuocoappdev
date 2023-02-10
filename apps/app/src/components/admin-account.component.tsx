import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  OptionProps,
  IconSave,
  Accordion,
  Input,
  IconMail,
  Listbox,
  IconGlobe,
} from '@fuoco.appdev/core-ui';
import styles from './admin-account.module.scss';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import AdminAccountController from '../controllers/admin-account.controller';
import { useTranslation } from 'react-i18next';

export default function AdminAccountComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const [emailAddressIconLit, setEmailAddressIconLit] =
    useState<boolean>(false);
  const [languageIconLit, setLanguageIconLit] = useState<boolean>(false);
  const [defaultLanguageIndex, setDefaultLanguageIndex] = useState<number>(0);
  const [props] = useObservable(AdminAccountController.model.store);
  const { t, i18n } = useTranslation();
  const languageOptions: OptionProps[] = [];
  const languages: Record<string, string> = {};
  for (const language of i18n.languages) {
    languageOptions.push({
      value: t('locale'),
      children: () => (
        <span className={styles['dropdown-label']}>{t('locale')}</span>
      ),
    });
    languages[t('locale')] = language;
  }

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    };
  }, []);

  useEffect(() => {
    languageOptions.forEach((option: OptionProps, index: number) => {
      if (option.value === props.updatedLanguage) {
        i18n.changeLanguage(languages[option.value]);
        setDefaultLanguageIndex(index);
      }
    });
  }, [props.updatedLanguage]);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return (
    <div className={styles['root']}>
      {transitions(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles['animated-content']}>
              <div className={styles['content']}>
                <div className={styles['header-bar']}>
                  <Typography.Title
                    className={styles['account-title']}
                    level={2}
                  >
                    {t('adminAccount')}
                  </Typography.Title>
                  <div className={styles['header-button-container']}>
                    <Button
                      classNames={{
                        container: styles['header-button'],
                      }}
                      type={'primary'}
                      size={'tiny'}
                      icon={<IconSave />}
                      disabled={props.isSaveDisabled}
                      onClick={() => AdminAccountController.saveAsync()}
                    >
                      <span className={styles['button-text']}>{t('save')}</span>
                    </Button>
                  </div>
                </div>
                <Accordion
                  className={styles['accordion']}
                  defaultActiveId={[
                    t('profile') ?? '',
                    t('personalInformation') ?? '',
                  ]}
                >
                  <Accordion.Item
                    id={t('personalInformation') ?? ''}
                    label={t('personalInformation')}
                  >
                    <Typography.Text
                      className={styles['accordion-description']}
                    >
                      {t('thisInfoWillBePrivate')}
                    </Typography.Text>
                    <div className={styles['info-container']}>
                      <Input
                        classNames={{
                          root: styles['info-input'],
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
                          AdminAccountController.updateEmailAddress(
                            event.currentTarget.value
                          )
                        }
                      />
                      <Listbox
                        classNames={{
                          formLayout: {
                            root: styles['info-input'],
                          },
                        }}
                        icon={
                          <IconGlobe
                            stroke={languageIconLit ? '#4AFFFF' : '#d1d5db'}
                          />
                        }
                        label={t('language') ?? ''}
                        options={languageOptions}
                        onChange={(index, id, value) =>
                          AdminAccountController.updateLanguage(value)
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
      )}
    </div>
  );
}
