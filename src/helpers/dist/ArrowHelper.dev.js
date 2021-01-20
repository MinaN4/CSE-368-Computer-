"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowHelper = ArrowHelper;

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _Object3D = require("../core/Object3D.js");

var _CylinderGeometry = require("../geometries/CylinderGeometry.js");

var _MeshBasicMaterial = require("../materials/MeshBasicMaterial.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _Mesh = require("../objects/Mesh.js");

var _Line = require("../objects/Line.js");

var _Vector = require("../math/Vector3.js");

/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / http://github.com/zz85
 * @author bhouston / http://clara.io
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 */
var _axis = new _Vector.Vector3();

var _lineGeometry, _coneGeometry;

function ArrowHelper(dir, origin, length, color, headLength, headWidth) {
  // dir is assumed to be normalized
  _Object3D.Object3D.call(this);

  if (dir === undefined) dir = new _Vector.Vector3(0, 0, 1);
  if (origin === undefined) origin = new _Vector.Vector3(0, 0, 0);
  if (length === undefined) length = 1;
  if (color === undefined) color = 0xffff00;
  if (headLength === undefined) headLength = 0.2 * length;
  if (headWidth === undefined) headWidth = 0.2 * headLength;

  if (_lineGeometry === undefined) {
    _lineGeometry = new _BufferGeometry.BufferGeometry();

    _lineGeometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));

    _coneGeometry = new _CylinderGeometry.CylinderBufferGeometry(0, 0.5, 1, 5, 1);

    _coneGeometry.translate(0, -0.5, 0);
  }

  this.position.copy(origin);
  this.line = new _Line.Line(_lineGeometry, new _LineBasicMaterial.LineBasicMaterial({
    color: color
  }));
  this.line.matrixAutoUpdate = false;
  this.add(this.line);
  this.cone = new _Mesh.Mesh(_coneGeometry, new _MeshBasicMaterial.MeshBasicMaterial({
    color: color
  }));
  this.cone.matrixAutoUpdate = false;
  this.add(this.cone);
  this.setDirection(dir);
  this.setLength(length, headLength, headWidth);
}

ArrowHelper.prototype = Object.create(_Object3D.Object3D.prototype);
ArrowHelper.prototype.constructor = ArrowHelper;

ArrowHelper.prototype.setDirection = function (dir) {
  // dir is assumed to be normalized
  if (dir.y > 0.99999) {
    this.quaternion.set(0, 0, 0, 1);
  } else if (dir.y < -0.99999) {
    this.quaternion.set(1, 0, 0, 0);
  } else {
    _axis.set(dir.z, 0, -dir.x).normalize();

    var radians = Math.acos(dir.y);
    this.quaternion.setFromAxisAngle(_axis, radians);
  }
};

ArrowHelper.prototype.setLength = function (length, headLength, headWidth) {
  if (headLength === undefined) headLength = 0.2 * length;
  if (headWidth === undefined) headWidth = 0.2 * headLength;
  this.line.scale.set(1, Math.max(0.0001, length - headLength), 1); // see #17458

  this.line.updateMatrix();
  this.cone.scale.set(headWidth, headLength, headWidth);
  this.cone.position.y = length;
  this.cone.updateMatrix();
};

ArrowHelper.prototype.setColor = function (color) {
  this.line.material.color.set(color);
  this.cone.material.color.set(color);
};

ArrowHelper.prototype.copy = function (source) {
  _Object3D.Object3D.prototype.copy.call(this, source, false);

  this.line.copy(source.line);
  this.cone.copy(source.cone);
  return this;
};

ArrowHelper.prototype.clone = function () {
  return new this.constructor().copy(this);
};