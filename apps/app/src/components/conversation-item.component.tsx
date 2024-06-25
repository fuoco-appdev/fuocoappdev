import { Avatar } from '@fuoco.appdev/core-ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { AccountDocument } from '../models/account.model';
import { ChatSeenMessage, DecryptedChatMessage } from '../models/chat.model';
import styles from './conversation-item.module.scss';

export interface ChatConversation {
    messages: DecryptedChatMessage[];
    timestampThreshold?: number;
    seenBy?: ChatSeenMessage[];
    account?: AccountDocument;
}

export interface ConversationItemProps {
    conversation: ChatConversation;
    profileUrls: Record<string, string>;
    activeAccountId?: string;
}

export default function ConversationItemComponent({
    conversation,
    profileUrls,
    activeAccountId,
}: ConversationItemProps): JSX.Element {
    const { i18n } = useTranslation();

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
                {activeAccountId !== conversation.account?.id && (<div className={styles['account-container']}>
                    <Avatar
                        classNames={{
                            container: [
                                styles['avatar-container'],
                            ].join(' '),
                        }}
                        size={'custom'}
                        text={conversation.account?.username}
                        src={profileUrls[conversation.account?.id ?? '']}
                    />
                </div>)}
                <div className={styles['messages']}>
                    {conversation.messages.map((message, index) => (
                        <div key={index} className={styles['message-container']}>
                            {message.text && (
                                <div className={styles['bubble']}>
                                    <p>{message.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles['seen-by']}>
                    {conversation.seenBy && conversation.seenBy.length > 0 && (
                        <span>Seen by: </span>
                    )}
                </div>
            </div>
        </div>
    );
}
