import { lazy } from '@loadable/component';
import { Helmet } from 'react-helmet';
import { ChatSuspenseDesktopComponent } from './desktop/suspense/chat.suspense.desktop.component';
import { ChatSuspenseMobileComponent } from './mobile/suspense/chat.suspense.mobile.component';
import { ResponsiveDesktop, ResponsiveMobile, ResponsiveTablet } from './responsive.component';
import { ChatSuspenseTabletComponent } from './tablet/suspense/chat.suspense.tablet.component';

const ChatDesktopComponent = lazy(
    () => import('./desktop/chat.desktop.component')
);
const ChatTabletComponent = lazy(
    () => import('./tablet/chat.tablet.component')
);
const ChatMobileComponent = lazy(
    () => import('./mobile/chat.mobile.component')
);

export interface ChatResponsiveProps {

}

export default function ChatComponent(): JSX.Element {
    const suspenceComponent = (
        <>
            <ChatSuspenseDesktopComponent />
            <ChatSuspenseMobileComponent />
            <ChatSuspenseTabletComponent />
        </>
    );

    if (process.env['DEBUG_SUSPENSE'] === 'true') {
        return suspenceComponent;
    }

    return (
        <>
            <Helmet>
                <title>Chats | Cruthology</title>
                <link rel="canonical" href={window.location.href} />
                <meta name="title" content={'Chats | Cruthology'} />
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
                <meta property="og:title" content={'Chats | Cruthology'} />
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
                <ChatDesktopComponent />
            </ResponsiveDesktop>
            <ResponsiveTablet>
                <ChatTabletComponent />
            </ResponsiveTablet>
            <ResponsiveMobile>
                <ChatMobileComponent />
            </ResponsiveMobile>
        </>
    );
}
