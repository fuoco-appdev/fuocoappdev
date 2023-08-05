import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';

export interface SignupState {
  emailConfirmationSent: boolean;
  location?: Location;
  email?: string;
  password?: string;
  confirmationPassword?: string;
}

export class SignupModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'signup' },
        withProps<SignupState>({
          emailConfirmationSent: false,
          location: undefined,
          email: '',
          password: '',
          confirmationPassword: '',
        })
      )
    );
  }

  public get emailConfirmationSent(): boolean {
    return this.store.getValue().emailConfirmationSent;
  }

  public set emailConfirmationSent(emailConfirmationSent: boolean) {
    if (this.emailConfirmationSent !== emailConfirmationSent) {
      this.store.update((state) => ({
        ...state,
        emailConfirmationSent: emailConfirmationSent,
      }));
    }
  }

  public get location(): Location {
    return this.store.getValue().location;
  }

  public set location(location: Location) {
    if (this.location !== location) {
      this.store.update((state) => ({ ...state, location: location }));
    }
  }

  public get email(): string {
    return this.store.getValue().email;
  }

  public set email(value: string) {
    if (this.email !== value) {
      this.store.update((state) => ({ ...state, email: value }));
    }
  }

  public get password(): string {
    return this.store.getValue().password;
  }

  public set password(value: string) {
    if (this.password !== value) {
      this.store.update((state) => ({ ...state, password: value }));
    }
  }

  public get confirmationPassword(): string {
    return this.store.getValue().confirmationPassword;
  }

  public set confirmationPassword(value: string) {
    if (this.confirmationPassword !== value) {
      this.store.update((state) => ({ ...state, confirmationPassword: value }));
    }
  }
}
