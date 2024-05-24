import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import TermsOfServiceController from '../controllers/terms-of-service.controller';
import { TermsOfServiceState } from '../models/terms-of-service.model';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from './responsive.component';

const TermsOfServiceDesktopComponent = lazy(
  () => import('./desktop/terms-of-service.desktop.component')
);
const TermsOfServiceMobileComponent = lazy(
  () => import('./mobile/terms-of-service.mobile.component')
);

export interface TermsOfServiceResponsiveProps {
  termsOfServiceProps: TermsOfServiceState;
  remarkPlugins: any[];
}

export default function TermsOfServiceComponent(): JSX.Element {
  const [termsOfServiceProps] = useObservable(
    TermsOfServiceController.model.store
  );
  const [remarkPlugins, setRemarkPlugins] = React.useState<any[]>([]);
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });

    TermsOfServiceController.load(renderCountRef.current);

    return () => {
      TermsOfServiceController.disposeLoad(renderCountRef.current);
    };
  }, []);

  const suspenceComponent = (
    <>
      <ResponsiveSuspenseDesktop>
        <div />
      </ResponsiveSuspenseDesktop>
      <ResponsiveSuspenseTablet>
        <div />
      </ResponsiveSuspenseTablet>
      <ResponsiveSuspenseMobile>
        <div />
      </ResponsiveSuspenseMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

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
      <React.Suspense fallback={suspenceComponent}>
        <TermsOfServiceDesktopComponent
          termsOfServiceProps={termsOfServiceProps}
          remarkPlugins={remarkPlugins}
        />
        <TermsOfServiceMobileComponent
          termsOfServiceProps={termsOfServiceProps}
          remarkPlugins={remarkPlugins}
        />
      </React.Suspense>
    </>
  );
}
