"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectAreaLight = RectAreaLight;

var _Light = require("./Light.js");

/**
 * @author abelnation / http://github.com/abelnation
 */
function RectAreaLight(color, intensity, width, height) {
  _Light.Light.call(this, color, intensity);

  this.type = 'RectAreaLight';
  this.width = width !== undefined ? width : 10;
  this.height = height !== undefined ? height : 10;
}

RectAreaLight.prototype = Object.assign(Object.create(_Light.Light.prototype), {
  constructor: RectAreaLight,
  isRectAreaLight: true,
  copy: function copy(source) {
    _Light.Light.prototype.copy.call(this, source);

    this.width = source.width;
    this.height = source.height;
    return this;
  },
  toJSON: function toJSON(meta) {
    var data = _Light.Light.prototype.toJSON.call(this, meta);

    data.object.width = this.width;
    data.object.height = this.height;
    return data;
  }
});