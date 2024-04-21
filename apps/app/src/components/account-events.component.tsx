import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function AccountEventsDesktopComponent(): JSX.Element {
  return <></>;
}

function AccountEventsMobileComponent(): JSX.Element {
  return <></>;
}

export default function AccountEventsComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountEventsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountEventsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
