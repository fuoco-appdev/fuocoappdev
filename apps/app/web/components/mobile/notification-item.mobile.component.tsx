import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveMobile } from '../responsive.component';

function NotificationItemMobileComponent({
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

export default observer(NotificationItemMobileComponent);
