"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureCubeNode = TextureCubeNode;

var _TempNode = require("../core/TempNode.js");

var _FloatNode = require("../inputs/FloatNode.js");

var _ExpressionNode = require("../core/ExpressionNode.js");

var _TextureCubeUVNode = require("./TextureCubeUVNode.js");

var _ReflectNode = require("../accessors/ReflectNode.js");

var _NormalNode = require("../accessors/NormalNode.js");

var _ColorSpaceNode = require("../utils/ColorSpaceNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function TextureCubeNode(value, textureSize, uv, bias) {
  _TempNode.TempNode.call(this, 'v4');

  this.value = value;
  textureSize = textureSize || new _FloatNode.FloatNode(1024);
  this.radianceCache = {
    uv: new _TextureCubeUVNode.TextureCubeUVNode(uv || new _ReflectNode.ReflectNode(_ReflectNode.ReflectNode.VECTOR), textureSize, // bias should be replaced in builder.context in build process
    bias)
  };
  this.irradianceCache = {
    uv: new _TextureCubeUVNode.TextureCubeUVNode(new _NormalNode.NormalNode(_NormalNode.NormalNode.WORLD), textureSize, new _FloatNode.FloatNode(1).setReadonly(true))
  };
}

TextureCubeNode.prototype = Object.create(_TempNode.TempNode.prototype);
TextureCubeNode.prototype.constructor = TextureCubeNode;
TextureCubeNode.prototype.nodeType = "TextureCube";

TextureCubeNode.prototype.generateTextureCubeUV = function (builder, cache) {
  var uv_10 = cache.uv.build(builder) + '.uv_10',
      uv_20 = cache.uv.build(builder) + '.uv_20',
      t = cache.uv.build(builder) + '.t';
  var color10 = 'texture2D( ' + this.value.build(builder, 'sampler2D') + ', ' + uv_10 + ' )',
      color20 = 'texture2D( ' + this.value.build(builder, 'sampler2D') + ', ' + uv_20 + ' )'; // add a custom context for fix incompatibility with the core
  // include ColorSpace function only for vertex shader (in fragment shader color space functions is added automatically by core)
  // this should be removed in the future
  // context.include =: is used to include or not functions if used FunctionNode
  // context.ignoreCache =: not create temp variables nodeT0..9 to optimize the code

  var context = {
    include: builder.isShader('vertex'),
    ignoreCache: true
  };
  var outputType = this.getType(builder);
  builder.addContext(context);
  cache.colorSpace10 = cache.colorSpace10 || new _ColorSpaceNode.ColorSpaceNode(new _ExpressionNode.ExpressionNode('', outputType));
  cache.colorSpace10.fromDecoding(builder.getTextureEncodingFromMap(this.value.value));
  cache.colorSpace10.input.parse(color10);
  color10 = cache.colorSpace10.build(builder, outputType);
  cache.colorSpace20 = cache.colorSpace20 || new _ColorSpaceNode.ColorSpaceNode(new _ExpressionNode.ExpressionNode('', outputType));
  cache.colorSpace20.fromDecoding(builder.getTextureEncodingFromMap(this.value.value));
  cache.colorSpace20.input.parse(color20);
  color20 = cache.colorSpace20.build(builder, outputType); // end custom context

  builder.removeContext();
  return 'mix( ' + color10 + ', ' + color20 + ', ' + t + ' ).rgb';
};

TextureCubeNode.prototype.generate = function (builder, output) {
  if (builder.isShader('fragment')) {
    builder.require('irradiance');

    if (builder.context.bias) {
      builder.context.bias.setTexture(this.value);
    }

    var cache = builder.slot === 'irradiance' ? this.irradianceCache : this.radianceCache;
    var result = this.generateTextureCubeUV(builder, cache);
    return builder.format('vec4( ' + result + ', 1.0 )', this.getType(builder), output);
  } else {
    console.warn("THREE.TextureCubeNode is not compatible with " + builder.shader + " shader.");
    return builder.format('vec4( 0.0 )', this.getType(builder), output);
  }
};

TextureCubeNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.value = source.value;
  return this;
};

TextureCubeNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.value = this.value.toJSON(meta).uuid;
  }

  return data;
};