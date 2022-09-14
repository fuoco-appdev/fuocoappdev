import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';
import {Location} from 'history';

export interface LoadingState {
    location: Location | undefined;
}

export interface LoadingSessionState {
    isLoading: boolean;
}

export class LandingModel extends Model {
    constructor() {
        super(
            createStore(
                {name: 'loading'},
                withProps<LoadingState>({
                    location: undefined
                }),
            ),
            createStore(
                {name: 'session-loading'},
                withProps<LoadingSessionState>({
                    isLoading: false,
                }),
            ));
    }

    public get isLoading(): boolean {
        return this.sessionStore?.getValue().isLoading;
    }

    public set isLoading(isLoading: boolean) {
        if (this.isLoading !== isLoading) {
            this.sessionStore?.update((state) => ({...state, isLoading: isLoading}));
        }
    }

    public get location(): Location | undefined {
        return this.store.getValue().location;
    }

    public set location(location: Location | undefined) {
        if (this.location !== location) {
            this.store.update((state) => ({...state, location: location}));
        }
    }
}