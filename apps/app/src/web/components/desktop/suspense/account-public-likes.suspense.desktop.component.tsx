import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/account-public-likes.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { ProductPreviewSuspenseDesktopComponent } from './product-preview.suspense.desktop.component';

export function AccountPublicLikesSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['likes-text-container-skeleton'],
            styles['likes-text-container-skeleton-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text-skeleton'],
              styles['likes-text-skeleton-desktop'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
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
