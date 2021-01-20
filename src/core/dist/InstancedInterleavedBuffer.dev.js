"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstancedInterleavedBuffer = InstancedInterleavedBuffer;

var _InterleavedBuffer = require("./InterleavedBuffer.js");

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */
function InstancedInterleavedBuffer(array, stride, meshPerAttribute) {
  _InterleavedBuffer.InterleavedBuffer.call(this, array, stride);

  this.meshPerAttribute = meshPerAttribute || 1;
}

InstancedInterleavedBuffer.prototype = Object.assign(Object.create(_InterleavedBuffer.InterleavedBuffer.prototype), {
  constructor: InstancedInterleavedBuffer,
  isInstancedInterleavedBuffer: true,
  copy: function copy(source) {
    _InterleavedBuffer.InterleavedBuffer.prototype.copy.call(this, source);

    this.meshPerAttribute = source.meshPerAttribute;
    return this;
  }
});