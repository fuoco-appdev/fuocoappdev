/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { SigninModel } from '../models/signin.model';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';
import WindowController from './window.controller';

export default class SigninController extends Controller {
  private readonly _model: SigninModel;
  private _supabaseClientDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
      WindowController: WindowController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new SigninModel(this._storeOptions);

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): SigninModel {
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

  public updateEmail(value: string) {
    this._model.email = value;
  }

  public updatePassword(value: string) {
    this._model.password = value;
  }

  public async resendEmailConfirmationAsync(
    email: string,
    onEmailSent?: () => void
  ): Promise<void> {
    const supabaseService = this._container.get('SupabaseService');
    const windowController = this._container.get('WindowController');
    const response = await supabaseService.supabaseClient?.auth.resend({
      type: 'signup',
      email: email,
    });
    if (response?.error) {
      // windowController.addToast({
      //   key: `signup-resend-email-${Math.random()}`,
      //   message: response.error.name,
      //   description: response.error.message,
      //   type: 'error',
      // });
    }

    onEmailSent?.();
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    _session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_IN') {
      this._model.email = '';
      this._model.password = '';
    } else if (event === 'SIGNED_OUT') {
      this._model.email = '';
      this._model.password = '';
    }
  }
}
