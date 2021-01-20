"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinnedMesh = SkinnedMesh;

var _Mesh = require("./Mesh.js");

var _Matrix = require("../math/Matrix4.js");

var _Vector = require("../math/Vector4.js");

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */
function SkinnedMesh(geometry, material) {
  if (geometry && geometry.isGeometry) {
    console.error('THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');
  }

  _Mesh.Mesh.call(this, geometry, material);

  this.type = 'SkinnedMesh';
  this.bindMode = 'attached';
  this.bindMatrix = new _Matrix.Matrix4();
  this.bindMatrixInverse = new _Matrix.Matrix4();
}

SkinnedMesh.prototype = Object.assign(Object.create(_Mesh.Mesh.prototype), {
  constructor: SkinnedMesh,
  isSkinnedMesh: true,
  bind: function bind(skeleton, bindMatrix) {
    this.skeleton = skeleton;

    if (bindMatrix === undefined) {
      this.updateMatrixWorld(true);
      this.skeleton.calculateInverses();
      bindMatrix = this.matrixWorld;
    }

    this.bindMatrix.copy(bindMatrix);
    this.bindMatrixInverse.getInverse(bindMatrix);
  },
  pose: function pose() {
    this.skeleton.pose();
  },
  normalizeSkinWeights: function normalizeSkinWeights() {
    var vector = new _Vector.Vector4();
    var skinWeight = this.geometry.attributes.skinWeight;

    for (var i = 0, l = skinWeight.count; i < l; i++) {
      vector.x = skinWeight.getX(i);
      vector.y = skinWeight.getY(i);
      vector.z = skinWeight.getZ(i);
      vector.w = skinWeight.getW(i);
      var scale = 1.0 / vector.manhattanLength();

      if (scale !== Infinity) {
        vector.multiplyScalar(scale);
      } else {
        vector.set(1, 0, 0, 0); // do something reasonable
      }

      skinWeight.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
    }
  },
  updateMatrixWorld: function updateMatrixWorld(force) {
    _Mesh.Mesh.prototype.updateMatrixWorld.call(this, force);

    if (this.bindMode === 'attached') {
      this.bindMatrixInverse.getInverse(this.matrixWorld);
    } else if (this.bindMode === 'detached') {
      this.bindMatrixInverse.getInverse(this.bindMatrix);
    } else {
      console.warn('THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode);
    }
  },
  clone: function clone() {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});