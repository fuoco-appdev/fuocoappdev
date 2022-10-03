import ConfigService from "./services/config.service";


export class Service {
    private readonly _headers: {[key: string]: string};
    private readonly _endpointUrl: string;

    constructor() {
        this._headers = {
            'Authorization': `Bearer ${ConfigService.supabase.key}`,
            'Content-Type': 'application/x-protobuf',
        };
        this._endpointUrl = `${ConfigService.supabase.url}/functions/v1`;
    }

    public get headers(): {[key: string]: string} {
        return this._headers;
    }

    public get endpointUrl(): string {
        return this._endpointUrl;
    }
}