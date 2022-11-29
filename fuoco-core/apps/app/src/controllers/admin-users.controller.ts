/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from "rxjs";
import { Controller } from "../controller";
import { AdminUsersModel } from "../models/admin-users.model";
import UserService from "../services/user.service";
import {core} from "../protobuf/core";

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
        this._userSubscription = UserService.activeUserObservable
            .subscribe({
                next: this.onActiveUserAsync
            });
    }

    public dispose(): void {
        this._userSubscription?.unsubscribe();
    }

    private async onActiveUserAsync(user: core.User | null): Promise<void> {
        if (user?.role !== core.UserRole.ADMIN) {
            return;
        }

        const users = await UserService.requestAllUsersAsync();
        console.log(users);
    }
}

export default new AdminUsersController();