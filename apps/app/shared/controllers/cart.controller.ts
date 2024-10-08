/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Cart,
  LineItem,
  Order,
  ProductType,
  Region,
  StorePostCartsCartReq,
  Swap
} from "@medusajs/medusa";
import { Store, select } from "@ngneat/elf";
import { Subscription, filter, firstValueFrom, take } from "rxjs";
import { Controller } from "../controller";
import { CartModel } from "../models/cart.model";
import { InventoryLocation } from "../models/explore.model";
import MedusaService from "../services/medusa.service";
import { MedusaProductTypeNames } from "../types/medusa.type";
import ExploreController from "./explore.controller";
import StoreController from "./store.controller";

class CartController extends Controller {
  private readonly _model: CartModel;
  private readonly _cartRelations: string;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _selectedInventoryLocationSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CartModel();
    this.onSelectedInventoryLocationChangedAsync = this
      .onSelectedInventoryLocationChangedAsync.bind(this);
    this._cartRelations =
      "payment_session,billing_address,shipping_address,items,region,discounts,gift_cards,customer,payment_sessions,payment,shipping_methods,sales_channel,sales_channels";
  }

  public get model(): CartModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);
  }

  public override async load(_renderCount: number): Promise<void> {
    this.requestStockLocationsAsync();
  }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public override disposeLoad(_renderCount: number): void { }

  public updateDiscountCodeText(value: string): void {
    this._model.discountCode = value;
  }

  public updateCarts(
    id: string,
    value: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined,
  ): void {
    const carts = { ...this._model.carts };
    carts[id] = value;
    this._model.carts = carts;
  }

  public updateSelectedCart(
    value: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined,
  ) {
    this._model.cart = value;
  }

  public async updateDiscountCodeAsync(): Promise<void> {
    if (!this._model.discountCode || this._model.discountCode.length <= 0) {
      return;
    }

    await this.updateCartAsync({
      discounts: [{ code: this._model.discountCode }],
    });

    this._model.discountCode = "";
  }

  public async removeDiscountCodeAsync(code: string): Promise<void> {
    const { selectedInventoryLocationId } = ExploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.deleteDiscount(
        cartId,
        code,
      );
      if (!cartResponse?.cart) {
        return;
      }

      this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
      this.updateSelectedCart(cartResponse?.cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateCartAsync(payload: StorePostCartsCartReq): Promise<void> {
    const { selectedInventoryLocationId } = ExploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.update(
        cartId,
        payload,
        {
          expand: this._cartRelations,
        },
      );

      if (!cartResponse?.cart) {
        return;
      }

      this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
      this.updateSelectedCart(cartResponse?.cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async completeCartAsync(): Promise<
    Cart | Order | Swap | null | undefined
  > {
    const { selectedInventoryLocationId } = ExploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return null;
    }

    try {
      const completeCartResponse = await MedusaService.medusa?.carts.complete(
        cartId,
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

    const { selectedInventoryLocation } = ExploreController.model;
    await this.createCartAsync(
      StoreController.model.selectedRegion.id,
      selectedInventoryLocation,
    );
  }

  public async removeLineItemAsync(item: LineItem): Promise<void> {
    try {
      const cartResponse = await MedusaService.medusa?.carts.lineItems.delete(
        item.cart_id,
        item.id,
        {
          expand: this._cartRelations,
        },
      );

      if (!cartResponse?.cart) {
        return;
      }

      this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
      this.updateSelectedCart(cartResponse?.cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateLineItemQuantityAsync(
    quantity: number,
    item: LineItem,
  ): Promise<void> {
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(async () => {
      try {
        const cartResponse = await MedusaService.medusa?.carts.lineItems.update(
          item.cart_id,
          item.id,
          {
            quantity: quantity,
          },
          {
            expand: this._cartRelations,
          },
        );

        if (!cartResponse?.cart) {
          return;
        }

        this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
        this.updateSelectedCart(cartResponse?.cart);
      } catch (error: any) {
        console.error(error);
      }
    }, 750);
  }

  public isFoodRequirementInCart(): boolean {
    const cart = this._model.cart;
    if (!cart) {
      return false;
    }

    if (this._model.isFoodInCartRequired === undefined) {
      return false;
    }

    if (this._model.isFoodInCartRequired === false) {
      return true;
    }

    const requiredFoodType = StoreController.model.productTypes.find(
      (value) => value.value === MedusaProductTypeNames.RequiredFood,
    );
    const menuItemType = StoreController.model.productTypes.find(
      (value) => value.value === MedusaProductTypeNames.MenuItem,
    );
    const hasFoodRequirement = cart.items.some((cartItem) => {
      return (
        cartItem.variant.product.type_id === requiredFoodType?.id
      );
    });

    const menuItems = cart.items.some((cartItem) => {
      return (
        cartItem.variant.product.type_id === menuItemType?.id
      );
    });

    return (menuItems || hasFoodRequirement) ?? false;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {
    this._selectedInventoryLocationSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription = ExploreController.model.store
      .pipe(select((model) => model.selectedInventoryLocation))
      .subscribe({
        next: this.onSelectedInventoryLocationChangedAsync,
      });
  }

  private async requestStockLocationsAsync(): Promise<void> {
    const cartIds = await firstValueFrom(
      this._model.localStore?.pipe(select((model) => model.cartIds), take(1)) ??
      Store.prototype,
    );
    const stockLocationIds = Object.keys(cartIds);
    const stockLocations = await MedusaService.requestStockLocationsAsync(
      stockLocationIds,
    );
    this._model.stockLocations = stockLocations;

    await this.requestCartsAsync(Object.values(cartIds));
  }

  private async requestCartsAsync(cartIds: string[]): Promise<void> {
    for (const id of cartIds) {
      try {
        const cartResponse = await MedusaService.medusa?.carts.retrieve(id);
        this.updateCarts(id, cartResponse?.cart);
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async createCartAsync(
    regionId: string,
    selectedInventoryLocation: InventoryLocation | undefined,
  ): Promise<
    Omit<Cart, "refundable_amount" | "refunded_total"> | null | undefined
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
      }, {
        expand: this._cartRelations,
      });

      const cartIds = { ...this._model.cartIds };
      cartIds[selectedInventoryLocation.id] = cartResponse?.cart.id;
      this._model.cartIds = cartIds;

      if (!cartResponse?.cart) {
        return;
      }

      this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
      this.updateSelectedCart(cartResponse?.cart);

      return cartResponse?.cart;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  private async onSelectedInventoryLocationChangedAsync(
    value: InventoryLocation | undefined,
  ): Promise<void> {
    if (!value) {
      this.updateSelectedCart(undefined);
      return;
    }

    const regions: Region[] = await firstValueFrom(
      StoreController.model.store.pipe(
        select((model) => model.regions),
        filter((value) => value !== undefined && value.length > 0),
        take(1),
      ),
    );
    const region = regions.find((region) => region.name === value?.region);
    const cartId = value?.id ? this._model.cartIds[value.id] : undefined;
    const metadata = region?.metadata as Record<string, any> | undefined;
    const isFoodInCartRequired = metadata?.["is_food_in_cart_required"] as
      | string
      | undefined;
    this._model.isFoodInCartRequired = isFoodInCartRequired === "true" ?? false;

    try {
      const productTypes: ProductType[] = await firstValueFrom(
        StoreController.model.store.pipe(
          select((model) => model.productTypes),
          filter((value) => value !== undefined),
          take(1),
        ),
      );
      const requiredFoodType = productTypes.find(
        (value) => value.value === MedusaProductTypeNames.RequiredFood,
      );
      const requiredFoodProductsResponse = await MedusaService.medusa?.products
        .list({
          type_id: [requiredFoodType?.id ?? ""],
          sales_channel_id: value?.salesChannels.map(
            (value) => value.id,
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

    if (cartId && !this._model.carts[cartId]) {
      try {
        const cartResponse = await MedusaService.medusa?.carts.retrieve(
          cartId,
          {
            expand: this._cartRelations,
          },
        );

        if (!cartResponse?.cart) {
          return;
        }

        this.updateCarts(cartResponse.cart.id, cartResponse?.cart);
        this.updateSelectedCart(cartResponse?.cart);
      } catch (error: any) {
        console.error(error);
      }
    } else if (cartId) {
      this.updateSelectedCart(this._model.carts[cartId]);
    }
  }
}

export default new CartController();
