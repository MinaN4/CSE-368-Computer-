"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix3Node = Matrix3Node;

var _threeModule = require("../../../../build/three.module.js");

var _InputNode = require("../core/InputNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function Matrix3Node(matrix) {
  _InputNode.InputNode.call(this, 'm3');

  this.value = matrix || new _threeModule.Matrix3();
}

Matrix3Node.prototype = Object.create(_InputNode.InputNode.prototype);
Matrix3Node.prototype.constructor = Matrix3Node;
Matrix3Node.prototype.nodeType = "Matrix3";
Object.defineProperties(Matrix3Node.prototype, {
  elements: {
    set: function set(val) {
      this.value.elements = val;
    },
    get: function get() {
      return this.value.elements;
    }
  }
});

Matrix3Node.prototype.generateReadonly = function (builder, output, uuid, type
/*, ns, needsUpdate */
) {
  return builder.format("mat3( " + this.value.elements.join(", ") + " )", type, output);
};

Matrix3Node.prototype.copy = function (source) {
  _InputNode.InputNode.prototype.copy.call(this, source);

  this.value.fromArray(source.elements);
  return this;
};

Matrix3Node.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.elements = this.value.elements.concat();
  }

  return data;
};