import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface ResetPasswordState {}

export class ResetPasswordModel extends Model {
  constructor() {
    super(
      createStore({ name: 'reset-password' }, withProps<ResetPasswordState>({}))
    );
  }
}
