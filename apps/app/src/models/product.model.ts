import {
  PricedVariant
} from "@medusajs/medusa/dist/types/pricing";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";
import { ProductLikesMetadataResponse } from "../protobuf/product-like_pb";
import { ProductMetadataResponse } from "../protobuf/product_pb";

export enum ProductTabType {
  Price = "price",
  Locations = "locations",
}

export enum ProductOptions {
  Alcohol = "Alcohol",
  Brand = "Brand",
  Varietals = "Varietals",
  ProducerBottler = "Producer Bottler",
  Code = "Code",
  Format = "Format",
  Region = "Region",
  ResidualSugar = "Residual Sugar",
  Type = "Type",
  UVC = "UVC",
  Vintage = "Vintage",
}

export interface ProductState {
  isLoading: boolean;
  productId: string | undefined;
  variants: PricedVariant[] | undefined;
  metadata: ProductMetadataResponse | undefined;
  selectedVariant: PricedVariant | undefined;
  likesMetadata: ProductLikesMetadataResponse | null;
  activeTabId: ProductTabType;
  prevTransitionKeyIndex: number;
  transitionKeyIndex: number;
  stockLocationInput: string;
  searchedStockLocations: StockLocation[];
  searchedStockLocationsPagination: number;
  hasMoreSearchedStockLocations: boolean;
  searchedStockLocationScrollPosition: number | undefined;
  areSearchedStockLocationsLoading: boolean;
}

export class ProductModel extends Model {
  constructor() {
    super(
      createStore(
        { name: "product" },
        withProps<ProductState>({
          isLoading: false,
          productId: undefined,
          variants: undefined,
          metadata: undefined,
          selectedVariant: undefined,
          likesMetadata: null,
          activeTabId: ProductTabType.Locations,
          prevTransitionKeyIndex: 0,
          transitionKeyIndex: 0,
          stockLocationInput: "",
          searchedStockLocations: [],
          searchedStockLocationsPagination: 1,
          hasMoreSearchedStockLocations: true,
          searchedStockLocationScrollPosition: 0,
          areSearchedStockLocationsLoading: false,
        }),
      ),
    );
  }

  public get stockLocationInput(): string {
    return this.store.getValue().stockLocationInput;
  }

  public set stockLocationInput(value: string) {
    if (this.stockLocationInput !== value) {
      this.store.update((state) => ({
        ...state,
        stockLocationInput: value,
      }));
    }
  }

  public get isLoading(): boolean {
    return this.store.getValue().isLoading;
  }

  public set isLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.store.update((state) => ({ ...state, isLoading: value }));
    }
  }

  public get productId(): string | undefined {
    return this.store.getValue().productId;
  }

  public set productId(value: string | undefined) {
    if (this.productId !== value) {
      this.store.update((state) => ({ ...state, productId: value }));
    }
  }

  public get variants(): PricedVariant[] | undefined {
    return this.store.getValue().variants;
  }

  public set variants(value: PricedVariant[] | undefined) {
    if (JSON.stringify(this.variants) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, variants: value }));
    }
  }

  public get metadata(): ProductMetadataResponse | undefined {
    return this.store.getValue().metadata;
  }

  public set metadata(value: ProductMetadataResponse | undefined) {
    if (JSON.stringify(this.metadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, metadata: value }));
    }
  }

  public get selectedVariant(): PricedVariant | undefined {
    return this.store.getValue().selectedVariant;
  }

  public set selectedVariant(value: PricedVariant | undefined) {
    if (JSON.stringify(this.selectedVariant) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedVariant: value }));
    }
  }

  public get likesMetadata(): ProductLikesMetadataResponse | null {
    return this.store.getValue().likesMetadata;
  }

  public set likesMetadata(value: ProductLikesMetadataResponse | null) {
    if (JSON.stringify(this.likesMetadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, likesMetadata: value }));
    }
  }

  public get activeTabId(): ProductTabType {
    return this.store.getValue().activeTabId;
  }

  public set activeTabId(value: ProductTabType) {
    if (JSON.stringify(this.activeTabId) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, activeTabId: value }));
    }
  }

  public get prevTransitionKeyIndex(): number {
    return this.store?.getValue().prevTransitionKeyIndex;
  }

  public set prevTransitionKeyIndex(value: number) {
    if (this.prevTransitionKeyIndex !== value) {
      this.store?.update((state) => ({
        ...state,
        prevTransitionKeyIndex: value,
      }));
    }
  }

  public get transitionKeyIndex(): number {
    return this.store?.getValue().transitionKeyIndex;
  }

  public set transitionKeyIndex(value: number) {
    if (this.transitionKeyIndex !== value) {
      this.store?.update((state) => ({
        ...state,
        transitionKeyIndex: value,
      }));
    }
  }

  public get searchedStockLocations(): StockLocation[] {
    return this.store.getValue().searchedStockLocations;
  }

  public set searchedStockLocations(value: StockLocation[]) {
    if (JSON.stringify(this.searchedStockLocations) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        searchedStockLocations: value,
      }));
    }
  }

  public get searchedStockLocationsPagination(): number {
    return this.store.getValue().searchedStockLocationsPagination;
  }

  public set searchedStockLocationsPagination(value: number) {
    if (this.searchedStockLocationsPagination !== value) {
      this.store.update((state) => ({
        ...state,
        searchedStockLocationsPagination: value,
      }));
    }
  }

  public get hasMoreSearchedStockLocations(): boolean {
    return this.store.getValue().hasMoreSearchedStockLocations;
  }

  public set hasMoreSearchedStockLocations(value: boolean) {
    if (this.hasMoreSearchedStockLocations !== value) {
      this.store.update((state) => ({
        ...state,
        hasMoreSearchedStockLocations: value,
      }));
    }
  }

  public get searchedStockLocationScrollPosition(): number | undefined {
    return this.store.getValue().searchedStockLocationScrollPosition;
  }

  public set searchedStockLocationScrollPosition(value: number | undefined) {
    if (this.searchedStockLocationScrollPosition !== value) {
      this.searchedStockLocationScrollPosition = value;
    }
  }

  public get areSearchedStockLocationsLoading(): boolean {
    return this.store.getValue().areSearchedStockLocationsLoading;
  }

  public set areSearchedStockLocationsLoading(value: boolean) {
    if (this.areSearchedStockLocationsLoading !== value) {
      this.store.update((state) => ({
        ...state,
        areSearchedStockLocationsLoading: value,
      }));
    }
  }
}
