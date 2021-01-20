"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaneHelper = PlaneHelper;

var _Line = require("../objects/Line.js");

var _Mesh = require("../objects/Mesh.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _Object3D = require("../core/Object3D.js");

var _constants = require("../constants.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 */
function PlaneHelper(plane, size, hex) {
  this.type = 'PlaneHelper';
  this.plane = plane;
  this.size = size === undefined ? 1 : size;
  var color = hex !== undefined ? hex : 0xffff00;
  var positions = [1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0];
  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();

  _Line.Line.call(this, geometry, new _LineBasicMaterial.LineBasicMaterial({
    color: color
  })); //


  var positions2 = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1];
  var geometry2 = new _BufferGeometry.BufferGeometry();
  geometry2.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions2, 3));
  geometry2.computeBoundingSphere();
  this.add(new _Mesh.Mesh(geometry2, new _MeshBasicMaterial.MeshBasicMaterial({
    color: color,
    opacity: 0.2,
    transparent: true,
    depthWrite: false
  })));
}

PlaneHelper.prototype = Object.create(_Line.Line.prototype);
PlaneHelper.prototype.constructor = PlaneHelper;

PlaneHelper.prototype.updateMatrixWorld = function (force) {
  var scale = -this.plane.constant;
  if (Math.abs(scale) < 1e-8) scale = 1e-8; // sign does not matter

  this.scale.set(0.5 * this.size, 0.5 * this.size, scale);
  this.children[0].material.side = scale < 0 ? _constants.BackSide : _constants.FrontSide; // renderer flips side when determinant < 0; flipping not wanted here

  this.lookAt(this.plane.normal);

  _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);
};