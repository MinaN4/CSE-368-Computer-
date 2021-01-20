"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshPhysicalMaterial = MeshPhysicalMaterial;

var _Vector = require("../math/Vector2.js");

var _MeshStandardMaterial = require("./MeshStandardMaterial.js");

var _Color = require("../math/Color.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  reflectivity: <float>
 *  clearcoat: <float>
 *  clearcoatRoughness: <float>
 *
 *  sheen: <Color>
 *
 *  clearcoatNormalScale: <Vector2>,
 *  clearcoatNormalMap: new THREE.Texture( <Image> ),
 * }
 */
function MeshPhysicalMaterial(parameters) {
  _MeshStandardMaterial.MeshStandardMaterial.call(this);

  this.defines = {
    'STANDARD': '',
    'PHYSICAL': ''
  };
  this.type = 'MeshPhysicalMaterial';
  this.reflectivity = 0.5; // maps to F0 = 0.04

  this.clearcoat = 0.0;
  this.clearcoatRoughness = 0.0;
  this.sheen = null; // null will disable sheen bsdf

  this.clearcoatNormalScale = new _Vector.Vector2(1, 1);
  this.clearcoatNormalMap = null;
  this.transparency = 0.0;
  this.setValues(parameters);
}

MeshPhysicalMaterial.prototype = Object.create(_MeshStandardMaterial.MeshStandardMaterial.prototype);
MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;
MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;

MeshPhysicalMaterial.prototype.copy = function (source) {
  _MeshStandardMaterial.MeshStandardMaterial.prototype.copy.call(this, source);

  this.defines = {
    'STANDARD': '',
    'PHYSICAL': ''
  };
  this.reflectivity = source.reflectivity;
  this.clearcoat = source.clearcoat;
  this.clearcoatRoughness = source.clearcoatRoughness;
  if (source.sheen) this.sheen = (this.sheen || new _Color.Color()).copy(source.sheen);else this.sheen = null;
  this.clearcoatNormalMap = source.clearcoatNormalMap;
  this.clearcoatNormalScale.copy(source.clearcoatNormalScale);
  this.transparency = source.transparency;
  return this;
};