"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UVTransformNode = UVTransformNode;

var _ExpressionNode = require("../core/ExpressionNode.js");

var _Matrix3Node = require("../inputs/Matrix3Node.js");

var _UVNode = require("../accessors/UVNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function UVTransformNode(uv, position) {
  _ExpressionNode.ExpressionNode.call(this, "( uvTransform * vec3( uvNode, 1 ) ).xy", "vec2");

  this.uv = uv || new _UVNode.UVNode();
  this.position = position || new _Matrix3Node.Matrix3Node();
}

UVTransformNode.prototype = Object.create(_ExpressionNode.ExpressionNode.prototype);
UVTransformNode.prototype.constructor = UVTransformNode;
UVTransformNode.prototype.nodeType = "UVTransform";

UVTransformNode.prototype.generate = function (builder, output) {
  this.keywords["uvNode"] = this.uv;
  this.keywords["uvTransform"] = this.position;
  return _ExpressionNode.ExpressionNode.prototype.generate.call(this, builder, output);
};

UVTransformNode.prototype.setUvTransform = function (tx, ty, sx, sy, rotation, cx, cy) {
  cx = cx !== undefined ? cx : .5;
  cy = cy !== undefined ? cy : .5;
  this.position.value.setUvTransform(tx, ty, sx, sy, rotation, cx, cy);
};

UVTransformNode.prototype.copy = function (source) {
  _ExpressionNode.ExpressionNode.prototype.copy.call(this, source);

  this.uv = source.uv;
  this.position = source.position;
  return this;
};

UVTransformNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.uv = this.uv.toJSON(meta).uuid;
    data.position = this.position.toJSON(meta).uuid;
  }

  return data;
};