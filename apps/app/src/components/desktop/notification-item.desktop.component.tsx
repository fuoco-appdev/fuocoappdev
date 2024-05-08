import { useTranslation } from 'react-i18next';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function NotificationItemDesktopComponent({
  notification,
  fromNow
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveDesktop>
      <div />
    </ResponsiveDesktop>
  );
}
