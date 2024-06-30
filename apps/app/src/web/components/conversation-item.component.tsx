import { Avatar } from '@fuoco.appdev/core-ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { AccountDocument } from '../../models/account.model';
import { ChatState, DecryptedChatMessage } from '../../models/chat.model';
import styles from './conversation-item.module.scss';

export interface ChatConversation {
    messages: DecryptedChatMessage[];
    timestampThreshold?: number;
    account?: AccountDocument;
}

export interface ConversationItemProps {
    chatProps: ChatState;
    conversation: ChatConversation;
    profileUrls: Record<string, string>;
    activeAccountId?: string;
}

export default function ConversationItemComponent({
    chatProps,
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
                    {conversation.messages.map((message, index) => {
                        const seenBy = Object.keys(chatProps.seenBy).includes(message.id ?? '') ? chatProps.seenBy[message.id ?? ''] : undefined;
                        return (
                            <div key={index} className={styles['message-container']}>
                                {message.text && (
                                    <div className={styles['bubble']}>
                                        <p>{message.text}</p>
                                    </div>
                                )}
                                {activeAccountId === conversation.account?.id && seenBy && seenBy.length > 0 && (
                                    <div className={styles['seen-by-container']}>
                                        {seenBy.map((seenMessage) => {
                                            const account = chatProps.accounts[seenMessage.accountId ?? ''];
                                            if (seenMessage.accountId === activeAccountId) {
                                                return (<></>)
                                            }
                                            return (<Avatar
                                                classNames={{
                                                    container: [
                                                        styles['seen-avatar-container'],
                                                    ].join(' '),
                                                }}
                                                size={'custom'}
                                                text={account?.username}
                                                src={profileUrls[account.id ?? '']}
                                            />);
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
