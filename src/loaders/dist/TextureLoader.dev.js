"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureLoader = TextureLoader;

var _constants = require("../constants.js");

var _ImageLoader = require("./ImageLoader.js");

var _Texture = require("../textures/Texture.js");

var _Loader = require("./Loader.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function TextureLoader(manager) {
  _Loader.Loader.call(this, manager);
}

TextureLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: TextureLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var texture = new _Texture.Texture();
    var loader = new _ImageLoader.ImageLoader(this.manager);
    loader.setCrossOrigin(this.crossOrigin);
    loader.setPath(this.path);
    loader.load(url, function (image) {
      texture.image = image; // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.

      var isJPEG = url.search(/\.jpe?g($|\?)/i) > 0 || url.search(/^data\:image\/jpeg/) === 0;
      texture.format = isJPEG ? _constants.RGBFormat : _constants.RGBAFormat;
      texture.needsUpdate = true;

      if (onLoad !== undefined) {
        onLoad(texture);
      }
    }, onProgress, onError);
    return texture;
  }
});