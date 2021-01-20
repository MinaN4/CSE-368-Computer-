"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationLoader = AnimationLoader;

var _AnimationClip = require("../animation/AnimationClip.js");

var _FileLoader = require("./FileLoader.js");

var _Loader = require("./Loader.js");

/**
 * @author bhouston / http://clara.io/
 */
function AnimationLoader(manager) {
  _Loader.Loader.call(this, manager);
}

AnimationLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: AnimationLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new _FileLoader.FileLoader(scope.manager);
    loader.setPath(scope.path);
    loader.load(url, function (text) {
      onLoad(scope.parse(JSON.parse(text)));
    }, onProgress, onError);
  },
  parse: function parse(json) {
    var animations = [];

    for (var i = 0; i < json.length; i++) {
      var clip = _AnimationClip.AnimationClip.parse(json[i]);

      animations.push(clip);
    }

    return animations;
  }
});