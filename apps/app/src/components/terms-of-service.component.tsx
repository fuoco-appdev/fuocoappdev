import { Helmet } from 'react-helmet-async';
import { TermsOfServiceDesktopComponent } from './desktop/terms-of-service.desktop.component';
import { TermsOfServiceMobileComponent } from './mobile/terms-of-service.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useState, useEffect } from 'react';

export interface TermsOfServiceResponsiveProps {
  remarkPlugins: any[];
}

export default function TermsOfServiceComponent(): JSX.Element {
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);

  useEffect(() => {
    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Terms of Service | Cruthology'} />
        <meta
          name="description"
          content={
            'These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Cruthology ...'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Terms of Service | Cruthology'} />
        <meta
          property="og:description"
          content={
            'These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Cruthology ...'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <ResponsiveDesktop>
        <TermsOfServiceDesktopComponent remarkPlugins={remarkPlugins} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <TermsOfServiceMobileComponent remarkPlugins={remarkPlugins} />
      </ResponsiveMobile>
    </>
  );
}
