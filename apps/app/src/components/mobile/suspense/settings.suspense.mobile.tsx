import Skeleton from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import styles from '../../settings.module.scss';

export default function SettingsSuspenseMobileComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseMobile>
            <div className={[styles['root'], styles['root-mobile']].join(' ')}>
                <Skeleton width={'100%'} height={48} />
                <div
                    className={[
                        styles['bottom-content-container'],
                        styles['bottom-content-container-mobile'],
                    ].join(' ')}
                >
                    <Skeleton width={'100%'} height={48} />
                </div>
            </div>
        </ResponsiveSuspenseMobile>
    );
}
