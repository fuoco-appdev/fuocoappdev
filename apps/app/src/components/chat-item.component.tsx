import { lazy } from '@loadable/component';
import * as React from 'react';
import { AccountDocument, AccountPresence, AccountState } from '../models/account.model';
import { ChatDocument, ChatSeenMessage, DecryptedChatMessage } from '../models/chat.model';
import { StorageFolderType } from '../protobuf/common_pb';
import BucketService from '../services/bucket.service';
import { ChatItemSuspenseDesktopComponent } from './desktop/suspense/chat-item.suspense.desktop.component';
import { ChatItemSuspenseMobileComponent } from './mobile/suspense/chat-item.suspense.mobile.component';

const ChatItemDesktopComponent = lazy(
    () => import('./desktop/chat-item.desktop.component')
);
// const ChatItemMobileComponent = lazy(
//     () => import('./mobile/chat-item.mobile.component')
// );

export interface ChatItemProps {
    accountProps: AccountState;
    chat: ChatDocument;
    accounts: AccountDocument[];
    seenBy: ChatSeenMessage[];
    lastMessage?: DecryptedChatMessage;
    accountPresence?: AccountPresence[];
    onClick: () => void;
}

export interface ChatItemResponsiveProps
    extends ChatItemProps {
    profileUrls: Record<string, string>;
    seen: boolean;
}

export default function ChatItemComponent({
    accountProps,
    accounts,
    chat,
    seenBy,
    lastMessage,
    accountPresence,
    onClick,
}: ChatItemProps): JSX.Element {
    const [profileUrls, setProfileUrls] = React.useState<Record<string, string>>({});
    const [seen, setSeen] = React.useState<boolean>(false);

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
        const seenChatMessage = seenBy?.find((value) => value.accountId === accountProps.account?.id);
        setSeen(lastMessage?.accountId === accountProps.account?.id || seenChatMessage !== undefined);
    }, [lastMessage, seenBy, accountProps.account]);

    const onClickOverride = () => {
        setTimeout(() => {
            onClick();
        }, 150);
    };

    const suspenceComponent = (
        <>
            <ChatItemSuspenseDesktopComponent />
            <ChatItemSuspenseMobileComponent />
        </>
    );

    if (process.env['DEBUG_SUSPENSE'] === 'true') {
        return suspenceComponent;
    }

    return (
        <React.Suspense fallback={suspenceComponent}>
            <ChatItemDesktopComponent
                accountProps={accountProps}
                chat={chat}
                accounts={accounts}
                lastMessage={lastMessage}
                seenBy={seenBy}
                accountPresence={accountPresence}
                profileUrls={profileUrls}
                seen={seen}
                onClick={onClickOverride}
            />
            {/* <ChatItemMobileComponent
                chatProps={chatProps}
                chat={chat}
                profileUrls={profileUrls}
                onClick={onClickOverride}
            /> */}
        </React.Suspense>
    );
}
