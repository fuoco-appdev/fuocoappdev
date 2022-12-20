import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@fuoco.appdev/core-ui';
import styles from './landing.module.scss';
import { Strings } from '../localization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { animated, useTransition, config } from 'react-spring';

export default function LandingComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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
    <div className={styles['root']}>
      <div className={styles['content']}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div className={styles['text-container']} style={style}>
                <Typography.Title className={styles['title']}>
                  {Strings.callToAction}
                </Typography.Title>
                <Typography.Text className={styles['sub-title']}>
                  {Strings.subCallToAction}
                </Typography.Text>
                <div>
                  <Button
                    className={styles['button']}
                    size="large"
                    type="primary"
                    onClick={() => navigate(RoutePaths.Signup)}
                  >
                    {Strings.signup}
                  </Button>
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
