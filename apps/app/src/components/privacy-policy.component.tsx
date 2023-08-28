import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { PrivacyPolicyDesktopComponent } from './desktop/privacy-policy.desktop.component';
import { PrivacyPolicyMobileComponent } from './mobile/privacy-policy.mobile.component';

export default function PrivacyPolicyComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <PrivacyPolicyDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <PrivacyPolicyMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
