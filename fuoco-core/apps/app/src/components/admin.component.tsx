import styles from './user.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {RoutePaths} from '../route-paths';

export default function AdminComponent(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === RoutePaths.Admin) {
            navigate(RoutePaths.AdminAccount);
        }
    }, [location]);

    return (
        <div className={styles['root']}>
            <Outlet/>
        </div>
    );
}