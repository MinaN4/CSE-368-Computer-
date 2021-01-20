"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstancedMesh = InstancedMesh;

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Mesh = require("./Mesh.js");

var _Matrix = require("../math/Matrix4.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
var _instanceLocalMatrix = new _Matrix.Matrix4();

var _instanceWorldMatrix = new _Matrix.Matrix4();

var _instanceIntersects = [];

var _mesh = new _Mesh.Mesh();

function InstancedMesh(geometry, material, count) {
  _Mesh.Mesh.call(this, geometry, material);

  this.instanceMatrix = new _BufferAttribute.BufferAttribute(new Float32Array(count * 16), 16);
  this.count = count;
}

InstancedMesh.prototype = Object.assign(Object.create(_Mesh.Mesh.prototype), {
  constructor: InstancedMesh,
  isInstancedMesh: true,
  getMatrixAt: function getMatrixAt(index, matrix) {
    matrix.fromArray(this.instanceMatrix.array, index * 16);
  },
  raycast: function raycast(raycaster, intersects) {
    var matrixWorld = this.matrixWorld;
    var raycastTimes = this.count;
    _mesh.geometry = this.geometry;
    _mesh.material = this.material;
    if (_mesh.material === undefined) return;

    for (var instanceId = 0; instanceId < raycastTimes; instanceId++) {
      // calculate the world matrix for each instance
      this.getMatrixAt(instanceId, _instanceLocalMatrix);

      _instanceWorldMatrix.multiplyMatrices(matrixWorld, _instanceLocalMatrix); // the mesh represents this single instance


      _mesh.matrixWorld = _instanceWorldMatrix;

      _mesh.raycast(raycaster, _instanceIntersects); // process the result of raycast


      if (_instanceIntersects.length > 0) {
        _instanceIntersects[0].instanceId = instanceId;
        _instanceIntersects[0].object = this;
        intersects.push(_instanceIntersects[0]);
        _instanceIntersects.length = 0;
      }
    }
  },
  setMatrixAt: function setMatrixAt(index, matrix) {
    matrix.toArray(this.instanceMatrix.array, index * 16);
  },
  updateMorphTargets: function updateMorphTargets() {}
});