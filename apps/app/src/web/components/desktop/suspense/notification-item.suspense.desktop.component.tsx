import Skeleton from 'react-loading-skeleton';
import styles from '../../../modules/notification-item.module.scss';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function NotificationItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['details'], styles['details-desktop']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-desktop']].join(
              ' '
            )}
          >
            <Skeleton
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              width={40}
              height={40}
              borderRadius={40}
            />
          </div>
          <div
            className={[
              styles['message-container'],
              styles['message-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['message'], styles['message-desktop']].join(
                ' '
              )}
              width={140}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['message-date'],
                styles['message-date-desktop'],
              ].join(' ')}
              width={80}
              borderRadius={14}
            />
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 80, height: 38 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
