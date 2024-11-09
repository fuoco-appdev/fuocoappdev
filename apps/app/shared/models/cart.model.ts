import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class CartModel extends Model {
  @observable
  public stockLocations!: HttpTypes.AdminStockLocation[];
  @observable
  public carts!: Record<string, HttpTypes.StoreCart | undefined>;
  @observable
  public cart: HttpTypes.StoreCart | undefined;
  @observable
  public requiredFoodProducts!: HttpTypes.StoreProduct[];
  @observable
  public isFoodInCartRequired: boolean | undefined;
  @observable
  public discountCode!: string;
  @observable
  public cartIds!: Record<string, string | undefined>;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.stockLocations = [];
      this.carts = {};
      this.cart = undefined;
      this.requiredFoodProducts = [];
      this.isFoodInCartRequired = undefined;
      this.discountCode = '';
      this.cartIds = {};
    });
  }

  public updateStockLocations(value: HttpTypes.AdminStockLocation[]) {
    if (JSON.stringify(this.stockLocations) !== JSON.stringify(value)) {
      this.stockLocations = value;
    }
  }

  public updateCarts(value: Record<string, HttpTypes.StoreCart | undefined>) {
    if (JSON.stringify(this.carts) !== JSON.stringify(value)) {
      this.carts = value;
    }
  }

  public updateCart(value: HttpTypes.StoreCart | undefined) {
    if (JSON.stringify(this.cart) !== JSON.stringify(value)) {
      this.cart = value;
    }
  }

  public updateRequiredFoodProducts(value: HttpTypes.StoreProduct[]) {
    if (JSON.stringify(this.requiredFoodProducts) !== JSON.stringify(value)) {
      this.requiredFoodProducts = value;
    }
  }

  public updateIsFoodInCartRequired(value: boolean | undefined) {
    if (this.isFoodInCartRequired !== value) {
      this.isFoodInCartRequired = value;
    }
  }

  public updateDiscountCode(value: string) {
    if (this.discountCode !== value) {
      this.discountCode = value;
    }
  }

  public updateCartIds(value: Record<string, string | undefined>) {
    if (JSON.stringify(this.cartIds) !== JSON.stringify(value)) {
      this.cartIds = value;
    }
  }
}
