import LoadingDesktopComponent from './desktop/loading.desktop.component';
import LoadingMobileComponent from './mobile/loading.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

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
