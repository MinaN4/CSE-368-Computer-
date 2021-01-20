"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonHelper = SkeletonHelper;

var _LineSegments = require("../objects/LineSegments.js");

var _Matrix = require("../math/Matrix4.js");

var _constants = require("../constants.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _Color = require("../math/Color.js");

var _Vector = require("../math/Vector3.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Object3D = require("../core/Object3D.js");

/**
 * @author Sean Griffin / http://twitter.com/sgrif
 * @author Michael Guerrero / http://realitymeltdown.com
 * @author mrdoob / http://mrdoob.com/
 * @author ikerr / http://verold.com
 * @author Mugen87 / https://github.com/Mugen87
 */
var _vector = new _Vector.Vector3();

var _boneMatrix = new _Matrix.Matrix4();

var _matrixWorldInv = new _Matrix.Matrix4();

function getBoneList(object) {
  var boneList = [];

  if (object && object.isBone) {
    boneList.push(object);
  }

  for (var i = 0; i < object.children.length; i++) {
    boneList.push.apply(boneList, getBoneList(object.children[i]));
  }

  return boneList;
}

function SkeletonHelper(object) {
  var bones = getBoneList(object);
  var geometry = new _BufferGeometry.BufferGeometry();
  var vertices = [];
  var colors = [];
  var color1 = new _Color.Color(0, 0, 1);
  var color2 = new _Color.Color(0, 1, 0);

  for (var i = 0; i < bones.length; i++) {
    var bone = bones[i];

    if (bone.parent && bone.parent.isBone) {
      vertices.push(0, 0, 0);
      vertices.push(0, 0, 0);
      colors.push(color1.r, color1.g, color1.b);
      colors.push(color2.r, color2.g, color2.b);
    }
  }

  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new _BufferAttribute.Float32BufferAttribute(colors, 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    vertexColors: _constants.VertexColors,
    depthTest: false,
    depthWrite: false,
    transparent: true
  });

  _LineSegments.LineSegments.call(this, geometry, material);

  this.root = object;
  this.bones = bones;
  this.matrix = object.matrixWorld;
  this.matrixAutoUpdate = false;
}

SkeletonHelper.prototype = Object.create(_LineSegments.LineSegments.prototype);
SkeletonHelper.prototype.constructor = SkeletonHelper;

SkeletonHelper.prototype.updateMatrixWorld = function (force) {
  var bones = this.bones;
  var geometry = this.geometry;
  var position = geometry.getAttribute('position');

  _matrixWorldInv.getInverse(this.root.matrixWorld);

  for (var i = 0, j = 0; i < bones.length; i++) {
    var bone = bones[i];

    if (bone.parent && bone.parent.isBone) {
      _boneMatrix.multiplyMatrices(_matrixWorldInv, bone.matrixWorld);

      _vector.setFromMatrixPosition(_boneMatrix);

      position.setXYZ(j, _vector.x, _vector.y, _vector.z);

      _boneMatrix.multiplyMatrices(_matrixWorldInv, bone.parent.matrixWorld);

      _vector.setFromMatrixPosition(_boneMatrix);

      position.setXYZ(j + 1, _vector.x, _vector.y, _vector.z);
      j += 2;
    }
  }

  geometry.getAttribute('position').needsUpdate = true;

  _Object3D.Object3D.prototype.updateMatrixWorld.call(this, force);
};