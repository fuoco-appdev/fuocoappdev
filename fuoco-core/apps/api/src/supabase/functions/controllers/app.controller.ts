// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-t6j2pb2w5vcg.deno.dev/core/src/index.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import AppService from '../services/app.service.ts';
import { AuthGuard } from '../guards/index.ts';
import {App} from '../protobuf/core_pb.js';
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";

@Controller('/app')
export class AppController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getAppAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const data = await AppService.findAsync(paramsId);
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
    public async createAppAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const app = App.deserializeBinary(body.value);
        const data = await AppService.createAsync(paramsId, app);
        if (!data) {
            throw HttpError.createError(409, `Cannot create app with id ${paramsId}`);
        }

        const responseApp = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseApp.serializeBinary();
    }

    @Post('/all')
    @ContentType('application/x-protobuf')
    public async getAllAppsAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const data = await AppService.findAllAsync();
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
    public async updateAppAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const body = context.request.body();
        const app = App.deserializeBinary(body.value);
        const data = await AppService.updateAsync(paramsId, app);
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
    public async deleteUserAsync(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): Promise<void> {
        const paramsId = context.params['id'];
        const data = await AppService.deleteAsync(paramsId);
        if (!data) {
            throw HttpError.createError(404, `App data not found`);
        }

        const responseApp = AppService.assignAndGetAppProtocol(data);
        context.response.type = "application/x-protobuf";
        context.response.body = responseApp.serializeBinary();
    }
}