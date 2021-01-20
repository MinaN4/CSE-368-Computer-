"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoolNode = BoolNode;

var _InputNode = require("../core/InputNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function BoolNode(value) {
  _InputNode.InputNode.call(this, 'b');

  this.value = Boolean(value);
}

BoolNode.prototype = Object.create(_InputNode.InputNode.prototype);
BoolNode.prototype.constructor = BoolNode;
BoolNode.prototype.nodeType = "Bool";

BoolNode.prototype.generateReadonly = function (builder, output, uuid, type
/*, ns, needsUpdate */
) {
  return builder.format(this.value, type, output);
};

BoolNode.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.value = source.value;
  return this;
};

BoolNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.value = this.value;
    if (this.readonly === true) data.readonly = true;
  }

  return data;
};