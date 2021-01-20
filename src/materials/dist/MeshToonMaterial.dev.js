"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshToonMaterial = MeshToonMaterial;

var _MeshPhongMaterial = require("./MeshPhongMaterial.js");

/**
 * @author takahirox / http://github.com/takahirox
 *
 * parameters = {
 *  gradientMap: new THREE.Texture( <Image> )
 * }
 */
function MeshToonMaterial(parameters) {
  _MeshPhongMaterial.MeshPhongMaterial.call(this);

  this.defines = {
    'TOON': ''
  };
  this.type = 'MeshToonMaterial';
  this.gradientMap = null;
  this.setValues(parameters);
}

MeshToonMaterial.prototype = Object.create(_MeshPhongMaterial.MeshPhongMaterial.prototype);
MeshToonMaterial.prototype.constructor = MeshToonMaterial;
MeshToonMaterial.prototype.isMeshToonMaterial = true;

MeshToonMaterial.prototype.copy = function (source) {
  _MeshPhongMaterial.MeshPhongMaterial.prototype.copy.call(this, source);

  this.gradientMap = source.gradientMap;
  return this;
};