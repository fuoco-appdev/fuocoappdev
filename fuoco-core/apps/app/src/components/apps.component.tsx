import React, {useEffect, useState} from 'react';
import {Typography, Button} from '@fuoco.appdev/core-ui';
import styles from './landing.module.scss';
import { Strings } from '../localization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import {animated, useTransition, config} from 'react-spring';

export default function AppsComponent(): JSX.Element {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      setShow(true);
  
      return () => {
        setShow(false);
      }
    }, [])
  
    const transitions = useTransition(show, {
      from: { opacity: 0, y: 5 },
      enter: { opacity: 1, y: 0 },
      leave: { opacity: 0, y: 5 },
      config: config.gentle,
    });
  
    return (
      <div className={styles["root"]}>
          <div className={styles["content"]}>
            {transitions((style, item) => item && (
              <animated.div style={style}>

              </animated.div>
            ))}
          </div>
      </div>
    );
  }