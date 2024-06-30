import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import styles from '../../settings.module.scss';

export default function SettingsSuspenseDesktopComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseDesktop>
            <div className={[styles['root'], styles['root-desktop']].join(' ')}>
                <div
                    className={[styles['side-bar'], styles['side-bar-desktop']].join(' ')}
                >
                    <Skeleton width={'100%'} height={56} />
                </div>
                <div
                    className={[
                        styles['outlet-container'],
                        styles['outlet-container-desktop'],
                    ].join(' ')}
                >

                </div>
            </div>
        </ResponsiveSuspenseDesktop>
    );
}
