import styles from '../../cart.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function ChatsSuspenseTabletComponent(): JSX.Element {
    return (
        <ResponsiveSuspenseTablet>
            <div className={[styles['root'], styles['root-tablet']].join(' ')} />
        </ResponsiveSuspenseTablet>
    );
}
