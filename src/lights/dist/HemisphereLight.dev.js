"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereLight = HemisphereLight;

var _Light = require("./Light.js");

var _Color = require("../math/Color.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
function HemisphereLight(skyColor, groundColor, intensity) {
  _Light.Light.call(this, skyColor, intensity);

  this.type = 'HemisphereLight';
  this.castShadow = undefined;
  this.position.copy(_Object3D.Object3D.DefaultUp);
  this.updateMatrix();
  this.groundColor = new _Color.Color(groundColor);
}

HemisphereLight.prototype = Object.assign(Object.create(_Light.Light.prototype), {
  constructor: HemisphereLight,
  isHemisphereLight: true,
  copy: function copy(source) {
    _Light.Light.prototype.copy.call(this, source);

    this.groundColor.copy(source.groundColor);
    return this;
  }
});