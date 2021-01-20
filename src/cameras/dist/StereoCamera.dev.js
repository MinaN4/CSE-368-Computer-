"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StereoCamera = StereoCamera;

var _Matrix = require("../math/Matrix4.js");

var _Math2 = require("../math/Math.js");

var _PerspectiveCamera = require("./PerspectiveCamera.js");

var _eyeRight = new _Matrix.Matrix4();

var _eyeLeft = new _Matrix.Matrix4();
/**
 * @author mrdoob / http://mrdoob.com/
 */


function StereoCamera() {
  this.type = 'StereoCamera';
  this.aspect = 1;
  this.eyeSep = 0.064;
  this.cameraL = new _PerspectiveCamera.PerspectiveCamera();
  this.cameraL.layers.enable(1);
  this.cameraL.matrixAutoUpdate = false;
  this.cameraR = new _PerspectiveCamera.PerspectiveCamera();
  this.cameraR.layers.enable(2);
  this.cameraR.matrixAutoUpdate = false;
  this._cache = {
    focus: null,
    fov: null,
    aspect: null,
    near: null,
    far: null,
    zoom: null,
    eyeSep: null
  };
}

Object.assign(StereoCamera.prototype, {
  update: function update(camera) {
    var cache = this._cache;
    var needsUpdate = cache.focus !== camera.focus || cache.fov !== camera.fov || cache.aspect !== camera.aspect * this.aspect || cache.near !== camera.near || cache.far !== camera.far || cache.zoom !== camera.zoom || cache.eyeSep !== this.eyeSep;

    if (needsUpdate) {
      cache.focus = camera.focus;
      cache.fov = camera.fov;
      cache.aspect = camera.aspect * this.aspect;
      cache.near = camera.near;
      cache.far = camera.far;
      cache.zoom = camera.zoom;
      cache.eyeSep = this.eyeSep; // Off-axis stereoscopic effect based on
      // http://paulbourke.net/stereographics/stereorender/

      var projectionMatrix = camera.projectionMatrix.clone();
      var eyeSepHalf = cache.eyeSep / 2;
      var eyeSepOnProjection = eyeSepHalf * cache.near / cache.focus;
      var ymax = cache.near * Math.tan(_Math2._Math.DEG2RAD * cache.fov * 0.5) / cache.zoom;
      var xmin, xmax; // translate xOffset

      _eyeLeft.elements[12] = -eyeSepHalf;
      _eyeRight.elements[12] = eyeSepHalf; // for left eye

      xmin = -ymax * cache.aspect + eyeSepOnProjection;
      xmax = ymax * cache.aspect + eyeSepOnProjection;
      projectionMatrix.elements[0] = 2 * cache.near / (xmax - xmin);
      projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);
      this.cameraL.projectionMatrix.copy(projectionMatrix); // for right eye

      xmin = -ymax * cache.aspect - eyeSepOnProjection;
      xmax = ymax * cache.aspect - eyeSepOnProjection;
      projectionMatrix.elements[0] = 2 * cache.near / (xmax - xmin);
      projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);
      this.cameraR.projectionMatrix.copy(projectionMatrix);
    }

    this.cameraL.matrixWorld.copy(camera.matrixWorld).multiply(_eyeLeft);
    this.cameraR.matrixWorld.copy(camera.matrixWorld).multiply(_eyeRight);
  }
});