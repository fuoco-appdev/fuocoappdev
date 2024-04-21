/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { SignupModel } from '../models/signup.model';
import SupabaseService from '../services/supabase.service';

class SignupController extends Controller {
  private readonly _model: SignupModel;
  private _supabaseClientSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new SignupModel();

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): SignupModel {
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

export default new SignupController();
