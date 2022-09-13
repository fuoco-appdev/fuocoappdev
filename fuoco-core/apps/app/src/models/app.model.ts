import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface AppState {}

export class AppModel extends Model {
    constructor() {
        super(createStore(
            {name: 'app'},
            withProps<AppState>({}),
        ));
    }
}