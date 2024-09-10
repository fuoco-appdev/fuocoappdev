import styles from '../../modules/landing.module.scss';
import { LandingResponsiveProps } from '../landing.component';

export default function LandingDesktopComponent({}: LandingResponsiveProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}
