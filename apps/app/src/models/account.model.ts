import { LanguageCode } from '@fuoco.appdev/core-ui';
import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface AccountState {
  profileUrl: string | undefined;
  username: string;
}

export class AccountModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'account' },
        withProps<AccountState>({
          profileUrl: undefined,
          username: '',
        })
      )
    );
  }

  public get profileUrl(): string | undefined {
    return this.store.getValue().profileUrl;
  }

  public set profileUrl(value: string | undefined) {
    if (this.profileUrl !== value) {
      this.store.update((state) => ({ ...state, profileUrl: value }));
    }
  }

  public get username(): string {
    return this.store.getValue().username;
  }

  public set username(value: string) {
    if (this.username !== value) {
      this.store.update((state) => ({ ...state, username: value }));
    }
  }
}
