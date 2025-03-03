/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { SignupModel } from '../models/signup.model';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class SignupController extends Controller {
  private readonly _model: SignupModel;
  private _supabaseClientDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new SignupModel(this._storeOptions);

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): SignupModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {
    const supabaseService = this._container.get('SupabaseService');
    this._supabaseClientDisposer = observe(
      supabaseService,
      'client',
      (value: IValueDidChange<SupabaseClient | undefined>) => {
        this._model.supabaseClient = value.newValue;
      }
    );
  }

  public override load(_renderCount: number): void {
    const supabaseService = this._container.get('SupabaseService');
    supabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._supabaseClientDisposer?.();
  }

  public updateEmailConfirmationSent(emailConfirmationSent: boolean): void {
    this._model.emailConfirmationSent = emailConfirmationSent;
  }

  public updateEmail(value: string): void {
    this._model.email = value;
  }

  public updatePassword(value: string): void {
    this._model.password = value;
  }

  public updateConfirmationPassword(value: string): void {
    this._model.confirmationPassword = value;
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    _session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_IN') {
      this._model.email = '';
      this._model.password = '';
      this._model.confirmationPassword = '';
    } else if (event === 'SIGNED_OUT') {
      this._model.email = '';
      this._model.password = '';
      this._model.confirmationPassword = '';
    }
  }
}
