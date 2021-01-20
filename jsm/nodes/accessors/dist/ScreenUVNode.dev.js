"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenUVNode = ScreenUVNode;

var _TempNode = require("../core/TempNode.js");

var _ResolutionNode = require("./ResolutionNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ScreenUVNode(resolution) {
  _TempNode.TempNode.call(this, 'v2');

  this.resolution = resolution || new _ResolutionNode.ResolutionNode();
}

ScreenUVNode.prototype = Object.create(_TempNode.TempNode.prototype);
ScreenUVNode.prototype.constructor = ScreenUVNode;
ScreenUVNode.prototype.nodeType = "ScreenUV";

ScreenUVNode.prototype.generate = function (builder, output) {
  var result;

  if (builder.isShader('fragment')) {
    result = '( gl_FragCoord.xy / ' + this.resolution.build(builder, 'v2') + ')';
  } else {
    console.warn("THREE.ScreenUVNode is not compatible with " + builder.shader + " shader.");
    result = 'vec2( 0.0 )';
  }

  return builder.format(result, this.getType(builder), output);
};

ScreenUVNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.resolution = source.resolution;
  return this;
};

ScreenUVNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.resolution = this.resolution.toJSON(meta).uuid;
  }

  return data;
};