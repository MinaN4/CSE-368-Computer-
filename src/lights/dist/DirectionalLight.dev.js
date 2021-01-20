"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLight = DirectionalLight;

var _Light = require("./Light.js");

var _DirectionalLightShadow = require("./DirectionalLightShadow.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
function DirectionalLight(color, intensity) {
  _Light.Light.call(this, color, intensity);

  this.type = 'DirectionalLight';
  this.position.copy(_Object3D.Object3D.DefaultUp);
  this.updateMatrix();
  this.target = new _Object3D.Object3D();
  this.shadow = new _DirectionalLightShadow.DirectionalLightShadow();
}

DirectionalLight.prototype = Object.assign(Object.create(_Light.Light.prototype), {
  constructor: DirectionalLight,
  isDirectionalLight: true,
  copy: function copy(source) {
    _Light.Light.prototype.copy.call(this, source);

    this.target = source.target.clone();
    this.shadow = source.shadow.clone();
    return this;
  }
});