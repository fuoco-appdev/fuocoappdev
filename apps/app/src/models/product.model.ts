import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface ProductState {
  thumbnail: string;
  title: string;
  subtitle: string;
}

export class ProductModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'product' },
        withProps<ProductState>({
          thumbnail: '',
          title: '',
          subtitle: '',
        })
      )
    );
  }

  public get thumbnail(): string {
    return this.store.getValue().thumbnail;
  }

  public set thumbnail(value: string) {
    if (this.thumbnail !== value) {
      this.store.update((state) => ({ ...state, thumbnail: value }));
    }
  }

  public get title(): string {
    return this.store.getValue().title;
  }

  public set title(value: string) {
    if (this.title !== value) {
      this.store.update((state) => ({ ...state, title: value }));
    }
  }

  public get subtitle(): string {
    return this.store.getValue().subtitle;
  }

  public set subtitle(value: string) {
    if (this.subtitle !== value) {
      this.store.update((state) => ({ ...state, subtitle: value }));
    }
  }
}
