/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { TermsOfServiceModel } from '../models';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class TermsOfServiceController extends Controller {
  private readonly _model: TermsOfServiceModel;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new TermsOfServiceModel(this._storeOptions);
  }

  public get model(): TermsOfServiceModel {
    return this._model;
  }

  public override initialize = (_renderCount: number): void => {};

  public override load(_renderCount: number): void {}

  public requestDataUsingFetch(): void {
    fetch('../assets/markdown/terms_of_service.md')
      .then((res) => res.text())
      .then((md) => {
        this._model.markdown = md;
      });
  }

  public updateMarkdown(value: string): void {
    this._model.markdown = value;
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}
}
