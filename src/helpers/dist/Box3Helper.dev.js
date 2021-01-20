"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box3Helper = Box3Helper;

var _LineSegments = require("../objects/LineSegments.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 */
function Box3Helper(box, color) {
  this.type = 'Box3Helper';
  this.box = box;
  color = color || 0xffff00;
  var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
  var positions = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];
  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setIndex(new _BufferAttribute.BufferAttribute(indices, 1));
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(positions, 3));

  _LineSegments.LineSegments.call(this, geometry, new _LineBasicMaterial.LineBasicMaterial({
    color: color
  }));

  this.geometry.computeBoundingSphere();
}

Box3Helper.prototype = Object.create(_LineSegments.LineSegments.prototype);
Box3Helper.prototype.constructor = Box3Helper;

Box3Helper.prototype.updateMatrixWorld = function (force) {
  var box = this.box;
  if (box.isEmpty()) return;
  box.getCenter(this.position);
  box.getSize(this.scale);
  this.scale.multiplyScalar(0.5);

  _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);
};