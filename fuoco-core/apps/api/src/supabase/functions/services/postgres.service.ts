import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

class PostgresService {
    private readonly _client: Client;

    constructor() {
        const postgresUrl = config()["DATABASE_URL"];
        console.log(config());
        if (!postgresUrl) {
            throw new Error("DATABASE_URL doesn't exist");
        }
        this._client = new Client(postgresUrl);
    }

    public get client(): Client {
        return this._client;
    }
}

export default new PostgresService();