"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshNormalMaterial = MeshNormalMaterial;

var _constants = require("../constants.js");

var _Material = require("./Material.js");

var _Vector = require("../math/Vector2.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  opacity: <float>,
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
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */
function MeshNormalMaterial(parameters) {
  _Material.Material.call(this);

  this.type = 'MeshNormalMaterial';
  this.bumpMap = null;
  this.bumpScale = 1;
  this.normalMap = null;
  this.normalMapType = _constants.TangentSpaceNormalMap;
  this.normalScale = new _Vector.Vector2(1, 1);
  this.displacementMap = null;
  this.displacementScale = 1;
  this.displacementBias = 0;
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.fog = false;
  this.skinning = false;
  this.morphTargets = false;
  this.morphNormals = false;
  this.setValues(parameters);
}

MeshNormalMaterial.prototype = Object.create(_Material.Material.prototype);
MeshNormalMaterial.prototype.constructor = MeshNormalMaterial;
MeshNormalMaterial.prototype.isMeshNormalMaterial = true;

MeshNormalMaterial.prototype.copy = function (source) {
  _Material.Material.prototype.copy.call(this, source);

  this.bumpMap = source.bumpMap;
  this.bumpScale = source.bumpScale;
  this.normalMap = source.normalMap;
  this.normalMapType = source.normalMapType;
  this.normalScale.copy(source.normalScale);
  this.displacementMap = source.displacementMap;
  this.displacementScale = source.displacementScale;
  this.displacementBias = source.displacementBias;
  this.wireframe = source.wireframe;
  this.wireframeLinewidth = source.wireframeLinewidth;
  this.skinning = source.skinning;
  this.morphTargets = source.morphTargets;
  this.morphNormals = source.morphNormals;
  return this;
};