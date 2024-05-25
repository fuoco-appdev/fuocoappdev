import { useObservable } from '@ngneat/use-observable';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import { RoutePathsType } from '../route-paths';

export interface AuthenticatedProps {
  children: any;
}

export function AuthenticatedComponent({
  children,
}: AuthenticatedProps): React.ReactElement {
  const [cookies] = useCookies();
  const [windowProps] = useObservable(WindowController.model.store);
  const accessToken =
    Object.keys(cookies).includes('sb-access-token') &&
    cookies['sb-access-token'];
  const refreshToken =
    Object.keys(cookies).includes('sb-refresh-token') &&
    cookies['sb-refresh-token'];
  return accessToken && refreshToken && windowProps.isAuthenticated ? (
    children
  ) : (
    <Navigate to={RoutePathsType.Signin} />
  );
}
