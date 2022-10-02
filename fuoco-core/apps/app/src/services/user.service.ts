import { Service } from "../service";
import {core} from '../protobuf/core';
import {BehaviorSubject, Observable} from 'rxjs';
import AuthService from "./auth.service";

class UserService extends Service {
    private readonly _activeUserBehaviorSubject: BehaviorSubject<core.User | null>;

    constructor() {
        super();

        this._activeUserBehaviorSubject = new BehaviorSubject<core.User | null>(null);
    }

    public get activeUserObservable(): Observable<core.User | null> {
        return this._activeUserBehaviorSubject.asObservable();
    }

    public async requestActiveUserAsync(): Promise<core.User> {
        const supabaseUser = AuthService.supabaseClient.auth.user();
        if (!supabaseUser) {
            throw new Error('No authenticated user');
        }
        const user = await this.requestUserAsync(supabaseUser.id);
        this._activeUserBehaviorSubject.next(user);
        return user;
    }

    public async requestUserAsync(supabaseId: string): Promise<core.User> {
        const requestOptions = {
            method: 'POST',
            headers: this.headers
        };
        const response = await fetch(`${this.endpointUrl}/user/${supabaseId}`, requestOptions);
        console.log(response);
        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body?.getReader();
        const result = await reader.read();
        if (!result.value) {
            throw new Error('No value from response');
        }

        const userResponse = core.User.deserializeBinary(result.value);
        return userResponse;
    }

    public async requestAllUsersAsync(): Promise<core.Users> {
        const requestOptions = {
            method: 'POST',
            headers: this.headers
        };
        const response = await fetch(`${this.endpointUrl}/user/all`, requestOptions);
        if (!response.body) {
            throw new Error('Cannot get all users');
        }

        const reader = response.body?.getReader();
        const result = await reader.read();
        if (!result.value) {
            throw new Error('No value from response');
        }

        const usersResponse = core.Users.deserializeBinary(result.value);
        return usersResponse;
    }

    public async requestCreateUserAsync(): Promise<core.User> {
        const supabaseUser = AuthService.supabaseClient.auth.user();
        if (!supabaseUser) {
            throw new Error('No authenticated user');
        }

        const user = new core.User({
            role: core.UserRole.USER,
            email: supabaseUser.email,
            request_status: core.UserRequestStatus.IDLE,
            apps: []
        });

        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: user.serialize()
        };
        const response = await fetch(`${this.endpointUrl}/user/create`, requestOptions);
        if (!response.body) {
            throw new Error('Cannot create user');
        }

        const reader = response.body?.getReader();
        const result = await reader.read();
        if (!result.value) {
            throw new Error('No value from response');
        }

        const userResponse = core.User.deserializeBinary(result.value);
        this._activeUserBehaviorSubject.next(userResponse);

        return userResponse;
    }

    public async requestUpdateActiveUserAsync(props: {
        company?: string;
        email?: string;
        phone_number?: string;
        location?: core.Location;
        language?: string;
        request_status?: core.UserRequestStatus;
    }): Promise<core.User> {
        const supabaseUser = AuthService.supabaseClient.auth.user();
        if (!supabaseUser) {
            throw new Error('No authenticated user');
        }
        const user = await this.requestUpdateUserAsync(supabaseUser.id, props);
        this._activeUserBehaviorSubject.next(user);
        return user;
    }

    public async requestUpdateUserAsync(
        supabaseId: string, 
        props: {
            company?: string;
            email?: string;
            phone_number?: string;
            location?: core.Location;
            language?: string;
            request_status?: core.UserRequestStatus;
        }): Promise<core.User> {
        const user = new core.User(props);
        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: user.serialize()
        };
        const response = await fetch(`${this.endpointUrl}/user/update/${supabaseId}`, requestOptions);
        if (!response.body) {
            throw new Error('Cannot update user');
        }

        const reader = response.body?.getReader();
        const result = await reader.read();
        if (!result.value) {
            throw new Error('No value from response');
        }

        const userResponse = core.User.deserializeBinary(result.value);
        return userResponse;
    }

    public async requestDeleteUserAsync(supabaseId: string): Promise<core.User> {
        const requestOptions = {
            method: 'POST',
            headers: this.headers
        };
        const response = await fetch(`${this.endpointUrl}/user/delete/${supabaseId}`, requestOptions);
        if (!response.body) {
            throw new Error('Cannot delete user');
        }

        const reader = response.body?.getReader();
        const result = await reader.read();
        if (!result.value) {
            throw new Error('No value from response');
        }

        const userResponse = core.User.deserializeBinary(result.value);
        return userResponse;
    }
}

export default new UserService();