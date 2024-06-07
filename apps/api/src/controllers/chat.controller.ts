import { readAll } from "https://deno.land/std@0.105.0/io/util.ts";
import { HttpError } from "https://deno.land/x/oak@v11.1.0/deps.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { AdminGuard } from "../guards/admin.guard.ts";
import { AuthGuard } from "../guards/index.ts";
import { ContentType, Controller, Guard, Post } from "../index.ts";
import { CreatePrivateChatRequest, LastChatMessagesRequest } from '../protobuf/chat_pb.js';
import ChatService from "../services/chat.service.ts";

@Controller("/chat")
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

    @Post("/create-private")
    @Guard(AuthGuard)
    @ContentType("application/x-protobuf")
    public async createAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >,
    ): Promise<void> {
        const body = await context.request.body({ type: "reader" });
        const requestValue = await readAll(body.value);
        const request = CreatePrivateChatRequest.deserializeBinary(requestValue);
        const response = await ChatService.createPrivateChatAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot create private chat');
        }

        context.response.type = "application/x-protobuf";
        context.response.body = response.serializeBinary();
    }

    @Post("/last-messages")
    @Guard(AuthGuard)
    @ContentType("application/x-protobuf")
    public async getLastMessagesAsync(
        context: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string, any>
        >,
    ): Promise<void> {
        const body = await context.request.body({ type: "reader" });
        const requestValue = await readAll(body.value);
        const request = LastChatMessagesRequest.deserializeBinary(requestValue);
        const response = await ChatService.getLastChatMessagesAsync(request);
        if (!response) {
            throw HttpError.createError(409, 'Cannot get last chat messages');
        }

        context.response.type = "application/x-protobuf";
        context.response.body = response.serializeBinary();
    }
}
