import styles from '../../../modules/account-likes.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { ProductPreviewSuspenseDesktopComponent } from './product-preview.suspense.desktop.component';

export function AccountLikesSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['items-container'],
            styles['items-container-desktop'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseDesktopComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
