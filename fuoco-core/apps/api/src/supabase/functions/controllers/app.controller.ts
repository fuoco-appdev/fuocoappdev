// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-z6pn2hqtb120.deno.dev/core/src/index.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import AppService, { AppProps } from '../services/app.service.ts';
import { AuthGuard } from '../guards/index.ts';
import {App} from '../protobuf/core_pb.js';
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";

@Controller('/app')
export class AppController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public getApp(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        let data: AppProps | null = null;
        AppService.findAsync(paramsId).then((value: AppProps | null) => {
            data = value;
        });

        if (!data) {
            throw HttpError.createError(404, `App with id ${paramsId} not found`);
        }

        const app = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = app.serializeBinary();
    }

    @Post('/create/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public createApp(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const app = App.deserializeBinary(body.value);
        let data: AppProps | null = null;
        AppService.createAsync(paramsId, app)
            .then((value: any | null) => {data = value;});
        
        if (!data) {
            throw HttpError.createError(409, `Cannot create app with id ${paramsId}`);
        }

        const responseApp = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseApp.serializeBinary();
    }

    @Post('/all')
    @ContentType('application/x-protobuf')
    public getAllApps(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        let data: AppProps[] | null = null;
        AppService.findAllAsync().then((value: AppProps[] | null) => {
            data = value;
        });

        if (!data) {
            throw HttpError.createError(404, `No apps were found`);
        }

        const apps = AppService.assignAndGetAppsProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = apps.serializeBinary();
    }

    @Post('/update/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public updateApp(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const app = App.deserializeBinary(body.value);
        let data: AppProps | null = null;
        AppService.updateAsync(paramsId, app).then((value: AppProps | null) => {
            data = value;
        });

        if (!data) {
            throw HttpError.createError(404, `App data not found`);
        }

        const responseApp = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseApp.serializeBinary();
    }

    @Post('/delete/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public deleteUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        let data: AppProps | null = null;
        AppService.deleteAsync(paramsId).then((value: AppProps | null) => {
            data = value;
        });

        if (!data) {
            throw HttpError.createError(404, `App data not found`);
        }

        const responseApp = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseApp.serializeBinary();
    }
}