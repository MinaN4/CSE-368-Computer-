"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShadowMaterial = ShadowMaterial;

var _Material = require("./Material.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <THREE.Color>
 * }
 */
function ShadowMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'ShadowMaterial';
  this.color = new _Color.Color(0x000000);
  this.transparent = true;
  this.setValues(parameters);
}

ShadowMaterial.prototype = Object.create(_Material.Material.prototype);
ShadowMaterial.prototype.constructor = ShadowMaterial;
ShadowMaterial.prototype.isShadowMaterial = true;

ShadowMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.color.copy(source.color);
  return this;
};