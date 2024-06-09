import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../route-paths';
// @ts-ignore
import { Avatar } from '@fuoco.appdev/core-ui';
import { ChatResponsiveProps } from '../chat.component';
import styles from '../chat.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatDesktopComponent({
    chatProps,
    accounts,
    profileUrls
}: ChatResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveDesktop>
            <div className={[styles['root'], styles['root-desktop']].join(' ')}>
                <div className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}>
                    <div
                        className={[styles['avatars'], styles['avatars-desktop']].join(
                            ' '
                        )}
                    >
                        {accounts?.map((account) => {
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
                            );
                        })}
                    </div>
                    <div className={[styles['top-bar-text-container'], styles['top-bar-text-container-desktop']].join(' ')}>

                        <div
                            className={[
                                styles['top-bar-title'],
                                styles['top-bar-title-desktop'],
                            ].join(' ')}
                        >
                            {accounts?.length > 0 && chatProps.selectedChat?.type === 'private' && (
                                accounts[0]?.username
                            )}
                        </div>
                        <div className={[
                            styles['top-bar-subtitle'],
                            styles['top-bar-subtitle-desktop'],
                        ].join(' ')}>
                            {t('lastSeen', { time: '' })}
                        </div>
                    </div>
                </div>
            </div>
        </ResponsiveDesktop>
    );
}
