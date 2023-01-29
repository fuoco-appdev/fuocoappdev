import React, { useEffect, useState } from 'react';
import { Typography, IconClipboard } from '@fuoco.appdev/core-ui';
import styles from './apps.module.scss';
import { Strings } from '../strings';
import AppsController from '../controllers/apps.controller';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import * as core from '../protobuf/core_pb';
import BucketService from '../services/bucket.service';
import AppCardComponent from './app-card.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function AppsDesktopComponent({
  cards,
}: {
  cards: React.ReactElement[];
}): JSX.Element {
  const [show, setShow] = useState(false);

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

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      {transitions(
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
                className={[styles['content'], styles['content-desktop']].join(
                  ' '
                )}
              >
                <div
                  className={[
                    styles['header-bar'],
                    styles['header-bar-desktop'],
                  ].join(' ')}
                >
                  <Typography.Title
                    className={[
                      styles['apps-title'],
                      styles['apps-title-desktop'],
                    ].join(' ')}
                    level={2}
                  >
                    {Strings.myApps}
                  </Typography.Title>
                  <div
                    className={[
                      styles['header-button-container'],
                      styles['header-button-container-desktop'],
                    ].join(' ')}
                  >
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
                <div
                  className={[
                    styles['apps-container'],
                    styles['apps-container-desktop'],
                  ].join(' ')}
                >
                  {cards.length > 0 ? (
                    cards
                  ) : (
                    <div
                      className={[
                        styles['empty-list-container'],
                        styles['empty-list-container-desktop'],
                      ].join(' ')}
                    >
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

function AppsMobileComponent({
  cards,
}: {
  cards: React.ReactElement[];
}): JSX.Element {
  const [show, setShow] = useState(false);

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

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      {transitions(
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
                className={[styles['content'], styles['content-mobile']].join(
                  ' '
                )}
              >
                <div
                  className={[
                    styles['header-bar'],
                    styles['header-bar-mobile'],
                  ].join(' ')}
                >
                  <Typography.Title
                    className={[
                      styles['apps-title'],
                      styles['apps-title-mobile'],
                    ].join(' ')}
                    level={2}
                  >
                    {Strings.myApps}
                  </Typography.Title>
                  <div
                    className={[
                      styles['header-button-container'],
                      styles['header-button-container-mobile'],
                    ].join(' ')}
                  >
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
                <div
                  className={[
                    styles['apps-container'],
                    styles['apps-container-mobile'],
                  ].join(' ')}
                >
                  {cards.length > 0 ? (
                    cards
                  ) : (
                    <div
                      className={[
                        styles['empty-list-container'],
                        styles['empty-list-container-mobile'],
                      ].join(' ')}
                    >
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

export default function AppsComponent(): JSX.Element {
  const [cards, setCards] = useState<React.ReactElement[]>([]);
  const [props] = useObservable(AppsController.model.store);

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
    <>
      <ResponsiveDesktop>
        <AppsDesktopComponent cards={cards} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AppsMobileComponent cards={cards} />
      </ResponsiveMobile>
    </>
  );
}
