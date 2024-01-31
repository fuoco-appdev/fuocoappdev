import { useNavigate } from 'react-router-dom';
import NotificationsController from '../../controllers/notifications.controller';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop } from '../responsive.component';

export default function NotificationsDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(NotificationsController.model.store);

  return (
    <ResponsiveDesktop>
      <div />
    </ResponsiveDesktop>
  );
}
