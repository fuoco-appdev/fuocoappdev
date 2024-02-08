import { useNavigate } from 'react-router-dom';
import NotificationsController from '../../controllers/notifications.controller';
import { useObservable } from '@ngneat/use-observable';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from '../responsive.component';
import { NotificationsResponsiveProps } from '../notifications.component';
import { createRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../notifications.module.scss';
import { Line } from '@fuoco.appdev/core-ui';
import { AccountNotificationResponse } from '../../protobuf/core_pb';
import moment from 'moment';
import NotificationItemComponent from '../notification-item.component';

export default function NotificationsTabletComponent({
  notificationsProps,
  fromNowRef,
  onScroll,
  onLoad,
}: NotificationsResponsiveProps): JSX.Element {
  const scrollContainerRef = createRef<HTMLDivElement>();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-tablet'],
            ].join(' ')}
          >
            <Line.Notifications size={24} />
            <div
              className={[styles['title'], styles['title-tablet']].join(' ')}
            >
              {t('notifications')}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          onScroll={(e) => {
            onScroll(e);
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = e.currentTarget.scrollTop;
            if (prevPreviewScrollTop > scrollTop) {
              yPosition += prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition -= scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = e.currentTarget.scrollTop;
          }}
          ref={scrollContainerRef}
          onLoad={onLoad}
        >
          {notificationsProps.accountNotifications.map(
            (notification: AccountNotificationResponse, index: number) => {
              const fromNowCurrent = moment(notification?.createdAt)
                .locale(i18n.language)
                .startOf('day')
                .fromNow();
              let showDate = false;
              if (fromNowRef.current !== fromNowCurrent) {
                showDate = true;
                fromNowRef.current = fromNowCurrent;
              }
              return (
                <>
                  {showDate && (
                    <div
                      className={[
                        styles['from-now-date'],
                        styles['from-now-date-tablet'],
                      ].join(' ')}
                    >
                      {fromNowCurrent}
                    </div>
                  )}
                  <NotificationItemComponent
                    key={notification.id}
                    notification={notification}
                    fromNow={fromNowCurrent}
                  />
                </>
              );
            }
          )}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight:
                notificationsProps.hasMoreNotifications ||
                notificationsProps.isLoading
                  ? 24
                  : 0,
            }}
          />
          {!notificationsProps.isLoading &&
            notificationsProps.accountNotifications.length <= 0 && (
              <div
                className={[
                  styles['no-notifications-container'],
                  styles['no-notifications-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-tablet'],
                  ].join(' ')}
                >
                  {t('noNotifications')}
                </div>
              </div>
            )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}