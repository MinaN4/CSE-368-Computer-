"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HDRCubeTextureLoader = void 0;

var _threeModule = require("../../../build/three.module.js");

var _RGBELoader = require("../loaders/RGBELoader.js");

/**
* @author Prashant Sharma / spidersharma03
* @author Ben Houston / http://clara.io / bhouston
*/
var HDRCubeTextureLoader = function HDRCubeTextureLoader(manager) {
  _threeModule.Loader.call(this, manager);

  this.hdrLoader = new _RGBELoader.RGBELoader();
  this.type = _threeModule.UnsignedByteType;
};

exports.HDRCubeTextureLoader = HDRCubeTextureLoader;
HDRCubeTextureLoader.prototype = Object.assign(Object.create(_threeModule.Loader.prototype), {
  constructor: HDRCubeTextureLoader,
  load: function load(urls, onLoad, onProgress, onError) {
    if (!Array.isArray(urls)) {
      console.warn('THREE.HDRCubeTextureLoader signature has changed. Use .setDataType() instead.');
      this.setDataType(urls);
      urls = onLoad;
      onLoad = onProgress;
      onProgress = onError;
      onError = arguments[4];
    }

    var texture = new _threeModule.CubeTexture();
    texture.type = this.type;

    switch (texture.type) {
      case _threeModule.UnsignedByteType:
        texture.encoding = _threeModule.RGBEEncoding;
        texture.format = _threeModule.RGBAFormat;
        texture.minFilter = _threeModule.NearestFilter;
        texture.magFilter = _threeModule.NearestFilter;
        texture.generateMipmaps = false;
        break;

      case _threeModule.FloatType:
        texture.encoding = _threeModule.LinearEncoding;
        texture.format = _threeModule.RGBFormat;
        texture.minFilter = _threeModule.LinearFilter;
        texture.magFilter = _threeModule.LinearFilter;
        texture.generateMipmaps = false;
        break;

      case _threeModule.HalfFloatType:
        texture.encoding = _threeModule.LinearEncoding;
        texture.format = _threeModule.RGBFormat;
        texture.minFilter = _threeModule.LinearFilter;
        texture.magFilter = _threeModule.LinearFilter;
        texture.generateMipmaps = false;
        break;
    }

    var scope = this;
    var loaded = 0;

    function loadHDRData(i, onLoad, onProgress, onError) {
      new _threeModule.FileLoader(scope.manager).setPath(scope.path).setResponseType('arraybuffer').load(urls[i], function (buffer) {
        loaded++;
        var texData = scope.hdrLoader.parse(buffer);
        if (!texData) return;

        if (texData.data !== undefined) {
          var dataTexture = new _threeModule.DataTexture(texData.data, texData.width, texData.height);
          dataTexture.type = texture.type;
          dataTexture.encoding = texture.encoding;
          dataTexture.format = texture.format;
          dataTexture.minFilter = texture.minFilter;
          dataTexture.magFilter = texture.magFilter;
          dataTexture.generateMipmaps = texture.generateMipmaps;
          texture.images[i] = dataTexture;
        }

        if (loaded === 6) {
          texture.needsUpdate = true;
          if (onLoad) onLoad(texture);
        }
      }, onProgress, onError);
    }

    for (var i = 0; i < urls.length; i++) {
      loadHDRData(i, onLoad, onProgress, onError);
    }

    return texture;
  },
  setDataType: function setDataType(value) {
    this.type = value;
    this.hdrLoader.setDataType(value);
    return this;
  }
});