// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post} from 'https://fuoco-appdev-core-api-k76402ahqk3g.deno.dev/core/src/index.ts'
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';

@Controller('/user')
export class UserController {
    @Post('/:id')
    public getUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Response {
        console.log(context);
        return new Response(JSON.stringify({}), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
        });
    }

    @Post('/all')
    public getAllUsers(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Response {
        console.log(context);
        return new Response(JSON.stringify({}), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
        });
    }
}