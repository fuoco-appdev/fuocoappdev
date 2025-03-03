/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpTypes } from '@medusajs/types';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';
import { InventoryLocation } from '../models/explore.model';
import MedusaService, { CartPayload } from '../services/medusa.service';
import { StoreOptions } from '../store-options';
import { MedusaProductTypeNames } from '../types/medusa.type';
import ExploreController from './explore.controller';
import StoreController from './store.controller';

export default class CartController extends Controller {
  private readonly _model: CartModel;
  private readonly _cartRelations: string;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _selectedInventoryLocationDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      ExploreController: ExploreController;
      StoreController: StoreController;
      MedusaService: MedusaService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new CartModel(this._storeOptions);
    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
    this._cartRelations =
      'payment_session,billing_address,shipping_address,items,region,discounts,gift_cards,customer,payment_sessions,payment,shipping_methods,sales_channel,sales_channels';
  }

  public get model(): CartModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    const exploreController = this._container.get('ExploreController');
    this.initializeAsync(renderCount);
    this._selectedInventoryLocationDisposer = observe(
      exploreController.model,
      'selectedInventoryLocation',
      this.onSelectedInventoryLocationChangedAsync
    );
  }

  public override load(_renderCount: number): void {
    this.requestStockLocationsAsync();
  }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenDisposer?.();
    this._selectedInventoryLocationDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public updateDiscountCodeText(value: string): void {
    this._model.discountCode = value;
  }

  public updateCarts(id: string, value: HttpTypes.StoreCart | undefined): void {
    const carts = { ...this._model.carts };
    carts[id] = value;
    this._model.carts = carts;
  }

  public updateSelectedCart(value: HttpTypes.StoreCart | undefined) {
    this._model.cart = value;
  }

  public async updateDiscountCodeAsync(): Promise<void> {
    if (!this._model.discountCode || this._model.discountCode.length <= 0) {
      return;
    }

    const medusaService = this._container.get('MedusaService');
    const exploreController = this._container.get('ExploreController');
    const { selectedInventoryLocationId } = exploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds?.[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }
    await medusaService.requestStoreCartAddPromotions(cartId, {
      promo_codes: [this._model.discountCode],
    });

    this._model.discountCode = '';
  }

  public async removeDiscountCodeAsync(code: string): Promise<void> {
    const exploreController = this._container.get('ExploreController');
    const medusaService = this._container.get('MedusaService');
    const { selectedInventoryLocationId } = exploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds?.[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cart = await medusaService.requestStoreCartRemovePromotion(cartId);

      this.updateCarts(cart.id, cart);
      this.updateSelectedCart(cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateCartAsync(payload: CartPayload): Promise<void> {
    const exploreController = this._container.get('ExploreController');
    const medusaService = this._container.get('MedusaService');
    const { selectedInventoryLocationId } = exploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds?.[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cart = await medusaService.requestStoreUpdateCart(cartId, payload, {
        expand: this._cartRelations,
      });

      if (!cart) {
        return;
      }

      this.updateCarts(cart.id, cart);
      this.updateSelectedCart(cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async completeCartAsync(): Promise<HttpTypes.StoreCart | null> {
    const exploreController = this._container.get('ExploreController');
    const medusaService = this._container.get('MedusaService');
    const { selectedInventoryLocationId } = exploreController.model;
    const cartId = selectedInventoryLocationId
      ? this._model.cartIds?.[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return null;
    }

    try {
      const cart = await medusaService.requestStoreCartComplete(cartId);

      return cart;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async resetCartAsync(): Promise<void> {
    const exploreController = this._container.get('ExploreController');
    const storeController = this._container.get('StoreController');
    if (!storeController.model.selectedRegion) {
      return;
    }

    const { selectedInventoryLocation } = exploreController.model;
    await this.createCartAsync(
      storeController.model.selectedRegion.id,
      selectedInventoryLocation
    );
  }

  public async removeLineItemAsync(
    item: HttpTypes.StoreCartLineItem
  ): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    try {
      await medusaService.requestStoreCartRemoveLineItem(item.cart_id, item.id);
      const cart = await medusaService.requestStoreCart(item.cart_id);

      if (!cart) {
        return;
      }

      this.updateCarts(cart.id, cart);
      this.updateSelectedCart(cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async updateLineItemQuantityAsync(
    quantity: number,
    item: HttpTypes.StoreCartLineItem
  ): Promise<void> {
    clearTimeout(this._timerId as number | undefined);
    const medusaService = this._container.get('MedusaService');
    this._timerId = setTimeout(async () => {
      try {
        const cart = await medusaService.requestStoreUpdateLineItem(
          item.cart_id,
          item.id,
          {
            quantity: quantity,
          }
        );

        if (!cart) {
          return;
        }

        this.updateCarts(cart.id, cart);
        this.updateSelectedCart(cart);
      } catch (error: any) {
        console.error(error);
      }
    }, 750);
  }

  public isFoodRequirementInCart(): boolean {
    const storeController = this._container.get('StoreController');
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

    const requiredFoodType = storeController.model.productTypes.find(
      (value) => value.value === MedusaProductTypeNames.RequiredFood
    );
    const menuItemType = storeController.model.productTypes.find(
      (value) => value.value === MedusaProductTypeNames.MenuItem
    );
    const hasFoodRequirement = cart.items?.some((cartItem) => {
      const variant = cartItem.variant;
      return variant?.product?.type_id === requiredFoodType?.id;
    });

    const menuItems = cart.items?.some((cartItem) => {
      const variant = cartItem.variant;
      return variant?.product?.type_id === menuItemType?.id;
    });

    return (menuItems || hasFoodRequirement) ?? false;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private async requestStockLocationsAsync(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const cartIds = this._model.cartIds;
    const stockLocationIds = Object.keys(cartIds ?? {});
    const stockLocations = await medusaService.requestStockLocationsAsync(
      stockLocationIds
    );
    this._model.stockLocations = stockLocations;

    await this.requestCartsAsync(
      Object.values(cartIds ?? {}).map((value) => value ?? '')
    );
  }

  private async requestCartsAsync(cartIds: string[]): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    for (const id of cartIds) {
      try {
        const cart = await medusaService.requestStoreCart(id);
        this.updateCarts(id, cart);
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  private async createCartAsync(
    regionId: string,
    selectedInventoryLocation: InventoryLocation | undefined
  ): Promise<HttpTypes.StoreCart | null | undefined> {
    const medusaService = this._container.get('MedusaService');
    if (!selectedInventoryLocation || !selectedInventoryLocation.id) {
      return null;
    }

    try {
      const selectedSalesChannelId =
        selectedInventoryLocation.salesChannels[0].id;
      const cart = await medusaService.requestStoreCreateCart({
        region_id: regionId,
        sales_channel_id: selectedSalesChannelId,
      });

      const cartIds = { ...this._model.cartIds };
      cartIds[selectedInventoryLocation.id] = cart.id;
      this._model.cartIds = cartIds;

      if (!cart) {
        return;
      }

      this.updateCarts(cart.id, cart);
      this.updateSelectedCart(cart);

      return cart;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  private async onSelectedInventoryLocationChangedAsync(
    value: IValueDidChange<InventoryLocation | undefined>
  ): Promise<void> {
    const storeController = this._container.get('StoreController');
    const medusaService = this._container.get('MedusaService');
    const inventoryLocation = value.newValue;
    if (!inventoryLocation) {
      this.updateSelectedCart(undefined);
      return;
    }

    await when(() => storeController.model.regions !== undefined);
    const regions: HttpTypes.StoreRegion[] = storeController.model.regions;
    const region = regions.find(
      (region) => region.name === inventoryLocation?.region
    );
    const cartId = inventoryLocation?.id
      ? this._model.cartIds?.[inventoryLocation.id]
      : undefined;
    const metadata = region?.metadata as Record<string, any> | undefined;
    const isFoodInCartRequired = metadata?.['is_food_in_cart_required'] as
      | string
      | undefined;
    this._model.isFoodInCartRequired = isFoodInCartRequired === 'true';

    try {
      await when(() => storeController.model.productTypes !== undefined);
      const productTypes: HttpTypes.StoreProductType[] =
        storeController.model.productTypes;
      const requiredFoodType = productTypes.find(
        (value) => value.value === MedusaProductTypeNames.RequiredFood
      );
      const requiredFoodProducts =
        await medusaService.requestStoreProductsAsync({
          type_id: [requiredFoodType?.id ?? ''],
          sales_channel_id: inventoryLocation?.salesChannels.map(
            (value) => value.id
          ) as string[],
          region_id: region?.id,
        });
      this._model.requiredFoodProducts = requiredFoodProducts ?? [];
    } catch (error: any) {
      console.error(error);
    }

    if (inventoryLocation && !cartId && region?.id) {
      await this.createCartAsync(region.id, inventoryLocation);
    }

    if (cartId && !this._model.carts[cartId]) {
      try {
        const cart = await medusaService.requestStoreCart(cartId);

        if (!cart) {
          return;
        }

        this.updateCarts(cart.id, cart);
        this.updateSelectedCart(cart);
      } catch (error: any) {
        console.error(error);
      }
    } else if (cartId) {
      this.updateSelectedCart(this._model.carts[cartId]);
    }
  }
}
