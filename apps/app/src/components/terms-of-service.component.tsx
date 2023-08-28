import { TermsOfServiceDesktopComponent } from './desktop/terms-of-service.desktop.component';
import { TermsOfServiceMobileComponent } from './mobile/terms-of-service.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

export default function TermsOfServiceComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <TermsOfServiceDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <TermsOfServiceMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
