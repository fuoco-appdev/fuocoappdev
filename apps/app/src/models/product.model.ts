import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface ProductState {
  thumbnail: string;
  title: string;
  subtitle: string;
  isLiked: boolean;
  likeCount: number;
  description: string;
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
          isLiked: false,
          likeCount: 0,
          description: '',
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

  public get isLiked(): boolean {
    return this.store.getValue().isLiked;
  }

  public set isLiked(value: boolean) {
    if (this.isLiked !== value) {
      this.store.update((state) => ({ ...state, isLiked: value }));
    }
  }

  public get likeCount(): number {
    return this.store.getValue().likeCount;
  }

  public set likeCount(value: number) {
    if (this.likeCount !== value) {
      this.store.update((state) => ({ ...state, likeCount: value }));
    }
  }

  public get description(): string {
    return this.store.getValue().description;
  }

  public set description(value: string) {
    if (this.description !== value) {
      this.store.update((state) => ({ ...state, description: value }));
    }
  }
}
