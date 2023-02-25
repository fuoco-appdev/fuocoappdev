import styles from './user.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountService from '../services/account.service';
import { RoutePaths } from '../route-paths';
import * as core from '../protobuf/core_pb';

export default function UserComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === RoutePaths.User) {
      if (
        AccountService.activeAccount?.requestStatus !== core.RequestStatus.IDLE
      ) {
        navigate(RoutePaths.Account);
      } else {
        navigate(RoutePaths.GetStarted);
      }
    } else if (location.pathname === RoutePaths.GetStarted) {
      if (
        AccountService.activeAccount?.requestStatus !== core.RequestStatus.IDLE
      ) {
        navigate(RoutePaths.Account);
      }
    } else if (location.pathname !== RoutePaths.GetStarted) {
      if (
        AccountService.activeAccount?.requestStatus === core.RequestStatus.IDLE
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
