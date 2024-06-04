import {
    Button,
    Dropdown,
    DropdownAlignment,
    Input,
    Line,
    Modal,
    Scroll,
    Tabs,
} from '@fuoco.appdev/core-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import ChatController from '../../controllers/chat.controller';
import { ChatTabs } from '../../models/chat.model';
import { ChatResponse } from '../../protobuf/chat_pb';
import { useQuery } from '../../route-paths';
import AccountMessageItemComponent from '../account-message-item.component';
import { ChatsResponsiveProps } from '../chats.component';
import styles from '../chats.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatsDesktopComponent({
    chatProps,
    openEditDropdown,
    openNewPrivate,
    setOpenEditDropdown,
    setOpenNewPrivate,
    onNewPrivateClick,
    onAccountMessageItemClick,
    onPrivateMessageClick
}: ChatsResponsiveProps): JSX.Element {
    const query = useQuery();
    const { t } = useTranslation();
    const { id } = useParams();
    const topBarRef = React.useRef<HTMLDivElement | null>(null);
    const editButtonRef = React.useRef<HTMLDivElement | null>(null);
    const searchAccountsInputRef = React.useRef<HTMLInputElement | null>(null);
    let prevPreviewScrollTop = 0;
    let yPosition = 0;

    return (
        <ResponsiveDesktop>
            <div className={[styles['root'], styles['root-desktop']].join(' ')}>
                <div
                    className={[
                        styles['search-container'],
                        styles['search-container-desktop'],
                    ].join(' ')}
                >
                    <div
                        className={[
                            styles['top-bar-container'],
                            styles['top-bar-container-desktop'],
                        ].join(' ')}
                        ref={topBarRef}
                    >
                        <div
                            className={[
                                styles['top-bar-left-content'],
                                styles['top-bar-left-content-desktop'],
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    styles['search-content'],
                                    styles['search-content-desktop'],
                                ].join(' ')}
                            >
                                <div
                                    className={[
                                        styles['search-input-root'],
                                        styles['search-input-root-desktop'],
                                    ].join(' ')}
                                >
                                    <Input
                                        value={chatProps.searchInput}
                                        classNames={{
                                            container: [
                                                styles['search-input-container'],
                                                styles['search-input-container-desktop'],
                                            ].join(' '),
                                            input: [
                                                styles['search-input'],
                                                styles['search-input-desktop'],
                                            ].join(' '),
                                        }}
                                        placeholder={t('search') ?? ''}
                                        icon={<Line.Search size={24} color={'#2A2A5F'} />}
                                        onChange={(event) =>
                                            ChatController.updateSearchInput(event.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Button
                                        ref={editButtonRef}
                                        classNames={{
                                            container: styles['rounded-container'],
                                            button: styles['rounded-button'],
                                        }}
                                        onClick={() => {
                                            setOpenEditDropdown(true);
                                        }}
                                        rippleProps={{
                                            color: 'rgba(42, 42, 95, .35)',
                                        }}
                                        type={'text'}
                                        block={true}
                                        icon={<Line.Edit size={24} />}
                                        rounded={true}
                                    />
                                </div>
                            </div>
                            <div
                                className={[
                                    styles['tab-container'],
                                    styles['tab-container-desktop'],
                                ].join(' ')}
                            >
                                <Tabs
                                    classNames={{
                                        nav: styles['tab-nav'],
                                        tabButton: styles['tab-button'],
                                        selectedTabButton: styles['selected-tab-button'],
                                        tabOutline: styles['tab-outline'],
                                    }}
                                    removable={true}
                                    type={'underlined'}
                                    activeId={chatProps.selectedTab}
                                    onChange={(id: string) =>
                                        ChatController.updateSelectedTabAsync(
                                            id.length > 0 ? (id as ChatTabs) : ChatTabs.Messages
                                        )
                                    }
                                    tabs={[
                                        {
                                            id: ChatTabs.Messages,
                                            label: t('messages') ?? 'Messages',
                                        },
                                        {
                                            id: ChatTabs.Requests,
                                            label: t('requests') ?? 'Requests',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <Scroll
                        loadComponent={
                            <img
                                src={'../assets/svg/ring-resize-dark.svg'}
                                className={styles['loading-ring']}
                            />
                        }
                        loadingHeight={56}
                        showIndicatorThreshold={56}
                        reloadThreshold={96}
                        pullIndicatorComponent={
                            <div className={[styles['pull-indicator-container']].join(' ')}>
                                <Line.ArrowDownward size={24} />
                            </div>
                        }
                        isLoadable={chatProps.hasMoreChats}
                        isLoading={chatProps.areChatsLoading}
                        onLoad={() => ChatController.onChatsNextScrollAsync()}
                        onScroll={(progress, scrollRef, contentRef) => {
                            const elementHeight = topBarRef.current?.clientHeight ?? 0;
                            const scrollTop =
                                contentRef.current?.getBoundingClientRect().top ?? 0;
                            if (prevPreviewScrollTop <= scrollTop) {
                                yPosition -= prevPreviewScrollTop - scrollTop;
                                if (yPosition >= 0) {
                                    yPosition = 0;
                                }

                                topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                            } else {
                                yPosition += scrollTop - prevPreviewScrollTop;
                                if (yPosition <= -elementHeight) {
                                    yPosition = -elementHeight;
                                }

                                topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                            }

                            prevPreviewScrollTop = scrollTop;
                        }}
                    >
                        <div
                            className={[
                                styles['side-bar-scroll-content'],
                                styles['side-bar-scroll-content-desktop'],
                            ].join(' ')}
                        >
                            {chatProps.chats.map((chat: ChatResponse, _index: number) => {
                                return <div />;
                            })}
                            {chatProps.chats.length <= 0 && (
                                <div
                                    className={[
                                        styles['no-chats-container'],
                                        styles['no-chats-container-desktop'],
                                    ].join(' ')}
                                >
                                    <div
                                        className={[
                                            styles['no-chats-text'],
                                            styles['no-chats-text-desktop'],
                                        ].join(' ')}
                                    >
                                        {t('noMessagesCount')}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Scroll>
                </div>
                {!id && (
                    <div
                        className={[
                            styles['empty-chat-container'],
                            styles['empty-chat-container-desktop'],
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles['no-messages-container'],
                                styles['no-messages-container-desktop'],
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    styles['no-messages-text'],
                                    styles['no-messages-text-desktop'],
                                ].join(' ')}
                            >
                                {t('noMessages')}
                            </div>
                            <div
                                className={[
                                    styles['no-messages-description'],
                                    styles['no-messages-description-desktop'],
                                ].join(' ')}
                            >
                                {t('noMessagesDescription')}
                            </div>
                        </div>
                    </div>
                )}
                {id && <Outlet />}
            </div>
            {ReactDOM.createPortal(
                <>
                    <Dropdown
                        classNames={{
                            touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
                        }}
                        open={openEditDropdown}
                        anchorRef={editButtonRef}
                        align={DropdownAlignment.Left}
                        onClose={() => setOpenEditDropdown(false)}
                    >
                        <Dropdown.Item
                            classNames={{
                                container: styles['dropdown-item-container-interests'],
                                button: {
                                    button: styles['dropdown-item-button-interests'],
                                    children: styles['dropdown-item-button-children-interests'],
                                },
                            }}
                            rippleProps={{ color: 'rgba(42, 42, 95, .35)' }}
                            onClick={() => {
                                onNewPrivateClick?.();
                                setTimeout(() => searchAccountsInputRef.current?.focus(), 1000);
                            }}
                        >
                            <Dropdown.Icon>
                                <Line.PersonAddAlt size={24} />
                            </Dropdown.Icon>
                            {t('newPrivate')}
                        </Dropdown.Item>
                    </Dropdown>
                    <Modal
                        classNames={{
                            overlay: [
                                styles['modal-overlay'],
                                styles['modal-overlay-desktop'],
                            ].join(' '),
                            modal: [styles['modal'], styles['modal-desktop']].join(' '),
                            text: [styles['modal-text'], styles['modal-text-desktop']].join(
                                ' '
                            ),
                            title: [
                                styles['modal-title'],
                                styles['modal-title-desktop'],
                            ].join(' '),
                            description: [
                                styles['modal-description'],
                                styles['modal-description-desktop'],
                            ].join(' '),
                            footerButtonContainer: [
                                styles['modal-footer-button-container'],
                                styles['modal-footer-button-container-desktop'],
                                styles['modal-address-footer-button-container-desktop'],
                            ].join(' '),
                        }}
                        hideFooter={true}
                        title={t('newPrivate') ?? ''}
                        visible={openNewPrivate}
                        onCancel={() => setOpenNewPrivate(false)}
                    >
                        <div
                            className={[
                                styles['search-root'],
                                styles['search-root-desktop'],
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    styles['search-input-root'],
                                    styles['search-input-root-desktop'],
                                ].join(' ')}
                            >
                                <Input
                                    inputRef={searchAccountsInputRef}
                                    value={chatProps.searchAccountsInput}
                                    classNames={{
                                        container: [
                                            styles['search-input-container'],
                                            styles['search-input-container-desktop'],
                                        ].join(' '),
                                        input: [
                                            styles['search-input'],
                                            styles['search-input-desktop'],
                                        ].join(' '),
                                    }}
                                    placeholder={t('search') ?? ''}
                                    icon={<Line.Search size={24} color={'#2A2A5F'} />}
                                    onChange={(event) =>
                                        ChatController.updateSearchAccountsInput(event.target.value)
                                    }
                                />
                            </div>
                            {chatProps.searchedAccounts.map((value) => {
                                return (
                                    <AccountMessageItemComponent
                                        key={value.id}
                                        chatProps={chatProps}
                                        account={value}
                                        onClick={() => onAccountMessageItemClick?.(value)}
                                        onMessage={() => onPrivateMessageClick?.(value)}
                                    />
                                );
                            })}
                            {chatProps.areAccountsLoading && (
                                <div
                                    className={[
                                        styles['loading-container'],
                                        styles['loading-container-desktop'],
                                    ].join(' ')}
                                >
                                    <img
                                        src={'../assets/svg/ring-resize-dark.svg'}
                                        className={styles['loading-ring']}
                                        style={{
                                            minHeight: chatProps.areAccountsLoading ? 24 : 0,
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </Modal>
                </>,
                document.body
            )}
        </ResponsiveDesktop>
    );
}
