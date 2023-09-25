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
 * @generated from message core.PublicSecrets
 */
export class PublicSecrets extends Message<PublicSecrets> {
  /**
   * @generated from field: string supabase_anon_key = 1;
   */
  supabaseAnonKey = "";

  /**
   * @generated from field: string medusa_public_key = 2;
   */
  medusaPublicKey = "";

  /**
   * @generated from field: string meilisearch_public_key = 3;
   */
  meilisearchPublicKey = "";

  /**
   * @generated from field: string mapbox_access_token = 4;
   */
  mapboxAccessToken = "";

  /**
   * @generated from field: string stripe_publishable_key = 5;
   */
  stripePublishableKey = "";

  /**
   * @generated from field: string deepl_auth_key = 6;
   */
  deeplAuthKey = "";

  constructor(data?: PartialMessage<PublicSecrets>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.PublicSecrets";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "supabase_anon_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "medusa_public_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "meilisearch_public_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "mapbox_access_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "stripe_publishable_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "deepl_auth_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PublicSecrets {
    return new PublicSecrets().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PublicSecrets {
    return new PublicSecrets().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PublicSecrets {
    return new PublicSecrets().fromJsonString(jsonString, options);
  }

  static equals(a: PublicSecrets | PlainMessage<PublicSecrets> | undefined, b: PublicSecrets | PlainMessage<PublicSecrets> | undefined): boolean {
    return proto3.util.equals(PublicSecrets, a, b);
  }
}

/**
 * @generated from message core.PrivateSecrets
 */
export class PrivateSecrets extends Message<PrivateSecrets> {
  /**
   * @generated from field: string s3_access_key_id = 1;
   */
  s3AccessKeyId = "";

  /**
   * @generated from field: string s3_secret_access_key = 2;
   */
  s3SecretAccessKey = "";

  constructor(data?: PartialMessage<PrivateSecrets>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.PrivateSecrets";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "s3_access_key_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "s3_secret_access_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PrivateSecrets {
    return new PrivateSecrets().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PrivateSecrets {
    return new PrivateSecrets().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PrivateSecrets {
    return new PrivateSecrets().fromJsonString(jsonString, options);
  }

  static equals(a: PrivateSecrets | PlainMessage<PrivateSecrets> | undefined, b: PrivateSecrets | PlainMessage<PrivateSecrets> | undefined): boolean {
    return proto3.util.equals(PrivateSecrets, a, b);
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

  /**
   * @generated from field: string password = 2;
   */
  password = "";

  constructor(data?: PartialMessage<CustomerResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.CustomerResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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
 * @generated from message core.OrdersRequest
 */
export class OrdersRequest extends Message<OrdersRequest> {
  /**
   * @generated from field: int32 offset = 1;
   */
  offset = 0;

  /**
   * @generated from field: int32 limit = 2;
   */
  limit = 0;

  constructor(data?: PartialMessage<OrdersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.OrdersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OrdersRequest {
    return new OrdersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OrdersRequest {
    return new OrdersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OrdersRequest {
    return new OrdersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: OrdersRequest | PlainMessage<OrdersRequest> | undefined, b: OrdersRequest | PlainMessage<OrdersRequest> | undefined): boolean {
    return proto3.util.equals(OrdersRequest, a, b);
  }
}

/**
 * @generated from message core.OrdersResponse
 */
export class OrdersResponse extends Message<OrdersResponse> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<OrdersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.OrdersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OrdersResponse {
    return new OrdersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OrdersResponse {
    return new OrdersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OrdersResponse {
    return new OrdersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: OrdersResponse | PlainMessage<OrdersResponse> | undefined, b: OrdersResponse | PlainMessage<OrdersResponse> | undefined): boolean {
    return proto3.util.equals(OrdersResponse, a, b);
  }
}

/**
 * @generated from message core.ProductCountRequest
 */
export class ProductCountRequest extends Message<ProductCountRequest> {
  /**
   * @generated from field: string type = 1;
   */
  type = "";

  constructor(data?: PartialMessage<ProductCountRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.ProductCountRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ProductCountRequest {
    return new ProductCountRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ProductCountRequest {
    return new ProductCountRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ProductCountRequest {
    return new ProductCountRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ProductCountRequest | PlainMessage<ProductCountRequest> | undefined, b: ProductCountRequest | PlainMessage<ProductCountRequest> | undefined): boolean {
    return proto3.util.equals(ProductCountRequest, a, b);
  }
}

/**
 * @generated from message core.ProductCountResponse
 */
export class ProductCountResponse extends Message<ProductCountResponse> {
  /**
   * @generated from field: int32 count = 1;
   */
  count = 0;

  constructor(data?: PartialMessage<ProductCountResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.ProductCountResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ProductCountResponse {
    return new ProductCountResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ProductCountResponse {
    return new ProductCountResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ProductCountResponse {
    return new ProductCountResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ProductCountResponse | PlainMessage<ProductCountResponse> | undefined, b: ProductCountResponse | PlainMessage<ProductCountResponse> | undefined): boolean {
    return proto3.util.equals(ProductCountResponse, a, b);
  }
}

/**
 * @generated from message core.ProductResponse
 */
export class ProductResponse extends Message<ProductResponse> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<ProductResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "core.ProductResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ProductResponse {
    return new ProductResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ProductResponse {
    return new ProductResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ProductResponse {
    return new ProductResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ProductResponse | PlainMessage<ProductResponse> | undefined, b: ProductResponse | PlainMessage<ProductResponse> | undefined): boolean {
    return proto3.util.equals(ProductResponse, a, b);
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

  /**
   * @generated from field: string language_code = 7;
   */
  languageCode = "";

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
    { no: 7, name: "language_code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
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

