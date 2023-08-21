import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountSettingsDesktopComponent } from './desktop/account-settings.desktop.component';
import { AccountSettingsMobileComponent } from './mobile/account-settings.mobile.component';

export default function AccountSettingsComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountSettingsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountSettingsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
