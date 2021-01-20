"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterleavedBuffer = InterleavedBuffer;

var _constants = require("../constants.js");

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */
function InterleavedBuffer(array, stride) {
  this.array = array;
  this.stride = stride;
  this.count = array !== undefined ? array.length / stride : 0;
  this.usage = _constants.StaticDrawUsage;
  this.updateRange = {
    offset: 0,
    count: -1
  };
  this.version = 0;
}

Object.defineProperty(InterleavedBuffer.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});
Object.assign(InterleavedBuffer.prototype, {
  isInterleavedBuffer: true,
  onUploadCallback: function onUploadCallback() {},
  setUsage: function setUsage(value) {
    this.usage = value;
    return this;
  },
  copy: function copy(source) {
    this.array = new source.array.constructor(source.array);
    this.count = source.count;
    this.stride = source.stride;
    this.usage = source.usage;
    return this;
  },
  copyAt: function copyAt(index1, attribute, index2) {
    index1 *= this.stride;
    index2 *= attribute.stride;

    for (var i = 0, l = this.stride; i < l; i++) {
      this.array[index1 + i] = attribute.array[index2 + i];
    }

    return this;
  },
  set: function set(value, offset) {
    if (offset === undefined) offset = 0;
    this.array.set(value, offset);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  onUpload: function onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  }
});