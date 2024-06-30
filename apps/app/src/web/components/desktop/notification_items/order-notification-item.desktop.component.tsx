import { Button } from "@fuoco.appdev/core-ui";
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutePathsType } from "../../../route-paths";
import { OrderNotificationItemProps } from "../../notification-item.component";
import styles from '../../notification-item.module.scss';
import { ResponsiveDesktop } from "../../responsive.component";

export default function OrderNotificationItemDesktopComponent({ notification, fromNow, order }: OrderNotificationItemProps): JSX.Element {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
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
                                <span
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-desktop'],
                                    ].join(' ')}
                                >
                                    <span className={[styles['message-bold']].join(' ')}>
                                        {t('orderPlacedName', {
                                            displayId: order?.display_id ?? 0,
                                        })}
                                    </span>
                                    &nbsp;
                                    {t('orderPlacedDescription')}
                                </span>
                            )}
                            {notification.eventName === 'order.shipped' && (
                                <span
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-desktop'],
                                    ].join(' ')}
                                >
                                    <span className={[styles['message-bold']].join(' ')}>
                                        {t('orderShippedName', {
                                            displayId: order?.display_id ?? 0,
                                        })}
                                    </span>
                                    &nbsp;
                                    {t('orderShippedDescription')}
                                </span>
                            )}
                            {notification.eventName === 'order.returned' && (
                                <span
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-desktop'],
                                    ].join(' ')}
                                >
                                    <span className={[styles['message-bold']].join(' ')}>
                                        {t('orderReturnedName', {
                                            displayId: order?.display_id ?? 0,
                                        })}
                                    </span>
                                    &nbsp;
                                    {t('orderReturnedDescription')}
                                </span>
                            )}
                            {notification.eventName === 'order.canceled' && (
                                <span
                                    className={[
                                        styles['message-content'],
                                        styles['message-content-desktop'],
                                    ].join(' ')}
                                >
                                    <span className={[styles['message-bold']].join(' ')}>
                                        {t('orderCanceledName', {
                                            displayId: order?.display_id ?? 0,
                                        })}
                                    </span>
                                    &nbsp;
                                    {t('orderCanceledDescription')}
                                </span>
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
                                .subtract(6, 'days').calendar()}
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