/* eslint-disable @typescript-eslint/no-empty-function */
import { SalesChannel } from "@medusajs/medusa";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { select } from "@ngneat/elf";
import mapboxgl from "mapbox-gl";
import { Index } from "meilisearch";
import { ViewState } from "react-map-gl";
import { Subscription } from "rxjs";
import { Controller } from "../controller";
import {
  ExploreModel,
  ExploreState,
  ExploreTabs,
  InventoryLocation,
  InventoryLocationType,
} from "../models/explore.model";
import { StorageFolderType } from "../protobuf/common_pb";
import BucketService from "../services/bucket.service";
import MedusaService from "../services/medusa.service";
import MeiliSearchService from "../services/meilisearch.service";

class ExploreController extends Controller {
  private readonly _model: ExploreModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _stockLocationsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _currentPositionSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _limit: number;

  constructor() {
    super();

    this._model = new ExploreModel();
    this._limit = 20;
  }

  public get model(): ExploreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._stockLocationsIndex = MeiliSearchService.client?.index(
      "stock_locations",
    );

    this.initializeAsync(renderCount);
  }

  public override load(_renderCount: number): void { }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._currentPositionSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
  }

  public override disposeLoad(_renderCount: number): void {
    clearTimeout(this._timerId as number | undefined);
  }

  public async loadStockLocationsAsync(): Promise<void> {
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    this._model.hasMoreSearchedStockLocations = true;
    await this.searchStockLocationsAsync(this._model.input, 'loading', 0, this._limit);
  }

  public async reloadStockLocationsAsync(): Promise<void> {
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    this._model.hasMoreSearchedStockLocations = true;
    await this.searchStockLocationsAsync(this._model.input, 'reloading', 0, this._limit);
  }

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  public async onNextScrollAsync(): Promise<void> {
    if (this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.searchedStockLocationsPagination =
      this._model.searchedStockLocationsPagination + 1;
    const offset = this._limit *
      (this._model.searchedStockLocationsPagination - 1);
    await this.searchStockLocationsAsync(
      this._model.input,
      'loading',
      offset,
      this._limit,
    );
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    this._model.hasMoreSearchedStockLocations = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchStockLocationsAsync(value, 'loading', 0, this._limit);
    }, 750);
  }

  public updateCoordinates(value: mapboxgl.LngLat | undefined): void {
    this._model.longitude = value?.lng ?? 0;
    this._model.latitude = value?.lat ?? 0;
  }

  public updateSelectedInventoryLocation(
    value: InventoryLocation | undefined,
  ): void {
    this._model.selectedInventoryLocationId = value?.id;
    this._model.selectedInventoryLocation = value;

    if (value?.coordinates) {
      this.updateCoordinates(value?.coordinates);
    }
  }

  public updateSelectedInventoryLocationId(value: string | undefined): void {
    const selectedInventoryLocation = this._model.inventoryLocations.find(
      (location) => location.id == value,
    );

    this.updateSelectedInventoryLocation(selectedInventoryLocation);
  }

  public updateSearchedStockLocationScrollPosition(value: number | undefined) {
    this._model.searchedStockLocationScrollPosition = value;
  }

  public async updateSelectedTabAsync(
    value: ExploreTabs | undefined,
  ): Promise<void> {
    this._model.selectedTab = value;
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    const offset = this._limit *
      (this._model.searchedStockLocationsPagination - 1);

    await this.searchStockLocationsAsync(
      this._model.input,
      'loading',
      offset,
      this._limit,
      true,
    );
  }

  public isInventoryLocationIdValid(value: string): boolean {
    const inventoryLocation = this._model.inventoryLocations.find(
      (location) => location.id == value,
    );

    return inventoryLocation !== undefined;
  }

  public isInventoryLocationIdSelected(value: string): boolean {
    return this._model.selectedInventoryLocationId === value;
  }

  public async getDefaultInventoryLocationAsync(): Promise<
    InventoryLocation | undefined
  > {
    return new Promise<InventoryLocation | undefined>((resolve, reject) => {
      const subscription = this._model.store
        .pipe(select((model: ExploreState) => model.inventoryLocations))
        .subscribe({
          next: (value: InventoryLocation[]) => {
            if (value.length <= 0) {
              resolve(undefined);
              subscription.unsubscribe();
              return;
            }

            resolve(value[0]);
            subscription.unsubscribe();
          },
          error: (error: any) => reject(error),
        });
    });
  }

  public async searchStockLocationsAsync(
    query: string,
    loadType: 'loading' | 'reloading',
    offset: number = 0,
    limit: number = 10,
    force: boolean = false,
  ): Promise<void> {
    if (!force && this._model.areSearchedStockLocationsLoading) {
      return;
    }

    if (loadType === 'loading') {
      this._model.areSearchedStockLocationsLoading = true;
    }
    else if (loadType === 'reloading') {
      this._model.areSearchedStockLocationsReloading = true;
    }

    let filter = this.getFilter();
    const result = await this._stockLocationsIndex?.search(query, {
      filter: [filter],
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as StockLocation[] | undefined;
    if (!hits) {
      this._model.areSearchedStockLocationsReloading = false;
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

    if (hits.length <= 0 && offset <= 0) {
      this._model.searchedStockLocations = [];
    }

    if (hits.length < limit && this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = false;
    }

    if (hits.length <= 0) {
      this._model.areSearchedStockLocationsReloading = false;
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

    if (hits.length >= limit && !this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = true;
    }

    if (offset > 0) {
      const stockLocations = this._model.searchedStockLocations;
      this._model.searchedStockLocations = stockLocations.concat(hits);
    } else {
      this._model.searchedStockLocations = hits;
    }

    const firstLocation = this._model.searchedStockLocations[0];
    const firstLocationGeo = JSON.parse(firstLocation.metadata?.['coordinates'] as string) as { longitude: number; latitude: number; } | undefined;
    if (firstLocationGeo) {
      this.updateCoordinates(new mapboxgl.LngLat(firstLocationGeo.longitude, firstLocationGeo.latitude));
    }

    if (loadType === 'loading') {
      this._model.areSearchedStockLocationsLoading = false;
    }
    else if (loadType === 'reloading') {
      this._model.areSearchedStockLocationsReloading = false;
    }
  }

  public async getInventoryLocationAsync(
    stockLocation: StockLocation & { sales_channels?: SalesChannel[] },
  ): Promise<InventoryLocation | null> {
    const metadata = stockLocation.metadata;
    const address = stockLocation.address;

    let coordinates: { longitude: number, latitude: number } | null = null;
    if (
      metadata &&
      Object.keys(metadata).includes("coordinates") &&
      typeof stockLocation.metadata?.["coordinates"] === "string"
    ) {
      coordinates = JSON.parse(metadata?.["coordinates"] as string);
    } else {
      coordinates = metadata?.["coordinates"] as { longitude: number, latitude: number };
    }

    let type: InventoryLocationType | undefined;
    if (metadata && Object.keys(metadata).includes("type")) {
      type = metadata?.["type"] as InventoryLocationType | undefined;
    }

    if (!coordinates || !type) {
      return null;
    }

    let avatar: string | undefined = undefined;
    const avatarMetadata = stockLocation.metadata?.["avatar"] as
      | string
      | undefined;
    if (avatarMetadata) {
      avatar = await BucketService.getPublicUrlAsync(
        StorageFolderType.Avatars,
        avatarMetadata,
      );
    }

    let thumbnails: string[] = [];
    const thumbnailsMetadata = (
      stockLocation.metadata?.["thumbnails"] as string
    )?.split(",");

    if (thumbnailsMetadata && thumbnailsMetadata.length > 0) {
      for (const file of thumbnailsMetadata) {
        const url = await BucketService.getPublicUrlAsync(
          StorageFolderType.Thumbnails,
          file,
        );
        if (!url) {
          continue;
        }

        thumbnails.push(url);
      }
    }

    return {
      id: stockLocation.id,
      salesChannels: stockLocation.sales_channels ?? [],
      coordinates: new mapboxgl.LngLat(
        coordinates?.["longitude"] ?? 0,
        coordinates?.["latitude"] ?? 0,
      ),
      placeName: (metadata?.["place_name"] as string) ?? "",
      description: (metadata?.["description"] as string) ?? "",
      company: address?.["company"] ?? "",
      region: (metadata?.["region"] as string) ?? "",
      type: type,
      avatar: avatar,
      thumbnails: thumbnails,
    };
  }

  private async initializeAsync(_renderCount: number): Promise<void> {
    this._model.inventoryLocations = await this
      .requestInventoryLocationsAsync();
    this._model.isSelectedInventoryLocationLoaded = true;
    this.updateSelectedInventoryLocationId(this._model.selectedInventoryLocationId);
  }

  private async requestInventoryLocationsAsync(): Promise<InventoryLocation[]> {
    const stockLocations = await MedusaService.requestStockLocationsAllAsync();
    const inventoryLocations: InventoryLocation[] = [];
    for (const stockLocation of stockLocations) {
      const inventoryLocation = await this.getInventoryLocationAsync(
        stockLocation,
      );
      if (!inventoryLocation) {
        continue;
      }

      inventoryLocations.push(inventoryLocation);
    }

    return inventoryLocations;
  }

  private getFilter(): string {
    let filter = ``;
    if (this._model.selectedTab) {
      filter += `metadata.type = ${this._model.selectedTab}`;
    }

    return filter;
  }
}

export default new ExploreController();
