// source: protobuf/account-notification.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

import * as jspb from 'https://deno.land/x/deno_google_protobuf/google-protobuf.js'
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.accountnotification.AccountNotificationCountResponse', null, global);
goog.exportSymbol('proto.accountnotification.AccountNotificationResponse', null, global);
goog.exportSymbol('proto.accountnotification.AccountNotificationsRequest', null, global);
goog.exportSymbol('proto.accountnotification.AccountNotificationsResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.accountnotification.AccountNotificationsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.accountnotification.AccountNotificationsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.accountnotification.AccountNotificationsRequest.displayName = 'proto.accountnotification.AccountNotificationsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.accountnotification.AccountNotificationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.accountnotification.AccountNotificationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.accountnotification.AccountNotificationResponse.displayName = 'proto.accountnotification.AccountNotificationResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.accountnotification.AccountNotificationsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.accountnotification.AccountNotificationsResponse.repeatedFields_, null);
};
goog.inherits(proto.accountnotification.AccountNotificationsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.accountnotification.AccountNotificationsResponse.displayName = 'proto.accountnotification.AccountNotificationsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.accountnotification.AccountNotificationCountResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.accountnotification.AccountNotificationCountResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.accountnotification.AccountNotificationCountResponse.displayName = 'proto.accountnotification.AccountNotificationCountResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.accountnotification.AccountNotificationsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.accountnotification.AccountNotificationsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.accountnotification.AccountNotificationsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    limit: jspb.Message.getFieldWithDefault(msg, 2, 0),
    offset: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.accountnotification.AccountNotificationsRequest}
 */
proto.accountnotification.AccountNotificationsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.accountnotification.AccountNotificationsRequest;
  return proto.accountnotification.AccountNotificationsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.accountnotification.AccountNotificationsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.accountnotification.AccountNotificationsRequest}
 */
proto.accountnotification.AccountNotificationsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLimit(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOffset(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.accountnotification.AccountNotificationsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.accountnotification.AccountNotificationsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.accountnotification.AccountNotificationsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLimit();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getOffset();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional string account_id = 1;
 * @return {string}
 */
proto.accountnotification.AccountNotificationsRequest.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationsRequest} returns this
 */
proto.accountnotification.AccountNotificationsRequest.prototype.setAccountId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int32 limit = 2;
 * @return {number}
 */
proto.accountnotification.AccountNotificationsRequest.prototype.getLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.accountnotification.AccountNotificationsRequest} returns this
 */
proto.accountnotification.AccountNotificationsRequest.prototype.setLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 offset = 3;
 * @return {number}
 */
proto.accountnotification.AccountNotificationsRequest.prototype.getOffset = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.accountnotification.AccountNotificationsRequest} returns this
 */
proto.accountnotification.AccountNotificationsRequest.prototype.setOffset = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.accountnotification.AccountNotificationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.accountnotification.AccountNotificationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.accountnotification.AccountNotificationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    createdAt: jspb.Message.getFieldWithDefault(msg, 2, ""),
    eventName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    resourceType: jspb.Message.getFieldWithDefault(msg, 4, ""),
    resourceId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    accountId: jspb.Message.getFieldWithDefault(msg, 6, ""),
    data: jspb.Message.getFieldWithDefault(msg, 7, ""),
    seen: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    updatedAt: jspb.Message.getFieldWithDefault(msg, 9, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.accountnotification.AccountNotificationResponse}
 */
proto.accountnotification.AccountNotificationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.accountnotification.AccountNotificationResponse;
  return proto.accountnotification.AccountNotificationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.accountnotification.AccountNotificationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.accountnotification.AccountNotificationResponse}
 */
