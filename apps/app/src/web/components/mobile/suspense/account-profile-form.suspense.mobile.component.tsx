import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/account-profile-form.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function AccountProfileFormSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-mobile'],
        ].join(' ')}
      >
        <div className={styles['input-root-skeleton']}>
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            height={20}
            width={120}
            borderRadius={20}
          />
          <Skeleton style={{ height: 44 }} borderRadius={6} />
        </div>
        <div className={styles['input-root-skeleton']}>
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            height={20}
            width={120}
            borderRadius={20}
          />
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            style={{ height: 44 }}
            borderRadius={6}
          />
        </div>
      </div>
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ width: '100%', height: 44 }} borderRadius={6} />
      </div>
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ width: '100%', height: 44 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseMobile>
  );
}
