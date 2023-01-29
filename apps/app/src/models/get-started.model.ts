import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface GetStartedState {
  companyName: string;
  phoneNumber: string;
  comment: string;
  requestSent: boolean;
}

export class GetStartedModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'get-started' },
        withProps<GetStartedState>({
          companyName: '',
          phoneNumber: '',
          comment: '',
          requestSent: false,
        })
      )
    );
  }

  public get companyName(): string {
    return this.store.getValue().companyName;
  }

  public set companyName(value: string) {
    if (this.companyName !== value) {
      this.store.update((state) => ({ ...state, companyName: value }));
    }
  }

  public get phoneNumber(): string {
    return this.store.getValue().phoneNumber;
  }

  public set phoneNumber(value: string) {
    if (this.phoneNumber !== value) {
      this.store.update((state) => ({ ...state, phoneNumber: value }));
    }
  }

  public get comment(): string {
    return this.store.getValue().comment;
  }

  public set comment(value: string) {
    if (this.comment !== value) {
      this.store.update((state) => ({ ...state, comment: value }));
    }
  }

  public get requestSent(): boolean {
    return this.store.getValue().requestSent;
  }

  public set requestSent(value: boolean) {
    if (this.requestSent !== value) {
      this.store.update((state) => ({ ...state, requestSent: value }));
    }
  }
}
