import React, {useEffect, useState} from 'react';
import {Typography, Button, Input, InputPhoneNumber} from '@fuoco.appdev/core-ui';
import styles from './get-started.module.scss';
import { Strings } from '../localization';
import {animated, useTransition, config} from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import GetStartedController from '../controllers/get-started.controller';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';

export default function GetStartedComponent(): JSX.Element {
  const navigate = useNavigate();
  const [showForm,  setShowForm] = useState(false);
  const [companyErrorMessage, setCompanyErrorMessage] = useState<string | undefined>(undefined);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState<string | undefined>(undefined);
  const [commentErrorMessage, setCommentErrorMessage] = useState<string | undefined>(undefined);
  const [props] = useObservable(GetStartedController.model.store);
  const [phoneNumber] = useState<string>(GetStartedController.model.phoneNumber);
  const containerRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    setShowForm(true);

    return () => {
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    if (props.requestSent) {
      setShowForm(false);
    }
  }, [props.requestSent]);

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
        setCompanyErrorMessage(Strings.fieldEmptyError);
      }

      if (props.phoneNumber.length <= 0) {
        setPhoneNumberErrorMessage(Strings.fieldEmptyError);
      }

      if (props.comment.length <= 0) {
        setCommentErrorMessage(Strings.fieldEmptyError);
      }

      GetStartedController.sendRequestAsync();
    }, rippleProps.during);
  };

  return (
    <div className={styles["root"]}>
        <div className={styles["content"]}>
          {formTransitions((style, item) => (item && showForm) && (
            <animated.div style={style}>
              <div ref={containerRef}>
                <Typography.Title className={styles["form-title"]}>{Strings.getStarted}</Typography.Title>
                <h3 className={styles["form-subtitle"]}>{Strings.getStartedSubtitle}</h3>
                <form className={styles["form"]} onSubmit={onSendRequest}>
                  <div className={styles["form-content"]}>
                    <Input
                      value={props.companyName}
                      label={Strings.company}
                      placeholder={Strings.companyPlaceholder}
                      error={companyErrorMessage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        GetStartedController.updateCompanyName(e.currentTarget.value);
                      }}
                    />
                    <InputPhoneNumber
                      parentRef={containerRef}
                      defaultValue={phoneNumber}
                      label={Strings.phoneNumber}
                      error={phoneNumberErrorMessage}
                      country={'ca'}
                      onChange={(value: string) => {
                        GetStartedController.updatePhoneNumber(value);
                      }}
                    />
                    <Input.TextArea
                      value={props.comment}
                      label={Strings.comment}
                      placeholder={Strings.commentPlaceholder}
                      error={commentErrorMessage}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        GetStartedController.updateComment(e.currentTarget.value);
                      }}
                    />
                    <Button
                        block
                        size="large"
                        htmlType="submit"
                        className={styles['send-button']}
                        rippleProps={rippleProps}>
                          <div className={styles['send-button-content']}>
                            {Strings.send}
                          </div>
                    </Button>
                  </div>
                </form>
              </div>
            </animated.div>
          ))}
          <div className={styles['continue-container']}>
            {requestSentTransitions((style, item) => (item && !showForm) && (
              <animated.div style={style}>
                <Typography.Title className={styles["request-title"]}>{Strings.thankyouForContacting}</Typography.Title>
                <h3 className={styles["request-subtitle"]}>{Strings.thankyouForContactingSubtitle}</h3>
                <Button
                  block 
                  size="large"
                  htmlType="submit"
                  rippleProps={rippleProps}
                  onClick={() => navigate(RoutePaths.Account)}>
                  {Strings.next}
                </Button>
              </animated.div>
            ))}
          </div>
        </div>
    </div>
  );
}