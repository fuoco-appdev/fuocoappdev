import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import ChatController from '../controllers/chat.controller';
import { AccountDocument } from '../models/account.model';
import { ChatDocument, ChatState } from '../models/chat.model';
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
    chatAccounts: Record<string, AccountDocument[]>;
    setOpenNewPrivate: (value: boolean) => void;
    setOpenEditDropdown: (value: boolean) => void;
    onNewPrivateClick: () => void;
    onAccountMessageItemClick: (account: AccountDocument) => void;
    onPrivateMessageClick: (account: AccountDocument) => void;
}

export default function ChatsComponent(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();
    const [chatProps] = useObservable(ChatController.model.store);
    const [accountProps] = useObservable(AccountController.model.store);
    const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
    const [openNewPrivate, setOpenNewPrivate] = useState<boolean>(false);
    const [chatAccounts, setChatAccounts] = useState<Record<string, AccountDocument[]>>({});

    const onNewPrivateClick = () => {
        setOpenEditDropdown(false);
        setOpenNewPrivate(true);
        ChatController.loadSearchedAccountsAsync();
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

    useEffect(() => {
        ChatController.loadChatsAsync();
    }, []);

    useEffect(() => {
        if (Object.keys(chatProps.accounts).length <= 0) {
            return;
        }

        const chatAccountRecord: Record<string, AccountDocument[]> = {};
        const accounts = Object.values(chatProps.accounts) as AccountDocument[];
        for (const chat of chatProps.chats as ChatDocument[]) {
            if (!chat.id) {
                continue;
            }

            if (chat.type === 'private') {
                const privateAccounts = accounts.filter((value) => chat.private?.account_ids?.includes(value?.id ?? ''));
                const privateAccountIds = privateAccounts.map((value) => value.id);
                const accountIndex = privateAccountIds.indexOf(accountProps.account.id);
                privateAccounts.splice(accountIndex, 1);
                chatAccountRecord[chat.id] = privateAccounts;
            }
        }

        setChatAccounts(chatAccountRecord);
    }, [chatProps.accounts, chatProps.chats]);

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
                        chatAccounts={chatAccounts}
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
                        chatAccounts={chatAccounts}
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
