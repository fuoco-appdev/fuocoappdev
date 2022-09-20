/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {postgres} from "https://deno.land/x/postgresql@v2.0.0-beta.5/mod.js"
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

class PostgresService {
    private readonly _sql: any;

    constructor() {
        const env = config({path: '../../.env'});
        const url: string = env.DATABASE_URL;
        if (!url) {
            throw new Error("DATABASE_URL doesn't exist");
        }
        this._sql = postgres();
    }

    public get sql(): any  {
        return this._sql;
    }
}

export default new PostgresService();