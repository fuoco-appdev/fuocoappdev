// @generated by protoc-gen-es v0.3.0 with parameter "target=ts"
// @generated from file protobuf/account-follower.proto (package accountfollower, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message accountfollower.AccountFollowerRequest
 */
export class AccountFollowerRequest extends Message<AccountFollowerRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: string follower_id = 2;
   */
  followerId = "";

  constructor(data?: PartialMessage<AccountFollowerRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowerRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "follower_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowerRequest {
    return new AccountFollowerRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowerRequest {
    return new AccountFollowerRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowerRequest {
    return new AccountFollowerRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowerRequest | PlainMessage<AccountFollowerRequest> | undefined, b: AccountFollowerRequest | PlainMessage<AccountFollowerRequest> | undefined): boolean {
    return proto3.util.equals(AccountFollowerRequest, a, b);
  }
}

/**
 * @generated from message accountfollower.AccountFollowerRequestsRequest
 */
export class AccountFollowerRequestsRequest extends Message<AccountFollowerRequestsRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: int32 offset = 2;
   */
  offset = 0;

  /**
   * @generated from field: int32 limit = 3;
   */
  limit = 0;

  constructor(data?: PartialMessage<AccountFollowerRequestsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowerRequestsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowerRequestsRequest {
    return new AccountFollowerRequestsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowerRequestsRequest {
    return new AccountFollowerRequestsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowerRequestsRequest {
    return new AccountFollowerRequestsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowerRequestsRequest | PlainMessage<AccountFollowerRequestsRequest> | undefined, b: AccountFollowerRequestsRequest | PlainMessage<AccountFollowerRequestsRequest> | undefined): boolean {
    return proto3.util.equals(AccountFollowerRequestsRequest, a, b);
  }
}

/**
 * @generated from message accountfollower.AccountFollowerResponse
 */
export class AccountFollowerResponse extends Message<AccountFollowerResponse> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: string follower_id = 2;
   */
  followerId = "";

  /**
   * @generated from field: bool is_following = 3;
   */
  isFollowing = false;

  /**
   * @generated from field: bool accepted = 4;
   */
  accepted = false;

  /**
   * @generated from field: string created_at = 5;
   */
  createdAt = "";

  /**
   * @generated from field: string updated_at = 6;
   */
  updatedAt = "";

  constructor(data?: PartialMessage<AccountFollowerResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowerResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "follower_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "is_following", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "accepted", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "created_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "updated_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowerResponse {
    return new AccountFollowerResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowerResponse {
    return new AccountFollowerResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowerResponse {
    return new AccountFollowerResponse().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowerResponse | PlainMessage<AccountFollowerResponse> | undefined, b: AccountFollowerResponse | PlainMessage<AccountFollowerResponse> | undefined): boolean {
    return proto3.util.equals(AccountFollowerResponse, a, b);
  }
}

/**
 * @generated from message accountfollower.AccountFollowerCountMetadataResponse
 */
export class AccountFollowerCountMetadataResponse extends Message<AccountFollowerCountMetadataResponse> {
  /**
   * @generated from field: int32 followers_count = 1;
   */
  followersCount = 0;

  /**
   * @generated from field: int32 following_count = 2;
   */
  followingCount = 0;

  constructor(data?: PartialMessage<AccountFollowerCountMetadataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowerCountMetadataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "followers_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "following_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowerCountMetadataResponse {
    return new AccountFollowerCountMetadataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowerCountMetadataResponse {
    return new AccountFollowerCountMetadataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowerCountMetadataResponse {
    return new AccountFollowerCountMetadataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowerCountMetadataResponse | PlainMessage<AccountFollowerCountMetadataResponse> | undefined, b: AccountFollowerCountMetadataResponse | PlainMessage<AccountFollowerCountMetadataResponse> | undefined): boolean {
    return proto3.util.equals(AccountFollowerCountMetadataResponse, a, b);
  }
}

/**
 * @generated from message accountfollower.AccountFollowersRequest
 */
export class AccountFollowersRequest extends Message<AccountFollowersRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: repeated string other_account_ids = 2;
   */
  otherAccountIds: string[] = [];

  constructor(data?: PartialMessage<AccountFollowersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "other_account_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowersRequest {
    return new AccountFollowersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowersRequest {
    return new AccountFollowersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowersRequest {
    return new AccountFollowersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowersRequest | PlainMessage<AccountFollowersRequest> | undefined, b: AccountFollowersRequest | PlainMessage<AccountFollowersRequest> | undefined): boolean {
    return proto3.util.equals(AccountFollowersRequest, a, b);
  }
}

/**
 * @generated from message accountfollower.AccountFollowersResponse
 */
export class AccountFollowersResponse extends Message<AccountFollowersResponse> {
  /**
   * @generated from field: repeated accountfollower.AccountFollowerResponse followers = 1;
   */
  followers: AccountFollowerResponse[] = [];

  constructor(data?: PartialMessage<AccountFollowersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "accountfollower.AccountFollowersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "followers", kind: "message", T: AccountFollowerResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountFollowersResponse {
    return new AccountFollowersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountFollowersResponse {
    return new AccountFollowersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountFollowersResponse {
    return new AccountFollowersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: AccountFollowersResponse | PlainMessage<AccountFollowersResponse> | undefined, b: AccountFollowersResponse | PlainMessage<AccountFollowersResponse> | undefined): boolean {
    return proto3.util.equals(AccountFollowersResponse, a, b);
  }
}
