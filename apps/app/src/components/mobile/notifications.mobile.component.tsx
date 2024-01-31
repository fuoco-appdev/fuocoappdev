import { useNavigate } from 'react-router-dom';
import NotificationsController from '../../controllers/notifications.controller';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';

export default function NotificationsMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(NotificationsController.model.store);

  return (
    <ResponsiveMobile>
      <div />
    </ResponsiveMobile>
  );
}
