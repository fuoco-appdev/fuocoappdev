// deno-lint-ignore-file no-explicit-any ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Controller, Post, Guard, ContentType} from 'https://fuoco-appdev-core-api-z6pn2hqtb120.deno.dev/core/src/index.ts';
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import UserService from '../services/user.service.ts';
import { AuthGuard } from '../guards/index.ts';
import { User, Location } from '../protobuf/core_pb.js';
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";

@Controller('/user')
export class UserController {
    @Post('/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public getUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const paramsId = context.params['id'];
        let data = null;
        UserService.findAsync(paramsId).then((value: any | null) => {
            data = value;
        });
        if (!data) {
            throw HttpError.createError(404, `User with superbase id ${paramsId} not found`);
        }

        const id = data['id'];
        const createdAt = data['created_at'];
        const supabaseId = data['supabase_id'];
        const role = data['role'];
        const company = data['company'];
        const email = data['email'];
        const phoneNumber = data['phone_number'];
        const language = data['language'];
        const locationData = data['location'];
        const requestStatus = data['request_status'];
        const appData = data['apps'];

        const user = new User();
        const location = new Location();
        if (locationData) {
            location.setLatitude(Number(locationData['latitude']));
            location.setLongitude(Number(locationData['longitude']));
        }
        
        user.setId(id);
        user.setCreatedAt(createdAt);
        user.setSupabaseId(supabaseId);
        user.setRole(role);
        user.setCompany(company);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setLanguage(language);
        user.setLocation(location);
        user.setRequestStatus(requestStatus);
        user.setAppsList([]);

        context.response.type = "application/x-protobuf";
        context.response.body = user.serializeBinary();
    }

    @Post('/create')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public createUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        const body = context.request.body();
        const user = User.deserializeBinary(body.value);
        context.response.body = JSON.stringify({});
    }

    @Post('/all')
    @ContentType('application/x-protobuf')
    public getAllUsers(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/update/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public updateUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }

    @Post('/delete/:id')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public deleteUser(context: Oak.RouterContext<string, Oak.RouteParams<string>, Record<string, any>>): void {
        context.response.body = JSON.stringify({});
    }
}