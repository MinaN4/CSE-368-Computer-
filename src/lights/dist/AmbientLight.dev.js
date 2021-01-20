"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmbientLight = AmbientLight;

var _Light = require("./Light.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function AmbientLight(color, intensity) {
  _Light.Light.call(this, color, intensity);

  this.type = 'AmbientLight';
  this.castShadow = undefined;
}

AmbientLight.prototype = Object.assign(Object.create(_Light.Light.prototype), {
  constructor: AmbientLight,
  isAmbientLight: true
});