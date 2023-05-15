import {
  Key,
  LegacyRef,
  MutableRefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './product-preview.module.scss';
import { WinePreview } from '../models/store.model';
import { Button, Card, Line } from '@fuoco.appdev/core-ui';
import { animated, useSpring } from 'react-spring';

export interface ProductPreviewProps {
  parentRef: MutableRefObject<HTMLDivElement | null>;
  preview: WinePreview;
  onExpanded?: () => void;
}

export function ProductPreviewDesktopComponent({}: ProductPreviewProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

export function ProductPreviewMobileComponent({
  parentRef,
  preview,
  onExpanded,
}: ProductPreviewProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [style, api] = useSpring(() => ({
    from: {
      top: ref?.current?.getBoundingClientRect().top,
      left: ref?.current?.getBoundingClientRect().left,
      height: 200,
      width: ref?.current?.clientWidth ?? 0,
      borderRadius: 0,
    },
    to: {
      top: 0,
      left: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      borderRadius: 0,
    },
    config: {
      tension: 800,
      friction: 70,
      bounce: 0,
    },
  }));

  useLayoutEffect(() => {
    let borderRadius: string | null = null;
    if (ref?.current) {
      borderRadius = window
        .getComputedStyle(ref?.current)
        .getPropertyValue('border-radius')
        .replace(/[^\d.]/g, '');
    }
    const parentRect = parentRef?.current?.getBoundingClientRect();
    console.log(parentRect);
    const rect = ref?.current?.getBoundingClientRect();
    api.start({
      top: expanded
        ? parentRef?.current?.getBoundingClientRect().top
        : rect?.top,
      left: expanded
        ? parentRef?.current?.getBoundingClientRect().left
        : rect?.left,
      height: expanded ? parentRect?.height : rect?.height ?? 0,
      width: expanded ? parentRect?.left : rect?.width ?? 0,
      borderRadius: expanded ? 0 : Number(borderRadius ?? 0),
      onRest: onExpanded,
    });
  }, [expanded]);

  return (
    <Card
      ref={ref}
      classNames={{
        container: [styles['root'], styles['root-mobile']].join(' '),
        card: [styles['card'], styles['card-mobile']].join(' '),
      }}
      rippleProps={{
        color: 'rgba(133, 38, 122, .35)',
      }}
      clickable={true}
      onClick={() => setTimeout(() => setExpanded(true), 150)}
    >
      <animated.div
        className={[
          styles['animated-root'],
          styles['animated-root-mobile'],
        ].join(' ')}
        style={{
          ...style,
          position: expanded ? 'fixed' : 'initial',
          zIndex: expanded ? 1 : 0,
        }}
      >
        <div
          className={styles['thumbnail-container-mobile']}
          style={{ height: expanded ? '100%' : 'calc(100% - 38px)' }}
        >
          <img
            className={styles['thumbnail-image-mobile']}
            src={preview.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
          <div className={styles['thumbnail-content-container']}>
            <div className={styles['thumbnail-top-content']}></div>
            {!expanded && (
              <div className={styles['thumbnail-bottom-content']}>
                <Button
                  classNames={{ button: styles['thumbnail-button'] }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  rounded={true}
                  icon={<Line.AddShoppingCart size={24} />}
                />
              </div>
            )}
          </div>
        </div>
        {!expanded && (
          <div className={styles['bottom-bar-mobile']}>
            <span className={styles['product-title-mobile']}>
              {preview.title}
            </span>
            <span className={styles['product-price-mobile']}>$0,00</span>
          </div>
        )}
      </animated.div>
    </Card>
  );
}
