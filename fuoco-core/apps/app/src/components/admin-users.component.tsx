import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  List,
  Divider,
  IconUserPlus,
  IconMinus,
  IconPlus,
  Modal,
  IconUserCheck,
  IconArrowRight,
} from '@fuoco.appdev/core-ui';
import styles from './admin-users.module.scss';
import { Strings } from '../localization';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import AdminUsersController from '../controllers/admin-users.controller';
import * as core from '../protobuf/core_pb';

export default function AdminUsersComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const [props] = useObservable(AdminUsersController.model.store);

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

  const requestedUserItems: Array<{
    key: string;
    element: () => React.ReactElement;
    height: number;
  }> = [];
  const acceptedUserItems: Array<{
    key: string;
    element: () => React.ReactElement;
    height: number;
  }> = [];
  const updateRequestedUserItems: Array<{
    key: string;
    element: () => React.ReactElement;
    height: number;
  }> = [];
  const updateAcceptedUserItems: Array<{
    key: string;
    element: () => React.ReactElement;
    height: number;
  }> = [];
  props.requestedUsers.map((value: core.User) =>
    requestedUserItems.push({
      key: value.id,
      height: 52,
      element: () => (
        <div className={styles['user-item']}>
          <div className={styles['user-item-company-container']}>
            <IconUserPlus
              className={styles['user-item-icon']}
              strokeWidth={1.5}
            />
            <Typography.Text className={styles['user-item-company']}>
              {value.company}
            </Typography.Text>
          </div>
          <div className={styles['user-item-button-container']}>
            <Button
              type={'text'}
              icon={
                <IconMinus
                  className={styles['user-item-icon']}
                  strokeWidth={1.5}
                />
              }
            />
            <Button
              type={'text'}
              icon={
                <IconPlus
                  className={styles['user-item-icon']}
                  strokeWidth={1.5}
                />
              }
              onClick={() =>
                AdminUsersController.showRequestedModal(true, value)
              }
            />
          </div>
        </div>
      ),
    })
  );

  props.acceptedUsers.map((value: core.User) =>
    acceptedUserItems.push({
      key: value.id,
      height: 52,
      element: () => (
        <div className={styles['user-item']}>
          <div className={styles['user-item-company-container']}>
            <IconUserCheck
              className={styles['user-item-icon']}
              strokeWidth={1.5}
            />
            <Typography.Text className={styles['user-item-company']}>
              {value.company}
            </Typography.Text>
          </div>
          <div className={styles['user-item-button-container']}>
            <Button
              type={'text'}
              icon={
                <IconArrowRight
                  className={styles['user-item-icon']}
                  strokeWidth={1.5}
                />
              }
              onClick={() => console.log()}
            />
          </div>
        </div>
      ),
    })
  );

  return (
    <div className={styles['root']}>
      <div className={styles['content']}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                className={styles['animated-content']}
              >
                <div className={styles['content']}>
                  <div className={styles['header-bar']}>
                    <Typography.Title
                      className={styles['users-title']}
                      level={2}
                    >
                      {Strings.adminUsers}
                    </Typography.Title>
                  </div>
                  <div className={styles['user-requests-container']}>
                    <div className={styles['user-requests-type']}>
                      <Typography.Text className={styles['user-request-title']}>
                        {Strings.requests}
                      </Typography.Text>
                      <Divider />
                      <div className={styles['users-container']}>
                        <List items={requestedUserItems} />
                      </div>
                    </div>
                    <div className={styles['user-requests-type']}>
                      <Typography.Text className={styles['user-request-title']}>
                        {Strings.accepted}
                      </Typography.Text>
                      <Divider />
                      <div className={styles['users-container']}>
                        <List items={acceptedUserItems} />
                      </div>
                    </div>
                    <div className={styles['user-requests-type']}>
                      <Typography.Text className={styles['user-request-title']}>
                        {Strings.updateRequests}
                      </Typography.Text>
                      <Divider />
                      <div className={styles['users-container']}>
                        <List items={updateRequestedUserItems} />
                      </div>
                    </div>
                    <div className={styles['user-requests-type']}>
                      <Typography.Text className={styles['user-request-title']}>
                        {Strings.updateAccepted}
                      </Typography.Text>
                      <Divider />
                      <div className={styles['users-container']}>
                        <List items={updateAcceptedUserItems} />
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            )
        )}
      </div>
      <Modal
        title={`${Strings.requestedUserTitle} ${props.selectedUser?.company} ?`}
        description={Strings.requestedUserDescription}
        confirmText={Strings.accept}
        cancelText={Strings.cancel}
        variant={'success'}
        size={'small'}
        visible={props.showRequestedModal}
        onCancel={() => AdminUsersController.showRequestedModal(false, null)}
        onConfirm={() => AdminUsersController.acceptRequestedUserAsync()}
      ></Modal>
    </div>
  );
}
