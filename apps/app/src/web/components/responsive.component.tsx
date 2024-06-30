import * as React from 'react';
import {
  isAndroid,
  isBrowser,
  isIOS,
  isMobile,
  isTablet,
} from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import styles from './responsive.module.scss';

export function useIsDesktop(): boolean {
  const query = useMediaQuery({
    minWidth: 768,
  });
  return query && isBrowser;
}

export function useIsTablet(): boolean {
  const query = useMediaQuery({
    minWidth: 768,
  });
  return query && (isIOS || isAndroid);
}

export function useIsMobile(): boolean {
  const query = useMediaQuery({
    maxWidth: 767,
  });
  return query && (isIOS || isAndroid);
}

export function useDesktopEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isDesktop = useIsDesktop();
  React.useEffect(() => {
    if (isDesktop) {
      effect();
    }
  }, [...[isDesktop], ...(deps ?? [])]);
}

export function useTabletEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isTablet = useIsTablet();
  React.useEffect(() => {
    if (isTablet) {
      effect();
    }
  }, [...[isTablet], ...(deps ?? [])]);
}

export function useMobileEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) {
      effect();
    }
  }, [...[isMobile], ...(deps ?? [])]);
}

export interface ResponsiveProps {
  children: any;
  inheritStyles?: boolean;
  style?: React.CSSProperties;
}

export function ResponsiveSuspenseDesktop({
  children,
  inheritStyles = true,
  style,
}: ResponsiveProps) {
  return isBrowser ? (
    <div
      className={[
        styles['desktop-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
      style={style}
    >
      {children}
    </div>
  ) : null;
}

export function ResponsiveSuspenseTablet({
  children,
  inheritStyles = true,
  style,
}: ResponsiveProps) {
  return isTablet && (isIOS || isAndroid) ? (
    <div
      className={[inheritStyles ? styles['inherit'] : ''].join(' ')}
      style={style}
    >
      {children}
    </div>
  ) : null;
}

export function ResponsiveSuspenseMobile({
  children,
  inheritStyles = true,
  style,
}: ResponsiveProps) {
  return isMobile && (isIOS || isAndroid) ? (
    <div
      className={[
        styles['mobile-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
      style={style}
    >
      {children}
    </div>
  ) : null;
}

export function ResponsiveDesktop({ children }: ResponsiveProps) {
  const isDesktop = useIsDesktop();
  return isDesktop ? children : null;
}

export function ResponsiveTablet({ children }: ResponsiveProps) {
  return null;
}

export function ResponsiveMobile({ children }: ResponsiveProps) {
  const isMobile = useIsMobile();
  return isMobile ? children : null;
}
