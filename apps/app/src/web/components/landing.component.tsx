import React from 'react';
import { Helmet } from 'react-helmet';

const LandingDesktopComponent = React.lazy(
  () => import('./desktop/landing.desktop.component')
);

export interface LandingProps {}

export interface LandingResponsiveProps {}

function LandingComponent({}: LandingProps): JSX.Element {
  const suspenceComponent = <></>;

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }
  return (
    <>
      <Helmet>
        <title>Landing | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Landing | fuoco.appdev'} />
        <meta name="description" content={``} />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Landing | fuoco.appdev'} />
        <meta property="og:description" content={``} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <LandingDesktopComponent />
      </React.Suspense>
    </>
  );
}

export default LandingComponent;
