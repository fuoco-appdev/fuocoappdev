import styles from '../../../modules/account-addresses.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { AddressItemSuspenseDesktopComponent } from './address-item.suspense.desktop.component';

export function AccountAddressesSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-desktop'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseDesktopComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
