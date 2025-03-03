import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import { ResponsiveDesktop } from '../responsive.component';

function NotificationItemDesktopComponent({
  notification,
  fromNow,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveDesktop>
      <div />
    </ResponsiveDesktop>
  );
}

export default observer(NotificationItemDesktopComponent);
