/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AccountModel } from '../models/account.model';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';
import SupabaseService from '../services/supabase.service';
import BucketService from '../services/bucket.service';
import { LanguageCode } from '@fuoco.appdev/core-ui';

class AccountController extends Controller {
  private readonly _model: AccountModel;
  private _accountSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AccountModel();
  }

  public get model(): AccountModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._accountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: (account: core.Account | null) => {
          if (!account) {
            return;
          }

          this._model.profileUrl =
            BucketService.getPublicUrl(
              core.BucketType.Avatars,
              account.profileUrl
            ) ?? undefined;
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
  }

  public async deleteAsync(): Promise<void> {
    await AccountService.requestActiveDeleteAsync();
    AccountService.clearActiveAccount();
    SupabaseService.clear();
  }
}

export default new AccountController();
