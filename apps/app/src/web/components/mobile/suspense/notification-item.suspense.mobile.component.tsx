import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/notification-item.module.scss';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function NotificationItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['details'], styles['details-mobile']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
              ' '
            )}
          >
            <Skeleton
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-mobile'],
              ].join(' ')}
              width={40}
              height={40}
              borderRadius={40}
            />
          </div>
          <div
            className={[
              styles['message-container'],
              styles['message-container-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['message'], styles['message-mobile']].join(
                ' '
              )}
              width={140}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['message-date'],
                styles['message-date-mobile'],
              ].join(' ')}
              width={80}
              borderRadius={14}
            />
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-mobile'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 52, height: 34 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
