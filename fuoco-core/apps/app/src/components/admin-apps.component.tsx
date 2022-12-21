import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  IconPlus,
  Modal,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import styles from './admin-apps.module.scss';
import { Strings } from '../localization';
import { animated, useTransition, config } from 'react-spring';
import AdminAppsController from '../controllers/admin-apps.controller';
import BucketService from '../services/bucket.service';
import { useObservable } from '@ngneat/use-observable';
import AppCardComponent, { AppCardData } from './app-card.component';
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
    const appCards: React.ReactElement[] = [];
    const companyOptions: OptionProps[] = [];
    for (const user of props.users) {
      const status = (user as core.User).requestStatus;
      if (
        status !== core.UserRequestStatus.ACCEPTED &&
        status !== core.UserRequestStatus.UPDATE_REQUESTED
      ) {
        continue;
      }

      companyOptions.push({
        id: user.id,
        value: user.company,
        children: () => (
          <span className={styles['dropdown-label']}>{user.company}</span>
        ),
      });
    }

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
          companyIndex={companyOptions.findIndex(
            (option) => option.id === value.userId
          )}
          name={value.name}
          progressType={value.status}
          companyOptions={companyOptions}
          coverImages={coverImages}
          onProfilePictureChanged={(index: number, blob: Blob) => {
            AdminAppsController.uploadAvatarAsync(value.id, blob);
          }}
          onCoverImagesChanged={(blobs: Blob[]) => {
            AdminAppsController.uploadCoverImagesAsync(value.id, blobs);
          }}
          onSaveClicked={(id: string, data: AppCardData) =>
            AdminAppsController.updateAppAsync(id, {
              user_id: data.userId,
              name: data.name,
              status: data.status,
              links: data.links,
            })
          }
          onDeleteClicked={(id: string) =>
            AdminAppsController.showDeleteModal(id)
          }
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
      <Modal
        title={Strings.deleteApp}
        description={Strings.deleteAppDescription}
        confirmText={Strings.delete}
        cancelText={Strings.cancel}
        variant={'danger'}
        size={'small'}
        visible={props.showDeleteModal}
        onCancel={() => AdminAppsController.hideDeleteModal()}
        onConfirm={() => AdminAppsController.deleteSelectedAppAsync()}
      ></Modal>
    </div>
  );
}
