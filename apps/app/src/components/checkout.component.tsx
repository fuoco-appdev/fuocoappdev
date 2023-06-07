import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function CheckoutDesktopComponent(): JSX.Element {
  return <></>;
}

function CheckoutMobileComponent(): JSX.Element {
  return <></>;
}

export default function CheckoutComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CheckoutDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CheckoutMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
