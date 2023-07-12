// @generated by protoc-gen-es v0.3.0 with parameter "target=ts"
// @generated from file protobuf/core.proto (package core, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum core.StorageFolderType
 */
export enum StorageFolderType {
  /**
   * @generated from enum value: Avatars = 0;
   */
  Avatars = 0,
}
// Retrieve enum metadata with: proto3.getEnumType(StorageFolderType)
proto3.util.setEnumType(StorageFolderType, "core.StorageFolderType", [
  { no: 0, name: "Avatars" },
]);

/**
 * @generated from message core.Secrets
 */
export class Secrets extends Message<Secrets> {
  /**
   * @generated from field: string s3_access_key_id = 1;
   */
  s3AccessKeyId = "";

  /**
   * @generated from field: string s3_secret_access_key = 2;
   */
  s3SecretAccessKey = "";

  constructor(data?: PartialMessage<Secrets>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.Secrets";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "s3_access_key_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "s3_secret_access_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Secrets {
    return new Secrets().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Secrets {
    return new Secrets().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Secrets {
    return new Secrets().fromJsonString(jsonString, options);
  }

  static equals(a: Secrets | PlainMessage<Secrets> | undefined, b: Secrets | PlainMessage<Secrets> | undefined): boolean {
    return proto3.util.equals(Secrets, a, b);
  }
}

/**
 * @generated from message core.CustomerRequest
 */
export class CustomerRequest extends Message<CustomerRequest> {
  /**
   * @generated from field: string email = 1;
   */
  email = "";

  /**
   * @generated from field: string first_name = 2;
   */
  firstName = "";

  /**
   * @generated from field: string last_name = 3;
   */
  lastName = "";

  /**
   * @generated from field: string phone = 4;
   */
  phone = "";

  /**
   * @generated from field: string metadata = 5;
   */
  metadata = "";

  constructor(data?: PartialMessage<CustomerRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.CustomerRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "first_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "last_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "phone", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "metadata", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomerRequest {
    return new CustomerRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomerRequest {
    return new CustomerRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomerRequest {
    return new CustomerRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CustomerRequest | PlainMessage<CustomerRequest> | undefined, b: CustomerRequest | PlainMessage<CustomerRequest> | undefined): boolean {
    return proto3.util.equals(CustomerRequest, a, b);
  }
}

/**
 * @generated from message core.CustomerResponse
 */
export class CustomerResponse extends Message<CustomerResponse> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<CustomerResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.CustomerResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomerResponse {
    return new CustomerResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomerResponse {
    return new CustomerResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomerResponse {
    return new CustomerResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CustomerResponse | PlainMessage<CustomerResponse> | undefined, b: CustomerResponse | PlainMessage<CustomerResponse> | undefined): boolean {
    return proto3.util.equals(CustomerResponse, a, b);
  }
}

/**
 * @generated from message core.StockLocationsResponse
 */
export class StockLocationsResponse extends Message<StockLocationsResponse> {
  /**
   * @generated from field: repeated string locations = 1;
   */
  locations: string[] = [];

  constructor(data?: PartialMessage<StockLocationsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.StockLocationsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "locations", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StockLocationsResponse {
    return new StockLocationsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StockLocationsResponse {
    return new StockLocationsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StockLocationsResponse {
    return new StockLocationsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: StockLocationsResponse | PlainMessage<StockLocationsResponse> | undefined, b: StockLocationsResponse | PlainMessage<StockLocationsResponse> | undefined): boolean {
    return proto3.util.equals(StockLocationsResponse, a, b);
  }
}

/**
 * @generated from message core.Account
 */
export class Account extends Message<Account> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string customer_id = 2;
   */
  customerId = "";

  /**
   * @generated from field: string supabase_id = 3;
   */
  supabaseId = "";

  /**
   * @generated from field: string profile_url = 4;
   */
  profileUrl = "";

  /**
   * @generated from field: string status = 5;
   */
  status = "";

  /**
   * @generated from field: string update_at = 6;
   */
  updateAt = "";

  constructor(data?: PartialMessage<Account>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.Account";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "customer_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "supabase_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "profile_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "update_at", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Account {
    return new Account().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Account {
    return new Account().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Account {
    return new Account().fromJsonString(jsonString, options);
  }

  static equals(a: Account | PlainMessage<Account> | undefined, b: Account | PlainMessage<Account> | undefined): boolean {
    return proto3.util.equals(Account, a, b);
  }
}

/**
 * @generated from message core.Accounts
 */
export class Accounts extends Message<Accounts> {
  /**
   * @generated from field: repeated core.Account accounts = 1;
   */
  accounts: Account[] = [];

  constructor(data?: PartialMessage<Accounts>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.Accounts";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "accounts", kind: "message", T: Account, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Accounts {
    return new Accounts().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Accounts {
    return new Accounts().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Accounts {
    return new Accounts().fromJsonString(jsonString, options);
  }

  static equals(a: Accounts | PlainMessage<Accounts> | undefined, b: Accounts | PlainMessage<Accounts> | undefined): boolean {
    return proto3.util.equals(Accounts, a, b);
  }
}

