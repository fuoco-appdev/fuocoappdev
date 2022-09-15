import React from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import WorldController from '../controllers/world.controller';
import WindowController from '../controllers/window.controller';
import LoadingController from '../controllers/loading.controller';
import { skipWhile, Subscription } from 'rxjs';
import { select } from '@ngneat/elf';
import { RoutePaths } from '../route-paths';

export interface LoadingProps {
    navigate: NavigateFunction;
}

class LoadingComponent extends React.Component<LoadingProps> {
    private _locationSubscription: Subscription | undefined;

    constructor(props: LoadingProps) {
        super(props);

        this.onLocationChanged = this.onLocationChanged.bind(this);
    }

    public override componentDidMount(): void {
        WorldController.updateIsVisible(false);
        WindowController.updateIsSigninVisible(false);
        WindowController.updateIsSignupVisible(false);
        WindowController.updateIsSignoutVisible(false);
        
        this._locationSubscription = LoadingController.model.store
        .pipe(select((model => model.location)))
        .pipe(skipWhile((location: Location | undefined) => location === undefined))
        .subscribe(this.onLocationChanged);
    }

    public override componentWillUnmount(): void {
        WorldController.updateIsVisible(true);
        this._locationSubscription?.unsubscribe();
    }

    public override render(): React.ReactNode {
        return (
            <div></div>
        );
    }

    private onLocationChanged(location: Location | undefined): void {
        if (!location?.search.includes('#access_token=')) {
            LoadingController.updateIsLoading(false);
            setTimeout(() => this.props.navigate(RoutePaths.Signup), 100);
        }
    }
}

export default function ReactiveLoadingComponent(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    LoadingController.updateLocation(location);

    return (<LoadingComponent navigate={navigate}/>);
}