import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface HelpState {
  markdown: string;
}

export class HelpModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'help' },
        withProps<HelpState>({
          markdown: '',
        })
      )
    );
  }

  public get markdown(): string {
    return this.store.getValue().markdown;
  }

  public set markdown(value: string) {
    if (this.markdown !== value) {
      this.store.update((state) => ({ ...state, markdown: value }));
    }
  }
}
