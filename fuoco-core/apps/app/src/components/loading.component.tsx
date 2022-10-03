import {useEffect} from 'react';
import { NavigateFunction } from 'react-router-dom';
import WorldController from '../controllers/world.controller';
import WindowController from '../controllers/window.controller';

export interface LoadingProps {
    navigate: NavigateFunction;
}

export default function LoadingComponent(): JSX.Element {
    WorldController.updateIsVisible(false);
    WindowController.updateIsSigninVisible(false);
    WindowController.updateIsSignupVisible(false);

    useEffect(() => {
        WorldController.updateIsVisible(true);
    }, []);

    return (
        <div></div>
    );
}