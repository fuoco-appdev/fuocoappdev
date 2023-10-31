/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { ResetPasswordModel } from '../models/reset-password.model';
import SupabaseService from '../services/supabase.service';
import {
  Session,
  AuthChangeEvent,
  SupabaseClient,
} from '@supabase/supabase-js';

class ResetPasswordController extends Controller {
  private readonly _model: ResetPasswordModel;
  private _supabaseClientSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new ResetPasswordModel();
  }

  public get model(): ResetPasswordModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._supabaseClientSubscription =
      SupabaseService.supabaseClientObservable.subscribe({
        next: (value: SupabaseClient | undefined) => {
          this._model.supabaseClient = value;
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._supabaseClientSubscription?.unsubscribe();
  }
}

export default new ResetPasswordController();
