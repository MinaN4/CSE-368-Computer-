"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstancedBufferAttribute = InstancedBufferAttribute;

var _BufferAttribute = require("./BufferAttribute.js");

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */
function InstancedBufferAttribute(array, itemSize, normalized, meshPerAttribute) {
  if (typeof normalized === 'number') {
    meshPerAttribute = normalized;
    normalized = false;
    console.error('THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.');
  }

  _BufferAttribute.BufferAttribute.call(this, array, itemSize, normalized);

  this.meshPerAttribute = meshPerAttribute || 1;
}

InstancedBufferAttribute.prototype = Object.assign(Object.create(_BufferAttribute.BufferAttribute.prototype), {
  constructor: InstancedBufferAttribute,
  isInstancedBufferAttribute: true,
  copy: function copy(source) {
    _BufferAttribute.BufferAttribute.prototype.copy.call(this, source);

    this.meshPerAttribute = source.meshPerAttribute;
    return this;
  },
  toJSON: function toJSON() {
    var data = _BufferAttribute.BufferAttribute.prototype.toJSON.call(this);

    data.meshPerAttribute = this.meshPerAttribute;
    data.isInstancedBufferAttribute = true;
    return data;
  }
});