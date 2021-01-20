"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MorphAnimMesh = void 0;

var _threeModule = require("../../../build/three.module.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var MorphAnimMesh = function MorphAnimMesh(geometry, material) {
  _threeModule.Mesh.call(this, geometry, material);

  this.type = 'MorphAnimMesh';
  this.mixer = new _threeModule.AnimationMixer(this);
  this.activeAction = null;
};

exports.MorphAnimMesh = MorphAnimMesh;
MorphAnimMesh.prototype = Object.create(_threeModule.Mesh.prototype);
MorphAnimMesh.prototype.constructor = MorphAnimMesh;

MorphAnimMesh.prototype.setDirectionForward = function () {
  this.mixer.timeScale = 1.0;
};

MorphAnimMesh.prototype.setDirectionBackward = function () {
  this.mixer.timeScale = -1.0;
};

MorphAnimMesh.prototype.playAnimation = function (label, fps) {
  if (this.activeAction) {
    this.activeAction.stop();
    this.activeAction = null;
  }

  var clip = _threeModule.AnimationClip.findByName(this, label);

  if (clip) {
    var action = this.mixer.clipAction(clip);
    action.timeScale = clip.tracks.length * fps / clip.duration;
    this.activeAction = action.play();
  } else {
    throw new Error('THREE.MorphAnimMesh: animations[' + label + '] undefined in .playAnimation()');
  }
};

MorphAnimMesh.prototype.updateAnimation = function (delta) {
  this.mixer.update(delta);
};

MorphAnimMesh.prototype.copy = function (source) {
  _threeModule.Mesh.prototype.copy.call(this, source);

  this.mixer = new _threeModule.AnimationMixer(this);
  return this;
};