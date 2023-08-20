import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingMobileComponent from './mobile/loading.mobile.component';
import LoadingDesktopComponent from './desktop/loading.desktop.component';

export interface LoadingProps {
  isVisible: boolean;
}

export default function LoadingComponent({
  isVisible = true,
}: LoadingProps): JSX.Element {
  return isVisible ? (
    <>
      <ResponsiveDesktop>
        <LoadingDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <LoadingMobileComponent />
      </ResponsiveMobile>
    </>
  ) : (
    <></>
  );
}
