/* eslint-disable @typescript-eslint/no-empty-function */
import { SupabaseClient } from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { ResetPasswordModel } from '../models/reset-password.model';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class ResetPasswordController extends Controller {
  private readonly _model: ResetPasswordModel;
  private _supabaseClientDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new ResetPasswordModel(this._storeOptions);
  }

  public get model(): ResetPasswordModel {
    return this._model;
  }

  public override initialize = (_renderCount: number): void => {
    const supabaseService = this._container.get('SupabaseService');
    this._supabaseClientDisposer = observe(
      supabaseService,
      'client',
      (value: IValueDidChange<SupabaseClient | undefined>) => {
        this._model.supabaseClient = value.newValue;
      }
    );
  };

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._supabaseClientDisposer?.();
  }
}
