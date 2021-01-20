"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2Node = Vector2Node;

var _threeModule = require("../../../../build/three.module.js");

var _InputNode = require("../core/InputNode.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function Vector2Node(x, y) {
  _InputNode.InputNode.call(this, 'v2');

  this.value = x instanceof _threeModule.Vector2 ? x : new _threeModule.Vector2(x, y);
}

Vector2Node.prototype = Object.create(_InputNode.InputNode.prototype);
Vector2Node.prototype.constructor = Vector2Node;
Vector2Node.prototype.nodeType = "Vector2";

_NodeUtils.NodeUtils.addShortcuts(Vector2Node.prototype, 'value', ['x', 'y']);

Vector2Node.prototype.generateReadonly = function (builder, output, uuid, type
/*, ns, needsUpdate*/
) {
  return builder.format("vec2( " + this.x + ", " + this.y + " )", type, output);
};

Vector2Node.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.value.copy(source);
  return this;
};

Vector2Node.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.x = this.x;
    data.y = this.y;
    if (this.readonly === true) data.readonly = true;
  }

  return data;
};