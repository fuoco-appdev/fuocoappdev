import { useTranslation } from 'react-i18next';
// @ts-ignore
import {
  Avatar,
  Button,
  Input,
  Line,
  Scroll,
} from '@fuoco.appdev/web-components';
import moment from 'moment';
import { useRef } from 'react';
import ChatController from '../../../shared/controllers/chat.controller';
import styles from '../../modules/chat.module.scss';
import { ChatResponsiveProps } from '../chat.component';
import ConversationItemComponent from '../conversation-item.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';

export default function ChatDesktopComponent({
  chatProps,
  accountProps,
  accounts,
  profileUrls,
  accountPresence,
  seenBy,
  onMessageSubmit,
  splitMessagesByUserAndTime,
}: ChatResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  useDesktopEffect(() => {
    messageInputRef.current?.focus();
  }, [messageInputRef?.current]);

  const chatId = chatProps.selectedChat?.id ?? '';
  const decryptedMessages = Object.keys(chatProps.messages).includes(chatId)
    ? chatProps.messages[chatId].messages
    : [];
  const conversations = splitMessagesByUserAndTime(decryptedMessages);
  return (
    <ResponsiveDesktop>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-desktop']].join(' ')}
        onClick={() => messageInputRef?.current?.focus()}
      >
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[styles['avatars'], styles['avatars-desktop']].join(' ')}
          >
            {accounts?.map((account, index) => {
              const profileUrl = profileUrls[account.id ?? ''];
              const presence = accountPresence.find(
                (value) => value.account_id === account.id
              );
              return (
                <div
                  className={[
                    styles['avatar-status-container'],
                    styles['avatar-status-container-desktop'],
                  ].join(' ')}
                >
                  <Avatar
                    classNames={{
                      container: [
                        styles['avatar-container'],
                        styles['avatar-container-desktop'],
                        index > 0 && styles['avatar-container-margin'],
                      ].join(' '),
                    }}
                    size={'custom'}
                    text={account.customer?.first_name}
                    src={profileUrl}
                  />
                  {presence && presence.is_online && (
                    <div
                      className={[
                        styles['avatar-online-status'],
                        styles['avatar-online-status-desktop'],
                      ].join(' ')}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className={[
              styles['top-bar-text-container'],
              styles['top-bar-text-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-title'],
                styles['top-bar-title-desktop'],
              ].join(' ')}
            >
              {accounts?.length > 0 &&
                chatProps.selectedChat?.type === 'private' &&
                accounts[0]?.username}
            </div>
            <div
              className={[
                styles['top-bar-subtitle'],
                styles['top-bar-subtitle-desktop'],
              ].join(' ')}
            >
              {accountPresence.length <= 0 && t('notActive')}
              {accountPresence.length > 0 &&
                !accountPresence[0].is_online &&
                t('lastSeen', {
                  time: moment(accountPresence[0].last_seen).fromNow(true),
                })}
              {accountPresence.length > 0 &&
                accountPresence[0].is_online &&
                t('activeNow')}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['message-container'],
            styles['message-container-desktop'],
          ].join(' ')}
          style={{
            height:
              (rootRef.current?.clientHeight ?? 0) -
              (topBarRef.current?.clientHeight ?? 0) -
              (bottomBarRef.current?.clientHeight ?? 0),
          }}
        >
          <Scroll
            reverse={true}
            classNames={{
              root: [styles['scroll-root'], styles['scroll-root-desktop']].join(
                ' '
              ),
              reloadContainer: [
                styles['scroll-load-container'],
                styles['scroll-load-container-desktop'],
              ].join(' '),
              loadContainer: [
                styles['scroll-load-container'],
                styles['scroll-load-container-desktop'],
              ].join(' '),
              pullIndicator: [
                styles['pull-indicator'],
                styles['pull-indicator-desktop'],
              ].join(' '),
            }}
            loadComponent={
              <img
                src={'../assets/svg/ring-resize-dark.svg'}
                className={styles['loading-ring']}
              />
            }
            onLoad={() => ChatController.onMessagesNextScrollAsync()}
            loadingHeight={56}
            showIndicatorThreshold={56}
            isLoadable={chatProps.hasMoreMessages}
            isLoading={chatProps.areMessagesLoading}
          >
            <div
              className={[
                styles['message-items-container'],
                styles['message-items-container-desktop'],
              ].join(' ')}
            >
              {!chatProps.isSelectedChatLoading &&
                decryptedMessages.length <= 0 && (
                  <div
                    className={[
                      styles['no-message-container'],
                      styles['no-message-container-desktop'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['no-message-avatars'],
                        styles['no-message-avatars-desktop'],
                      ].join(' ')}
                    >
                      {accounts?.map((account, index) => {
                        const profileUrl = profileUrls[account.id ?? ''];
                        return (
                          <Avatar
                            classNames={{
                              container: [
                                styles['no-message-avatar-container'],
                                styles['no-message-avatar-container-desktop'],
                                index > 0 && styles['no-message-avatar-margin'],
                              ].join(' '),
                            }}
                            size={'custom'}
                            text={account.username}
                            src={profileUrl}
                          />
                        );
                      })}
                    </div>
                    <div
                      className={[
                        styles['no-message-text-container'],
                        styles['no-message-text-container-desktop'],
                      ].join(' ')}
                    >
                      {accounts.length === 1 && (
                        <div
                          className={[
                            styles['no-message-full-name'],
                            styles['no-message-full-name-desktop'],
                          ].join(' ')}
                        >
                          {`${accounts[0].customer?.first_name} ${accounts[0].customer?.last_name}`}
                        </div>
                      )}
                      {accounts.length === 1 && (
                        <div
                          className={[
                            styles['no-message-description'],
                            styles['no-message-description-desktop'],
                          ].join(' ')}
                        >
                          {t('sayHiTo', {
                            name: accounts[0].customer?.first_name,
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {conversations.map((conversation) => {
                return (
                  <ConversationItemComponent
                    chatProps={chatProps}
                    conversation={conversation}
                    profileUrls={profileUrls}
                    seenBy={seenBy}
                    activeAccountId={accountProps.account?.id}
                  />
                );
              })}
            </div>
          </Scroll>
        </div>
        <div
          ref={bottomBarRef}
          className={[styles['bottom-bar'], styles['bottom-bar-desktop']].join(
            ' '
          )}
        >
          <div>
            <Button
              classNames={{
                container: styles['rounded-container'],
                button: styles['rounded-button'],
              }}
              onClick={() => {}}
              rippleProps={{
                color: 'rgba(42, 42, 95, .35)',
              }}
              type={'text'}
              block={true}
              icon={<Line.AttachFile size={24} />}
              rounded={true}
            />
          </div>
          <form
            className={[
              styles['message-form'],
              styles['message-form-desktop'],
            ].join(' ')}
            onSubmit={(e) => {
              e.preventDefault();
              onMessageSubmit(e);
            }}
          >
            <div
              className={[
                styles['message-input-root'],
                styles['message-input-root-desktop'],
              ].join(' ')}
            >
              <Input
                inputRef={messageInputRef}
                value={chatProps.messageInput}
                classNames={{
                  formLayout: {
                    root: [
                      styles['message-form-layout'],
                      styles['message-form-layout-desktop'],
                    ].join(' '),
                  },
                  container: [
                    styles['message-input-container'],
                    styles['message-input-container-desktop'],
                  ].join(' '),
                  input: [
                    styles['message-input'],
                    styles['message-input-desktop'],
                  ].join(' '),
                }}
                autoFocus={true}
                placeholder={t('message') ?? ''}
                onChange={(event) =>
                  ChatController.updateMessageInput(event.target.value)
                }
              />
            </div>
            <div>
              <Button
                classNames={{
                  container: styles['rounded-container'],
                  button: styles['rounded-button'],
                }}
                onClick={() => {}}
                rippleProps={{
                  color: 'rgba(42, 42, 95, .35)',
                }}
                type={'text'}
                block={true}
                icon={<Line.Send size={24} />}
                htmlType={'submit'}
                rounded={true}
                disabled={chatProps.messageInput.length <= 0}
              />
            </div>
          </form>
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
