import styles from '../../chats.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function ChatsSuspenseDesktopComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseDesktop>
            <div className={[styles['root'], styles['root-desktop']].join(' ')} />
        </ResponsiveSuspenseDesktop>
    );
}
