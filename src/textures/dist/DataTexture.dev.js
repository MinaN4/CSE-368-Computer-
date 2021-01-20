"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTexture = DataTexture;

var _Texture = require("./Texture.js");

var _constants = require("../constants.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
function DataTexture(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
  _Texture.Texture.call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);

  this.image = {
    data: data || null,
    width: width || 1,
    height: height || 1
  };
  this.magFilter = magFilter !== undefined ? magFilter : _constants.NearestFilter;
  this.minFilter = minFilter !== undefined ? minFilter : _constants.NearestFilter;
  this.generateMipmaps = false;
  this.flipY = false;
  this.unpackAlignment = 1;
  this.needsUpdate = true;
}

DataTexture.prototype = Object.create(_Texture.Texture.prototype);
DataTexture.prototype.constructor = DataTexture;
DataTexture.prototype.isDataTexture = true;