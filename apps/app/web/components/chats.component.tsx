import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountDocument } from '../../shared/models/account.model';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { ChatsSuspenseDesktopComponent } from './desktop/suspense/chats.suspense.desktop.component';
import { ChatsSuspenseMobileComponent } from './mobile/suspense/chats.suspense.mobile.component';

const ChatsDesktopComponent = React.lazy(
  () => import('./desktop/chats.desktop.component')
);
const ChatsMobileComponent = React.lazy(
  () => import('./mobile/chats.mobile.component')
);

export interface ChatsResponsiveProps {
  openEditDropdown: boolean;
  openNewPrivate: boolean;
  chatAccounts: Record<string, AccountDocument[]>;
  setOpenNewPrivate: (value: boolean) => void;
  setOpenEditDropdown: (value: boolean) => void;
  onNewPrivateClick: () => void;
  onAccountMessageItemClick: (account: AccountDocument) => void;
  onPrivateMessageClick: (account: AccountDocument) => void;
}

function ChatsComponent(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ChatController, AccountController, AccountService, ChatService } =
    React.useContext(DIContext);
  const { suspense, accounts, chats, chatSubscriptions } = ChatController.model;
  const { account } = AccountController.model;
  const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
  const [openNewPrivate, setOpenNewPrivate] = useState<boolean>(false);
  const [chatAccounts, setChatAccounts] = useState<
    Record<string, AccountDocument[]>
  >({});

  const onNewPrivateClick = () => {
    setOpenEditDropdown(false);
    setOpenNewPrivate(true);
    ChatController.loadSearchedAccountsAsync();
  };

  const onAccountMessageItemClick = (account: AccountDocument) => {
    setOpenNewPrivate(false);
    setTimeout(() => navigate(`${RoutePathsType.Account}/${account.id}`), 150);
  };

  const onPrivateMessageClick = async (account: AccountDocument) => {
    await ChatController.createPrivateMessageAsync(account);
    setOpenNewPrivate(false);
  };

  useEffect(() => {
    ChatController.loadChatsAsync();
  }, []);

  useEffect(() => {
    if (!account) {
      return;
    }

    const chatAccountRecord: Record<string, AccountDocument[]> = {};
    const accountValues = Object.values(accounts) as AccountDocument[];
    for (const chat of chats) {
      if (chat.type === 'private') {
        const privateChat = chat.private;
        const privateAccounts = accountValues.filter(
          (value) =>
            privateChat?.account_ids?.includes(value?.id ?? '') &&
            value.id !== account.id
        );
        chatAccountRecord[chat.id ?? ''] = privateAccounts;
      }
    }

    setChatAccounts(chatAccountRecord);
  }, [accounts, chats, account]);

  useEffect(() => {
    const accountIds =
      Object.values(accounts)?.map((value) => value.id ?? '') ?? [];
    const subscription = AccountService.subscribeAccountPresence(
      accountIds,
      (payload: Record<string, any>) => {
        ChatController.updateAccountPresence(payload['new']);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [accounts]);

  useEffect(() => {
    const chatIds = Object.keys(chatSubscriptions);
    const chatSubscription = ChatService.subscribeToChats(
      chatIds,
      (payload) => {
        ChatController.onChatChangedAsync(payload);
      }
    );
    const seenMessageSubscription = ChatService.subscribeToSeenMessage(
      chatIds,
      (payload) => {
        ChatController.onSeenMessageChangedAsync(payload);
      }
    );
    return () => {
      chatSubscription?.unsubscribe();
      seenMessageSubscription?.unsubscribe();
    };
  }, [chatSubscriptions]);

  const suspenceComponent = (
    <>
      <ChatsSuspenseDesktopComponent />
      <ChatsSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Chats | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Chats | fuoco.appdev'} />
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
        <meta property="og:title" content={'Chats | fuoco.appdev'} />
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

export default observer(ChatsComponent);
