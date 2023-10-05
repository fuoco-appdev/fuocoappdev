import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './responsive.module.scss';

export function useIsDesktop(): boolean {
  return useMediaQuery({
    minWidth: 992,
  });
}

export function useIsTablet(): boolean {
  return useMediaQuery({
    minWidth: 768,
    maxWidth: 991,
  });
}

export function useIsMobile(): boolean {
  return useMediaQuery({
    maxWidth: 767,
  });
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
  return (
    <div
      className={[
        styles['desktop-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function ResponsiveSuspenseTablet({
  children,
  inheritStyles = true,
}: ResponsiveProps) {
  return (
    <div
      className={[
        styles['tablet-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function ResponsiveSuspenseMobile({
  children,
  inheritStyles = true,
}: ResponsiveProps) {
  return (
    <div
      className={[
        styles['mobile-layout'],
        inheritStyles ? styles['inherit'] : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
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
