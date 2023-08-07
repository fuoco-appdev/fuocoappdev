/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { SignupModel } from '../models/signup.model';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import SupabaseService from '../services/supabase.service';

class SignupController extends Controller {
  private readonly _model: SignupModel;

  constructor() {
    super();

    this._model = new SignupModel();

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  public get model(): SignupModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    SupabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
  }

  public override dispose(renderCount: number): void {}

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
    session: Session | null
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
