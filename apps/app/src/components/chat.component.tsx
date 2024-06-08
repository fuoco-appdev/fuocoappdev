import { lazy } from '@loadable/component';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import ChatController from '../controllers/chat.controller';
import { AccountDocument } from '../models/account.model';
import { ChatSuspenseDesktopComponent } from './desktop/suspense/chat.suspense.desktop.component';
import { ChatSuspenseMobileComponent } from './mobile/suspense/chat.suspense.mobile.component';

const ChatDesktopComponent = lazy(
    () => import('./desktop/chat.desktop.component')
);
const ChatMobileComponent = lazy(
    () => import('./mobile/chat.mobile.component')
);

export interface ChatResponsiveProps {
    accounts: AccountDocument[];
    profileUrls: Record<string, string>;
}

export default function ChatComponent(): JSX.Element {
    const { id } = useParams();
    const [profileUrls, setProfileUrls] = React.useState<Record<string, string>>({});
    const [accounts, setAccounts] = React.useState<AccountDocument[]>([]);

    const suspenceComponent = (
        <>
            <ChatSuspenseDesktopComponent />
            <ChatSuspenseMobileComponent />
        </>
    );

    if (process.env['DEBUG_SUSPENSE'] === 'true') {
        return suspenceComponent;
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        ChatController.loadChat(id);
    }, [id]);

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
                <ChatDesktopComponent accounts={accounts} profileUrls={profileUrls} />
                <ChatMobileComponent accounts={accounts} profileUrls={profileUrls} />
            </React.Suspense>
        </>
    );
}
