import { readAll } from 'https://deno.land/std@0.105.0/io/util.ts';
import { HttpError } from 'https://deno.land/x/oak@v11.1.0/deps.ts';
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { AdminGuard } from '../guards/admin.guard.ts';
import { AuthGuard } from '../guards/index.ts';
import { ContentType, Controller, Guard, Post } from '../index.ts';
import {
    ChatMessagesRequest,
    ChatPrivateSubscriptionRequest,
    ChatSeenMessagesRequest,
    ChatSubscriptionRequest,
    ChatSubscriptionsRequest,
    CreatePrivateChatRequest,
    LastChatMessagesRequest
} from '../protobuf/chat_pb.js';
import ChatService from '../services/chat.service.ts';

@Controller('/chat')
export class ChatController {
    @Post('/privates/webhook/document')
    @ContentType('application/json')
    public async handlePrivatesWebhookDocumentAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body().value;
        const type = body['type'];
        const privateChat = body['record'];
        if (type === 'INSERT') {
            await ChatService.addPrivateDocumentAsync(privateChat);
        } else if (type === 'UPDATE') {
            await ChatService.updatePrivateDocumentAsync(privateChat);
        } else if (type === 'DELETE') {
            await ChatService.deletePrivateDocumentAsync(privateChat);
        }

        context.response.status = 200;
    }

    @Post('/indexing')
    @Guard(AdminGuard)
    @ContentType('application/json')
    public async handleIndexingAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const data = await context.request.body().value;
        await ChatService.indexDocumentsAsync(data);
        context.response.status = 200;
    }

    @Post('/create-private')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async createAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = CreatePrivateChatRequest.deserializeBinary(requestValue);
        const response = await ChatService.createPrivateChatAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot create private chat');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/subscriptions')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async requestSubscriptionsAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request =
            ChatSubscriptionsRequest.deserializeBinary(requestValue);
        const response = await ChatService.requestSubscriptionsAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot request subscriptions');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/request-private-subscription')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async requestPrivateSubscriptionAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request =
            ChatPrivateSubscriptionRequest.deserializeBinary(requestValue);
        const response = await ChatService.requestPrivateSubscriptionAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot request private subscription');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/request-subscription')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async requestSubscriptionAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = ChatSubscriptionRequest.deserializeBinary(requestValue);
        const response = await ChatService.requestSubscriptionAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot request subscription');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/join-subscription')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async joinSubscriptionAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = ChatSubscriptionRequest.deserializeBinary(requestValue);
        const response = await ChatService.joinSubscriptionAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot join subscription');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/remove-subscription')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async removeSubscriptionAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = ChatSubscriptionRequest.deserializeBinary(requestValue);
        const response = await ChatService.removeSubscriptionAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot remove subscription');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/last-messages')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getLastMessagesAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = LastChatMessagesRequest.deserializeBinary(requestValue);
        const response = await ChatService.getLastChatMessagesAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot get last chat messages');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/messages')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getMessagesAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = ChatMessagesRequest.deserializeBinary(requestValue);
        const response = await ChatService.getChatMessagesAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot get chat messages');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/seen-by')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async getSeenByMessageAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const body = await context.request.body({ type: 'reader' });
        const requestValue = await readAll(body.value);
        const request = ChatSeenMessagesRequest.deserializeBinary(requestValue);
        const response = await ChatService.getSeenByMessagesAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot get seen messages');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }

    @Post('/subscriptions/ids/:accountId')
    @Guard(AuthGuard)
    @ContentType('application/x-protobuf')
    public async requestAccountSubscriptionIdsAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >
    ): Promise<void> {
        const paramsId = context.params['accountId'];
        const response = await ChatService.requestAccountSubscriptionIdsAsync(paramsId);
        if (!response) {
            throw HttpError.createError(409, 'Cannot request account subscription ids');
        }

        context.response.type = 'application/x-protobuf';
        context.response.body = response.serializeBinary();
    }
}
