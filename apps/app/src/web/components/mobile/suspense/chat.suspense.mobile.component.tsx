import styles from '../../chat.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function ChatSuspenseMobileComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseMobile>
            <div className={[styles['root'], styles['root-mobile']].join(' ')} />
        </ResponsiveSuspenseMobile>
    );
}
