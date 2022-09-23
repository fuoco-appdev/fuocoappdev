// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard} from 'https://fuoco-appdev-core-api-2dwzegm3eshg.deno.dev/core/src/index.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/auth.guard.ts';

@Controller('/user')
export class UserController {
    @Post('/:id')
    @Guard(AuthGuard)
    public getUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/create/:id')
    @Guard(AuthGuard)
    public createUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/all')
    public getAllUsers(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/update/:id')
    @Guard(AuthGuard)
    public updateUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/delete/:id')
    @Guard(AuthGuard)
    public deleteUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }
}