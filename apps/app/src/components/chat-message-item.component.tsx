import { lazy } from '@loadable/component';
import * as React from 'react';
import { AccountDocument, AccountState } from '../models/account.model';
import { ChatDocument, DecryptedChatMessage } from '../models/chat.model';
import { StorageFolderType } from '../protobuf/common_pb';
import BucketService from '../services/bucket.service';
import { ChatMessageItemSuspenseDesktopComponent } from './desktop/suspense/chat-message-item.suspense.desktop.component';
import { ChatMessageItemSuspenseMobileComponent } from './mobile/suspense/chat-message-item.suspense.mobile.component';

const ChatMessageItemDesktopComponent = lazy(
    () => import('./desktop/chat-message-item.desktop.component')
);
// const ChatMessageItemMobileComponent = lazy(
//     () => import('./mobile/chat-message-item.mobile.component')
// );

export interface ChatMessageItemProps {
    accountProps: AccountState;
    chat: ChatDocument;
    accounts: AccountDocument[];
    lastMessage?: DecryptedChatMessage;
    onClick: () => void;
}

export interface ChatMessageItemResponsiveProps
    extends ChatMessageItemProps {
    profileUrls: Record<string, string>;
    seen: boolean;
}

export default function ChatMessageItemComponent({
    accountProps,
    accounts,
    chat,
    lastMessage,
    onClick,
}: ChatMessageItemProps): JSX.Element {
    const [profileUrls, setProfileUrls] = React.useState<Record<string, string>>({});
    const [seen, setSeen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const urls: Record<string, string> = {};
        for (const account of accounts ?? []) {
            if (!account.profile_url) {
                return;
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
        const seenChatMessage = lastMessage?.seenBy?.find((value) => value.accountId === accountProps.account?.id);
        setSeen(seenChatMessage !== undefined);
    }, [lastMessage]);

    const onClickOverride = () => {
        setTimeout(() => {
            onClick();
        }, 150);
    };

    const suspenceComponent = (
        <>
            <ChatMessageItemSuspenseDesktopComponent />
            <ChatMessageItemSuspenseMobileComponent />
        </>
    );

    if (process.env['DEBUG_SUSPENSE'] === 'true') {
        return suspenceComponent;
    }

    return (
        <React.Suspense fallback={suspenceComponent}>
            <ChatMessageItemDesktopComponent
                accountProps={accountProps}
                chat={chat}
                accounts={accounts}
                lastMessage={lastMessage}
                profileUrls={profileUrls}
                seen={seen}
                onClick={onClickOverride}
            />
            {/* <ChatMessageItemMobileComponent
                chatProps={chatProps}
                chat={chat}
                profileUrls={profileUrls}
                onClick={onClickOverride}
            /> */}
        </React.Suspense>
    );
}
