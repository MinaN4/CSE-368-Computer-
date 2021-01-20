"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorNode = ColorNode;

var _threeModule = require("../../../../build/three.module.js");

var _InputNode = require("../core/InputNode.js");

var _NodeUtils = require("../core/NodeUtils.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function ColorNode(color, g, b) {
  _InputNode.InputNode.call(this, 'c');

  this.value = color instanceof _threeModule.Color ? color : new _threeModule.Color(color || 0, g, b);
}

ColorNode.prototype = Object.create(_InputNode.InputNode.prototype);
ColorNode.prototype.constructor = ColorNode;
ColorNode.prototype.nodeType = "Color";

_NodeUtils.NodeUtils.addShortcuts(ColorNode.prototype, 'value', ['r', 'g', 'b']);

ColorNode.prototype.generateReadonly = function (builder, output, uuid, type
/*, ns, needsUpdate */
) {
  return builder.format("vec3( " + this.r + ", " + this.g + ", " + this.b + " )", type, output);
};

ColorNode.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.value.copy(source);
  return this;
};

ColorNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.r = this.r;
    data.g = this.g;
    data.b = this.b;
    if (this.readonly === true) data.readonly = true;
  }

  return data;
};