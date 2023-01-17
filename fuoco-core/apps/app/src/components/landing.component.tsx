import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Typography,
  Button,
  IconLayout,
  IconSmartphone,
  IconPenTool,
} from '@fuoco.appdev/core-ui';
import styles from './landing.module.scss';
import windowStyles from './window.module.scss';
import { Strings } from '../strings';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import { animated, useTransition, config } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WindowController from '../controllers/window.controller';
import WorldController from '../controllers/world.controller';
gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'none', duration: 2 });

interface ServiceProps {
  title: string;
  icon: JSX.Element;
  description: string;
}

function ServiceComponent({
  title,
  icon,
  description,
}: ServiceProps): JSX.Element {
  return (
    <div className={styles['service-container']}>
      <div className={styles['service-top-content']}>
        <span className={styles['service-title']}>{title}</span>
        <div className={styles['service-icon-container']}>{icon}</div>
      </div>
      <div className={styles['service-description']}>{description}</div>
    </div>
  );
}

function LandingDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={[
          styles['landing-title-container'],
          styles['landing-title-container-desktop'],
        ].join(' ')}
      >
        <Typography.Title
          className={[styles['title'], styles['title-desktop']].join(' ')}
        >
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
            className={[styles['sub-title'], styles['sub-title-desktop']].join(
              ' '
            )}
            align={'center'}
          >
            {Strings.landingDescription}
          </Typography.Text>
        </div>
      </div>
      <div
        className={[
          styles['button-container'],
          styles['button-container-desktop'],
        ].join(' ')}
      >
        <Button
          classNames={{
            container: styles['button'],
          }}
          size={'xlarge'}
          type="primary"
          onClick={() => navigate(RoutePaths.Signup)}
        >
          {Strings.signup}
        </Button>
      </div>
      <div
        className={[
          styles['service-list'],
          styles['service-list-desktop'],
        ].join(' ')}
      >
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
    </>
  );
}

function LandingMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        scroller: WindowController.scrollRef,
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500',
        markers: false,
        pin: true,
        pinSpacing: true,
        onUpdate: (self: ScrollTrigger) => {
          WorldController.animateLeave(self.direction * 0.2, self.progress);
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className={styles['text-container']} ref={containerRef}>
        <div
          className={[
            styles['landing-title-container'],
            styles['landing-title-container-mobile'],
          ].join(' ')}
        >
          <Typography.Title
            className={[styles['title'], styles['title-mobile']].join(' ')}
          >
            {`${Strings.landingTitle1} ${Strings.landingTitle2} ${Strings.landingTitle3}`}
          </Typography.Title>
          <Typography.Text
            className={[styles['sub-title'], styles['sub-title-mobile']].join(
              ' '
            )}
            align={'center'}
          >
            {Strings.landingDescription}
          </Typography.Text>
          <div
            className={[
              styles['button-container'],
              styles['button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                container: styles['button'],
              }}
              size={'xlarge'}
              type="primary"
              onClick={() => navigate(RoutePaths.Signup)}
            >
              {Strings.signup}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={[styles['service-list'], styles['service-list-mobile']].join(
          ' '
        )}
      >
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
    </>
  );
}

export default function LandingComponent(): JSX.Element {
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
    <div className={styles['root']}>
      <div className={styles['content']}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div
                className={styles['animation-container']}
                style={style}
              >
                <ResponsiveDesktop>
                  <LandingDesktopComponent />
                </ResponsiveDesktop>
                <ResponsiveMobile>
                  <LandingMobileComponent />
                </ResponsiveMobile>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
