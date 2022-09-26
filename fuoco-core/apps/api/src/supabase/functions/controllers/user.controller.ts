// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-z6pn2hqtb120.deno.dev/core/src/index.ts';
import { User as SupabaseUser,  } from "https://deno.land/x/supabase@1.3.1/mod.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';
import { User} from '../protobuf/core_pb.js';
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
import SupabaseService from '../services/supabase.service.ts';
import { ApiError } from "https://deno.land/x/gotrue@3.0.0/src/GoTrueApi.ts";

@Controller('/user')
export class UserController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public getUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        let data = null;
        UserService.findAsync(paramsId).then((value: any | null) => {
            data = value;
        });
        if (!data) {
            throw HttpError.createError(404, `User with superbase id ${paramsId} not found`);
        }

        const user = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = user.serializeBinary();
    }

    @Post('/create')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public createUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const token = context.request.headers.get("authorization") ?? '';
        let supabaseUser: SupabaseUser | null = null;
        SupabaseService.client.auth.api.getUser(token)
        .then((value: {
            user: SupabaseUser | null;
            data: SupabaseUser | null;
            error: ApiError | null;
        }) => {supabaseUser = value.user;})

        if (!supabaseUser) {
            throw HttpError.createError(404, `Supabase user not found`); 
        }

        const body = context.request.body();
        const user = User.deserializeBinary(body.value);
        let data = null;
        UserService.createAsync((supabaseUser as SupabaseUser).id, user)
            .then((value: any | null) => {data = value;});
        
        if (!data) {
            throw HttpError.createError(409, `Cannot create user`);
        }

        const responseUser = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseUser.serializeBinary();
    }

    @Post('/all')
    @ContentType('application/x-protobuf')
    public getAllUsers(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        let data = null;
        UserService.findAllAsync().then((value: any[] | null) => {
            data = value;
        });
        if (!data) {
            throw HttpError.createError(404, `No users were found`);
        }

        const users = UserService.assignAndGetUsersProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = users.serializeBinary();
    }

    @Post('/update/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public updateUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const user = User.deserializeBinary(body.value);
        let data = null;
        UserService.updateAsync(paramsId, user).then((value: any | null) => {
            data = value;
        });
        if (!data) {
            throw HttpError.createError(404, `User data not found`);
        }

        const responseUser = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseUser.serializeBinary();
    }

    @Post('/delete/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public deleteUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        let data = null;
        UserService.deleteAsync(paramsId).then((value: any | null) => {
            data = value;
        });
        if (!data) {
            throw HttpError.createError(404, `User data not found`);
        }

        const responseUser = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseUser.serializeBinary();
    }
}