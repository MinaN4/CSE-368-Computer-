"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLightHelper = DirectionalLightHelper;

var _Vector = require("../math/Vector3.js");

var _Object3D = require("../core/Object3D.js");

var _Line = require("../objects/Line.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 */
var _v1 = new _Vector.Vector3();

var _v2 = new _Vector.Vector3();

var _v3 = new _Vector.Vector3();

function DirectionalLightHelper(light, size, color) {
  _Object3D.Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();
  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;
  this.color = color;
  if (size === undefined) size = 1;
  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute([-size, size, 0, size, size, 0, size, -size, 0, -size, -size, 0, -size, size, 0], 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    fog: false
  });
  this.lightPlane = new _Line.Line(geometry, material);
  this.add(this.lightPlane);
  geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3));
  this.targetLine = new _Line.Line(geometry, material);
  this.add(this.targetLine);
  this.update();
}

DirectionalLightHelper.prototype = Object.create(_Object3D.Object3D.prototype);
DirectionalLightHelper.prototype.constructor = DirectionalLightHelper;

DirectionalLightHelper.prototype.dispose = function () {
  this.lightPlane.geometry.dispose();
  this.lightPlane.material.dispose();
  this.targetLine.geometry.dispose();
  this.targetLine.material.dispose();
};

DirectionalLightHelper.prototype.update = function () {
  _v1.setFromMatrixPosition(this.light.matrixWorld);

  _v2.setFromMatrixPosition(this.light.target.matrixWorld);

  _v3.subVectors(_v2, _v1);

  this.lightPlane.lookAt(_v2);

  if (this.color !== undefined) {
    this.lightPlane.material.color.set(this.color);
    this.targetLine.material.color.set(this.color);
  } else {
    this.lightPlane.material.color.copy(this.light.color);
    this.targetLine.material.color.copy(this.light.color);
  }

  this.targetLine.lookAt(_v2);
  this.targetLine.scale.z = _v3.length();
};