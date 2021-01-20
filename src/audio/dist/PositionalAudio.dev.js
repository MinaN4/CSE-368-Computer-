"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionalAudio = PositionalAudio;

var _Vector = require("../math/Vector3.js");

var _Quaternion = require("../math/Quaternion.js");

var _Audio = require("./Audio.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
var _position = new _Vector.Vector3();

var _quaternion = new _Quaternion.Quaternion();

var _scale = new _Vector.Vector3();

var _orientation = new _Vector.Vector3();

function PositionalAudio(listener) {
  _Audio.Audio.call(this, listener);

  this.panner = this.context.createPanner();
  this.panner.panningModel = 'HRTF';
  this.panner.connect(this.gain);
}

PositionalAudio.prototype = Object.assign(Object.create(_Audio.Audio.prototype), {
  constructor: PositionalAudio,
  getOutput: function getOutput() {
    return this.panner;
  },
  getRefDistance: function getRefDistance() {
    return this.panner.refDistance;
  },
  setRefDistance: function setRefDistance(value) {
    this.panner.refDistance = value;
    return this;
  },
  getRolloffFactor: function getRolloffFactor() {
    return this.panner.rolloffFactor;
  },
  setRolloffFactor: function setRolloffFactor(value) {
    this.panner.rolloffFactor = value;
    return this;
  },
  getDistanceModel: function getDistanceModel() {
    return this.panner.distanceModel;
  },
  setDistanceModel: function setDistanceModel(value) {
    this.panner.distanceModel = value;
    return this;
  },
  getMaxDistance: function getMaxDistance() {
    return this.panner.maxDistance;
  },
  setMaxDistance: function setMaxDistance(value) {
    this.panner.maxDistance = value;
    return this;
  },
  setDirectionalCone: function setDirectionalCone(coneInnerAngle, coneOuterAngle, coneOuterGain) {
    this.panner.coneInnerAngle = coneInnerAngle;
    this.panner.coneOuterAngle = coneOuterAngle;
    this.panner.coneOuterGain = coneOuterGain;
    return this;
  },
  updateMatrixWorld: function updateMatrixWorld(force) {
    _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);

    if (this.hasPlaybackControl === true && this.isPlaying === false) return;
    this.matrixWorld.decompose(_position, _quaternion, _scale);

    _orientation.set(0, 0, 1).applyQuaternion(_quaternion);

    var panner = this.panner;

    if (panner.positionX) {
      // code path for Chrome and Firefox (see #14393)
      var endTime = this.context.currentTime + this.listener.timeDelta;
      panner.positionX.linearRampToValueAtTime(_position.x, endTime);
      panner.positionY.linearRampToValueAtTime(_position.y, endTime);
      panner.positionZ.linearRampToValueAtTime(_position.z, endTime);
      panner.orientationX.linearRampToValueAtTime(_orientation.x, endTime);
      panner.orientationY.linearRampToValueAtTime(_orientation.y, endTime);
      panner.orientationZ.linearRampToValueAtTime(_orientation.z, endTime);
    } else {
      panner.setPosition(_position.x, _position.y, _position.z);
      panner.setOrientation(_orientation.x, _orientation.y, _orientation.z);
    }
  }
});