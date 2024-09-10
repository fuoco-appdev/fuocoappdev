import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/settings.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

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
