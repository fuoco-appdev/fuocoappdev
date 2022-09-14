import { createStore, withProps } from '@ngneat/elf';
import { sessionStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import {Model} from '../model';

export interface LoadingState {
    isLoading: boolean;
}

export class LandingModel extends Model {
    constructor() {
        super(createStore(
            {name: 'loading'},
            withProps<LoadingState>({
                isLoading: false,
            }),
        ));

        persistState(this.store, {
            key: 'loading',
            storage: sessionStorageStrategy,
        });
    }

    public get isLoading(): boolean {
        return this.store.getValue().isLoading;
    }

    public set isLoading(isLoading: boolean) {
        if (this.isLoading !== isLoading) {
            this.store.update((state) => ({...state, isLoading: isLoading}));
        }
    }
}