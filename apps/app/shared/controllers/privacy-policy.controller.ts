/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { PrivacyPolicyModel } from '../models';
import { StoreOptions } from '../store-options';

export default class PrivacyPolicyController extends Controller {
  private readonly _model: PrivacyPolicyModel;

  constructor(
    private readonly _container: DIContainer<{}>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new PrivacyPolicyModel(this._storeOptions);
  }

  public get model(): PrivacyPolicyModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {}

  public override load(renderCount: number): void {}

  public requestDataUsingFetch(): void {
    fetch('../assets/markdown/privacy_policy.md')
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
