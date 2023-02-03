import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { gsap, CSSPlugin } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WindowController from '../controllers/window.controller';
import WorldController from '../controllers/world.controller';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);
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
    <>
      <ResponsiveDesktop>
        <div
          className={[
            styles['service-container'],
            styles['service-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['service-top-content'],
              styles['service-top-content-desktop'],
            ].join(' ')}
          >
            <span
              className={[
                styles['service-title'],
                styles['service-title-desktop'],
              ].join(' ')}
            >
              {title}
            </span>
            <div
              className={[
                styles['service-icon-container'],
                styles['service-icon-container-desktop'],
              ].join(' ')}
            >
              {icon}
            </div>
          </div>
          <div
            className={[
              styles['service-description'],
              styles['service-description-desktop'],
            ].join(' ')}
          >
            {description}
          </div>
        </div>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <div
          className={[
            styles['service-container'],
            styles['service-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['service-top-content'],
              styles['service-top-content-mobile'],
            ].join(' ')}
          >
            <span
              className={[
                styles['service-title'],
                styles['service-title-mobile'],
              ].join(' ')}
            >
              {title}
            </span>
            <div
              className={[
                styles['service-icon-container'],
                styles['service-icon-container-mobile'],
              ].join(' ')}
            >
              {icon}
            </div>
          </div>
          <div
            className={[
              styles['service-description'],
              styles['service-description-mobile'],
            ].join(' ')}
          >
            {description}
          </div>
        </div>
      </ResponsiveMobile>
    </>
  );
}

function LandingDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
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
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div
                className={[
                  styles['animation-container'],
                  styles['animation-container-desktop'],
                ].join(' ')}
                style={style}
              >
                <div
                  className={[
                    styles['landing-title-container'],
                    styles['landing-title-container-desktop'],
                  ].join(' ')}
                >
                  <Typography.Title
                    className={[styles['title'], styles['title-desktop']].join(
                      ' '
                    )}
                  >
                    {Strings.landingTitle1}
                    <br />
                    {Strings.landingTitle2}
                    <br />
                    <span
                      className={[
                        styles['title-spacing'],
                        styles['title-spacing-desktop'],
                      ].join(' ')}
                    >
                      {Strings.landingTitle3}
                    </span>
                  </Typography.Title>
                  <div
                    className={[
                      styles['landing-sub-title-container'],
                      styles['landing-sub-title-container-desktop'],
                    ].join(' ')}
                  >
                    <Typography.Text
                      className={[
                        styles['sub-title'],
                        styles['sub-title-desktop'],
                      ].join(' ')}
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
              </animated.div>
            )
        )}
      </div>
    </div>
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
        pinType: 'fixed',
        onUpdate: (self: ScrollTrigger) => {
          WorldController.fade(self.progress);
        },
      });
    }, containerRef);

    WindowController.scrollRef?.addEventListener('load', () => {
      console.log('load scroll');
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [containerRef]);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <div
          className={[
            styles['animation-container'],
            styles['animation-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['text-container'],
              styles['text-container-mobile'],
            ].join(' ')}
            ref={containerRef}
          >
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
                className={[
                  styles['sub-title'],
                  styles['sub-title-mobile'],
                ].join(' ')}
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
            className={[
              styles['service-list'],
              styles['service-list-mobile'],
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
        </div>
      </div>
    </div>
  );
}

export default function LandingComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <LandingDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <LandingMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
