import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import React from 'react';
import { Helmet } from 'react-helmet';
import ChatController from 'src/controllers/chat.controller';
import { ChatState } from '../models/chat.model';
import { AuthenticatedComponent } from './authenticated.component';
import { ChatsSuspenseDesktopComponent } from './desktop/suspense/chats.suspense.desktop.component';
import { ChatsSuspenseMobileComponent } from './mobile/suspense/chats.suspense.mobile.component';

const ChatsDesktopComponent = lazy(
    () => import('./desktop/chats.desktop.component')
);
const ChatsMobileComponent = lazy(
    () => import('./mobile/chats.mobile.component')
);

export interface ChatsResponsiveProps {
    chatProps: ChatState;
}

export default function ChatsComponent(): JSX.Element {
    const [chatProps] = useObservable(ChatController.model.store);

    const suspenceComponent = (
        <>
            <ChatsSuspenseDesktopComponent />
            <ChatsSuspenseMobileComponent />
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
            <React.Suspense fallback={suspenceComponent}>
                <AuthenticatedComponent>
                    <ChatsDesktopComponent chatProps={chatProps} />
                    <ChatsMobileComponent chatProps={chatProps} />
                </AuthenticatedComponent>
            </React.Suspense>
        </>
    );
}
