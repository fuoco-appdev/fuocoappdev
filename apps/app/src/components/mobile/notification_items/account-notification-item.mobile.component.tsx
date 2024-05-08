import { Avatar, Button } from '@fuoco.appdev/core-ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { AccountNotificationItemProps } from '../../notification-item.component';
import styles from '../../notification-item.module.scss';
import { ResponsiveMobile } from '../../responsive.component';

export default function AccountNotificationItemMobileComponent({
    notification,
    fromNow,
    account,
    publicProfileUrl,
    isFollowing,
    isAccepted,
    onFollow,
    onRequested,
    onUnfollow,
}: AccountNotificationItemProps): JSX.Element {
    const { t, i18n } = useTranslation();
    return (
        <ResponsiveMobile>
            <div className={[styles['root'], styles['root-mobile']].join(' ')}>
                <div
                    className={[styles['details'], styles['details-mobile']].join(' ')}
                >
                    <div
                        className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
                            ' '
                        )}
                    >
                        <Avatar
                            classNames={{
                                container: styles['avatar-icon'],
                            }}
                            text={account?.username}
                            src={publicProfileUrl}
                            size={'custom'}
                        />
                    </div>
                    <div
                        className={[
                            styles['message-container'],
                            styles['message-container-mobile'],
                        ].join(' ')}
                    >
                        <div
                            className={[styles['message'], styles['message-mobile']].join(
                                ' '
                            )}
                        >
                            {notification.eventName === 'account.accepted' && (
                                <div
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-mobile'],
                                    ].join(' ')}
                                >
                                    <div className={[styles['message-bold']].join(' ')}>
                                        {account?.username}
                                    </div>
                                    &nbsp;
                                    {t('accountFollowerAcceptedDescription')}
                                </div>
                            )}
                            {notification.eventName === 'account.following' && (
                                <div
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-mobile'],
                                    ].join(' ')}
                                >
                                    <div className={[styles['message-bold']].join(' ')}>
                                        {account?.username}
                                    </div>
                                    &nbsp;
                                    {t('accountFollowerFollowingDescription')}
                                </div>
                            )}
                        </div>
                        <div
                            className={[
                                styles['message-date'],
                                styles['message-date-mobile'],
                            ].join(' ')}
                        >
                            {moment(notification.createdAt).locale(i18n.language).calendar()}
                        </div>
                    </div>
                </div>
                <div
                    className={[
                        styles['right-content'],
                        styles['right-content-mobile'],
                    ].join(' ')}
                >
                    {!isFollowing && (
                        <Button
                            classNames={{
                                button: [
                                    styles['primary-button'],
                                    styles['primary-button-mobile'],
                                ].join(' '),
                            }}
                            rippleProps={{
                                color: 'rgba(42, 42, 95, .35)',
                            }}
                            size={'medium'}
                            type={'primary'}
                            onClick={onFollow}
                        >
                            {t('follow')}
                        </Button>
                    )}
                    {isFollowing && !isAccepted && (
                        <Button
                            classNames={{
                                button: [
                                    styles['secondary-button'],
                                    styles['secondary-button-mobile'],
                                ].join(' '),
                            }}
                            rippleProps={{
                                color: 'rgba(42, 42, 95, .35)',
                            }}
                            size={'medium'}
                            type={'secondary'}
                            onClick={onRequested}
                        >
                            {t('requested')}
                        </Button>
                    )}
                    {isFollowing && isAccepted && (
                        <Button
                            classNames={{
                                button: [
                                    styles['secondary-button'],
                                    styles['secondary-button-mobile'],
                                ].join(' '),
                            }}
                            rippleProps={{
                                color: 'rgba(42, 42, 95, .35)',
                            }}
                            size={'medium'}
                            type={'secondary'}
                            onClick={onUnfollow}
                        >
                            {t('following')}
                        </Button>
                    )}
                </div>
            </div>
        </ResponsiveMobile>
    );
}