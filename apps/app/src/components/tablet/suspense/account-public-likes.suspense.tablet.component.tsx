import Skeleton from 'react-loading-skeleton';
import styles from '../../account-public-likes.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import { ProductPreviewSuspenseTabletComponent } from './product-preview.suspense.tablet.component';

export function AccountPublicLikesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['likes-text-container-skeleton'],
            styles['likes-text-container-skeleton-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text-skeleton'],
              styles['likes-text-skeleton-tablet'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-tablet'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseTabletComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
