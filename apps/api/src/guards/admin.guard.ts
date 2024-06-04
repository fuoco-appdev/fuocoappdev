/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { GuardExecuter } from '../index.ts';
import SupabaseService from '../services/supabase.service.ts';

export class AdminGuard extends GuardExecuter {
    public override async canExecuteAsync(
        ctx: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string | number, string | undefined>
        >
    ): Promise<boolean> {
        if (ctx.request.headers.has('authorization')) {
            const token = ctx.request.headers.get('authorization') ?? '';
            if (token !== `Bearer ${SupabaseService.key}`) {
                console.error('Not authorized');
                return false;
            }

            return true;
        }

        return false;
    }
}
