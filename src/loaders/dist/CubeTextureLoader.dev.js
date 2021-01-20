"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CubeTextureLoader = CubeTextureLoader;

var _ImageLoader = require("./ImageLoader.js");

var _CubeTexture = require("../textures/CubeTexture.js");

var _Loader = require("./Loader.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function CubeTextureLoader(manager) {
  _Loader.Loader.call(this, manager);
}

CubeTextureLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: CubeTextureLoader,
  load: function load(urls, onLoad, onProgress, onError) {
    var texture = new _CubeTexture.CubeTexture();
    var loader = new _ImageLoader.ImageLoader(this.manager);
    loader.setCrossOrigin(this.crossOrigin);
    loader.setPath(this.path);
    var loaded = 0;

    function loadTexture(i) {
      loader.load(urls[i], function (image) {
        texture.images[i] = image;
        loaded++;

        if (loaded === 6) {
          texture.needsUpdate = true;
          if (onLoad) onLoad(texture);
        }
      }, undefined, onError);
    }

    for (var i = 0; i < urls.length; ++i) {
      loadTexture(i);
    }

    return texture;
  }
});