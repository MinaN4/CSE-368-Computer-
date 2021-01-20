"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLightShadow = DirectionalLightShadow;

var _LightShadow = require("./LightShadow.js");

var _OrthographicCamera = require("../cameras/OrthographicCamera.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function DirectionalLightShadow() {
  _LightShadow.LightShadow.call(this, new _OrthographicCamera.OrthographicCamera(-5, 5, 5, -5, 0.5, 500));
}

DirectionalLightShadow.prototype = Object.assign(Object.create(_LightShadow.LightShadow.prototype), {
  constructor: DirectionalLightShadow,
  isDirectionalLightShadow: true,
  updateMatrices: function updateMatrices(light) {
    _LightShadow.LightShadow.prototype.updateMatrices.call(this, light);
  }
});