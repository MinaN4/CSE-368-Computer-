"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckerNode = CheckerNode;

var _TempNode = require("../core/TempNode.js");

var _FunctionNode = require("../core/FunctionNode.js");

var _UVNode = require("../accessors/UVNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function CheckerNode(uv) {
  _TempNode.TempNode.call(this, 'f');

  this.uv = uv || new _UVNode.UVNode();
}

CheckerNode.prototype = Object.create(_TempNode.TempNode.prototype);
CheckerNode.prototype.constructor = CheckerNode;
CheckerNode.prototype.nodeType = "Noise";

CheckerNode.Nodes = function () {
  // https://github.com/mattdesl/glsl-checker/blob/master/index.glsl
  var checker = new _FunctionNode.FunctionNode(["float checker( vec2 uv ) {", "	float cx = floor( uv.x );", "	float cy = floor( uv.y ); ", "	float result = mod( cx + cy, 2.0 );", "	return sign( result );", "}"].join("\n"));
  return {
    checker: checker
  };
}();

CheckerNode.prototype.generate = function (builder, output) {
  var snoise = builder.include(CheckerNode.Nodes.checker);
  return builder.format(snoise + '( ' + this.uv.build(builder, 'v2') + ' )', this.getType(builder), output);
};

CheckerNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.uv = source.uv;
  return this;
};

CheckerNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.uv = this.uv.toJSON(meta).uuid;
  }

  return data;
};