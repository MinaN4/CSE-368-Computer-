"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstancedBufferGeometry = InstancedBufferGeometry;

var _BufferGeometry = require("./BufferGeometry.js");

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 */
function InstancedBufferGeometry() {
  _BufferGeometry.BufferGeometry.call(this);

  this.type = 'InstancedBufferGeometry';
  this.maxInstancedCount = undefined;
}

InstancedBufferGeometry.prototype = Object.assign(Object.create(_BufferGeometry.BufferGeometry.prototype), {
  constructor: InstancedBufferGeometry,
  isInstancedBufferGeometry: true,
  copy: function copy(source) {
    _BufferGeometry.BufferGeometry.prototype.copy.call(this, source);

    this.maxInstancedCount = source.maxInstancedCount;
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  toJSON: function toJSON() {
    var data = _BufferGeometry.BufferGeometry.prototype.toJSON.call(this);

    data.maxInstancedCount = this.maxInstancedCount;
    data.isInstancedBufferGeometry = true;
    return data;
  }
});