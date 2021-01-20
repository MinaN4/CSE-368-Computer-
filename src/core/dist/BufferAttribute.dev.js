"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Float64BufferAttribute = Float64BufferAttribute;
exports.Float32BufferAttribute = Float32BufferAttribute;
exports.Uint32BufferAttribute = Uint32BufferAttribute;
exports.Int32BufferAttribute = Int32BufferAttribute;
exports.Uint16BufferAttribute = Uint16BufferAttribute;
exports.Int16BufferAttribute = Int16BufferAttribute;
exports.Uint8ClampedBufferAttribute = Uint8ClampedBufferAttribute;
exports.Uint8BufferAttribute = Uint8BufferAttribute;
exports.Int8BufferAttribute = Int8BufferAttribute;
exports.BufferAttribute = BufferAttribute;

var _Vector = require("../math/Vector4.js");

var _Vector2 = require("../math/Vector3.js");

var _Vector3 = require("../math/Vector2.js");

var _Color = require("../math/Color.js");

var _constants = require("../constants.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function BufferAttribute(array, itemSize, normalized) {
  if (Array.isArray(array)) {
    throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
  }

  this.name = '';
  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;
  this.normalized = normalized === true;
  this.usage = _constants.StaticDrawUsage;
  this.updateRange = {
    offset: 0,
    count: -1
  };
  this.version = 0;
}

Object.defineProperty(BufferAttribute.prototype, 'needsUpdate', {
  set: function set(value) {
    if (value === true) this.version++;
  }
});
Object.assign(BufferAttribute.prototype, {
  isBufferAttribute: true,
  onUploadCallback: function onUploadCallback() {},
  setUsage: function setUsage(value) {
    this.usage = value;
    return this;
  },
  copy: function copy(source) {
    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;
    this.usage = source.usage;
    return this;
  },
  copyAt: function copyAt(index1, attribute, index2) {
    index1 *= this.itemSize;
    index2 *= attribute.itemSize;

    for (var i = 0, l = this.itemSize; i < l; i++) {
      this.array[index1 + i] = attribute.array[index2 + i];
    }

    return this;
  },
  copyArray: function copyArray(array) {
    this.array.set(array);
    return this;
  },
  copyColorsArray: function copyColorsArray(colors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = colors.length; i < l; i++) {
      var color = colors[i];

      if (color === undefined) {
        console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
        color = new _Color.Color();
      }

      array[offset++] = color.r;
      array[offset++] = color.g;
      array[offset++] = color.b;
    }

    return this;
  },
  copyVector2sArray: function copyVector2sArray(vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
        vector = new _Vector3.Vector2();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
    }

    return this;
  },
  copyVector3sArray: function copyVector3sArray(vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
        vector = new _Vector2.Vector3();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
    }

    return this;
  },
  copyVector4sArray: function copyVector4sArray(vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
        vector = new _Vector.Vector4();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
      array[offset++] = vector.w;
    }

    return this;
  },
  set: function set(value, offset) {
    if (offset === undefined) offset = 0;
    this.array.set(value, offset);
    return this;
  },
  getX: function getX(index) {
    return this.array[index * this.itemSize];
  },
  setX: function setX(index, x) {
    this.array[index * this.itemSize] = x;
    return this;
  },
  getY: function getY(index) {
    return this.array[index * this.itemSize + 1];
  },
  setY: function setY(index, y) {
    this.array[index * this.itemSize + 1] = y;
    return this;
  },
  getZ: function getZ(index) {
    return this.array[index * this.itemSize + 2];
  },
  setZ: function setZ(index, z) {
    this.array[index * this.itemSize + 2] = z;
    return this;
  },
  getW: function getW(index) {
    return this.array[index * this.itemSize + 3];
  },
  setW: function setW(index, w) {
    this.array[index * this.itemSize + 3] = w;
    return this;
  },
  setXY: function setXY(index, x, y) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    return this;
  },
  setXYZ: function setXYZ(index, x, y, z) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    return this;
  },
  setXYZW: function setXYZW(index, x, y, z, w) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    this.array[index + 3] = w;
    return this;
  },
  onUpload: function onUpload(callback) {
    this.onUploadCallback = callback;
    return this;
  },
  clone: function clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  },
  toJSON: function toJSON() {
    return {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.prototype.slice.call(this.array),
      normalized: this.normalized
    };
  }
}); //

function Int8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int8Array(array), itemSize, normalized);
}

Int8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;

function Uint8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8Array(array), itemSize, normalized);
}

Uint8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;

function Uint8ClampedBufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8ClampedArray(array), itemSize, normalized);
}

Uint8ClampedBufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;

function Int16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int16Array(array), itemSize, normalized);
}

Int16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;

function Uint16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);
}

Uint16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;

function Int32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int32Array(array), itemSize, normalized);
}

Int32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;

function Uint32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint32Array(array), itemSize, normalized);
}

Uint32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;

function Float32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
}

Float32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;

function Float64BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float64Array(array), itemSize, normalized);
}

Float64BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float64BufferAttribute.prototype.constructor = Float64BufferAttribute; //