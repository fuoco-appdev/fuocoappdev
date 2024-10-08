/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { ForgotPasswordModel } from '../models/forgot-password.model';
import SupabaseService from '../services/supabase.service';

class ForgotPasswordController extends Controller {
  private readonly _model: ForgotPasswordModel;
  private _supabaseClientSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new ForgotPasswordModel();

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): ForgotPasswordModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {}

  public override load(_renderCount: number): void {
    SupabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );

    this._supabaseClientSubscription =
      SupabaseService.supabaseClientObservable.subscribe({
        next: (value: SupabaseClient | undefined) => {
          this._model.supabaseClient = value;
        },
      });
  }

  public override disposeInitialization(_renderCount: number): void {}

  public override disposeLoad(_renderCount: number): void {
    this._supabaseClientSubscription?.unsubscribe();
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

export default new ForgotPasswordController();
