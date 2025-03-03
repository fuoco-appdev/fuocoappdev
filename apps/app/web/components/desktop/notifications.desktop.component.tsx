import { Line, Scroll } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/notifications.module.scss';
import { DIContext } from '../app.component';
import NotificationItemComponent from '../notification-item.component';
import { NotificationsResponsiveProps } from '../notifications.component';
import { ResponsiveDesktop } from '../responsive.component';

function NotificationsDesktopComponent({
  notifications,
  onScroll,
  onLoad,
}: NotificationsResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const { NotificationsController } = React.useContext(DIContext);
  const { hasMoreNotifications, isLoading, accountNotifications } =
    NotificationsController.model;
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
          >
            <Line.Notifications size={24} />
            <div
              className={[styles['title'], styles['title-desktop']].join(' ')}
            >
              {t('notifications')}
            </div>
          </div>
        </div>
        <Scroll
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          loadingHeight={56}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={
            <div className={[styles['pull-indicator-container']].join(' ')}>
              <Line.ArrowDownward size={24} />
            </div>
          }
          isLoadable={hasMoreNotifications}
          isLoading={isLoading}
          onLoad={() => NotificationsController.onNextScrollAsync()}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop =
              contentRef.current?.getBoundingClientRect().top ?? 0;
            if (prevPreviewScrollTop <= scrollTop) {
              yPosition -= prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition += scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = scrollTop;
          }}
        >
          <div
            className={[
              styles['scroll-content'],
              styles['scroll-content-desktop'],
            ].join(' ')}
            ref={scrollContainerRef}
            onLoad={onLoad}
          >
            {Object.keys(notifications).map((key: string) => {
              const notificationList = notifications[key];
              return (
                <div
                  className={[
                    styles['notifications-item'],
                    styles['notifications-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['from-now-date'],
                      styles['from-now-date-desktop'],
                    ].join(' ')}
                  >
                    {key}
                  </div>
                  {notificationList.map((notification) => (
                    <NotificationItemComponent
                      key={notification.id}
                      notification={notification}
                      fromNow={key}
                    />
                  ))}
                </div>
              );
            })}
            {!isLoading && accountNotifications.length <= 0 && (
              <div
                className={[
                  styles['no-notifications-container'],
                  styles['no-notifications-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-desktop'],
                  ].join(' ')}
                >
                  {t('noNotifications')}
                </div>
              </div>
            )}
          </div>
        </Scroll>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(NotificationsDesktopComponent);
