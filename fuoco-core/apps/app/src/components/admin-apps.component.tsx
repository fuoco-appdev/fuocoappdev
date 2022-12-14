import React, { useEffect, useState } from 'react';
import { Typography, Button, IconPlus } from '@fuoco.appdev/core-ui';
import styles from './admin-apps.module.scss';
import { Strings } from '../localization';
import { animated, useTransition, config } from 'react-spring';
import AdminAppsController from '../controllers/admin-apps.controller';
import BucketService, { BucketType } from '../services/bucket.service';
import { useObservable } from '@ngneat/use-observable';
import AppCardComponent from './app-card.component';
import * as core from '../protobuf/core_pb';

export default function AdminAppsComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const [props] = useObservable(AdminAppsController.model.store);
  const [cards, setCards] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    };
  }, []);

  useEffect(() => {
    console.log(props.apps);
    const appCards: React.ReactElement[] = [];
    props.apps.map((value: core.App, index: number) => {
      const profilePicture =
        BucketService.getPublicUrl(BucketType.Avatars, value.avatarImage) ??
        undefined;
      appCards.push(
        <AppCardComponent
          key={index}
          profilePicture={profilePicture}
          onProfilePictureChanged={(blob: Blob) => {
            AdminAppsController.uploadAvatarAsync(value.id, blob);
          }}
        />
      );
    });
    setCards(appCards);
  }, [props]);

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
                  <Typography.Title className={styles['apps-title']} level={2}>
                    {Strings.adminApps}
                  </Typography.Title>
                  <div className={styles['header-button-container']}>
                    <Button
                      className={styles['header-button']}
                      type={'primary'}
                      size={'tiny'}
                      icon={<IconPlus strokeWidth={2} />}
                      onClick={() => AdminAppsController.createAppAsync()}
                    >
                      <span className={styles['button-text']}>
                        {Strings.createApp}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className={styles['apps-container']}>{cards}</div>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
}
