import { AuthError } from '@supabase/supabase-js';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { EmailConfirmationModel } from '../models/email-confirmation.model';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';

export default class EmailConfirmationController extends Controller {
  private readonly _model: EmailConfirmationModel;

  constructor(
    private readonly _container: DIContainer<{
      SupabaseService: SupabaseService;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new EmailConfirmationModel(this._storeOptions);
  }

  public get model(): EmailConfirmationModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {}

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public updateEmail(value: string): void {
    this._model.email = value;
  }

  public async resendEmailConfirmationAsync(
    email: string,
    onEmailSent?: () => void,
    onError?: (error: AuthError | null | undefined) => void
  ): Promise<void> {
    const supabaseService = this._container.get('SupabaseService');
    const response = await supabaseService.supabaseClient?.auth.resend({
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
