"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotLightHelper = SpotLightHelper;

var _Vector = require("../math/Vector3.js");

var _Object3D = require("../core/Object3D.js");

var _LineSegments = require("../objects/LineSegments.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 */
var _vector = new _Vector.Vector3();

function SpotLightHelper(light, color) {
  _Object3D.Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();
  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;
  this.color = color;
  var geometry = new _BufferGeometry.BufferGeometry();
  var positions = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];

  for (var i = 0, j = 1, l = 32; i < l; i++, j++) {
    var p1 = i / l * Math.PI * 2;
    var p2 = j / l * Math.PI * 2;
    positions.push(Math.cos(p1), Math.sin(p1), 1, Math.cos(p2), Math.sin(p2), 1);
  }

  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions, 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    fog: false
  });
  this.cone = new _LineSegments.LineSegments(geometry, material);
  this.add(this.cone);
  this.update();
}

SpotLightHelper.prototype = Object.create(_Object3D.Object3D.prototype);
SpotLightHelper.prototype.constructor = SpotLightHelper;

SpotLightHelper.prototype.dispose = function () {
  this.cone.geometry.dispose();
  this.cone.material.dispose();
};

SpotLightHelper.prototype.update = function () {
  this.light.updateMatrixWorld();
  var coneLength = this.light.distance ? this.light.distance : 1000;
  var coneWidth = coneLength * Math.tan(this.light.angle);
  this.cone.scale.set(coneWidth, coneWidth, coneLength);

  _vector.setFromMatrixPosition(this.light.target.matrixWorld);

  this.cone.lookAt(_vector);

  if (this.color !== undefined) {
    this.cone.material.color.set(this.color);
  } else {
    this.cone.material.color.copy(this.light.color);
  }
};