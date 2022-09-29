import styles from './user.module.scss';
import { Outlet } from 'react-router-dom';

export default function ReactiveUserComponent(): JSX.Element {
    return (
        <div className={styles['root']}>
            <Outlet/>
        </div>
    );
}