"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio = Audio;

var _Object3D = require("../core/Object3D.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
function Audio(listener) {
  _Object3D.Object3D.call(this);

  this.type = 'Audio';
  this.listener = listener;
  this.context = listener.context;
  this.gain = this.context.createGain();
  this.gain.connect(listener.getInput());
  this.autoplay = false;
  this.buffer = null;
  this.detune = 0;
  this.loop = false;
  this.loopStart = 0;
  this.loopEnd = 0;
  this.offset = 0;
  this.duration = undefined;
  this.playbackRate = 1;
  this.isPlaying = false;
  this.hasPlaybackControl = true;
  this.sourceType = 'empty';
  this._startedAt = 0;
  this._pausedAt = 0;
  this.filters = [];
}

Audio.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Audio,
  getOutput: function getOutput() {
    return this.gain;
  },
  setNodeSource: function setNodeSource(audioNode) {
    this.hasPlaybackControl = false;
    this.sourceType = 'audioNode';
    this.source = audioNode;
    this.connect();
    return this;
  },
  setMediaElementSource: function setMediaElementSource(mediaElement) {
    this.hasPlaybackControl = false;
    this.sourceType = 'mediaNode';
    this.source = this.context.createMediaElementSource(mediaElement);
    this.connect();
    return this;
  },
  setMediaStreamSource: function setMediaStreamSource(mediaStream) {
    this.hasPlaybackControl = false;
    this.sourceType = 'mediaStreamNode';
    this.source = this.context.createMediaStreamSource(mediaStream);
    this.connect();
    return this;
  },
  setBuffer: function setBuffer(audioBuffer) {
    this.buffer = audioBuffer;
    this.sourceType = 'buffer';
    if (this.autoplay) this.play();
    return this;
  },
  play: function play(delay) {
    if (delay === undefined) delay = 0;

    if (this.isPlaying === true) {
      console.warn('THREE.Audio: Audio is already playing.');
      return;
    }

    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return;
    }

    this._startedAt = this.context.currentTime + delay;
    var source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.loop = this.loop;
    source.loopStart = this.loopStart;
    source.loopEnd = this.loopEnd;
    source.onended = this.onEnded.bind(this);
    source.start(this._startedAt, this._pausedAt + this.offset, this.duration);
    this.isPlaying = true;
    this.source = source;
    this.setDetune(this.detune);
    this.setPlaybackRate(this.playbackRate);
    return this.connect();
  },
  pause: function pause() {
    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return;
    }

    if (this.isPlaying === true) {
      this._pausedAt = (this.context.currentTime - this._startedAt) * this.playbackRate;
      this.source.stop();
      this.source.onended = null;
      this.isPlaying = false;
    }

    return this;
  },
  stop: function stop() {
    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return;
    }

    this._pausedAt = 0;
    this.source.stop();
    this.source.onended = null;
    this.isPlaying = false;
    return this;
  },
  connect: function connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);

      for (var i = 1, l = this.filters.length; i < l; i++) {
        this.filters[i - 1].connect(this.filters[i]);
      }

      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else {
      this.source.connect(this.getOutput());
    }

    return this;
  },
  disconnect: function disconnect() {
    if (this.filters.length > 0) {
      this.source.disconnect(this.filters[0]);

      for (var i = 1, l = this.filters.length; i < l; i++) {
        this.filters[i - 1].disconnect(this.filters[i]);
      }

      this.filters[this.filters.length - 1].disconnect(this.getOutput());
    } else {
      this.source.disconnect(this.getOutput());
    }

    return this;
  },
  getFilters: function getFilters() {
    return this.filters;
  },
  setFilters: function setFilters(value) {
    if (!value) value = [];

    if (this.isPlaying === true) {
      this.disconnect();
      this.filters = value;
      this.connect();
    } else {
      this.filters = value;
    }

    return this;
  },
  setDetune: function setDetune(value) {
    this.detune = value;
    if (this.source.detune === undefined) return; // only set detune when available

    if (this.isPlaying === true) {
      this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, 0.01);
    }

    return this;
  },
  getDetune: function getDetune() {
    return this.detune;
  },
  getFilter: function getFilter() {
    return this.getFilters()[0];
  },
  setFilter: function setFilter(filter) {
    return this.setFilters(filter ? [filter] : []);
  },
  setPlaybackRate: function setPlaybackRate(value) {
    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return;
    }

    this.playbackRate = value;

    if (this.isPlaying === true) {
      this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, 0.01);
    }

    return this;
  },
  getPlaybackRate: function getPlaybackRate() {
    return this.playbackRate;
  },
  onEnded: function onEnded() {
    this.isPlaying = false;
  },
  getLoop: function getLoop() {
    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return false;
    }

    return this.loop;
  },
  setLoop: function setLoop(value) {
    if (this.hasPlaybackControl === false) {
      console.warn('THREE.Audio: this Audio has no playback control.');
      return;
    }

    this.loop = value;

    if (this.isPlaying === true) {
      this.source.loop = this.loop;
    }

    return this;
  },
  setLoopStart: function setLoopStart(value) {
    this.loopStart = value;
    return this;
  },
  setLoopEnd: function setLoopEnd(value) {
    this.loopEnd = value;
    return this;
  },
  getVolume: function getVolume() {
    return this.gain.gain.value;
  },
  setVolume: function setVolume(value) {
    this.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    return this;
  }
});