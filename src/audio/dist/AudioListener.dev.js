"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioListener = AudioListener;

var _Vector = require("../math/Vector3.js");

var _Quaternion = require("../math/Quaternion.js");

var _Clock = require("../core/Clock.js");

var _Object3D = require("../core/Object3D.js");

var _AudioContext = require("./AudioContext.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
var _position = new _Vector.Vector3();

var _quaternion = new _Quaternion.Quaternion();

var _scale = new _Vector.Vector3();

var _orientation = new _Vector.Vector3();

function AudioListener() {
  _Object3D.Object3D.call(this);

  this.type = 'AudioListener';
  this.context = _AudioContext.AudioContext.getContext();
  this.gain = this.context.createGain();
  this.gain.connect(this.context.destination);
  this.filter = null;
  this.timeDelta = 0; // private

  this._clock = new _Clock.Clock();
}

AudioListener.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: AudioListener,
  getInput: function getInput() {
    return this.gain;
  },
  removeFilter: function removeFilter() {
    if (this.filter !== null) {
      this.gain.disconnect(this.filter);
      this.filter.disconnect(this.context.destination);
      this.gain.connect(this.context.destination);
      this.filter = null;
    }

    return this;
  },
  getFilter: function getFilter() {
    return this.filter;
  },
  setFilter: function setFilter(value) {
    if (this.filter !== null) {
      this.gain.disconnect(this.filter);
      this.filter.disconnect(this.context.destination);
    } else {
      this.gain.disconnect(this.context.destination);
    }

    this.filter = value;
    this.gain.connect(this.filter);
    this.filter.connect(this.context.destination);
    return this;
  },
  getMasterVolume: function getMasterVolume() {
    return this.gain.gain.value;
  },
  setMasterVolume: function setMasterVolume(value) {
    this.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    return this;
  },
  updateMatrixWorld: function updateMatrixWorld(force) {
    _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);

    var listener = this.context.listener;
    var up = this.up;
    this.timeDelta = this._clock.getDelta();
    this.matrixWorld.decompose(_position, _quaternion, _scale);

    _orientation.set(0, 0, -1).applyQuaternion(_quaternion);

    if (listener.positionX) {
      // code path for Chrome (see #14393)
      var endTime = this.context.currentTime + this.timeDelta;
      listener.positionX.linearRampToValueAtTime(_position.x, endTime);
      listener.positionY.linearRampToValueAtTime(_position.y, endTime);
      listener.positionZ.linearRampToValueAtTime(_position.z, endTime);
      listener.forwardX.linearRampToValueAtTime(_orientation.x, endTime);
      listener.forwardY.linearRampToValueAtTime(_orientation.y, endTime);
      listener.forwardZ.linearRampToValueAtTime(_orientation.z, endTime);
      listener.upX.linearRampToValueAtTime(up.x, endTime);
      listener.upY.linearRampToValueAtTime(up.y, endTime);
      listener.upZ.linearRampToValueAtTime(up.z, endTime);
    } else {
      listener.setPosition(_position.x, _position.y, _position.z);
      listener.setOrientation(_orientation.x, _orientation.y, _orientation.z, up.x, up.y, up.z);
    }
  }
});