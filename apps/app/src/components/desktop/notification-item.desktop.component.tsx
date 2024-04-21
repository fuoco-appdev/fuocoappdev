import { Button } from '@fuoco.appdev/core-ui';
import { Order } from '@medusajs/medusa';
import { useTranslation } from 'react-i18next';
import styles from '../notification-item.module.scss';
// @ts-ignore
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../route-paths';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function NotificationItemDesktopComponent({
  notification,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (notification.resourceType === 'order') {
    const order = JSON.parse(notification.data) as Order | undefined;
    return (
      <ResponsiveDesktop>
        <div className={[styles['root'], styles['root-desktop']].join(' ')}>
          <div
            className={[styles['details'], styles['details-desktop']].join(' ')}
          >
            <div
              className={[
                styles['thumbnail'],
                styles['thumbnail-desktop'],
              ].join(' ')}
            >
              {!order?.items?.[0]?.thumbnail && (
                <img
                  className={[
                    styles['no-thumbnail-image'],
                    styles['no-thumbnail-image-desktop'],
                  ].join(' ')}
                  src={'../assets/images/wine-bottle.png'}
                />
              )}
              {order?.items?.[0]?.thumbnail && (
                <img
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-desktop'],
                  ].join(' ')}
                  src={order.items?.[0]?.thumbnail}
                />
              )}
            </div>
            <div
              className={[
                styles['message-container'],
                styles['message-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[styles['message'], styles['message-desktop']].join(
                  ' '
                )}
              >
                {notification.eventName === 'order.placed' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-desktop'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderPlacedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderPlacedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.shipped' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-desktop'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderShippedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderShippedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.returned' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-desktop'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderReturnedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderReturnedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.canceled' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-desktop'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderCanceledName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderCanceledDescription')}
                  </div>
                )}
              </div>
              <div
                className={[
                  styles['message-date'],
                  styles['message-date-desktop'],
                ].join(' ')}
              >
                {moment(notification.createdAt)
                  .locale(i18n.language)
                  .calendar()}
              </div>
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-desktop'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: [styles['secondary-button']].join(' '),
              }}
              size={'medium'}
              rippleProps={{
                color: 'rgba(42, 42, 95, .35)',
              }}
              onClick={() =>
                setTimeout(
                  () =>
                    navigate(`${RoutePathsType.OrderConfirmed}/${order?.id}`),
                  150
                )
              }
            >
              {t('view')}
            </Button>
          </div>
        </div>
      </ResponsiveDesktop>
    );
  }

  return (
    <ResponsiveDesktop>
      <div />
    </ResponsiveDesktop>
  );
}
