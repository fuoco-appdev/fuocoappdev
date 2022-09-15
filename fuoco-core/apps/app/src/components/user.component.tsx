import React from 'react';
import styles from './user.module.scss';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';

export interface UserProps {
    navigate: NavigateFunction;
}

class UserComponent extends React.Component<UserProps> {
    constructor(props: UserProps) {
        super(props);

        this.onLocationChanged = this.onLocationChanged.bind(this);
    }

    public override componentDidMount(): void {}

    public override componentWillUnmount(): void {}

    public override render(): React.ReactNode {
        return (
            <div className={styles['root']}>
                <Outlet/>
            </div>
        );
    }

    private onLocationChanged(location: Location | undefined): void {}
}

export default function ReactiveUserComponent(): JSX.Element {
    const navigate = useNavigate();

    return (<UserComponent navigate={navigate}/>);
}