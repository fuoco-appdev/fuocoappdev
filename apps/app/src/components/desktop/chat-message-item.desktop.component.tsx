import { Avatar } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { ChatMessageItemResponsiveProps } from '../chat-message-item.component';
import styles from '../chat-message-item.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatMessageItemDesktopComponent({
  chatProps,
  chat,
  profileUrls,
  onClick,
}: ChatMessageItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div
        className={[styles['root'], styles['root-desktop']].join(' ')}
        onClick={onClick}
      >
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <div className={[styles['avatars'], styles['avatars-desktop']].join(' ')}>
            {chat.accounts?.map((account) => {
              const profileUrl = profileUrls[account.id ?? ''];
              return (
                <Avatar
                  classNames={{
                    container: [
                      styles['avatar-container'],
                      styles['avatar-container-desktop'],
                    ].join(' '),
                  }}
                  size={'custom'}
                  text={account.customer?.first_name}
                  src={profileUrl}
                />
              )
            })}
          </div>
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-desktop']].join(
                ' '
              )}
            >
              {/* {account.username && account.username}
              {!account.username && (
                <Skeleton
                  count={1}
                  borderRadius={20}
                  height={20}
                  width={80}
                  className={[
                    styles['skeleton-user'],
                    styles['skeleton-user-desktop'],
                  ].join(' ')}
                />
              )} */}
            </div>
            {/* {account.customer && (
              <div
                className={[
                  styles['full-name'],
                  styles['full-name-desktop'],
                ].join(' ')}
              >
                {`${account.customer?.first_name} ${account.customer?.last_name}`}
              </div>
            )} */}
            {/* {!account.customer && (
              <Skeleton
                count={1}
                borderRadius={16}
                height={16}
                width={120}
                className={[
                  styles['full-name'],
                  styles['full-name-desktop'],
                ].join(' ')}
              />
            )} */}
          </div>
        </div>
      </div>
    </ResponsiveDesktop>
  );
}
