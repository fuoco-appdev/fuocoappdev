import { Line, Scroll } from '@fuoco.appdev/core-ui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationsController from '../../controllers/notifications.controller';
import NotificationItemComponent from '../notification-item.component';
import { NotificationsResponsiveProps } from '../notifications.component';
import styles from '../notifications.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function NotificationsMobileComponent({
  notificationsProps,
  notifications,
  onScroll,
  onLoad,
}: NotificationsResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-mobile'],
            ].join(' ')}
          >
            <Line.Notifications size={24} />
            <div
              className={[styles['title'], styles['title-mobile']].join(' ')}
            >
              {t('notifications')}
            </div>
          </div>
        </div>
        <Scroll
          classNames={{
            scrollContainer: [styles['scroll-container'], styles['scroll-container-mobile']].join(' '),
            reloadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' '),
            loadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' '),
            pullIndicator: [styles['pull-indicator'], styles['pull-indicator-mobile']].join(' ')
          }}
          touchScreen={true}
          loadingHeight={56}
          reloadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isLoadable={notificationsProps.hasMoreNotifications}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={<div className={[styles['pull-indicator-container']].join(' ')}><Line.ArrowDownward size={24} /></div>}
          isReloading={notificationsProps.isReloading}
          onReload={() => NotificationsController.reloadNotificationsAsync()}
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isLoading={notificationsProps.isLoading}
          onLoad={() => NotificationsController.onNextScrollAsync()}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = contentRef.current?.getBoundingClientRect().top ?? 0;
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
              styles['scroll-content-mobile'],
            ].join(' ')}
            ref={scrollContainerRef}
            onLoad={onLoad}
          >
            {Object.keys(notifications).map(
              (key: string) => {
                const notificationList = notifications[key];
                return (
                  <div className={[styles['notifications-item'], styles['notifications-item-mobile']].join(' ')}>
                    <div
                      className={[
                        styles['from-now-date'],
                        styles['from-now-date-mobile'],
                      ].join(' ')}
                    >
                      {key}
                    </div>
                    {notificationList.map((notification) => (<NotificationItemComponent
                      key={notification.id}
                      notification={notification}
                      notificationsProps={notificationsProps}
                      fromNow={key}
                    />))}
                  </div>
                );
              }
            )}
            {!notificationsProps.isLoading &&
              notificationsProps.accountNotifications.length <= 0 && (
                <div
                  className={[
                    styles['no-notifications-container'],
                    styles['no-notifications-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['no-items-text'],
                      styles['no-items-text-mobile'],
                    ].join(' ')}
                  >
                    {t('noNotifications')}
                  </div>
                </div>
              )}
          </div>
        </Scroll>
      </div>
    </ResponsiveMobile>
  );
}
