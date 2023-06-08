import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface CheckoutState {
  sameAsBillingAddress: boolean;
}

export class CheckoutModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'checkout' },
        withProps<CheckoutState>({
          sameAsBillingAddress: true,
        })
      )
    );
  }

  public get sameAsBillingAddress(): boolean {
    return this.store.getValue().sameAsBillingAddress;
  }

  public set sameAsBillingAddress(value: boolean) {
    if (this.sameAsBillingAddress !== value) {
      this.sameAsBillingAddress = value;
    }
  }
}