proto.accountnotification.AccountNotificationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatedAt(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEventName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setResourceType(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setResourceId(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setData(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSeen(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdatedAt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.accountnotification.AccountNotificationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.accountnotification.AccountNotificationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.accountnotification.AccountNotificationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCreatedAt();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getEventName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getResourceType();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getResourceId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getData();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getSeen();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getUpdatedAt();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string created_at = 2;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getCreatedAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string event_name = 3;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getEventName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setEventName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string resource_type = 4;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getResourceType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setResourceType = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string resource_id = 5;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getResourceId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setResourceId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string account_id = 6;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setAccountId = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string data = 7;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setData = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional bool seen = 8;
 * @return {boolean}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getSeen = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setSeen = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional string updated_at = 9;
 * @return {string}
 */
proto.accountnotification.AccountNotificationResponse.prototype.getUpdatedAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.accountnotification.AccountNotificationResponse} returns this
 */
proto.accountnotification.AccountNotificationResponse.prototype.setUpdatedAt = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.accountnotification.AccountNotificationsResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.accountnotification.AccountNotificationsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.accountnotification.AccountNotificationsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.accountnotification.AccountNotificationsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    notificationsList: jspb.Message.toObjectList(msg.getNotificationsList(),
    proto.accountnotification.AccountNotificationResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.accountnotification.AccountNotificationsResponse}
 */
proto.accountnotification.AccountNotificationsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.accountnotification.AccountNotificationsResponse;
  return proto.accountnotification.AccountNotificationsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.accountnotification.AccountNotificationsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.accountnotification.AccountNotificationsResponse}
 */
proto.accountnotification.AccountNotificationsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.accountnotification.AccountNotificationResponse;
      reader.readMessage(value,proto.accountnotification.AccountNotificationResponse.deserializeBinaryFromReader);
      msg.addNotifications(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.accountnotification.AccountNotificationsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.accountnotification.AccountNotificationsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.accountnotification.AccountNotificationsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNotificationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.accountnotification.AccountNotificationResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated AccountNotificationResponse notifications = 1;
 * @return {!Array<!proto.accountnotification.AccountNotificationResponse>}
 */
proto.accountnotification.AccountNotificationsResponse.prototype.getNotificationsList = function() {
  return /** @type{!Array<!proto.accountnotification.AccountNotificationResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.accountnotification.AccountNotificationResponse, 1));
};


/**
 * @param {!Array<!proto.accountnotification.AccountNotificationResponse>} value
 * @return {!proto.accountnotification.AccountNotificationsResponse} returns this
*/
proto.accountnotification.AccountNotificationsResponse.prototype.setNotificationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.accountnotification.AccountNotificationResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.accountnotification.AccountNotificationResponse}
 */
proto.accountnotification.AccountNotificationsResponse.prototype.addNotifications = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.accountnotification.AccountNotificationResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.accountnotification.AccountNotificationsResponse} returns this
 */
proto.accountnotification.AccountNotificationsResponse.prototype.clearNotificationsList = function() {
  return this.setNotificationsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.accountnotification.AccountNotificationCountResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.accountnotification.AccountNotificationCountResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.accountnotification.AccountNotificationCountResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationCountResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    count: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.accountnotification.AccountNotificationCountResponse}
 */
proto.accountnotification.AccountNotificationCountResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.accountnotification.AccountNotificationCountResponse;
  return proto.accountnotification.AccountNotificationCountResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.accountnotification.AccountNotificationCountResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.accountnotification.AccountNotificationCountResponse}
 */
proto.accountnotification.AccountNotificationCountResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.accountnotification.AccountNotificationCountResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.accountnotification.AccountNotificationCountResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.accountnotification.AccountNotificationCountResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.accountnotification.AccountNotificationCountResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCount();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 count = 1;
 * @return {number}
 */
proto.accountnotification.AccountNotificationCountResponse.prototype.getCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.accountnotification.AccountNotificationCountResponse} returns this
 */
proto.accountnotification.AccountNotificationCountResponse.prototype.setCount = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


export const AccountNotificationCountResponse = proto.accountnotification.AccountNotificationCountResponse;
export const AccountNotificationResponse = proto.accountnotification.AccountNotificationResponse;
export const AccountNotificationsRequest = proto.accountnotification.AccountNotificationsRequest;
export const AccountNotificationsResponse = proto.accountnotification.AccountNotificationsResponse;