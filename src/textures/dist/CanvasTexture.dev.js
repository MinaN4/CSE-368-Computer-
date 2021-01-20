"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasTexture = CanvasTexture;

var _Texture = require("./Texture.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function CanvasTexture(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
  _Texture.Texture.call(this, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

  this.needsUpdate = true;
}

CanvasTexture.prototype = Object.create(_Texture.Texture.prototype);
CanvasTexture.prototype.constructor = CanvasTexture;
CanvasTexture.prototype.isCanvasTexture = true;