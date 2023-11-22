/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';
import StoreController from './store.controller';
import { select } from '@ngneat/elf';
import {
  Region,
  Cart,
  LineItem,
  StorePostCartsCartReq,
  Order,
  Swap,
  SalesChannel,
  CustomerGroup,
} from '@medusajs/medusa';
import MedusaService from '../services/medusa.service';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import WindowController from './window.controller';
import HomeController from './home.controller';
import { InventoryLocation } from '../models/home.model';
import { MedusaRegionMetadata } from '../types/medusa.type';
import { MedusaProductTypeNames } from '../types/medusa.type';

class CartController extends Controller {
  private readonly _model: CartModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _selectedInventoryLocationSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CartModel();
    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
  }

  public get model(): CartModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._medusaAccessTokenSubscription =
      MedusaService.accessTokenObservable.subscribe({
        next: (value: string | undefined) => {
          if (!value) {
            this.resetMedusaModel();
            this.initializeAsync(renderCount);
          }
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public updateDiscountCodeText(value: string): void {
    this._model.discountCode = value;
  }

  public async updateDiscountCodeAsync(): Promise<void> {
    if (!this._model.discountCode || this._model.discountCode.length <= 0) {
      return;
    }

    await this.updateCartAsync({
      discounts: [{ code: this._model.discountCode }],
    });

    this._model.discountCode = '';
  }

  public async removeDiscountCodeAsync(code: string): Promise<void> {
    const { selectedInventoryLocationId } = HomeController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.deleteDiscount(
        cartId,
        code
      );
      if (cartResponse?.cart) {
        await this.updateLocalCartAsync(cartResponse.cart);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateCartAsync(payload: StorePostCartsCartReq): Promise<void> {
    const { selectedInventoryLocationId } = HomeController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.update(
        cartId,
        payload
      );
      if (cartResponse?.cart) {
        await this.updateLocalCartAsync(cartResponse.cart);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async completeCartAsync(): Promise<
    Cart | Order | Swap | null | undefined
  > {
    const { selectedInventoryLocationId } = HomeController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return null;
    }

    try {
      const completeCartResponse = await MedusaService.medusa?.carts.complete(
        cartId
      );

      return completeCartResponse?.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async resetCartAsync(): Promise<void> {
    if (!StoreController.model.selectedRegion) {
      return;
    }

    const { selectedInventoryLocation } = HomeController.model;
    await this.createCartAsync(
      StoreController.model.selectedRegion.id,
      selectedInventoryLocation
    );
  }

  public async removeLineItemAsync(item: LineItem): Promise<void> {
    try {
      const cartResponse = await MedusaService.medusa?.carts.lineItems.delete(
        item.cart_id,
        item.id
      );
      if (cartResponse?.cart) {
        await this.updateLocalCartAsync(cartResponse.cart);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateLineItemQuantityAsync(
    quantity: number,
    item: LineItem
  ): Promise<void> {
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(async () => {
      try {
        const cartResponse = await MedusaService.medusa?.carts.lineItems.update(
          item.cart_id,
          item.id,
          {
            quantity: quantity,
          }
        );
        if (cartResponse?.cart) {
          await this.updateLocalCartAsync(cartResponse.cart);
        }
      } catch (error: any) {
        console.error(error);
      }
    }, 750);
  }

  public async updateLocalCartAsync(
    value: Omit<Cart, 'refundable_amount' | 'refunded_total'>
  ): Promise<void> {
    const items: LineItem[] = [];
    for (const item of value.items) {
      const itemCache = this._model.cart?.items.find(
        (value) => value.id === item.id
      );
      let product: PricedProduct | undefined = itemCache?.variant.product as
        | PricedProduct
        | undefined;
      if (!product) {
        try {
          const { selectedRegion } = StoreController.model;
          const { cart } = this._model;
          const productResponse = await MedusaService.medusa?.products.list({
            id: item.variant.product_id,
            sales_channel_id: [value.sales_channel_id ?? ''],
            ...(selectedRegion && {
              region_id: selectedRegion.id,
              currency_code: selectedRegion.currency_code,
            }),
            ...(cart && { cart_id: cart.id }),
          });
          product = productResponse?.products[0];
        } catch (error: any) {
          console.error(error);
        }
      }

      const variant = product?.variants.find(
        (value) => value.id === item.variant_id
      );
      if (variant) {
        items.push({
          ...item,
          // @ts-ignore
          variant: {
            ...variant,
            // @ts-ignore
            product: product,
          },
        });
      }
    }

    const cart = {
      ...value,
      items: items,
    };

    if (JSON.stringify(cart) !== JSON.stringify(this._model.cart)) {
      this._model.cart = cart;
    }
  }

  public isFoodRequirementInCart(): boolean {
    if (!this._model.isFoodInCartRequired) {
      return true;
    }

    const hasFoodRequirement = this._model.cart?.items.some((cartItem) => {
      return this._model.requiredFoodProducts.find(
        (food) => cartItem.variant.product_id === food.id
      );
    });
    return hasFoodRequirement ?? false;
  }

  private resetMedusaModel(): void {
    this._model.requiredFoodProducts = [];
    this._model.isFoodInCartRequired = false;
    this._model.discountCode = '';
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._selectedInventoryLocationSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription = HomeController.model.store
      .pipe(select((model) => model.selectedInventoryLocation))
      .subscribe({
        next: this.onSelectedInventoryLocationChangedAsync,
      });
  }

  private async createCartAsync(
    regionId: string,
    selectedInventoryLocation: InventoryLocation | undefined
  ): Promise<
    Omit<Cart, 'refundable_amount' | 'refunded_total'> | null | undefined
  > {
    if (!selectedInventoryLocation || !selectedInventoryLocation.id) {
      return null;
    }

    try {
      const selectedSalesChannelId =
        selectedInventoryLocation.salesChannels[0].id;
      const cartResponse = await MedusaService.medusa?.carts.create({
        region_id: regionId,
        sales_channel_id: selectedSalesChannelId,
      });

      const cartIds = { ...this._model.cartIds };
      cartIds[selectedInventoryLocation.id] = cartResponse?.cart.id;
      this._model.cartIds = cartIds;

      if (cartResponse?.cart) {
        await this.updateLocalCartAsync(cartResponse.cart);
      }

      return cartResponse?.cart;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  private async onSelectedInventoryLocationChangedAsync(
    value: InventoryLocation | undefined
  ): Promise<void> {
    const region = StoreController.model.regions.find(
      (region) => region.name === value?.region
    );
    const cartId = value?.id ? this._model.cartIds[value.id] : undefined;
    const metadata = region?.metadata as MedusaRegionMetadata | undefined;
    this._model.isFoodInCartRequired =
      Boolean(metadata?.is_food_in_cart_required) ?? false;

    try {
      const requiredFoodType = StoreController.model.productTypes.find(
        (value) => value.value === MedusaProductTypeNames.RequiredFood
      );
      const requiredFoodProductsResponse =
        await MedusaService.medusa?.products.list({
          type_id: [requiredFoodType?.id ?? ''],
          sales_channel_id: value?.salesChannels.map(
            (value) => value.id
          ) as string[],
          region_id: region?.id,
        });
      this._model.requiredFoodProducts =
        requiredFoodProductsResponse?.products ?? [];
    } catch (error: any) {
      console.error(error);
    }

    if (value && !cartId && region?.id) {
      await this.createCartAsync(region.id, value);
    }

    if (cartId && cartId.length > 0) {
      try {
        const cartResponse = await MedusaService.medusa?.carts.retrieve(cartId);
        if (cartResponse?.cart) {
          await this.updateLocalCartAsync(cartResponse.cart);
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  }
}

export default new CartController();
