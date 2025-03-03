import { observer } from 'mobx-react-lite';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {
  AccountDocument,
  AccountPresence,
} from '../../shared/models/account.model';
import {
  ChatSeenMessage,
  DecryptedChatMessage,
  DecryptedChatMessages,
} from '../../shared/models/chat.model';
import { StorageFolderType } from '../../shared/protobuf/common_pb';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { ChatConversation } from './conversation-item.component';
import { ChatSuspenseDesktopComponent } from './desktop/suspense/chat.suspense.desktop.component';
import { ChatSuspenseMobileComponent } from './mobile/suspense/chat.suspense.mobile.component';

const ChatDesktopComponent = React.lazy(
  () => import('./desktop/chat.desktop.component')
);
const ChatMobileComponent = React.lazy(
  () => import('./mobile/chat.mobile.component')
);

export interface ChatResponsiveProps {
  accounts: AccountDocument[];
  profileUrls: Record<string, string>;
  accountPresence: AccountPresence[];
  seenBy: Record<string, ChatSeenMessage[]>;
  onMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  splitMessagesByUserAndTime: (
    messages: DecryptedChatMessage[]
  ) => ChatConversation[];
}

function ChatComponent(): JSX.Element {
  const { id } = useParams();
  const { AccountController, ChatController, BucketService } =
    React.useContext(DIContext);
  const {
    suspense,
    seenBy,
    accounts,
    messages,
    selectedChat,
    lastChatMessages,
  } = ChatController.model;
  const { account } = AccountController.model;
  const [profileUrls, setProfileUrls] = React.useState<Record<string, string>>(
    {}
  );
  const [currentAccountDocuments, setCurrentAccountDocuments] = React.useState<
    AccountDocument[]
  >([]);
  const [accountPresence, setAccountPresence] = React.useState<
    AccountPresence[]
  >([]);
  const [currentSeenBy, setCurrentSeenBy] = React.useState<
    Record<string, ChatSeenMessage[]>
  >({});

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    ChatController.submitMessageAsync();
  };

  const splitMessagesByUserAndTime = (messages: DecryptedChatMessage[]) => {
    const timeThreshold = 30 * 60 * 1000; // 30 minutes in milliseconds
    const result: ChatConversation[] = [];
    let currentGroup: ChatConversation | null = null;
    let lastTimestampThreshold = new Date(+0);

    messages.forEach((message) => {
      const messageTimestamp = new Date(message.createdAt ?? '');
      const timeDifference =
        messageTimestamp.getTime() - lastTimestampThreshold.getTime();
      const seenByKeys = Object.keys(seenBy).includes(message.id ?? '')
        ? seenBy[message.id ?? '']
        : undefined;
      if (
        !currentGroup ||
        currentGroup.account?.id !== message.accountId ||
        timeDifference > timeThreshold
      ) {
        if (currentGroup) {
          result.push(currentGroup);
        }

        const account = Object.keys(accounts).includes(message.accountId ?? '')
          ? accounts[message.accountId ?? '']
          : undefined;
        const timestampThreshold =
          timeDifference > timeThreshold ? messageTimestamp : undefined;
        currentGroup = {
          account: account,
          messages: [message],
          timestampThreshold: timestampThreshold?.getTime(),
        };

        if (timestampThreshold) {
          lastTimestampThreshold = timestampThreshold;
        }
      } else {
        currentGroup.messages.push(message);
      }
    });

    if (currentGroup) {
      result.push(currentGroup);
    }

    return result;
  };

  const getLastSeenMessages = (
    messages: DecryptedChatMessage[]
  ): Record<string, ChatSeenMessage[]> => {
    const lastSeenMessages: ChatSeenMessage[] = [];
    messages.forEach((message) => {
      (seenBy[message.id ?? ''] as ChatSeenMessage[] | undefined)?.forEach(
        (seenMessage) => {
          if (
            seenMessage.accountId !== message.accountId &&
            !lastSeenMessages.find(
              (value) => value.accountId === seenMessage.accountId
            )
          ) {
            lastSeenMessages.push(seenMessage);
          }
        }
      );
    });

    const seenMessages: Record<string, ChatSeenMessage[]> = {};
    lastSeenMessages.forEach((value) => {
      const messageId = value.messageId ?? '';
      if (Object.keys(lastSeenMessages).includes(messageId)) {
        seenMessages[messageId].push(value);
      } else {
        seenMessages[messageId] = [value];
      }
    });

    return seenMessages;
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }

    ChatController.loadChatAsync(id);
  }, [id]);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    const chatMessages: DecryptedChatMessages | undefined = Object.keys(
      messages
    ).includes(id)
      ? messages[id]
      : undefined;
    if (!chatMessages || chatMessages.messages.length <= 0) {
      return;
    }

    const updateSeenMessage = async () => {
      await ChatController.updateSeenMessageOfOtherAccountAsync(chatMessages);

      const firstMessage = chatMessages.messages.at(
        chatMessages.messages.length - 1
      ) as DecryptedChatMessage;
      await ChatController.updateSeenMessageOfActiveAccountAsync(firstMessage);
    };
    updateSeenMessage();
  }, [lastChatMessages, messages, id]);

  React.useEffect(() => {
    const chatId = id ?? '';
    const decryptedMessages: DecryptedChatMessage[] = Object.keys(
      messages
    ).includes(chatId)
      ? messages[chatId].messages
      : [];

    const reversedMessages = [...decryptedMessages].reverse();
    const lastSeenMessages = getLastSeenMessages(reversedMessages);
    setCurrentSeenBy(lastSeenMessages);
  }, [seenBy]);

  React.useEffect(() => {
    if (!selectedChat) {
      return;
    }

    if (selectedChat.type === 'private') {
      const accountIds = selectedChat?.private?.account_ids ?? [];
      const documents = Object.values(accounts);
      const accountDocuments = documents.filter(
        (value) =>
          accountIds.includes(value?.id ?? '') && value.id !== account?.id
      );
      setCurrentAccountDocuments(accountDocuments);
    }
  }, [accounts, selectedChat, account]);

  React.useEffect(() => {
    if (!accounts) {
      return;
    }

    const urls: Record<string, string> = {};
    for (const account of currentAccountDocuments) {
      if (!account.profile_url) {
        continue;
      }

      BucketService.getPublicUrlAsync(
        StorageFolderType.Avatars,
        account.profile_url
      ).then((value) => {
        if (!account.id || !value) {
          return;
        }

        urls[account.id] = value;
      });
    }

    setProfileUrls(urls);
  }, [currentAccountDocuments]);

  React.useEffect(() => {
    if (!currentAccountDocuments) {
      return;
    }

    const accountIds = currentAccountDocuments.map((value) => value.id);
    const presence = Object.values(accountPresence).filter((value) =>
      accountIds.includes(value.account_id)
    );
    setAccountPresence(presence);
  }, [accountPresence, currentAccountDocuments]);

  const suspenceComponent = (
    <>
      <ChatSuspenseDesktopComponent />
      <ChatSuspenseMobileComponent />
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
          <ChatDesktopComponent
            accounts={currentAccountDocuments}
            profileUrls={profileUrls}
            accountPresence={accountPresence}
            seenBy={currentSeenBy}
            onMessageSubmit={onMessageSubmit}
            splitMessagesByUserAndTime={splitMessagesByUserAndTime}
          />
          <ChatMobileComponent
            accounts={currentAccountDocuments}
            profileUrls={profileUrls}
            accountPresence={accountPresence}
            seenBy={currentSeenBy}
            onMessageSubmit={onMessageSubmit}
            splitMessagesByUserAndTime={splitMessagesByUserAndTime}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}

export default observer(ChatComponent);
