/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any
import { GuardExecuter } from 'https://fuoco-appdev-core-api-z6pn2hqtb120.deno.dev/core/src/index.ts';
import { User } from "https://deno.land/x/supabase@1.3.1/mod.ts";
import SupabaseService from '../services/supabase.service.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";

export class AuthGuard extends GuardExecuter {
    public override canExecute(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): boolean {
        let isAuthenticated = false;
        if (ctx.request.headers.has("authorization")) {
            const token = ctx.request.headers.get("authorization") ?? '';
            SupabaseService.client.auth.api.getUser(token)
            .then((value: { user: User | null; data: User | null; error: any | null; }) => {
                isAuthenticated = value.user ? true : false;
            });
        }

        return isAuthenticated;
    }
}