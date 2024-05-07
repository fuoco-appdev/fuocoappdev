import { useObservable } from '@ngneat/use-observable';
import { Navigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';

export interface GuestProps {
  children: any;
}

export function GuestComponent({ children }: GuestProps): React.ReactElement {
  const [windowProps] = useObservable(WindowController.model.store);
  return !windowProps.isAuthenticated ? (
    children
  ) : (
    <Navigate to={windowProps.loadedLocationPath} />
  );
}
