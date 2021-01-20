"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointsMaterial = PointsMaterial;

var _Material = require("./Material.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *  sizeAttenuation: <bool>
 *
 *  morphTargets: <bool>
 * }
 */
function PointsMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'PointsMaterial';
  this.color = new _Color.Color(0xffffff);
  this.map = null;
  this.alphaMap = null;
  this.size = 1;
  this.sizeAttenuation = true;
  this.morphTargets = false;
  this.setValues(parameters);
}

PointsMaterial.prototype = Object.create(_Material.Material.prototype);
PointsMaterial.prototype.constructor = PointsMaterial;
PointsMaterial.prototype.isPointsMaterial = true;

PointsMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.color.copy(source.color);
  this.map = source.map;
  this.alphaMap = source.alphaMap;
  this.size = source.size;
  this.sizeAttenuation = source.sizeAttenuation;
  this.morphTargets = source.morphTargets;
  return this;
};