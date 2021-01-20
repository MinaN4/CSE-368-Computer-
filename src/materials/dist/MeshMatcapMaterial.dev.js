"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshMatcapMaterial = MeshMatcapMaterial;

var _constants = require("../constants.js");

var _Material = require("./Material.js");

var _Vector = require("../math/Vector2.js");

var _Color = require("../math/Color.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  matcap: new THREE.Texture( <Image> ),
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalMapType: THREE.TangentSpaceNormalMap,
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */
function MeshMatcapMaterial(parameters) {
  _Material.Material.call(this);

  this.defines = {
    'MATCAP': ''
  };
  this.type = 'MeshMatcapMaterial';
  this.color = new _Color.Color(0xffffff); // diffuse

  this.matcap = null;
  this.map = null;
  this.bumpMap = null;
  this.bumpScale = 1;
  this.normalMap = null;
  this.normalMapType = _constants.TangentSpaceNormalMap;
  this.normalScale = new _Vector.Vector2(1, 1);
  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;
  this.alphaMap = null;
  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;
  this.setValues(parameters);
}

MeshMatcapMaterial.prototype = Object.create(_Material.Material.prototype);
MeshMatcapMaterial.prototype.constructor = MeshMatcapMaterial;
MeshMatcapMaterial.prototype.isMeshMatcapMaterial = true;

MeshMatcapMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.defines = {
    'MATCAP': ''
  };
  this.color.copy(source.color);
  this.matcap = source.matcap;
  this.map = source.map;
  this.bumpMap = source.bumpMap;
  this.bumpScale = source.bumpScale;
  this.normalMap = source.normalMap;
  this.normalMapType = source.normalMapType;
  this.normalScale.copy(source.normalScale);
  this.displacementMap = source.displacementMap;
  this.displacementScale = source.displacementScale;
  this.displacementBias = source.displacementBias;
  this.alphaMap = source.alphaMap;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.morphNormals = source.morphNormals;
  return this;
};