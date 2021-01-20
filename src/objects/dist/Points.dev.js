"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Points = Points;

var _Sphere = require("../math/Sphere.js");

var _Ray = require("../math/Ray.js");

var _Matrix = require("../math/Matrix4.js");

var _Object3D = require("../core/Object3D.js");

var _Vector = require("../math/Vector3.js");

var _PointsMaterial = require("../materials/PointsMaterial.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

/**
 * @author alteredq / http://alteredqualia.com/
 */
var _inverseMatrix = new _Matrix.Matrix4();

var _ray = new _Ray.Ray();

var _sphere = new _Sphere.Sphere();

var _position = new _Vector.Vector3();

function Points(geometry, material) {
  _Object3D.Object3D.call(this);

  this.type = 'Points';
  this.geometry = geometry !== undefined ? geometry : new _BufferGeometry.BufferGeometry();
  this.material = material !== undefined ? material : new _PointsMaterial.PointsMaterial({
    color: Math.random() * 0xffffff
  });
  this.updateMorphTargets();
}

Points.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Points,
  isPoints: true,
  raycast: function raycast(raycaster, intersects) {
    var geometry = this.geometry;
    var matrixWorld = this.matrixWorld;
    var threshold = raycaster.params.Points.threshold; // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

    _sphere.copy(geometry.boundingSphere);

    _sphere.applyMatrix4(matrixWorld);

    _sphere.radius += threshold;
    if (raycaster.ray.intersectsSphere(_sphere) === false) return; //

    _inverseMatrix.getInverse(matrixWorld);

    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);

    var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    var localThresholdSq = localThreshold * localThreshold;

    if (geometry.isBufferGeometry) {
      var index = geometry.index;
      var attributes = geometry.attributes;
      var positions = attributes.position.array;

      if (index !== null) {
        var indices = index.array;

        for (var i = 0, il = indices.length; i < il; i++) {
          var a = indices[i];

          _position.fromArray(positions, a * 3);

          testPoint(_position, a, localThresholdSq, matrixWorld, raycaster, intersects, this);
        }
      } else {
        for (var i = 0, l = positions.length / 3; i < l; i++) {
          _position.fromArray(positions, i * 3);

          testPoint(_position, i, localThresholdSq, matrixWorld, raycaster, intersects, this);
        }
      }
    } else {
      var vertices = geometry.vertices;

      for (var i = 0, l = vertices.length; i < l; i++) {
        testPoint(vertices[i], i, localThresholdSq, matrixWorld, raycaster, intersects, this);
      }
    }
  },
  updateMorphTargets: function updateMorphTargets() {
    var geometry = this.geometry;
    var m, ml, name;

    if (geometry.isBufferGeometry) {
      var morphAttributes = geometry.morphAttributes;
      var keys = Object.keys(morphAttributes);

      if (keys.length > 0) {
        var morphAttribute = morphAttributes[keys[0]];

        if (morphAttribute !== undefined) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};

          for (m = 0, ml = morphAttribute.length; m < ml; m++) {
            name = morphAttribute[m].name || String(m);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[name] = m;
          }
        }
      }
    } else {
      var morphTargets = geometry.morphTargets;

      if (morphTargets !== undefined && morphTargets.length > 0) {
        console.error('THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.');
      }
    }
  },
  clone: function clone() {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});

function testPoint(point, index, localThresholdSq, matrixWorld, raycaster, intersects, object) {
  var rayPointDistanceSq = _ray.distanceSqToPoint(point);

  if (rayPointDistanceSq < localThresholdSq) {
    var intersectPoint = new _Vector.Vector3();

    _ray.closestPointToPoint(point, intersectPoint);

    intersectPoint.applyMatrix4(matrixWorld);
    var distance = raycaster.ray.origin.distanceTo(intersectPoint);
    if (distance < raycaster.near || distance > raycaster.far) return;
    intersects.push({
      distance: distance,
      distanceToRay: Math.sqrt(rayPointDistanceSq),
      point: intersectPoint,
      index: index,
      face: null,
      object: object
    });
  }
}