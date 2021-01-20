"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontLoader = FontLoader;

var _Font = require("../extras/core/Font.js");

var _FileLoader = require("./FileLoader.js");

var _Loader = require("./Loader.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function FontLoader(manager) {
  _Loader.Loader.call(this, manager);
}

FontLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: FontLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new _FileLoader.FileLoader(this.manager);
    loader.setPath(this.path);
    loader.load(url, function (text) {
      var json;

      try {
        json = JSON.parse(text);
      } catch (e) {
        console.warn('THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead.');
        json = JSON.parse(text.substring(65, text.length - 2));
      }

      var font = scope.parse(json);
      if (onLoad) onLoad(font);
    }, onProgress, onError);
  },
  parse: function parse(json) {
    return new _Font.Font(json);
  }
});