import { observer } from 'mobx-react-lite';
import LoadingDesktopComponent from './desktop/loading.desktop.component';
import LoadingMobileComponent from './mobile/loading.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function LoadingComponent(): JSX.Element {
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

export default observer(LoadingComponent);
