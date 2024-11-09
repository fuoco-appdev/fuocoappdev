/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { ForgotPasswordModel } from '../models/forgot-password.model';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class ForgotPasswordController extends Controller {
  private readonly _model: ForgotPasswordModel;
  private _supabaseClientDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new ForgotPasswordModel(this._storeOptions);

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): ForgotPasswordModel {
    return this._model;
  }

  public override initialize = (_renderCount: number): void => {};

  public override load(_renderCount: number): void {
    const supabaseService = this._container.get('SupabaseService');
    supabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );

    this._supabaseClientDisposer = observe(
      supabaseService,
      'client',
      (value: IValueDidChange<SupabaseClient | undefined>) => {
        this._model.supabaseClient = value.newValue;
      }
    );
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._supabaseClientDisposer?.();
  }

  public updateEmail(value: string) {
    this._model.email = value;
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    _session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_IN') {
      this._model.email = '';
    } else if (event === 'SIGNED_OUT') {
      this._model.email = '';
    }
  }
}
