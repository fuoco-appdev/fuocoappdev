/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewState } from 'react-map-gl';
import { Controller } from '../controller';
import { HomeModel } from '../models/home.model';
import MedusaService from '../services/medusa.service';

class HomeController extends Controller {
  private readonly _model: HomeModel;

  constructor() {
    super();

    this._model = new HomeModel();
  }

  public get model(): HomeModel {
    return this._model;
  }

  public initialize(): void {
    this.requestInventoryLocationsAsync();
  }

  public dispose(): void {}

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  private async requestInventoryLocationsAsync(): Promise<void> {
    const locations = await MedusaService.requestStockLocationsAsync();
    console.log(locations);
  }
}

export default new HomeController();
