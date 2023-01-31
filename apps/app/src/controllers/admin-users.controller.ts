/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { AdminUsersModel } from '../models/admin-users.model';
import UserService from '../services/user.service';
import * as core from '../protobuf/core_pb';

class AdminUsersController extends Controller {
  private readonly _model: AdminUsersModel;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new AdminUsersModel();

    this.onActiveUserAsync = this.onActiveUserAsync.bind(this);
  }

  public get model(): AdminUsersModel {
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

  public showRequestedModal(show: boolean, user: core.User | null): void {
    this._model.selectedUser = user;
    this._model.showRequestedModal = show;
  }

  public async acceptRequestedUserAsync(): Promise<void> {
    if (!this._model.selectedUser) {
      return;
    }

    this._model.showRequestedModal = false;
    const updatedUser = await UserService.requestUpdateAsync(
      this._model.selectedUser.supabaseId,
      {
        request_status: core.UserRequestStatus.ACCEPTED,
      }
    );

    const requestedUsers = this._model.requestedUsers.filter(
      (value) => value.id !== updatedUser.id
    );
    this._model.requestedUsers = requestedUsers;

    const acceptedUsers = this._model.acceptedUsers.concat([updatedUser]);
    this._model.acceptedUsers = acceptedUsers;

    this._model.selectedUser = null;
  }

  private async onActiveUserAsync(user: core.User | null): Promise<void> {
    if (!user || user?.role !== core.UserRole.ADMIN) {
      return;
    }

    const users = await UserService.requestAllAsync();
    const requestedUsers: core.User[] = [];
    const acceptedUsers: core.User[] = [];
    const updateRequestedUsers: core.User[] = [];
    const updateAcceptedUsers: core.User[] = [];
    for (const user of users.users) {
      if (user.requestStatus === core.UserRequestStatus.REQUESTED) {
        requestedUsers.push(user);
      } else if (user.requestStatus === core.UserRequestStatus.ACCEPTED) {
        acceptedUsers.push(user);
      } else if (
        user.requestStatus === core.UserRequestStatus.UPDATE_REQUESTED
      ) {
        updateRequestedUsers.push(user);
      } else if (
        user.requestStatus === core.UserRequestStatus.UPDATE_ACCEPTED
      ) {
        updateAcceptedUsers.push(user);
      }
    }

    this._model.requestedUsers = requestedUsers;
    this._model.acceptedUsers = acceptedUsers;
    this._model.updateRequestedUsers = updateRequestedUsers;
    this._model.updateAcceptedUsers = updateAcceptedUsers;
  }
}

export default new AdminUsersController();
