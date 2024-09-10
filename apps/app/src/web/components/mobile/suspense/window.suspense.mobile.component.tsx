import { Outlet } from 'react-router-dom';
import styles from '../../../modules/window.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function WindowSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          <div style={{ minWidth: '100%', minHeight: '100%' }}>
            <Outlet />
          </div>
        </div>
        <div className={[styles['bottom-bar-container-mobile']].join(' ')}>
          <div className={[styles['bottom-bar-mobile']].join(' ')}></div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
