import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface HomeState {
  initialLongitude: number;
  initialLatitude: number;
}

export class HomeModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'home' },
        withProps<HomeState>({
          initialLatitude: 46.1185,
          initialLongitude: -74.5962,
        })
      )
    );
  }

  public get initialLatitude(): number {
    return this.store.getValue().initialLatitude;
  }

  public set initialLatitude(value: number) {
    if (this.initialLatitude !== value) {
      this.store.update((state) => ({ ...state, initialLatitude: value }));
    }
  }

  public get initialLongitude(): number {
    return this.store.getValue().initialLongitude;
  }

  public set initialLongitude(value: number) {
    if (this.initialLongitude !== value) {
      this.store.update((state) => ({ ...state, initialLongitude: value }));
    }
  }
}
