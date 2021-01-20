"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoTexture = VideoTexture;

var _constants = require("../constants.js");

var _Texture = require("./Texture.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function VideoTexture(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
  _Texture.Texture.call(this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

  this.format = format !== undefined ? format : _constants.RGBFormat;
  this.minFilter = minFilter !== undefined ? minFilter : _constants.LinearFilter;
  this.magFilter = magFilter !== undefined ? magFilter : _constants.LinearFilter;
  this.generateMipmaps = false;
}

VideoTexture.prototype = Object.assign(Object.create(_Texture.Texture.prototype), {
  constructor: VideoTexture,
  isVideoTexture: true,
  update: function update() {
    var video = this.image;

    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
});