import { observer } from 'mobx-react-lite';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function AccountEventsDesktopComponent(): JSX.Element {
  return <></>;
}

function AccountEventsMobileComponent(): JSX.Element {
  return <></>;
}

function AccountEventsComponent(): JSX.Element {
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

export default observer(AccountEventsComponent);
