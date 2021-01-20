"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshLambertMaterial = MeshLambertMaterial;

var _Material = require("./Material.js");

var _constants = require("../constants.js");

var _Color = require("../math/Color.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */
function MeshLambertMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'MeshLambertMaterial';
  this.color = new _Color.Color(0xffffff); // diffuse

  this.map = null;
  this.lightMap = null;
  this.lightMapIntensity = 1.0;
  this.aoMap = null;
  this.aoMapIntensity = 1.0;
  this.emissive = new _Color.Color(0x000000);
  this.emissiveIntensity = 1.0;
  this.emissiveMap = null;
  this.specularMap = null;
  this.alphaMap = null;
  this.envMap = null;
  this.combine = _constants.MultiplyOperation;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';
  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;
  this.setValues(parameters);
}

MeshLambertMaterial.prototype = Object.create(_Material.Material.prototype);
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;
MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

MeshLambertMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.color.copy(source.color);
  this.map = source.map;
  this.lightMap = source.lightMap;
  this.lightMapIntensity = source.lightMapIntensity;
  this.aoMap = source.aoMap;
  this.aoMapIntensity = source.aoMapIntensity;
  this.emissive.copy(source.emissive);
  this.emissiveMap = source.emissiveMap;
  this.emissiveIntensity = source.emissiveIntensity;
  this.specularMap = source.specularMap;
  this.alphaMap = source.alphaMap;
  this.envMap = source.envMap;
  this.combine = source.combine;
  this.reflectivity = source.reflectivity;
  this.refractionRatio = source.refractionRatio;
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  this.wireframeLinecap = source.wireframeLinecap;
  this.wireframeLinejoin = source.wireframeLinejoin;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.morphNormals = source.morphNormals;
  return this;
};