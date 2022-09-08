import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface WorldProps {
    isVisible?: boolean;
}

export class WorldModel extends Model {
    constructor() {
        super(createStore(
            {name: 'world'},
            withProps<WorldProps>({
                isVisible: true,
            }),
        ));
    }

    public get isVisible(): boolean {
        return this.store.getValue().isVisible;
    }

    public set isVisible(isVisible: boolean) {
        this.store.update((state) => ({...state, isVisible: isVisible}));
    }
}