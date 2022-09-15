import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Controller } from "../controller";
import { UserModel } from "../models/user.model";
import AuthService from '../services/auth.service';

class UserController extends Controller {
    private readonly _model: UserModel;

    constructor() {
        super();

        this._model = new UserModel();
        
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        AuthService.supabaseClient.auth.onAuthStateChange(this.onAuthStateChanged)
    }

    public get model(): UserModel {
        return this._model;
    }

    public override dispose(): void {}

    private onAuthStateChanged(event: AuthChangeEvent, session: Session | null): void {
        if (event === 'SIGNED_IN') {}
        else if(event === 'SIGNED_OUT') {}
        else if(event === 'USER_DELETED') {}
    }
}

export default new UserController();