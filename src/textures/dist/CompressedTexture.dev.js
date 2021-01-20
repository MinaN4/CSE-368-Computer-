"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompressedTexture = CompressedTexture;

var _Texture = require("./Texture.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
function CompressedTexture(mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {
  _Texture.Texture.call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);

  this.image = {
    width: width,
    height: height
  };
  this.mipmaps = mipmaps; // no flipping for cube textures
  // (also flipping doesn't work for compressed textures )

  this.flipY = false; // can't generate mipmaps for compressed textures
  // mips must be embedded in DDS files

  this.generateMipmaps = false;
}

CompressedTexture.prototype = Object.create(_Texture.Texture.prototype);
CompressedTexture.prototype.constructor = CompressedTexture;
CompressedTexture.prototype.isCompressedTexture = true;