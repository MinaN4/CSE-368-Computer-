"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLoader = ImageLoader;

var _Cache = require("./Cache.js");

var _Loader = require("./Loader.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function ImageLoader(manager) {
  _Loader.Loader.call(this, manager);
}

ImageLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: ImageLoader,
  load: function load(url, onLoad, onProgress, onError) {
    if (this.path !== undefined) url = this.path + url;
    url = this.manager.resolveURL(url);
    var scope = this;

    var cached = _Cache.Cache.get(url);

    if (cached !== undefined) {
      scope.manager.itemStart(url);
      setTimeout(function () {
        if (onLoad) onLoad(cached);
        scope.manager.itemEnd(url);
      }, 0);
      return cached;
    }

    var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

    function onImageLoad() {
      image.removeEventListener('load', onImageLoad, false);
      image.removeEventListener('error', onImageError, false);

      _Cache.Cache.add(url, this);

      if (onLoad) onLoad(this);
      scope.manager.itemEnd(url);
    }

    function onImageError(event) {
      image.removeEventListener('load', onImageLoad, false);
      image.removeEventListener('error', onImageError, false);
      if (onError) onError(event);
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    }

    image.addEventListener('load', onImageLoad, false);
    image.addEventListener('error', onImageError, false);

    if (url.substr(0, 5) !== 'data:') {
      if (this.crossOrigin !== undefined) image.crossOrigin = this.crossOrigin;
    }

    scope.manager.itemStart(url);
    image.src = url;
    return image;
  }
});