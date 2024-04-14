import Skeleton from 'react-loading-skeleton';
import styles from '../../cart-item.module.scss';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function CartItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div
        className={[styles['container'], styles['container-tablet']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-tablet']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-tablet']].join(
              ' '
            )}
          >
            <Skeleton
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-tablet'],
              ].join(' ')}
              width={56}
              height={56}
            />
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['title'], styles['title-tablet']].join(' ')}
              width={140}
              borderRadius={20}
            />
            <Skeleton
              className={[styles['variant'], styles['variant-tablet']].join(
                ' '
              )}
              width={80}
              borderRadius={20}
            />
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-tablet'],
                ].join(' ')}
                width={80}
                borderRadius={20}
              />
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-tablet'],
                ].join(' ')}
              >
                <Skeleton height={28} width={28} borderRadius={24} />
                <Skeleton
                  className={[
                    styles['quantity'],
                    styles['quantity-tablet'],
                  ].join(' ')}
                  width={40}
                  borderRadius={20}
                />
                <Skeleton height={28} width={28} borderRadius={24} />
              </div>
            </div>
          </div>
          <div
            className={[
              styles['remove-container'],
              styles['remove-container-tablet'],
            ].join(' ')}
          >
            <Skeleton height={40} width={40} borderRadius={40} />
          </div>
        </div>
        <div
          className={[
            styles['pricing-details-container'],
            styles['pricing-details-container-tablet'],
          ].join(' ')}
        >
          <Skeleton
            className={[styles['pricing'], styles['pricing-tablet']].join(' ')}
            width={40}
            borderRadius={20}
          />
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
