// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-t6j2pb2w5vcg.deno.dev/core/src/index.ts';
import { User as SupabaseUser,  } from "https://deno.land/x/supabase@1.3.1/mod.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';
import { User } from '../protobuf/core_pb.js';
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
import SupabaseService from '../services/supabase.service.ts';

@Controller('/user')
export class UserController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getUserAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        console.log(context);
        const data = await UserService.findAsync(paramsId);
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
    public async createUserAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const token = context.request.headers.get("session-token") ?? '';
        const supabaseUser = await SupabaseService.client.auth.api.getUser(token);
        if (!supabaseUser.user) {
            throw HttpError.createError(404, `Supabase user not found`); 
        }

        const body = context.request.body();
        const user = User.deserializeBinary(body.value);
        const data = await UserService.createAsync((supabaseUser.user as SupabaseUser).id, user);
        
        if (!data) {
            throw HttpError.createError(409, `Cannot create user`);
        }

        const responseUser = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseUser.serializeBinary();
    }

    @Post('/all')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getAllUsersAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const data = await UserService.findAllAsync();
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
    public async updateUserAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const user = User.deserializeBinary(body.value);
        const data = await UserService.updateAsync(paramsId, user);
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
    public async deleteUserAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const data = await UserService.deleteAsync(paramsId);
        if (!data) {
            throw HttpError.createError(404, `User data not found`);
        }

        const responseUser = UserService.assignAndGetUserProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseUser.serializeBinary();
    }
}