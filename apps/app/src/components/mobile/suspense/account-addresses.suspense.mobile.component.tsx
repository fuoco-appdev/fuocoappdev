import styles from '../../account-addresses.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { AddressItemSuspenseMobileComponent } from './address-item.suspense.mobile.component';

export function AccountAddressesSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-mobile'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
