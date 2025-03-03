import { Avatar } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccountDocument } from '../../shared/models/account.model';
import {
  ChatSeenMessage,
  DecryptedChatMessage,
} from '../../shared/models/chat.model';
import { DIContext } from './app.component';
import styles from './conversation-item.module.scss';

export interface ChatConversation {
  messages: DecryptedChatMessage[];
  timestampThreshold?: number;
  account?: AccountDocument;
}

export interface ConversationItemProps {
  conversation: ChatConversation;
  profileUrls: Record<string, string>;
  seenBy: Record<string, ChatSeenMessage[]>;
  activeAccountId?: string;
}

function ConversationItemComponent({
  conversation,
  profileUrls,
  seenBy,
  activeAccountId,
}: ConversationItemProps): JSX.Element {
  const { i18n } = useTranslation();
  const { ChatController } = React.useContext(DIContext);
  const { accounts, suspense } = ChatController.model;
  return (
    <div className={styles['root']}>
      {conversation.timestampThreshold && (
        <div className={styles['timestamp']}>
          {moment(conversation.timestampThreshold)
            .locale(i18n.language)
            .format('LT')}
        </div>
      )}
      <div
        className={[
          styles['content'],
          activeAccountId === conversation.account?.id
            ? styles['active-account-content']
            : styles['other-account-content'],
        ].join(' ')}
      >
        {activeAccountId !== conversation.account?.id && (
          <div className={styles['account-container']}>
            <Avatar
              classNames={{
                container: [styles['avatar-container']].join(' '),
              }}
              size={'custom'}
              text={conversation.account?.username}
              src={profileUrls[conversation.account?.id ?? '']}
            />
          </div>
        )}
        <div className={styles['messages']}>
          {conversation.messages.map((message, index) => {
            const messageSeenBy = seenBy[message.id ?? ''];
            return (
              <div key={index} className={styles['message-container']}>
                {message.text && (
                  <div className={styles['bubble']}>
                    <p>{message.text}</p>
                  </div>
                )}
                {activeAccountId === conversation.account?.id &&
                  messageSeenBy &&
                  messageSeenBy.length > 0 && (
                    <div className={styles['seen-by-container']}>
                      {messageSeenBy.map((seenMessage) => {
                        const account = accounts[seenMessage.accountId ?? ''];
                        return (
                          <Avatar
                            classNames={{
                              container: [styles['seen-avatar-container']].join(
                                ' '
                              ),
                            }}
                            size={'custom'}
                            text={account?.username}
                            src={profileUrls[account.id ?? '']}
                          />
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default observer(ConversationItemComponent);
