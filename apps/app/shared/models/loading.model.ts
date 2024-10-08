import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface LoadingState {
    isLoading: boolean;
}

export class LoadingModel extends Model {
    constructor() {
        super(createStore(
            {name: 'loading'},
            withProps<LoadingState>({
                isLoading: false,
            }),
        ));
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
