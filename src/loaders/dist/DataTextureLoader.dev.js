"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTextureLoader = DataTextureLoader;

var _constants = require("../constants.js");

var _FileLoader = require("./FileLoader.js");

var _DataTexture = require("../textures/DataTexture.js");

var _Loader = require("./Loader.js");

/**
 * @author Nikos M. / https://github.com/foo123/
 *
 * Abstract Base class to load generic binary textures formats (rgbe, hdr, ...)
 *
 * Sub classes have to implement the parse() method which will be used in load().
 */
function DataTextureLoader(manager) {
  _Loader.Loader.call(this, manager);
}

DataTextureLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: DataTextureLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var scope = this;
    var texture = new _DataTexture.DataTexture();
    var loader = new _FileLoader.FileLoader(this.manager);
    loader.setResponseType('arraybuffer');
    loader.setPath(this.path);
    loader.load(url, function (buffer) {
      var texData = scope.parse(buffer);
      if (!texData) return;

      if (texData.image !== undefined) {
        texture.image = texData.image;
      } else if (texData.data !== undefined) {
        texture.image.width = texData.width;
        texture.image.height = texData.height;
        texture.image.data = texData.data;
      }

      texture.wrapS = texData.wrapS !== undefined ? texData.wrapS : _constants.ClampToEdgeWrapping;
      texture.wrapT = texData.wrapT !== undefined ? texData.wrapT : _constants.ClampToEdgeWrapping;
      texture.magFilter = texData.magFilter !== undefined ? texData.magFilter : _constants.LinearFilter;
      texture.minFilter = texData.minFilter !== undefined ? texData.minFilter : _constants.LinearFilter;
      texture.anisotropy = texData.anisotropy !== undefined ? texData.anisotropy : 1;

      if (texData.format !== undefined) {
        texture.format = texData.format;
      }

      if (texData.type !== undefined) {
        texture.type = texData.type;
      }

      if (texData.mipmaps !== undefined) {
        texture.mipmaps = texData.mipmaps;
        texture.minFilter = _constants.LinearMipmapLinearFilter; // presumably...
      }

      if (texData.mipmapCount === 1) {
        texture.minFilter = _constants.LinearFilter;
      }

      texture.needsUpdate = true;
      if (onLoad) onLoad(texture, texData);
    }, onProgress, onError);
    return texture;
  }
});