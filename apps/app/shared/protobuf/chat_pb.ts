// @generated by protoc-gen-es v0.3.0 with parameter "target=ts"
// @generated from file protobuf/chat.proto (package chat, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message chat.CreatePrivateChatRequest
 */
export class CreatePrivateChatRequest extends Message<CreatePrivateChatRequest> {
  /**
   * @generated from field: repeated string account_ids = 1;
   */
  accountIds: string[] = [];

  constructor(data?: PartialMessage<CreatePrivateChatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.CreatePrivateChatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePrivateChatRequest {
    return new CreatePrivateChatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePrivateChatRequest {
    return new CreatePrivateChatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePrivateChatRequest {
    return new CreatePrivateChatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreatePrivateChatRequest | PlainMessage<CreatePrivateChatRequest> | undefined, b: CreatePrivateChatRequest | PlainMessage<CreatePrivateChatRequest> | undefined): boolean {
    return proto3.util.equals(CreatePrivateChatRequest, a, b);
  }
}

/**
 * @generated from message chat.UpdatePrivateChatRequest
 */
export class UpdatePrivateChatRequest extends Message<UpdatePrivateChatRequest> {
  /**
   * @generated from field: repeated string account_ids = 1;
   */
  accountIds: string[] = [];

  constructor(data?: PartialMessage<UpdatePrivateChatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.UpdatePrivateChatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdatePrivateChatRequest {
    return new UpdatePrivateChatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdatePrivateChatRequest {
    return new UpdatePrivateChatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdatePrivateChatRequest {
    return new UpdatePrivateChatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdatePrivateChatRequest | PlainMessage<UpdatePrivateChatRequest> | undefined, b: UpdatePrivateChatRequest | PlainMessage<UpdatePrivateChatRequest> | undefined): boolean {
    return proto3.util.equals(UpdatePrivateChatRequest, a, b);
  }
}

/**
 * @generated from message chat.LastChatMessagesRequest
 */
export class LastChatMessagesRequest extends Message<LastChatMessagesRequest> {
  /**
   * @generated from field: repeated string chat_ids = 1;
   */
  chatIds: string[] = [];

  constructor(data?: PartialMessage<LastChatMessagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.LastChatMessagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LastChatMessagesRequest {
    return new LastChatMessagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LastChatMessagesRequest {
    return new LastChatMessagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LastChatMessagesRequest {
    return new LastChatMessagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: LastChatMessagesRequest | PlainMessage<LastChatMessagesRequest> | undefined, b: LastChatMessagesRequest | PlainMessage<LastChatMessagesRequest> | undefined): boolean {
    return proto3.util.equals(LastChatMessagesRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatMessagesRequest
 */
export class ChatMessagesRequest extends Message<ChatMessagesRequest> {
  /**
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * @generated from field: uint32 limit = 2;
   */
  limit = 0;

  /**
   * @generated from field: uint32 offset = 3;
   */
  offset = 0;

  /**
   * @generated from field: repeated string ignored_subscription_ids = 4;
   */
  ignoredSubscriptionIds: string[] = [];

  constructor(data?: PartialMessage<ChatMessagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatMessagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "limit", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "offset", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "ignored_subscription_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatMessagesRequest {
    return new ChatMessagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatMessagesRequest {
    return new ChatMessagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatMessagesRequest {
    return new ChatMessagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatMessagesRequest | PlainMessage<ChatMessagesRequest> | undefined, b: ChatMessagesRequest | PlainMessage<ChatMessagesRequest> | undefined): boolean {
    return proto3.util.equals(ChatMessagesRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatSeenMessageRequest
 */
export class ChatSeenMessageRequest extends Message<ChatSeenMessageRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: string message_id = 2;
   */
  messageId = "";

  /**
   * @generated from field: string chat_id = 3;
   */
  chatId = "";

  constructor(data?: PartialMessage<ChatSeenMessageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSeenMessageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSeenMessageRequest {
    return new ChatSeenMessageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSeenMessageRequest {
    return new ChatSeenMessageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSeenMessageRequest {
    return new ChatSeenMessageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSeenMessageRequest | PlainMessage<ChatSeenMessageRequest> | undefined, b: ChatSeenMessageRequest | PlainMessage<ChatSeenMessageRequest> | undefined): boolean {
    return proto3.util.equals(ChatSeenMessageRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatSeenMessagesRequest
 */
export class ChatSeenMessagesRequest extends Message<ChatSeenMessagesRequest> {
  /**
   * @generated from field: repeated string message_ids = 1;
   */
  messageIds: string[] = [];

  constructor(data?: PartialMessage<ChatSeenMessagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSeenMessagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSeenMessagesRequest {
    return new ChatSeenMessagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSeenMessagesRequest {
    return new ChatSeenMessagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSeenMessagesRequest {
    return new ChatSeenMessagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSeenMessagesRequest | PlainMessage<ChatSeenMessagesRequest> | undefined, b: ChatSeenMessagesRequest | PlainMessage<ChatSeenMessagesRequest> | undefined): boolean {
    return proto3.util.equals(ChatSeenMessagesRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatSubscriptionRequest
 */
export class ChatSubscriptionRequest extends Message<ChatSubscriptionRequest> {
  /**
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * @generated from field: string account_id = 2;
   */
  accountId = "";

  constructor(data?: PartialMessage<ChatSubscriptionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSubscriptionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSubscriptionRequest {
    return new ChatSubscriptionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSubscriptionRequest {
    return new ChatSubscriptionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSubscriptionRequest {
    return new ChatSubscriptionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSubscriptionRequest | PlainMessage<ChatSubscriptionRequest> | undefined, b: ChatSubscriptionRequest | PlainMessage<ChatSubscriptionRequest> | undefined): boolean {
    return proto3.util.equals(ChatSubscriptionRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatSubscriptionsRequest
 */
export class ChatSubscriptionsRequest extends Message<ChatSubscriptionsRequest> {
  /**
   * @generated from field: repeated string chat_ids = 1;
   */
  chatIds: string[] = [];

  /**
   * @generated from field: repeated string account_ids = 2;
   */
  accountIds: string[] = [];

  constructor(data?: PartialMessage<ChatSubscriptionsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSubscriptionsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "account_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSubscriptionsRequest {
    return new ChatSubscriptionsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSubscriptionsRequest {
    return new ChatSubscriptionsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSubscriptionsRequest {
    return new ChatSubscriptionsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSubscriptionsRequest | PlainMessage<ChatSubscriptionsRequest> | undefined, b: ChatSubscriptionsRequest | PlainMessage<ChatSubscriptionsRequest> | undefined): boolean {
    return proto3.util.equals(ChatSubscriptionsRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatPrivateSubscriptionRequest
 */
export class ChatPrivateSubscriptionRequest extends Message<ChatPrivateSubscriptionRequest> {
  /**
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * @generated from field: string active_account_id = 2;
   */
  activeAccountId = "";

  /**
   * @generated from field: string other_account_id = 3;
   */
  otherAccountId = "";

  constructor(data?: PartialMessage<ChatPrivateSubscriptionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatPrivateSubscriptionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "active_account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "other_account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatPrivateSubscriptionRequest {
    return new ChatPrivateSubscriptionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatPrivateSubscriptionRequest {
    return new ChatPrivateSubscriptionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatPrivateSubscriptionRequest {
    return new ChatPrivateSubscriptionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ChatPrivateSubscriptionRequest | PlainMessage<ChatPrivateSubscriptionRequest> | undefined, b: ChatPrivateSubscriptionRequest | PlainMessage<ChatPrivateSubscriptionRequest> | undefined): boolean {
    return proto3.util.equals(ChatPrivateSubscriptionRequest, a, b);
  }
}

/**
 * @generated from message chat.ChatSubscriptionResponse
 */
export class ChatSubscriptionResponse extends Message<ChatSubscriptionResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string chat_id = 2;
   */
  chatId = "";

  /**
   * @generated from field: string request_at = 3;
   */
  requestAt = "";

  /**
   * @generated from field: string account_id = 4;
   */
  accountId = "";

  /**
   * @generated from field: string joined_at = 5;
   */
  joinedAt = "";

  /**
   * @generated from field: string public_key_encrypted = 6;
   */
  publicKeyEncrypted = "";

  /**
   * @generated from field: string private_key_encrypted = 7;
   */
  privateKeyEncrypted = "";

  constructor(data?: PartialMessage<ChatSubscriptionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSubscriptionResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "request_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "joined_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "public_key_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "private_key_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSubscriptionResponse {
    return new ChatSubscriptionResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSubscriptionResponse {
    return new ChatSubscriptionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSubscriptionResponse {
    return new ChatSubscriptionResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSubscriptionResponse | PlainMessage<ChatSubscriptionResponse> | undefined, b: ChatSubscriptionResponse | PlainMessage<ChatSubscriptionResponse> | undefined): boolean {
    return proto3.util.equals(ChatSubscriptionResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatSubscriptionsResponse
 */
export class ChatSubscriptionsResponse extends Message<ChatSubscriptionsResponse> {
  /**
   * @generated from field: repeated chat.ChatSubscriptionResponse subscriptions = 1;
   */
  subscriptions: ChatSubscriptionResponse[] = [];

  constructor(data?: PartialMessage<ChatSubscriptionsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSubscriptionsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "subscriptions", kind: "message", T: ChatSubscriptionResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSubscriptionsResponse {
    return new ChatSubscriptionsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSubscriptionsResponse {
    return new ChatSubscriptionsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSubscriptionsResponse {
    return new ChatSubscriptionsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSubscriptionsResponse | PlainMessage<ChatSubscriptionsResponse> | undefined, b: ChatSubscriptionsResponse | PlainMessage<ChatSubscriptionsResponse> | undefined): boolean {
    return proto3.util.equals(ChatSubscriptionsResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatAccountSubscriptionIdsResponse
 */
export class ChatAccountSubscriptionIdsResponse extends Message<ChatAccountSubscriptionIdsResponse> {
  /**
   * @generated from field: repeated string chat_ids = 1;
   */
  chatIds: string[] = [];

  constructor(data?: PartialMessage<ChatAccountSubscriptionIdsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatAccountSubscriptionIdsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatAccountSubscriptionIdsResponse {
    return new ChatAccountSubscriptionIdsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatAccountSubscriptionIdsResponse {
    return new ChatAccountSubscriptionIdsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatAccountSubscriptionIdsResponse {
    return new ChatAccountSubscriptionIdsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatAccountSubscriptionIdsResponse | PlainMessage<ChatAccountSubscriptionIdsResponse> | undefined, b: ChatAccountSubscriptionIdsResponse | PlainMessage<ChatAccountSubscriptionIdsResponse> | undefined): boolean {
    return proto3.util.equals(ChatAccountSubscriptionIdsResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatMessageResponse
 */
export class ChatMessageResponse extends Message<ChatMessageResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string chat_id = 2;
   */
  chatId = "";

  /**
   * @generated from field: string account_id = 3;
   */
  accountId = "";

  /**
   * @generated from field: string created_at = 4;
   */
  createdAt = "";

  /**
   * @generated from field: string text_encrypted = 5;
   */
  textEncrypted = "";

  /**
   * @generated from field: string link_encrypted = 6;
   */
  linkEncrypted = "";

  /**
   * @generated from field: repeated string video_url_encrypted = 7;
   */
  videoUrlEncrypted: string[] = [];

  /**
   * @generated from field: repeated string photo_url_encrypted = 8;
   */
  photoUrlEncrypted: string[] = [];

  /**
   * @generated from field: repeated string file_url_encrypted = 9;
   */
  fileUrlEncrypted: string[] = [];

  /**
   * @generated from field: string nonce = 10;
   */
  nonce = "";

  /**
   * @generated from field: string reply_to = 11;
   */
  replyTo = "";

  constructor(data?: PartialMessage<ChatMessageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatMessageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "text_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "link_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "video_url_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 8, name: "photo_url_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 9, name: "file_url_encrypted", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 10, name: "nonce", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "reply_to", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatMessageResponse {
    return new ChatMessageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatMessageResponse {
    return new ChatMessageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatMessageResponse {
    return new ChatMessageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatMessageResponse | PlainMessage<ChatMessageResponse> | undefined, b: ChatMessageResponse | PlainMessage<ChatMessageResponse> | undefined): boolean {
    return proto3.util.equals(ChatMessageResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatMessagesResponse
 */
export class ChatMessagesResponse extends Message<ChatMessagesResponse> {
  /**
   * @generated from field: repeated chat.ChatMessageResponse messages = 1;
   */
  messages: ChatMessageResponse[] = [];

  /**
   * @generated from field: repeated chat.ChatSubscriptionResponse subscriptions = 2;
   */
  subscriptions: ChatSubscriptionResponse[] = [];

  constructor(data?: PartialMessage<ChatMessagesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatMessagesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "messages", kind: "message", T: ChatMessageResponse, repeated: true },
    { no: 2, name: "subscriptions", kind: "message", T: ChatSubscriptionResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatMessagesResponse {
    return new ChatMessagesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatMessagesResponse {
    return new ChatMessagesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatMessagesResponse {
    return new ChatMessagesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatMessagesResponse | PlainMessage<ChatMessagesResponse> | undefined, b: ChatMessagesResponse | PlainMessage<ChatMessagesResponse> | undefined): boolean {
    return proto3.util.equals(ChatMessagesResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatPrivateResponse
 */
export class ChatPrivateResponse extends Message<ChatPrivateResponse> {
  /**
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * @generated from field: repeated string account_ids = 2;
   */
  accountIds: string[] = [];

  constructor(data?: PartialMessage<ChatPrivateResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatPrivateResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "account_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatPrivateResponse {
    return new ChatPrivateResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatPrivateResponse {
    return new ChatPrivateResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatPrivateResponse {
    return new ChatPrivateResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatPrivateResponse | PlainMessage<ChatPrivateResponse> | undefined, b: ChatPrivateResponse | PlainMessage<ChatPrivateResponse> | undefined): boolean {
    return proto3.util.equals(ChatPrivateResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatSeenMessageResponse
 */
export class ChatSeenMessageResponse extends Message<ChatSeenMessageResponse> {
  /**
   * @generated from field: string message_id = 1;
   */
  messageId = "";

  /**
   * @generated from field: string seen_at = 2;
   */
  seenAt = "";

  /**
   * @generated from field: string account_id = 3;
   */
  accountId = "";

  /**
   * @generated from field: string chat_id = 4;
   */
  chatId = "";

  constructor(data?: PartialMessage<ChatSeenMessageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSeenMessageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "seen_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSeenMessageResponse {
    return new ChatSeenMessageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSeenMessageResponse {
    return new ChatSeenMessageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSeenMessageResponse {
    return new ChatSeenMessageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSeenMessageResponse | PlainMessage<ChatSeenMessageResponse> | undefined, b: ChatSeenMessageResponse | PlainMessage<ChatSeenMessageResponse> | undefined): boolean {
    return proto3.util.equals(ChatSeenMessageResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatSeenMessagesResponse
 */
export class ChatSeenMessagesResponse extends Message<ChatSeenMessagesResponse> {
  /**
   * @generated from field: repeated chat.ChatSeenMessageResponse seen_messages = 1;
   */
  seenMessages: ChatSeenMessageResponse[] = [];

  constructor(data?: PartialMessage<ChatSeenMessagesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatSeenMessagesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "seen_messages", kind: "message", T: ChatSeenMessageResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatSeenMessagesResponse {
    return new ChatSeenMessagesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatSeenMessagesResponse {
    return new ChatSeenMessagesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatSeenMessagesResponse {
    return new ChatSeenMessagesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatSeenMessagesResponse | PlainMessage<ChatSeenMessagesResponse> | undefined, b: ChatSeenMessagesResponse | PlainMessage<ChatSeenMessagesResponse> | undefined): boolean {
    return proto3.util.equals(ChatSeenMessagesResponse, a, b);
  }
}

/**
 * @generated from message chat.ChatResponse
 */
export class ChatResponse extends Message<ChatResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string created_at = 2;
   */
  createdAt = "";

  /**
   * @generated from field: string type = 3;
   */
  type = "";

  /**
   * @generated from field: string updated_at = 4;
   */
  updatedAt = "";

  /**
   * @generated from field: chat.ChatPrivateResponse private = 5;
   */
  private?: ChatPrivateResponse;

  constructor(data?: PartialMessage<ChatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "chat.ChatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "updated_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "private", kind: "message", T: ChatPrivateResponse },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatResponse {
    return new ChatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatResponse {
    return new ChatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ChatResponse | PlainMessage<ChatResponse> | undefined, b: ChatResponse | PlainMessage<ChatResponse> | undefined): boolean {
    return proto3.util.equals(ChatResponse, a, b);
  }
}
