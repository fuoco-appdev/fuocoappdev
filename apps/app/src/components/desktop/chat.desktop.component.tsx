import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { Avatar } from '@fuoco.appdev/core-ui';
import moment from 'moment';
import { ChatResponsiveProps } from '../chat.component';
import styles from '../chat.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatDesktopComponent({
    chatProps,
    accounts,
    profileUrls,
    accountPresence,
}: ChatResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveDesktop>
            <div className={[styles['root'], styles['root-desktop']].join(' ')}>
                <div
                    className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
                >
                    <div
                        className={[styles['avatars'], styles['avatars-desktop']].join(' ')}
                    >
                        {accounts?.map((account) => {
                            const profileUrl = profileUrls[account.id ?? ''];
                            const presence = accountPresence.find((value) => value.account_id === account.id);
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
                            {accountPresence.length > 0 && !accountPresence[0].is_online && t('lastSeen', { time: moment(accountPresence[0].last_seen).fromNow(true) })}
                            {accountPresence.length > 0 && accountPresence[0].is_online && t('activeNow')}
                        </div>
                    </div>
                </div>
                <div className={[styles['message-container'], styles['message-container-desktop']].join(' ')}>

                </div>
            </div>
        </ResponsiveDesktop>
    );
}
