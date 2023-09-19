import { Helmet } from 'react-helmet-async';
import { TermsOfServiceDesktopComponent } from './desktop/terms-of-service.desktop.component';
import { TermsOfServiceMobileComponent } from './mobile/terms-of-service.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

export default function TermsOfServiceComponent(): JSX.Element {
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
        <TermsOfServiceDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <TermsOfServiceMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
