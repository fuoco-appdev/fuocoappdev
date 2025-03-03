import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function EventsDesktopComponent(): JSX.Element {
  return <></>;
}

function EventsMobileComponent(): JSX.Element {
  return <></>;
}

function EventsComponent(): JSX.Element {
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <ResponsiveDesktop>
        <EventsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <EventsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}

export default observer(EventsComponent);
