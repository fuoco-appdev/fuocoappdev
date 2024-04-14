import styles from '../../account-likes.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { ProductPreviewSuspenseMobileComponent } from './product-preview.suspense.mobile.component';

export function AccountLikesSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['items-container'],
            styles['items-container-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
