import { useMediaQuery } from 'react-responsive';

export function ResponsiveDesktop({ children }: any) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
}

export function ResponsiveTablet({ children }: any) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
}

export function ResponsiveMobile({ children }: any) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
}
