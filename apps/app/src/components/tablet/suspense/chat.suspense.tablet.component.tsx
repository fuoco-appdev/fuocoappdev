import styles from '../../chat.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function ChatSuspenseTabletComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseTablet>
            <div className={[styles['root'], styles['root-tablet']].join(' ')} />
        </ResponsiveSuspenseTablet>
    );
}
