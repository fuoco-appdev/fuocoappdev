import { Avatar } from '@fuoco.appdev/core-ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Ripples from 'react-ripples';
import { ChatMessageItemResponsiveProps } from '../chat-message-item.component';
import styles from '../chat-message-item.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatMessageItemDesktopComponent({
  accountProps,
  chat,
  accounts,
  lastMessage,
  accountPresence,
  profileUrls,
  seen,
  onClick,
}: ChatMessageItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveDesktop>
      <Ripples
        color={'rgba(42, 42, 95, .35)'}
        className={[styles['ripples'], styles['ripples-desktop']].join(' ')}
        onClick={onClick}
      >
        <div className={[styles['root'], styles['root-desktop']].join(' ')}>
          <div
            className={[
              styles['left-content'],
              styles['left-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['avatars'], styles['avatars-desktop']].join(
                ' '
              )}
            >
              {accounts?.map((account, index) => {
                const profileUrl = profileUrls[account.id ?? ''];
                const presence = accountPresence?.find((value) => value.account_id === account.id);
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
                          index > 0 && styles['avatar-container-margin']
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
                styles['message-info-container'],
                styles['message-info-container-desktop'],
              ].join(' ')}
            >
              {
                <div
                  className={[
                    styles['username'],
                    styles['username-desktop'],
                  ].join(' ')}
                >
                  {accounts?.length > 0 && chat.type === 'private' && (
                    <div
                      className={[
                        styles['full-name'],
                        styles['full-name-desktop'],
                      ].join(' ')}
                    >
                      {`${accounts[0]?.customer?.first_name} ${accounts[0]?.customer?.last_name}`}
                    </div>
                  )}
                </div>
              }
              <div
                className={[
                  styles['last-message'],
                  styles['last-message-desktop'],
                  !seen && styles['last-message-unseen'],
                ].join(' ')}
              >
                {lastMessage ? lastMessage.message : t('startMessaging')}
              </div>
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-desktop'],
            ].join(' ')}
          >
            {lastMessage && (
              <div
                className={[
                  styles['message-date'],
                  styles['message-date-desktop'],
                ].join(' ')}
              >
                {moment(lastMessage?.createdAt)
                  .locale(i18n.language)
                  .fromNow(true)}
              </div>
            )}
          </div>
        </div>
      </Ripples>
    </ResponsiveDesktop>
  );
}
