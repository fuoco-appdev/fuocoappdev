import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface NotificationsState {}

export class NotificationsModel extends Model {
  constructor() {
    super(
      createStore({ name: 'notifications' }, withProps<NotificationsState>({}))
    );
  }
}
