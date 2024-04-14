import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface EmailConfirmationState {
  email: string | undefined;
}

export class EmailConfirmationModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'email-confirmation' },
        withProps<EmailConfirmationState>({
          email: undefined,
        })
      )
    );
  }

  public get email(): string | undefined {
    return this.store.getValue().email;
  }

  public set email(value: string | undefined) {
    if (JSON.stringify(this.email) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, email: value }));
    }
  }
}
