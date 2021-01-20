"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyNode = PropertyNode;

var _InputNode = require("../core/InputNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function PropertyNode(object, property, type) {
  _InputNode.InputNode.call(this, type);

  this.object = object;
  this.property = property;
}

PropertyNode.prototype = Object.create(_InputNode.InputNode.prototype);
PropertyNode.prototype.constructor = PropertyNode;
PropertyNode.prototype.nodeType = "Property";
Object.defineProperties(PropertyNode.prototype, {
  value: {
    get: function get() {
      return this.object[this.property];
    },
    set: function set(val) {
      this.object[this.property] = val;
    }
  }
});

PropertyNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.value = this.value;
    data.property = this.property;
  }

  return data;
};