// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Get} from 'https://fuoco-appdev-core-api-mwr1199vbg80.deno.dev/core/src/index.ts'

@Controller('user')
export class UserController {
    @Get('/:id')
    public getUser({id}: any, buffer: string): Response {
        console.log(id);
        console.log(buffer);
        return new Response(JSON.stringify({}), {
            headers: {'Content-Type': 'application/json'},
            status: 200,
          })
    }
}