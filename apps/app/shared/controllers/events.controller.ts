/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { EventsModel } from '../models/events.model';
import { StoreOptions } from '../store-options';

export default class EventsController extends Controller {
  private readonly _model: EventsModel;

  constructor(
    private readonly _container: DIContainer<{}>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new EventsModel(this._storeOptions);
  }

  public get model(): EventsModel {
    return this._model;
  }

  public override initialize = (_renderCount: number): void => {};

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}
}
