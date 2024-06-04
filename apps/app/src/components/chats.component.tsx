import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ChatController from 'src/controllers/chat.controller';
import { AccountDocument } from '../models/account.model';
import { ChatState } from '../models/chat.model';
import { RoutePathsType } from '../route-paths';
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
    openEditDropdown: boolean;
    openNewPrivate: boolean;
    setOpenNewPrivate: (value: boolean) => void;
    setOpenEditDropdown: (value: boolean) => void;
    onNewPrivateClick: () => void;
    onAccountMessageItemClick: (account: AccountDocument) => void;
    onPrivateMessageClick: (account: AccountDocument) => void;
}

export default function ChatsComponent(): JSX.Element {
    const navigate = useNavigate();
    const [chatProps] = useObservable(ChatController.model.store);
    const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
    const [openNewPrivate, setOpenNewPrivate] = useState<boolean>(false);

    const onNewPrivateClick = () => {
        setOpenEditDropdown(false);
        setOpenNewPrivate(true);
        ChatController.loadSearchedAccounts();
    }

    const onAccountMessageItemClick = (account: AccountDocument) => {
        setOpenNewPrivate(false);
        setTimeout(() => navigate(`${RoutePathsType.Account}/${account.id}`), 150);
    }

    const onPrivateMessageClick = async (account: AccountDocument) => {
        await ChatController.createPrivateMessageAsync(account);
        setOpenNewPrivate(false);
    }

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
                    <ChatsDesktopComponent
                        chatProps={chatProps}
                        openEditDropdown={openEditDropdown}
                        openNewPrivate={openNewPrivate}
                        setOpenNewPrivate={setOpenNewPrivate}
                        setOpenEditDropdown={setOpenEditDropdown}
                        onNewPrivateClick={onNewPrivateClick}
                        onAccountMessageItemClick={onAccountMessageItemClick}
                        onPrivateMessageClick={onPrivateMessageClick}
                    />
                    <ChatsMobileComponent
                        chatProps={chatProps}
                        openEditDropdown={openEditDropdown}
                        openNewPrivate={openNewPrivate}
                        setOpenNewPrivate={setOpenNewPrivate}
                        setOpenEditDropdown={setOpenEditDropdown}
                        onNewPrivateClick={onNewPrivateClick}
                        onAccountMessageItemClick={onAccountMessageItemClick}
                        onPrivateMessageClick={onPrivateMessageClick}
                    />
                </AuthenticatedComponent>
            </React.Suspense>
        </>
    );
}
