import { useTranslation } from 'react-i18next';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveMobile } from '../responsive.component';

export default function NotificationItemMobileComponent({
  notification,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveMobile>
      <div />
    </ResponsiveMobile>
  );
}
