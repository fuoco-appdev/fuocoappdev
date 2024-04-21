/* eslint-disable @typescript-eslint/no-empty-function */
import {
  SupabaseClient
} from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { ResetPasswordModel } from '../models/reset-password.model';
import SupabaseService from '../services/supabase.service';

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

  public override initialize(_renderCount: number): void {}

  public override load(_renderCount: number): void {
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
}

export default new ResetPasswordController();
