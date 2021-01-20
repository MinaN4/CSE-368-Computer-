"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTexture2DArray = DataTexture2DArray;

var _Texture = require("./Texture.js");

var _constants = require("../constants.js");

/**
 * @author Takahiro https://github.com/takahirox
 */
function DataTexture2DArray(data, width, height, depth) {
  _Texture.Texture.call(this, null);

  this.image = {
    data: data || null,
    width: width || 1,
    height: height || 1,
    depth: depth || 1
  };
  this.magFilter = _constants.NearestFilter;
  this.minFilter = _constants.NearestFilter;
  this.wrapR = _constants.ClampToEdgeWrapping;
  this.generateMipmaps = false;
  this.flipY = false;
  this.needsUpdate = true;
}

DataTexture2DArray.prototype = Object.create(_Texture.Texture.prototype);
DataTexture2DArray.prototype.constructor = DataTexture2DArray;
DataTexture2DArray.prototype.isDataTexture2DArray = true;