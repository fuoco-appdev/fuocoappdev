/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any
import { GuardExecuter } from 'https://fuoco-appdev-core-api-pkmaxa4qwqt0.deno.dev/core/src/index.ts';
import SupabaseService from '../services/supabase.service.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";

export class AuthGuard extends GuardExecuter {
    public override async canExecuteAsync(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): Promise<boolean> {
        if (ctx.request.headers.has("session-token")) {
            const token = ctx.request.headers.get("session-token") ?? '';
            const {user, error} = await SupabaseService.client.auth.api.getUser(token);
            if (error) {
                console.error(error);
            }

            return user ? true : false;
        }

        return false;
    }
}