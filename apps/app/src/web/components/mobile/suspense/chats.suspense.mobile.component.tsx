import styles from '../../../modules/cart.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function ChatsSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')} />
    </ResponsiveSuspenseMobile>
  );
}
