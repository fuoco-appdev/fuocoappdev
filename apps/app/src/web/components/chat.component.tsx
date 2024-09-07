import { useObservable } from '@ngneat/use-observable';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import ChatController from '../../controllers/chat.controller';
import {
  AccountDocument,
  AccountPresence,
  AccountState,
} from '../../models/account.model';
import {
  ChatDocument,
  ChatSeenMessage,
  ChatState,
  DecryptedChatMessage,
  DecryptedChatMessages,
} from '../../models/chat.model';
import { StorageFolderType } from '../../protobuf/common_pb';
import BucketService from '../../services/bucket.service';
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
  chatProps: ChatState;
  accountProps: AccountState;
  accounts: AccountDocument[];
  profileUrls: Record<string, string>;
  accountPresence: AccountPresence[];
  seenBy: Record<string, ChatSeenMessage[]>;
  onMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  splitMessagesByUserAndTime: (
    messages: DecryptedChatMessage[]
  ) => ChatConversation[];
}

export default function ChatComponent(): JSX.Element {
  const { id } = useParams();
  const [accountProps] = useObservable(AccountController.model.store);
  const [chatProps] = useObservable(ChatController.model.store);
  const [profileUrls, setProfileUrls] = React.useState<Record<string, string>>(
    {}
  );
  const [accounts, setAccounts] = React.useState<AccountDocument[]>([]);
  const [accountPresence, setAccountPresence] = React.useState<
    AccountPresence[]
  >([]);
  const [seenBy, setSeenBy] = React.useState<Record<string, ChatSeenMessage[]>>(
    {}
  );

  const suspenceComponent = (
    <>
      <ChatSuspenseDesktopComponent />
      <ChatSuspenseMobileComponent />
    </>
  );

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

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
      const seenBy = Object.keys(ChatController.model.seenBy).includes(
        message.id ?? ''
      )
        ? ChatController.model.seenBy[message.id ?? '']
        : undefined;
      if (
        !currentGroup ||
        currentGroup.account?.id !== message.accountId ||
        timeDifference > timeThreshold
      ) {
        if (currentGroup) {
          result.push(currentGroup);
        }

        const account = Object.keys(ChatController.model.accounts).includes(
          message.accountId ?? ''
        )
          ? ChatController.model.accounts[message.accountId ?? '']
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
    let lastSeenMessages: ChatSeenMessage[] = [];
    messages.forEach((message) => {
      (
        chatProps.seenBy[message.id ?? ''] as ChatSeenMessage[] | undefined
      )?.forEach((seenMessage) => {
        if (
          seenMessage.accountId !== message.accountId &&
          !lastSeenMessages.find(
            (value) => value.accountId === seenMessage.accountId
          )
        ) {
          lastSeenMessages.push(seenMessage);
        }
      });
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
      chatProps.messages
    ).includes(id)
      ? chatProps.messages[id]
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
  }, [chatProps.lastChatMessages, chatProps.messages, id]);

  React.useEffect(() => {
    const chatId = id ?? '';
    const decryptedMessages: DecryptedChatMessage[] = Object.keys(
      chatProps.messages
    ).includes(chatId)
      ? chatProps.messages[chatId].messages
      : [];

    const reversedMessages = [...decryptedMessages].reverse();
    const lastSeenMessages = getLastSeenMessages(reversedMessages);
    setSeenBy(lastSeenMessages);
  }, [chatProps.seenBy]);

  React.useEffect(() => {
    const selectedChat = chatProps.selectedChat as ChatDocument | undefined;
    if (!selectedChat) {
      return;
    }

    const account = accountProps.account as AccountDocument | undefined;
    if (selectedChat.type === 'private') {
      const accountIds = selectedChat?.private?.account_ids ?? [];
      const documents = Object.values(chatProps.accounts) as AccountDocument[];
      const accounts = documents.filter(
        (value) =>
          accountIds.includes(value?.id ?? '') && value.id !== account?.id
      );
      setAccounts(accounts);
    }
  }, [chatProps.accounts, chatProps.selectedChat, accountProps.account]);

  React.useEffect(() => {
    if (!accounts) {
      return;
    }

    const urls: Record<string, string> = {};
    for (const account of accounts) {
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
  }, [accounts]);

  React.useEffect(() => {
    if (!accounts) {
      return;
    }

    const accountIds = accounts.map((value) => value.id);
    const presence = Object.values(
      chatProps.accountPresence as Record<string, AccountPresence>
    ).filter((value) => accountIds.includes(value.account_id));
    setAccountPresence(presence);
  }, [chatProps.accountPresence, accounts]);

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
          <ChatDesktopComponent
            chatProps={chatProps}
            accountProps={accountProps}
            accounts={accounts}
            profileUrls={profileUrls}
            accountPresence={accountPresence}
            seenBy={seenBy}
            onMessageSubmit={onMessageSubmit}
            splitMessagesByUserAndTime={splitMessagesByUserAndTime}
          />
          <ChatMobileComponent
            chatProps={chatProps}
            accountProps={accountProps}
            accounts={accounts}
            profileUrls={profileUrls}
            accountPresence={accountPresence}
            seenBy={seenBy}
            onMessageSubmit={onMessageSubmit}
            splitMessagesByUserAndTime={splitMessagesByUserAndTime}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
