// source: protobuf/deepl.proto
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

goog.exportSymbol('proto.deepl.DeepLTranslateRequest', null, global);
goog.exportSymbol('proto.deepl.DeepLTranslateResponse', null, global);
goog.exportSymbol('proto.deepl.DeepLTranslationsResponse', null, global);
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
proto.deepl.DeepLTranslateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.deepl.DeepLTranslateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.deepl.DeepLTranslateRequest.displayName = 'proto.deepl.DeepLTranslateRequest';
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
proto.deepl.DeepLTranslateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.deepl.DeepLTranslateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.deepl.DeepLTranslateResponse.displayName = 'proto.deepl.DeepLTranslateResponse';
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
proto.deepl.DeepLTranslationsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.deepl.DeepLTranslationsResponse.repeatedFields_, null);
};
goog.inherits(proto.deepl.DeepLTranslationsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.deepl.DeepLTranslationsResponse.displayName = 'proto.deepl.DeepLTranslationsResponse';
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
proto.deepl.DeepLTranslateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.deepl.DeepLTranslateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.deepl.DeepLTranslateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    text: jspb.Message.getFieldWithDefault(msg, 1, ""),
    languageCode: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.deepl.DeepLTranslateRequest}
 */
proto.deepl.DeepLTranslateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.deepl.DeepLTranslateRequest;
  return proto.deepl.DeepLTranslateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.deepl.DeepLTranslateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.deepl.DeepLTranslateRequest}
 */
proto.deepl.DeepLTranslateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setText(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setLanguageCode(value);
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
proto.deepl.DeepLTranslateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.deepl.DeepLTranslateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.deepl.DeepLTranslateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getText();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getLanguageCode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string text = 1;
 * @return {string}
 */
proto.deepl.DeepLTranslateRequest.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.deepl.DeepLTranslateRequest} returns this
 */
proto.deepl.DeepLTranslateRequest.prototype.setText = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string language_code = 2;
 * @return {string}
 */
proto.deepl.DeepLTranslateRequest.prototype.getLanguageCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.deepl.DeepLTranslateRequest} returns this
 */
proto.deepl.DeepLTranslateRequest.prototype.setLanguageCode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
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
proto.deepl.DeepLTranslateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.deepl.DeepLTranslateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.deepl.DeepLTranslateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    text: jspb.Message.getFieldWithDefault(msg, 1, ""),
    detectedSourceLanguage: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.deepl.DeepLTranslateResponse}
 */
proto.deepl.DeepLTranslateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.deepl.DeepLTranslateResponse;
  return proto.deepl.DeepLTranslateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.deepl.DeepLTranslateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.deepl.DeepLTranslateResponse}
 */
proto.deepl.DeepLTranslateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setText(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetectedSourceLanguage(value);
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
proto.deepl.DeepLTranslateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.deepl.DeepLTranslateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.deepl.DeepLTranslateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getText();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDetectedSourceLanguage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string text = 1;
 * @return {string}
 */
proto.deepl.DeepLTranslateResponse.prototype.getText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.deepl.DeepLTranslateResponse} returns this
 */
proto.deepl.DeepLTranslateResponse.prototype.setText = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string detected_source_language = 2;
 * @return {string}
 */
proto.deepl.DeepLTranslateResponse.prototype.getDetectedSourceLanguage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.deepl.DeepLTranslateResponse} returns this
 */
proto.deepl.DeepLTranslateResponse.prototype.setDetectedSourceLanguage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.deepl.DeepLTranslationsResponse.repeatedFields_ = [1];



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
proto.deepl.DeepLTranslationsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.deepl.DeepLTranslationsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.deepl.DeepLTranslationsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslationsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    translationsList: jspb.Message.toObjectList(msg.getTranslationsList(),
    proto.deepl.DeepLTranslateResponse.toObject, includeInstance)
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
 * @return {!proto.deepl.DeepLTranslationsResponse}
 */
proto.deepl.DeepLTranslationsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.deepl.DeepLTranslationsResponse;
  return proto.deepl.DeepLTranslationsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.deepl.DeepLTranslationsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.deepl.DeepLTranslationsResponse}
 */
proto.deepl.DeepLTranslationsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.deepl.DeepLTranslateResponse;
      reader.readMessage(value,proto.deepl.DeepLTranslateResponse.deserializeBinaryFromReader);
      msg.addTranslations(value);
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
proto.deepl.DeepLTranslationsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.deepl.DeepLTranslationsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.deepl.DeepLTranslationsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.deepl.DeepLTranslationsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTranslationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.deepl.DeepLTranslateResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated DeepLTranslateResponse translations = 1;
 * @return {!Array<!proto.deepl.DeepLTranslateResponse>}
 */
proto.deepl.DeepLTranslationsResponse.prototype.getTranslationsList = function() {
  return /** @type{!Array<!proto.deepl.DeepLTranslateResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.deepl.DeepLTranslateResponse, 1));
};


/**
 * @param {!Array<!proto.deepl.DeepLTranslateResponse>} value
 * @return {!proto.deepl.DeepLTranslationsResponse} returns this
*/
proto.deepl.DeepLTranslationsResponse.prototype.setTranslationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.deepl.DeepLTranslateResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.deepl.DeepLTranslateResponse}
 */
proto.deepl.DeepLTranslationsResponse.prototype.addTranslations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.deepl.DeepLTranslateResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.deepl.DeepLTranslationsResponse} returns this
 */
proto.deepl.DeepLTranslationsResponse.prototype.clearTranslationsList = function() {
  return this.setTranslationsList([]);
};


export const DeepLTranslateRequest = proto.deepl.DeepLTranslateRequest;
export const DeepLTranslateResponse = proto.deepl.DeepLTranslateResponse;
export const DeepLTranslationsResponse = proto.deepl.DeepLTranslationsResponse;
