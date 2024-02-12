import { EmailConfirmationModel } from '../models/email-confirmation.model';
import { Controller } from '../controller';
import SupabaseService from '../services/supabase.service';
import { AuthError } from '@supabase/supabase-js';

class EmailConfirmationController extends Controller {
  private readonly _model: EmailConfirmationModel;

  constructor() {
    super();

    this._model = new EmailConfirmationModel();
  }

  public get model(): EmailConfirmationModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {}

  public override load(renderCount: number): void {}

  public override disposeInitialization(renderCount: number): void {}

  public override disposeLoad(renderCount: number): void {}

  public updateEmail(value: string): void {
    this._model.email = value;
  }

  public async resendEmailConfirmationAsync(
    email: string,
    onEmailSent?: () => void,
    onError?: (error: AuthError | null | undefined) => void
  ): Promise<void> {
    const response = await SupabaseService.supabaseClient?.auth.resend({
      type: 'signup',
      email: email,
    });
    if (response?.error) {
      onError?.(response?.error);
      return;
    }

    onEmailSent?.();
  }
}

export default new EmailConfirmationController();
