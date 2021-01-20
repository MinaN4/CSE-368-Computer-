"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioLoader = AudioLoader;

var _AudioContext = require("../audio/AudioContext.js");

var _FileLoader = require("./FileLoader.js");

var _Loader = require("./Loader.js");

/**
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
function AudioLoader(manager) {
  _Loader.Loader.call(this, manager);
}

AudioLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: AudioLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var loader = new _FileLoader.FileLoader(this.manager);
    loader.setResponseType('arraybuffer');
    loader.setPath(this.path);
    loader.load(url, function (buffer) {
      // Create a copy of the buffer. The `decodeAudioData` method
      // detaches the buffer when complete, preventing reuse.
      var bufferCopy = buffer.slice(0);

      var context = _AudioContext.AudioContext.getContext();

      context.decodeAudioData(bufferCopy, function (audioBuffer) {
        onLoad(audioBuffer);
      });
    }, onProgress, onError);
  }
});