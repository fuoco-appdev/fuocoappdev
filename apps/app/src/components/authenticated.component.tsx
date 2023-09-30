import { Navigate } from 'react-router-dom';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import { RoutePathsType } from '../route-paths';

export interface AuthenticatedProps {
  children: any;
}

export function AuthenticatedComponent({
  children,
}: AuthenticatedProps): React.ReactElement {
  const [props] = useObservable(WindowController.model.store);
  return props.isAuthenticated ? (
    children
  ) : (
    <Navigate to={RoutePathsType.Signin} />
  );
}
