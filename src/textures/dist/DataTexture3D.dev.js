"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTexture3D = DataTexture3D;

var _Texture = require("./Texture.js");

var _constants = require("../constants.js");

/**
 * @author Artur Trzesiok
 */
function DataTexture3D(data, width, height, depth) {
  // We're going to add .setXXX() methods for setting properties later.
  // Users can still set in DataTexture3D directly.
  //
  //	var texture = new THREE.DataTexture3D( data, width, height, depth );
  // 	texture.anisotropy = 16;
  //
  // See #14839
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

DataTexture3D.prototype = Object.create(_Texture.Texture.prototype);
DataTexture3D.prototype.constructor = DataTexture3D;
DataTexture3D.prototype.isDataTexture3D = true;