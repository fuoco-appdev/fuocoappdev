import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';

export interface SigninState {
  location?: Location;
  email: string;
  password: string;
}

export class SigninModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'signin' },
        withProps<SigninState>({
          location: undefined,
          email: '',
          password: '',
        })
      )
    );
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
}
