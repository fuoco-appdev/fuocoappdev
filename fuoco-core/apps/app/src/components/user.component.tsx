import styles from './user.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import UserService from '../services/user.service';
import { RoutePaths } from '../route-paths';
import * as core from '../protobuf/core_pb';

export default function UserComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (location.pathname === RoutePaths.User) {
      if (
        UserService.activeUser?.requestStatus !== core.UserRequestStatus.IDLE
      ) {
        navigate(RoutePaths.Account);
      } else {
        navigate(RoutePaths.GetStarted);
      }
    } else if (location.pathname === RoutePaths.GetStarted) {
      if (
        UserService.activeUser?.requestStatus !== core.UserRequestStatus.IDLE
      ) {
        navigate(RoutePaths.Account);
      }
    } else if (location.pathname !== RoutePaths.GetStarted) {
      if (
        UserService.activeUser?.requestStatus === core.UserRequestStatus.IDLE
      ) {
        navigate(RoutePaths.GetStarted);
      }
    }
  }, [location]);

  return (
    <div className={styles['root']}>
      <Outlet />
    </div>
  );
}
