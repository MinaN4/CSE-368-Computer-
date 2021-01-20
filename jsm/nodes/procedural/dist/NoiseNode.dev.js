"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoiseNode = NoiseNode;

var _TempNode = require("../core/TempNode.js");

var _FunctionNode = require("../core/FunctionNode.js");

var _UVNode = require("../accessors/UVNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function NoiseNode(uv) {
  _TempNode.TempNode.call(this, 'f');

  this.uv = uv || new _UVNode.UVNode();
}

NoiseNode.prototype = Object.create(_TempNode.TempNode.prototype);
NoiseNode.prototype.constructor = NoiseNode;
NoiseNode.prototype.nodeType = "Noise";

NoiseNode.Nodes = function () {
  var snoise = new _FunctionNode.FunctionNode(["float snoise(vec2 co) {", "	return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );", "}"].join("\n"));
  return {
    snoise: snoise
  };
}();

NoiseNode.prototype.generate = function (builder, output) {
  var snoise = builder.include(NoiseNode.Nodes.snoise);
  return builder.format(snoise + '( ' + this.uv.build(builder, 'v2') + ' )', this.getType(builder), output);
};

NoiseNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.uv = source.uv;
  return this;
};

NoiseNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.uv = this.uv.toJSON(meta).uuid;
  }

  return data;
};