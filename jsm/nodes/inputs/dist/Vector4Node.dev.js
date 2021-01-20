"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector4Node = Vector4Node;

var _threeModule = require("../../../../build/three.module.js");

var _InputNode = require("../core/InputNode.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function Vector4Node(x, y, z, w) {
  _InputNode.InputNode.call(this, 'v4');

  this.value = x instanceof _threeModule.Vector4 ? x : new _threeModule.Vector4(x, y, z, w);
}

Vector4Node.prototype = Object.create(_InputNode.InputNode.prototype);
Vector4Node.prototype.constructor = Vector4Node;
Vector4Node.prototype.nodeType = "Vector4";

_NodeUtils.NodeUtils.addShortcuts(Vector4Node.prototype, 'value', ['x', 'y', 'z', 'w']);

Vector4Node.prototype.generateReadonly = function (builder, output, uuid, type
/*, ns, needsUpdate*/
) {
  return builder.format("vec4( " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " )", type, output);
};

Vector4Node.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.value.copy(source);
  return this;
};

Vector4Node.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.x = this.x;
    data.y = this.y;
    data.z = this.z;
    data.w = this.w;
    if (this.readonly === true) data.readonly = true;
  }

  return data;
};