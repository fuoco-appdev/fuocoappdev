import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface EventsState {}

export class EventsModel extends Model {
  constructor() {
    super(createStore({ name: 'events' }, withProps<EventsState>({})));
  }
}
