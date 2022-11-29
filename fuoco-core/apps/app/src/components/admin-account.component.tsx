import React, {useEffect, useState} from 'react';
import {Typography, Button, OptionProps, IconSave, Accordion, Input, IconMail, Listbox, IconGlobe} from '@fuoco.appdev/core-ui';
import styles from './admin-account.module.scss';
import { Strings } from '../localization';
import {animated, useTransition, config} from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import AdminAccountController from '../controllers/admin-account.controller';

export default function AdminAccountComponent(): JSX.Element {
    const listboxRef = React.createRef<HTMLUListElement>();
    const [show, setShow] = useState(false);
    const [emailAddressIconLit, setEmailAddressIconLit] = useState<boolean>(false);
    const [languageIconLit, setLanguageIconLit] = useState<boolean>(false);
    const [defaultLanguageIndex, setDefaultLanguageIndex] = useState<number>(0);
    const [props] = useObservable(AdminAccountController.model.store);
    const languageOptions: OptionProps[] = [];
    const languages: Record<string, string> = {};
    for (const language of Strings.getAvailableLanguages()) {
      Strings.setLanguage(language);
      languageOptions.push({
        parentRef: listboxRef,
        value: Strings.locale,
        children: () => <span className={styles['dropdown-label']}>{Strings.locale}</span>,
      });
      languages[Strings.locale] = language;
    }
  
    useEffect(() => {
      setShow(true);
  
      return () => {
        setShow(false);
      }
    }, [])

    useEffect(() => {
      languageOptions.forEach((option: OptionProps, index: number) => {
        if (option.value === props.updatedLanguage) {
          Strings.setLanguage(languages[option.value]);
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
      <div className={styles["root"]}>
          {transitions((style, item) => item && (
          <animated.div style={style} className={styles["animated-content"]}>
            <div className={styles['content']}>
              <div className={styles["header-bar"]}>
                <Typography.Title className={styles["account-title"]} level={2}>{Strings.account}</Typography.Title>
                <div className={styles["header-button-container"]}>
                  <Button 
                    className={styles['header-button']} 
                    type={'primary'} 
                    size={'tiny'} 
                    icon={<IconSave />}
                    disabled={props.isSaveDisabled}
                    onClick={() => AdminAccountController.saveAsync()}
                  >
                    <span className={styles['button-text']}>
                      {Strings.save}
                    </span>
                  </Button>
                </div>
              </div>
              <Accordion className={styles['accordion']} defaultActiveId={[Strings.profile, Strings.personalInformation]}>
                <Accordion.Item id={Strings.personalInformation} label={Strings.personalInformation}>
                  <Typography.Text className={styles['accordion-description']}>{Strings.thisInfoWillBePrivate}</Typography.Text>
                  <div className={styles['info-container']}>
                    <Input 
                      className={styles['info-input']} 
                      label={Strings.emailAddress}
                      disabled={props.isEmailAddressDisabled}
                      icon={<IconMail stroke={emailAddressIconLit ? '#4AFFFF' : '#d1d5db'}/>}
                      onMouseEnter={() => setEmailAddressIconLit(true)}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.currentTarget) {
                          setEmailAddressIconLit(false)
                        }
                      }}
                      onFocus={() => setEmailAddressIconLit(true)}
                      onBlur={() => setEmailAddressIconLit(false)}
                      defaultValue={props.updatedEmailAddress}
                      onChange={(event) => AdminAccountController.updateEmailAddress(event.currentTarget.value)}
                    />
                    <Listbox 
                      className={styles['info-input']}
                      ref={listboxRef}
                      icon={<IconGlobe stroke={languageIconLit ? '#4AFFFF' : '#d1d5db'} />}
                      label={Strings.language}
                      options={languageOptions}
                      onChange={(value) => AdminAccountController.updateLanguage(value)}
                      onMouseEnter={() => setLanguageIconLit(true)}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.currentTarget) {
                          setLanguageIconLit(false)
                        }
                      }}
                      onFocus={() => setLanguageIconLit(true)}
                      onBlur={() => setLanguageIconLit(false)}
                      defaultIndex={defaultLanguageIndex}/>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </animated.div>
        ))}
      </div>
    );
  }