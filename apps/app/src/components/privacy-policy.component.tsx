import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { PrivacyPolicyDesktopComponent } from './desktop/privacy-policy.desktop.component';
import { PrivacyPolicyMobileComponent } from './mobile/privacy-policy.mobile.component';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicyComponent(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Privacy Policy | Cruthology'} />
        <meta
          name="description"
          content={
            'This privacy notice for Cruthology ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you...'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Privacy Policy | Cruthology'} />
        <meta
          property="og:description"
          content={
            'This privacy notice for Cruthology ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you...'
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
