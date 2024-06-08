import { IRequest } from 'https://deno.land/x/axiod@0.26.2/interfaces.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { Bulk, connect, Redis, RedisValue } from "https://deno.land/x/redis/mod.ts";
import SupabaseService from './supabase.service.ts';

export enum RedisIndexKey {
    Queue = 'indexing:queue',
}

class RedisService {
    private readonly _hostname: string | undefined;
    private readonly _port: string | undefined;
    private _tsl: string | undefined;
    private readonly _password: string | undefined;
    private _redis: Redis | undefined;
    private _connectionCallbacks: ((redis: Redis) => void)[];
    private readonly _apiUrl: string;

    constructor() {
        this._hostname = Deno.env.get('REDIS_HOSTNAME');
        this._port = Deno.env.get('REDIS_PORT');
        this._tsl = Deno.env.get('REDIS_TSL');
        this._password = Deno.env.get('REDIS_PASSWORD');
        this._connectionCallbacks = [];
        this._apiUrl = Deno.env.get('API_URL') ?? 'http://localhost:9001';

        if (!this._hostname) {
            throw new Error("REDIS_HOSTNAME doesn't exist");
        }
        if (!this._port) {
            throw new Error("REDIS_PORT doesn't exist");
        }
    }

    public addConnectionCallback(callback: (redis: Redis) => void): void {
        this._connectionCallbacks.push(callback);
    }

    public async connectAsync(): Promise<void> {
        this._redis = await connect({
            hostname: this._hostname ?? '',
            port: this._port,
            tls: this._tsl?.toLowerCase() === 'true',
            password: this._password
        });

        for (const callback of this._connectionCallbacks) {
            callback(this._redis);
        }
    }

    public async deleteAsync(...keys: string[]): Promise<number | undefined> {
        return await this._redis?.del(...keys);
    }

    public async setAsync(key: string, value: RedisValue): Promise<string | undefined> {
        return await this._redis?.set(key, value);
    }

    public async getAsync(key: string): Promise<Bulk | undefined> {
        return await this._redis?.get(key);
    }

    public async lPushAsync(key: string, ...values: RedisValue[]): Promise<number | undefined> {
        return await this._redis?.lpush(key, ...values);
    }

    public async lPopAsync(key: string): Promise<Bulk | undefined> {
        return await this._redis?.lpop(key);
    }

    public async rPushAsync(key: string, ...values: RedisValue[]): Promise<number | undefined> {
        return await this._redis?.rpush(key, ...values);
    }

    public async rPopAsync(key: string): Promise<Bulk | undefined> {
        return await this._redis?.rpop(key);
    }

    public async lLenAsync(key: string): Promise<number | undefined> {
        return await this._redis?.llen(key);
    }

    public async publishAsync(channel: string, message: RedisValue): Promise<number | undefined> {
        return await this._redis?.publish(channel, message);
    }

    public async publishIndexing(
        data: string | undefined
    ): Promise<void> {
        if (!data) {
            return;
        }

        const queueData = JSON.parse(data) as { pathname: string, data: any };
        const axiosConfig = JSON.stringify({
            method: 'post',
            url: `${this._apiUrl}/${queueData.pathname}`,
            data: queueData.data,
            headers: {
                Authorization: `Bearer ${SupabaseService.key}`,
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        } as IRequest);
        await this.publishAsync('axios:request', axiosConfig);
    }
}

export default new RedisService();
