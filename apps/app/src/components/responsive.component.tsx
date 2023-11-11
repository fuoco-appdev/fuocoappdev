import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './responsive.module.scss';
import {
  isBrowser,
  isMobile,
  isTablet,
  isIOS,
  isAndroid,
} from 'react-device-detect';

export function useIsDesktop(): boolean {
  const query = useMediaQuery({
    minWidth: 992,
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
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
    if (isMobile) {
      effect();
    }
  }, [...[isMobile], ...(deps ?? [])]);
}

export interface ResponsiveProps {
  children: any;
  inheritStyles?: boolean;
}

export function ResponsiveSuspenseDesktop({
  children,
  inheritStyles = true,
}: ResponsiveProps) {
  return isBrowser ? (
    <div
      className={[
        styles['desktop-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
    >
      {children}
    </div>
  ) : null;
}

export function ResponsiveSuspenseTablet({
  children,
  inheritStyles = true,
}: ResponsiveProps) {
  return isTablet && (isIOS || isAndroid) ? (
    <div className={[inheritStyles ? styles['inherit'] : ''].join(' ')}>
      {children}
    </div>
  ) : null;
}

export function ResponsiveSuspenseMobile({
  children,
  inheritStyles = true,
}: ResponsiveProps) {
  return isMobile && (isIOS || isAndroid) ? (
    <div
      className={[
        styles['mobile-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
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
  const isTablet = useIsTablet();
  return isTablet ? children : null;
}

export function ResponsiveMobile({ children }: ResponsiveProps) {
  const isMobile = useIsMobile();
  return isMobile ? children : null;
}
