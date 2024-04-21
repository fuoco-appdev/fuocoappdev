import styles from '../../account-likes.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';
import { ProductPreviewSuspenseTabletComponent } from './product-preview.suspense.tablet.component';

export function AccountLikesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
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
