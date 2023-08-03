/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { SigninModel } from '../models/signin.model';
import SupabaseService from '../services/supabase.service';
import WindowController from './window.controller';

class SigninController extends Controller {
  private readonly _model: SigninModel;

  constructor() {
    super();

    this._model = new SigninModel();
  }

  public get model(): SigninModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {}

  public override dispose(renderCount: number): void {}

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
    const response = await SupabaseService.supabaseClient.auth.resend({
      type: 'signup',
      email: email,
    });
    if (response.error) {
      WindowController.addToast({
        key: `signup-resend-email-${Math.random()}`,
        message: response.error.name,
        description: response.error.message,
        type: 'error',
      });
    }

    onEmailSent?.();
  }
}

export default new SigninController();
