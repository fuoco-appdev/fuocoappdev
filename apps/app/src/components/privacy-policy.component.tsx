import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import PrivacyPolicyController from '../controllers/privacy-policy.controller';
import { PrivacyPolicyState } from '../models';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const PrivacyPolicyDesktopComponent = lazy(
  () => import('./desktop/privacy-policy.desktop.component')
);
const PrivacyPolicyTabletComponent = lazy(
  () => import('./tablet/privacy-policy.tablet.component')
);
const PrivacyPolicyMobileComponent = lazy(
  () => import('./mobile/privacy-policy.mobile.component')
);

export interface PrivacyPolicyResponsiveProps {
  privacyPolicyProps: PrivacyPolicyState;
  remarkPlugins: any[];
}

export default function PrivacyPolicyComponent(): JSX.Element {
  const [privacyPolicyProps] = useObservable(
    PrivacyPolicyController.model.store
  );
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

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <PrivacyPolicyDesktopComponent
          privacyPolicyProps={privacyPolicyProps}
          remarkPlugins={remarkPlugins}
        />
        <PrivacyPolicyTabletComponent
          privacyPolicyProps={privacyPolicyProps}
          remarkPlugins={remarkPlugins}
        />
        <PrivacyPolicyMobileComponent
          privacyPolicyProps={privacyPolicyProps}
          remarkPlugins={remarkPlugins}
        />
      </React.Suspense>
    </>
  );
}
