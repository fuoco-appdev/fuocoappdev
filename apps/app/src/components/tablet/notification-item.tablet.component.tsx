import { useTranslation } from 'react-i18next';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveTablet } from '../responsive.component';

export default function NotificationItemTabletComponent({
  notification,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveTablet>
      <div />
    </ResponsiveTablet>
  );
}
