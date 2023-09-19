import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './responsive.module.scss';

export interface ResponsiveProps {
  children: any;
  inheritStyles?: boolean;
}

export function useDesktopEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isDesktop = useMediaQuery({
    minWidth: 992,
  });
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
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 991,
  });
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
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });
  useEffect(() => {
    if (isMobile) {
      effect();
    }
  }, [...[isMobile], ...(deps ?? [])]);
}

export function ResponsiveDesktop({
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

export function ResponsiveTablet({
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

export function ResponsiveMobile({
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
