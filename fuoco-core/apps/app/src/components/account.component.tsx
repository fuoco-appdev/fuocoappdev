import React, {useEffect, useRef, useState} from 'react';
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
  IconBriefcase
} from '@fuoco.appdev/core-ui';
import styles from './account.module.scss';
import { Strings } from '../localization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import {animated, useTransition, config} from 'react-spring';

export default function AccountComponent(): JSX.Element {
    const [show, setShow] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      setShow(true);
  
      return () => {
        setShow(false);
      }
    }, [])
  
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
                  <Button className={styles['header-button']} danger={true} type={'primary'} size={'tiny'} icon={<IconDelete />} ><span className={styles['button-text']}>{Strings.deleteAccount}</span></Button>
                  <Button className={styles['header-button']} type={'primary'} size={'tiny'} icon={<IconEdit3 />} ><span className={styles['button-text']}>{Strings.updatePassword}</span></Button>
                  <Button className={styles['header-button']} type={'primary'} size={'tiny'} icon={<IconSave />} ><span className={styles['button-text']}>{Strings.save}</span></Button>
                </div>
              </div>
              <Accordion className={styles['accordion']} defaultActiveId={[Strings.profile, Strings.personalInformation]}>
                <Accordion.Item id={Strings.profile} label={Strings.profile}>
                  <Typography.Text>{Strings.thisInfoWillBePublic}</Typography.Text>
                  <div className={styles['info-container']}>
                    <Input className={styles['info-input']} label={Strings.company} icon={<IconBriefcase />}/>
                  </div>
                </Accordion.Item>
                <Accordion.Item id={Strings.personalInformation} label={Strings.personalInformation}>
                  <Typography.Text>{Strings.thisInfoWillBePrivate}</Typography.Text>
                  <div className={styles['info-container']} ref={containerRef}>
                    <Input className={styles['info-input']} label={Strings.emailAddress} icon={<IconMail />}/>
                    <InputPhoneNumber className={styles['info-input']} label={Strings.phoneNumber} country={'ca'} parentRef={containerRef} />
                    <InputGeocoding 
                      className={styles['info-input']} 
                      label={Strings.location}
                      parentRef={containerRef}
                      mapboxAccessToken={'pk.eyJ1IjoibHVjYXNmdW9jbyIsImEiOiJjbGFjeWl5YWMwM2MyM3ZueW5xNnRnbWFiIn0.SKWlyHhXNfAwdTLqfIdLYQ'}/>
                    <Listbox className={styles['info-input']} label={Strings.language} defaultValue={'test'} value={'test'}>
                      <Listbox.Option label={'test'} value={'test'} >Test</Listbox.Option>
                      <Listbox.Option label={'test2'} value={'test2'} >Test2</Listbox.Option>
                    </Listbox>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </animated.div>
        ))}
      </div>
    );
  }