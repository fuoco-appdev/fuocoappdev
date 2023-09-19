import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { PrivacyPolicyDesktopComponent } from './desktop/privacy-policy.desktop.component';
import { PrivacyPolicyMobileComponent } from './mobile/privacy-policy.mobile.component';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicyComponent(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <ResponsiveDesktop>
        <PrivacyPolicyDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <PrivacyPolicyMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
