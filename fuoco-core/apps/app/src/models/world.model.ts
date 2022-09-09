import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import {Model} from '../model';

export interface WorldProps {
    location?: Location;
    isVisible?: boolean;
}

export class WorldModel extends Model {
    constructor() {
        super(createStore(
            {name: 'world'},
            withProps<WorldProps>({
                location: undefined,
                isVisible: true,
            }),
        ));
    }

    public get location(): Location {
        return this.store.getValue().location;
    }

    public set location(location: Location) {
        this.store.update((state) => ({...state, location: location}));
    }

    public get isVisible(): boolean {
        return this.store.getValue().isVisible;
    }

    public set isVisible(isVisible: boolean) {
        this.store.update((state) => ({...state, isVisible: isVisible}));
    }
}