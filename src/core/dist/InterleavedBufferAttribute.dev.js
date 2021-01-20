"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterleavedBufferAttribute = InterleavedBufferAttribute;

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */
function InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized) {
  this.data = interleavedBuffer;
  this.itemSize = itemSize;
  this.offset = offset;
  this.normalized = normalized === true;
}

Object.defineProperties(InterleavedBufferAttribute.prototype, {
  count: {
    get: function get() {
      return this.data.count;
    }
  },
  array: {
    get: function get() {
      return this.data.array;
    }
  }
});
Object.assign(InterleavedBufferAttribute.prototype, {
  isInterleavedBufferAttribute: true,
  setX: function setX(index, x) {
    this.data.array[index * this.data.stride + this.offset] = x;
    return this;
  },
  setY: function setY(index, y) {
    this.data.array[index * this.data.stride + this.offset + 1] = y;
    return this;
  },
  setZ: function setZ(index, z) {
    this.data.array[index * this.data.stride + this.offset + 2] = z;
    return this;
  },
  setW: function setW(index, w) {
    this.data.array[index * this.data.stride + this.offset + 3] = w;
    return this;
  },
  getX: function getX(index) {
    return this.data.array[index * this.data.stride + this.offset];
  },
  getY: function getY(index) {
    return this.data.array[index * this.data.stride + this.offset + 1];
  },
  getZ: function getZ(index) {
    return this.data.array[index * this.data.stride + this.offset + 2];
  },
  getW: function getW(index) {
    return this.data.array[index * this.data.stride + this.offset + 3];
  },
  setXY: function setXY(index, x, y) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    return this;
  },
  setXYZ: function setXYZ(index, x, y, z) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    return this;
  },
  setXYZW: function setXYZW(index, x, y, z, w) {
    index = index * this.data.stride + this.offset;
    this.data.array[index + 0] = x;
    this.data.array[index + 1] = y;
    this.data.array[index + 2] = z;
    this.data.array[index + 3] = w;
    return this;
  }
});