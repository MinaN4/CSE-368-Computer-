"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepthTexture = DepthTexture;

var _Texture = require("./Texture.js");

var _constants = require("../constants.js");

/**
 * @author Matt DesLauriers / @mattdesl
 * @author atix / arthursilber.de
 */
function DepthTexture(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format) {
  format = format !== undefined ? format : _constants.DepthFormat;

  if (format !== _constants.DepthFormat && format !== _constants.DepthStencilFormat) {
    throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');
  }

  if (type === undefined && format === _constants.DepthFormat) type = _constants.UnsignedShortType;
  if (type === undefined && format === _constants.DepthStencilFormat) type = _constants.UnsignedInt248Type;

  _Texture.Texture.call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

  this.image = {
    width: width,
    height: height
  };
  this.magFilter = magFilter !== undefined ? magFilter : _constants.NearestFilter;
  this.minFilter = minFilter !== undefined ? minFilter : _constants.NearestFilter;
  this.flipY = false;
  this.generateMipmaps = false;
}

DepthTexture.prototype = Object.create(_Texture.Texture.prototype);
DepthTexture.prototype.constructor = DepthTexture;
DepthTexture.prototype.isDepthTexture = true;