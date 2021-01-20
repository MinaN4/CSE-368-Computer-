"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteMaterial = SpriteMaterial;

var _Material = require("./Material.js");

var _Color = require("../math/Color.js");

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  map: new THREE.Texture( <Image> ),
 *  alphaMap: new THREE.Texture( <Image> ),
 *  rotation: <float>,
 *  sizeAttenuation: <bool>
 * }
 */
function SpriteMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'SpriteMaterial';
  this.color = new _Color.Color(0xffffff);
  this.map = null;
  this.alphaMap = null;
  this.rotation = 0;
  this.sizeAttenuation = true;
  this.transparent = true;
  this.setValues(parameters);
}

SpriteMaterial.prototype = Object.create(_Material.Material.prototype);
SpriteMaterial.prototype.constructor = SpriteMaterial;
SpriteMaterial.prototype.isSpriteMaterial = true;

SpriteMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.color.copy(source.color);
  this.map = source.map;
  this.alphaMap = source.alphaMap;
  this.rotation = source.rotation;
  this.sizeAttenuation = source.sizeAttenuation;
  return this;
};