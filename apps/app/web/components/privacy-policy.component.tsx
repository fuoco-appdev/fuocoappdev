import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const PrivacyPolicyDesktopComponent = React.lazy(
  () => import('./desktop/privacy-policy.desktop.component')
);
const PrivacyPolicyMobileComponent = React.lazy(
  () => import('./mobile/privacy-policy.mobile.component')
);

export interface PrivacyPolicyResponsiveProps {
  remarkPlugins: any[];
}

function PrivacyPolicyComponent(): JSX.Element {
  const { PrivacyPolicyController } = React.useContext(DIContext);
  const { suspense } = PrivacyPolicyController.model;
  const [remarkPlugins, setRemarkPlugins] = React.useState<any[]>([]);
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    renderCountRef.current += 1;

    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });
    PrivacyPolicyController.load(renderCountRef.current);

    return () => {
      PrivacyPolicyController.disposeLoad(renderCountRef.current);
    };
  }, []);

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Privacy Policy | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Privacy Policy | fuoco.appdev'} />
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
        <meta property="og:title" content={'Privacy Policy | fuoco.appdev'} />
        <meta
          property="og:description"
          content={
            'This privacy notice for Cruthology ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you...'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <PrivacyPolicyDesktopComponent remarkPlugins={remarkPlugins} />
        <PrivacyPolicyMobileComponent remarkPlugins={remarkPlugins} />
      </React.Suspense>
    </>
  );
}

export default observer(PrivacyPolicyComponent);
