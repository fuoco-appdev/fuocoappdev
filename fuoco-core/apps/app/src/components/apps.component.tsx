import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Modal,
  IconKey,
  IconClipboard,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import styles from './apps.module.scss';
import { Strings } from '../strings';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import AppsController from '../controllers/apps.controller';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import * as core from '../protobuf/core_pb';
import BucketService from '../services/bucket.service';
import AppCardComponent, { AppCardData } from './app-card.component';

export default function AppsComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState<React.ReactElement[]>([]);
  const [props] = useObservable(AppsController.model.store);

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

  useEffect(() => {
    const appCards: React.ReactElement[] = [];
    props.apps.map((value: core.App) => {
      let avatarUrl: string | undefined;
      if (value.avatarImage) {
        avatarUrl =
          BucketService.getPublicUrl(
            core.BucketType.AVATARS,
            value.avatarImage
          ) ?? undefined;
      }
      const coverImages: string[] = [];
      for (const url of value.coverImages) {
        coverImages.push(
          BucketService.getPublicUrl(core.BucketType.COVER_IMAGES, url) ?? ''
        );
      }
      appCards.push(
        <AppCardComponent
          id={value.id}
          profilePicture={avatarUrl}
          name={value.name}
          company={value.company}
          progressType={value.status}
          coverImages={coverImages}
          onProfilePictureChanged={(index: number, blob: Blob) => {
            AppsController.uploadAvatarAsync(value.id, blob);
          }}
          onCoverImagesChanged={(blobs: Blob[]) => {
            AppsController.uploadCoverImagesAsync(value.id, blobs);
          }}
        />
      );
    });
    setCards(appCards);
  }, [props]);

  return (
    <div className={styles['root']}>
      {transitions(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles['animated-content']}>
              <div className={styles['content']}>
                <div className={styles['header-bar']}>
                  <Typography.Title className={styles['apps-title']} level={2}>
                    {Strings.myApps}
                  </Typography.Title>
                  <div className={styles['header-button-container']}>
                    {/* <Button
                      className={styles['header-button']}
                      type={'primary'}
                      size={'tiny'}
                      icon={<IconKey strokeWidth={2} />}
                      onClick={() => console.log('request')}
                    >
                      <span className={styles['button-text']}>
                        {Strings.requestApp}
                      </span>
                    </Button> */}
                  </div>
                </div>
                <div className={styles['apps-container']}>
                  {cards.length > 0 ? (
                    cards
                  ) : (
                    <div className={styles['empty-list-container']}>
                      <div className={styles['empty-list']}>
                        <IconClipboard
                          className={styles['empty-icon']}
                          strokeWidth={2}
                          stroke={'#fff'}
                        />
                        <Typography.Text
                          className={styles['empty-title']}
                          align={'center'}
                          strong={true}
                        >
                          {Strings.emptyInMyApps}
                        </Typography.Text>
                        <Typography.Text align={'center'}>
                          {Strings.emptyInMyAppsDescription}
                        </Typography.Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
}
