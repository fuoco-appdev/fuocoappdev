// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post} from 'https://fuoco-appdev-core-api-rfpbrbxw9060.deno.dev/core/src/index.ts'
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';

@Controller('/user')
export class UserController {
    @Post('/:id')
    public getUser({id}: Oak.RouteParams<string>, buffer: string): Response {
        console.log(id);
        console.log(buffer);
        return new Response(JSON.stringify({}), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
        });
    }
}