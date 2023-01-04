import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  IconLayout,
  IconSmartphone,
  IconPenTool,
} from '@fuoco.appdev/core-ui';
import styles from './landing.module.scss';
import { Strings } from '../strings';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { animated, useTransition, config } from 'react-spring';

interface StatusProps {
  title: string;
  icon: JSX.Element;
  description: string;
}

function ServiceComponent({
  title,
  icon,
  description,
}: StatusProps): JSX.Element {
  return (
    <div className={styles['status-container']}>
      <div className={styles['status-top-content']}>
        <span className={styles['status-title']}>{title}</span>
        <div className={styles['status-icon-container']}>{icon}</div>
      </div>
      <div className={styles['status-description']}>{description}</div>
    </div>
  );
}

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
                <div className={styles['landing-title-container']}>
                  <Typography.Title className={styles['title']}>
                    {Strings.landingTitle1}
                    <br />
                    {Strings.landingTitle2}
                    <br />
                    <span className={styles['title-spacing']}>
                      {Strings.landingTitle3}
                    </span>
                  </Typography.Title>
                  <div className={styles['landing-sub-title-container']}>
                    <Typography.Text
                      className={styles['sub-title']}
                      align={'center'}
                    >
                      {Strings.landingDescription}
                    </Typography.Text>
                  </div>
                </div>
                <div className={styles['button-container']}>
                  <Button
                    className={styles['button']}
                    size={'xlarge'}
                    type="primary"
                    onClick={() => navigate(RoutePaths.Signup)}
                  >
                    {Strings.signup}
                  </Button>
                </div>
                <div className={styles['service-list']}>
                  <ServiceComponent
                    title={Strings.webDesign}
                    icon={<IconLayout strokeWidth={2} stroke={'#fff'} />}
                    description={Strings.webDesignDescription}
                  />
                  <ServiceComponent
                    title={Strings.appDevelopment}
                    icon={<IconSmartphone strokeWidth={2} stroke={'#fff'} />}
                    description={Strings.appDevelopmentDescription}
                  />
                  <ServiceComponent
                    title={Strings.logoAndBranding}
                    icon={<IconPenTool strokeWidth={2} stroke={'#fff'} />}
                    description={Strings.logoAndBrandingDescription}
                  />
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
