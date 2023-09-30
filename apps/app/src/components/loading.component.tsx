import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingMobileComponent from './mobile/loading.mobile.component';
import LoadingDesktopComponent from './desktop/loading.desktop.component';

export default function LoadingComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <LoadingDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <LoadingMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
