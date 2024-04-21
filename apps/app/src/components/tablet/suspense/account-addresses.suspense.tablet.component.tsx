import { ResponsiveSuspenseTablet } from '../../../components/responsive.component';
import styles from '../../account-addresses.module.scss';
import { AddressItemSuspenseTabletComponent } from './address-item.suspense.tablet.component';

export function AccountAddressesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-tablet'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseTabletComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
