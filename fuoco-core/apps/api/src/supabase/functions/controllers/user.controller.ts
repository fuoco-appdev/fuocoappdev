// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-z6pn2hqtb120.deno.dev/core/src/index.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';

@Controller('/user')
export class UserController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('x-protobuf')
    public getUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/create/:id')
    @Guard(AuthGuard)
    @ContentType('x-protobuf')
    public createUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/all')
    @ContentType('x-protobuf')
    public getAllUsers(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/update/:id')
    @Guard(AuthGuard)
    @ContentType('x-protobuf')
    public updateUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/delete/:id')
    @Guard(AuthGuard)
    @ContentType('x-protobuf')
    public deleteUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }
}