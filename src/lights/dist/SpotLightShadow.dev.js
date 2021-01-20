"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotLightShadow = SpotLightShadow;

var _LightShadow = require("./LightShadow.js");

var _Math2 = require("../math/Math.js");

var _PerspectiveCamera = require("../cameras/PerspectiveCamera.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function SpotLightShadow() {
  _LightShadow.LightShadow.call(this, new _PerspectiveCamera.PerspectiveCamera(50, 1, 0.5, 500));
}

SpotLightShadow.prototype = Object.assign(Object.create(_LightShadow.LightShadow.prototype), {
  constructor: SpotLightShadow,
  isSpotLightShadow: true,
  updateMatrices: function updateMatrices(light) {
    var camera = this.camera;
    var fov = _Math2._Math.RAD2DEG * 2 * light.angle;
    var aspect = this.mapSize.width / this.mapSize.height;
    var far = light.distance || camera.far;

    if (fov !== camera.fov || aspect !== camera.aspect || far !== camera.far) {
      camera.fov = fov;
      camera.aspect = aspect;
      camera.far = far;
      camera.updateProjectionMatrix();
    }

    _LightShadow.LightShadow.prototype.updateMatrices.call(this, light);
  }
});