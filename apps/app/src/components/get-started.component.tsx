import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Input,
  InputPhoneNumber,
} from '@fuoco.appdev/core-ui';
import styles from './get-started.module.scss';
import { animated, useTransition, config } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import GetStartedController from '../controllers/get-started.controller';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { RipplesProps } from 'react-ripples';
import { useTranslation } from 'react-i18next';

function GetStartedDesktopComponent({
  showForm,
  companyErrorMessage,
  phoneNumberErrorMessage,
  commentErrorMessage,
  rippleProps,
  onSendRequest,
}: {
  showForm: boolean;
  companyErrorMessage: string | undefined;
  phoneNumberErrorMessage: string | undefined;
  commentErrorMessage: string | undefined;
  rippleProps: RipplesProps;
  onSendRequest: (e: React.FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(GetStartedController.model.store);
  const [phoneNumber] = useState<string>(
    GetStartedController.model.phoneNumber
  );
  const containerRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();

  const formTransitions = useTransition(showForm, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  const requestSentTransitions = useTransition(props.requestSent, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        {formTransitions(
          (style, item) =>
            item &&
            showForm && (
              <animated.div
                className={[
                  styles['animated-content'],
                  styles['animated-content-desktop'],
                ].join(' ')}
                style={style}
              >
                <div ref={containerRef}>
                  <Typography.Title
                    className={[
                      styles['form-title'],
                      styles['form-title-desktop'],
                    ].join(' ')}
                  >
                    {t('getStarted')}
                  </Typography.Title>
                  <Typography.Text
                    className={[
                      styles['form-subtitle'],
                      styles['form-subtitle-desktop'],
                    ].join(' ')}
                  >
                    {t('getStartedSubtitle')}
                  </Typography.Text>
                  <form
                    className={[styles['form'], styles['form-desktop']].join(
                      ' '
                    )}
                    onSubmit={onSendRequest}
                  >
                    <div className={styles['form-content']}>
                      <Input
                        value={props.companyName}
                        label={t('company') ?? ''}
                        placeholder={t('companyPlaceholder') ?? ''}
                        error={companyErrorMessage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          GetStartedController.updateCompanyName(
                            e.currentTarget.value
                          );
                        }}
                      />
                      <InputPhoneNumber
                        parentRef={containerRef}
                        defaultValue={phoneNumber}
                        label={t('phoneNumber') ?? ''}
                        error={phoneNumberErrorMessage}
                        country={'ca'}
                        onChange={(value: string) => {
                          GetStartedController.updatePhoneNumber(value);
                        }}
                      />
                      <Input.TextArea
                        value={props.comment}
                        label={t('comment') ?? ''}
                        placeholder={t('commentPlaceholder') ?? ''}
                        error={commentErrorMessage}
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          GetStartedController.updateComment(
                            e.currentTarget.value
                          );
                        }}
                      />
                      <Button
                        block
                        size="large"
                        htmlType="submit"
                        classNames={{
                          container: styles['send-button'],
                        }}
                        rippleProps={rippleProps}
                      >
                        <div className={styles['send-button-content']}>
                          {t('send')}
                        </div>
                      </Button>
                    </div>
                  </form>
                </div>
              </animated.div>
            )
        )}
        {requestSentTransitions(
          (style, item) =>
            item &&
            !showForm && (
              <animated.div
                style={style}
                className={[
                  styles['continue-content'],
                  styles['continue-content-desktop'],
                ].join(' ')}
              >
                <Typography.Title
                  className={[
                    styles['request-title'],
                    styles['request-title-desktop'],
                  ].join(' ')}
                >
                  {t('thankyouForContacting')}
                </Typography.Title>
                <Typography.Text
                  className={[
                    styles['request-subtitle'],
                    styles['request-subtitle-desktop'],
                  ].join(' ')}
                  align={'center'}
                >
                  {t('thankyouForContactingSubtitle')}
                </Typography.Text>
                <div>
                  <Button
                    classNames={{
                      container: styles['next-button'],
                    }}
                    size={'xlarge'}
                    type="primary"
                    rippleProps={rippleProps}
                    onClick={() => navigate(RoutePaths.Account)}
                  >
                    {t('next')}
                  </Button>
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

function GetStartedMobileComponent({
  showForm,
  companyErrorMessage,
  phoneNumberErrorMessage,
  commentErrorMessage,
  rippleProps,
  onSendRequest,
}: {
  showForm: boolean;
  companyErrorMessage: string | undefined;
  phoneNumberErrorMessage: string | undefined;
  commentErrorMessage: string | undefined;
  rippleProps: RipplesProps;
  onSendRequest: (e: React.FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(GetStartedController.model.store);
  const [phoneNumber] = useState<string>(
    GetStartedController.model.phoneNumber
  );
  const containerRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();

  const formTransitions = useTransition(showForm, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  const requestSentTransitions = useTransition(props.requestSent, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        {formTransitions(
          (style, item) =>
            item &&
            showForm && (
              <animated.div
                style={style}
                className={[
                  styles['animated-content'],
                  styles['animated-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={styles['form-container-mobile']}
                  ref={containerRef}
                >
                  <Typography.Title
                    className={[
                      styles['form-title'],
                      styles['form-title-mobile'],
                    ].join(' ')}
                  >
                    {t('getStarted')}
                  </Typography.Title>
                  <Typography.Text
                    className={[
                      styles['form-subtitle'],
                      styles['form-subtitle-mobile'],
                    ].join(' ')}
                  >
                    {t('getStartedSubtitle')}
                  </Typography.Text>
                  <form
                    className={[styles['form'], styles['form-mobile']].join(
                      ' '
                    )}
                    onSubmit={onSendRequest}
                  >
                    <div
                      className={[
                        styles['form-content'],
                        styles['form-content-mobile'],
                      ].join(' ')}
                    >
                      <div className={styles['input-container-mobile']}>
                        <Input
                          value={props.companyName}
                          label={t('company') ?? ''}
                          placeholder={t('companyPlaceholder') ?? ''}
                          error={companyErrorMessage}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            GetStartedController.updateCompanyName(
                              e.currentTarget.value
                            );
                          }}
                        />
                        <InputPhoneNumber
                          touchScreen={true}
                          parentRef={containerRef}
                          defaultValue={phoneNumber}
                          label={t('phoneNumber') ?? ''}
                          error={phoneNumberErrorMessage}
                          country={'ca'}
                          onChange={(value: string) => {
                            GetStartedController.updatePhoneNumber(value);
                          }}
                        />
                        <Input.TextArea
                          value={props.comment}
                          label={t('comment') ?? ''}
                          placeholder={t('commentPlaceholder') ?? ''}
                          error={commentErrorMessage}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            GetStartedController.updateComment(
                              e.currentTarget.value
                            );
                          }}
                        />
                      </div>

                      <Button
                        block
                        size="large"
                        htmlType="submit"
                        classNames={{
                          container: [
                            styles['send-button'],
                            styles['send-button-mobile'],
                          ].join(' '),
                        }}
                        rippleProps={rippleProps}
                      >
                        <div className={styles['send-button-content']}>
                          {t('send')}
                        </div>
                      </Button>
                    </div>
                  </form>
                </div>
              </animated.div>
            )
        )}

        {requestSentTransitions(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                className={[
                  styles['continue-content'],
                  styles['continue-content-mobile'],
                ].join(' ')}
              >
                <Typography.Title
                  className={[
                    styles['request-title'],
                    styles['request-title-mobile'],
                  ].join(' ')}
                >
                  {t('thankyouForContacting')}
                </Typography.Title>
                <Typography.Text
                  className={[
                    styles['request-subtitle'],
                    styles['request-subtitle-mobile'],
                  ].join(' ')}
                  align={'center'}
                >
                  {t('thankyouForContactingSubtitle')}
                </Typography.Text>
                <div>
                  <Button
                    classNames={{
                      container: styles['next-button'],
                    }}
                    size={'xlarge'}
                    type="primary"
                    rippleProps={rippleProps}
                    onClick={() => navigate(RoutePaths.Account)}
                  >
                    {t('next')}
                  </Button>
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

export default function GetStartedComponent(): JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [companyErrorMessage, setCompanyErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [commentErrorMessage, setCommentErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [props] = useObservable(GetStartedController.model.store);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setShowForm(true);

    return () => {
      setShowForm(false);
    };
  }, []);

  useEffect(() => {
    if (props.requestSent) {
      setShowForm(false);
    }
  }, [props.requestSent]);

  const rippleProps = {
    color: 'rgba(0, 0, 0, .3)',
    during: 250,
  };

  const onSendRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setCompanyErrorMessage(undefined);
      setPhoneNumberErrorMessage(undefined);
      setCommentErrorMessage(undefined);

      if (props.companyName.length <= 0) {
        setCompanyErrorMessage(t('fieldEmptyError') ?? '');
      }

      if (props.phoneNumber.length <= 0) {
        setPhoneNumberErrorMessage(t('fieldEmptyError') ?? '');
      }

      if (props.comment.length <= 0) {
        setCommentErrorMessage(t('fieldEmptyError') ?? '');
      }

      GetStartedController.sendRequestAsync();
    }, rippleProps.during);
  };

  return (
    <>
      <ResponsiveDesktop>
        <GetStartedDesktopComponent
          showForm={showForm}
          companyErrorMessage={companyErrorMessage}
          commentErrorMessage={commentErrorMessage}
          phoneNumberErrorMessage={phoneNumberErrorMessage}
          rippleProps={rippleProps}
          onSendRequest={onSendRequest}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <GetStartedMobileComponent
          showForm={showForm}
          companyErrorMessage={companyErrorMessage}
          commentErrorMessage={commentErrorMessage}
          phoneNumberErrorMessage={phoneNumberErrorMessage}
          rippleProps={rippleProps}
          onSendRequest={onSendRequest}
        />
      </ResponsiveMobile>
    </>
  );
}
