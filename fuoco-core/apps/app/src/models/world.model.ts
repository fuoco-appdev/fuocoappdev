import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';

export interface WorldState {
  isVisible: boolean;
  isError: boolean;
  location?: Location;
}

export class WorldModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'world' },
        withProps<WorldState>({
          location: undefined,
          isVisible: true,
          isError: false,
        })
      )
    );
  }

  public get isVisible(): boolean {
    return this.store.getValue().isVisible;
  }

  public set isVisible(isVisible: boolean) {
    if (this.isVisible !== isVisible) {
      this.store.update((state) => ({ ...state, isVisible: isVisible }));
    }
  }

  public get isError(): boolean {
    return this.store.getValue().isError;
  }

  public set isError(value: boolean) {
    if (this.isError !== value) {
      this.store.update((state) => ({ ...state, isError: value }));
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
}
