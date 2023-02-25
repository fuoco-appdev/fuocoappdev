/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AdminAccountsModel } from '../models/admin-accounts.model';
import UserService from '../services/user.service';
import AccountService from '../services/account.service';
import * as core from '../protobuf/core_pb';

class AdminAccountsController extends Controller {
  private readonly _model: AdminAccountsModel;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AdminAccountsModel();

    this.onActiveUserAsync = this.onActiveUserAsync.bind(this);
  }

  public get model(): AdminAccountsModel {
    return this._model;
  }

  public initialize(): void {
    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: this.onActiveUserAsync,
    });
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
  }

  public showRequestedModal(show: boolean, account: core.Account | null): void {
    this._model.selectedAccount = account;
    this._model.showRequestedModal = show;
  }

  public async acceptRequestedUserAsync(): Promise<void> {
    if (!this._model.selectedAccount) {
      return;
    }

    this._model.showRequestedModal = false;
    const updatedAccount = await AccountService.requestUpdateAsync(
      this._model.selectedAccount.id,
      {
        request_status: core.RequestStatus.ACCEPTED,
      }
    );

    const requestedAccounts = this._model.requestedAccounts.filter(
      (value) => value.id !== updatedAccount.id
    );
    this._model.requestedAccounts = requestedAccounts;

    const acceptedAccounts = this._model.acceptedAccounts.concat([
      updatedAccount,
    ]);
    this._model.acceptedAccounts = acceptedAccounts;

    this._model.selectedAccount = null;
  }

  private async onActiveUserAsync(user: core.User | null): Promise<void> {
    if (!user || user?.role !== 'admin') {
      return;
    }

    const accounts = await AccountService.requestAllAsync();
    const requestedAccounts: core.Account[] = [];
    const acceptedAccounts: core.Account[] = [];
    const updateRequestedAccounts: core.Account[] = [];
    const updateAcceptedAccounts: core.Account[] = [];
    for (const account of accounts.accounts) {
      if (account.requestStatus === core.RequestStatus.REQUESTED) {
        requestedAccounts.push(account);
      } else if (account.requestStatus === core.RequestStatus.ACCEPTED) {
        acceptedAccounts.push(account);
      } else if (
        account.requestStatus === core.RequestStatus.UPDATE_REQUESTED
      ) {
        updateRequestedAccounts.push(account);
      } else if (account.requestStatus === core.RequestStatus.UPDATE_ACCEPTED) {
        updateAcceptedAccounts.push(account);
      }
    }

    this._model.requestedAccounts = requestedAccounts;
    this._model.acceptedAccounts = acceptedAccounts;
    this._model.updateRequestedAccounts = updateRequestedAccounts;
    this._model.updateAcceptedAccounts = updateAcceptedAccounts;
  }
}

export default new AdminAccountsController();
