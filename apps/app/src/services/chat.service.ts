import axios from "axios";
import {
    ChatResponse,
    CreatePrivateChatRequest
} from "../protobuf/chat_pb";
import { Service } from "../service";
import SupabaseService from "./supabase.service";

class ChatService extends Service {
    constructor() {
        super();
    }

    public async requestCreatePrivateChatAsync(props: {
        accountIds: string[];
    }): Promise<ChatResponse | null> {
        const session = await SupabaseService.requestSessionAsync();
        const privateChatRequest = new CreatePrivateChatRequest({
            accountIds: props.accountIds
        });
        const response = await axios({
            method: "post",
            url: `${this.endpointUrl}/chat/create-private`,
            headers: {
                ...this.headers,
                "Session-Token": `${session?.access_token}`,
            },
            data: privateChatRequest.toBinary(),
            responseType: "arraybuffer",
        });

        const arrayBuffer = new Uint8Array(response.data);
        this.assertResponse(arrayBuffer);

        const chatResponse = ChatResponse.fromBinary(
            arrayBuffer,
        );

        return chatResponse;
    }
}

export default new ChatService();
