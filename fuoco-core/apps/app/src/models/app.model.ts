import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface AppState {
    isLoading: boolean;
}

export class AppModel extends Model {
    constructor() {
        super(createStore(
            {name: 'app'},
            withProps<AppState>({
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