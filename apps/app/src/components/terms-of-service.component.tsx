import { Helmet } from 'react-helmet';
import { TermsOfServiceDesktopComponent } from './desktop/terms-of-service.desktop.component';
import { TermsOfServiceMobileComponent } from './mobile/terms-of-service.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useState, useEffect } from 'react';
import { TermsOfServiceState } from '../models/terms-of-service.model';
import { useObservable } from '@ngneat/use-observable';
import TermsOfServiceController from '../controllers/terms-of-service.controller';

export interface TermsOfServiceResponsiveProps {
  termsOfServiceProps: TermsOfServiceState;
  remarkPlugins: any[];
}

export default function TermsOfServiceComponent(): JSX.Element {
  const [termsOfServiceProps] = useObservable(
    TermsOfServiceController.model.store
  );
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <ResponsiveDesktop>
        <TermsOfServiceDesktopComponent
          termsOfServiceProps={termsOfServiceProps}
          remarkPlugins={remarkPlugins}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <TermsOfServiceMobileComponent
          termsOfServiceProps={termsOfServiceProps}
          remarkPlugins={remarkPlugins}
        />
      </ResponsiveMobile>
    </>
  );
}
