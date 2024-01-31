import { useNavigate } from 'react-router-dom';
import NotificationsController from '../../controllers/notifications.controller';
import { useObservable } from '@ngneat/use-observable';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from '../responsive.component';

export default function NotificationsTabletComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(NotificationsController.model.store);

  return (
    <ResponsiveTablet>
      <div />
    </ResponsiveTablet>
  );
}
