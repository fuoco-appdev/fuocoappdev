import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from './responsive.component';

const TermsOfServiceDesktopComponent = React.lazy(
  () => import('./desktop/terms-of-service.desktop.component')
);
const TermsOfServiceMobileComponent = React.lazy(
  () => import('./mobile/terms-of-service.mobile.component')
);

export interface TermsOfServiceResponsiveProps {
  remarkPlugins: any[];
}

function TermsOfServiceComponent(): JSX.Element {
  const { TermsOfServiceController } = React.useContext(DIContext);
  const { suspense } = TermsOfServiceController.model;
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Terms of Service | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Terms of Service | fuoco.appdev'} />
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
        <meta property="og:title" content={'Terms of Service | fuoco.appdev'} />
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
        <TermsOfServiceDesktopComponent remarkPlugins={remarkPlugins} />
        <TermsOfServiceMobileComponent remarkPlugins={remarkPlugins} />
      </React.Suspense>
    </>
  );
}

export default observer(TermsOfServiceComponent);
