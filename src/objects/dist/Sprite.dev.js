"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = Sprite;

var _Vector = require("../math/Vector2.js");

var _Vector2 = require("../math/Vector3.js");

var _Matrix = require("../math/Matrix4.js");

var _Triangle = require("../math/Triangle.js");

var _Object3D = require("../core/Object3D.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _InterleavedBuffer = require("../core/InterleavedBuffer.js");

var _InterleavedBufferAttribute = require("../core/InterleavedBufferAttribute.js");

var _SpriteMaterial = require("../materials/SpriteMaterial.js");

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */
var _geometry;

var _intersectPoint = new _Vector2.Vector3();

var _worldScale = new _Vector2.Vector3();

var _mvPosition = new _Vector2.Vector3();

var _alignedPosition = new _Vector.Vector2();

var _rotatedPosition = new _Vector.Vector2();

var _viewWorldMatrix = new _Matrix.Matrix4();

var _vA = new _Vector2.Vector3();

var _vB = new _Vector2.Vector3();

var _vC = new _Vector2.Vector3();

var _uvA = new _Vector.Vector2();

var _uvB = new _Vector.Vector2();

var _uvC = new _Vector.Vector2();

function Sprite(material) {
  _Object3D.Object3D.call(this);

  this.type = 'Sprite';

  if (_geometry === undefined) {
    _geometry = new _BufferGeometry.BufferGeometry();
    var float32Array = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]);
    var interleavedBuffer = new _InterleavedBuffer.InterleavedBuffer(float32Array, 5);

    _geometry.setIndex([0, 1, 2, 0, 2, 3]);

    _geometry.setAttribute('position', new _InterleavedBufferAttribute.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));

    _geometry.setAttribute('uv', new _InterleavedBufferAttribute.InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
  }

  this.geometry = _geometry;
  this.material = material !== undefined ? material : new _SpriteMaterial.SpriteMaterial();
  this.center = new _Vector.Vector2(0.5, 0.5);
}

Sprite.prototype = Object.assign(Object.create(_Object3D.Object3D.prototype), {
  constructor: Sprite,
  isSprite: true,
  raycast: function raycast(raycaster, intersects) {
    if (raycaster.camera === null) {
      console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');
    }

    _worldScale.setFromMatrixScale(this.matrixWorld);

    _viewWorldMatrix.copy(raycaster.camera.matrixWorld);

    this.modelViewMatrix.multiplyMatrices(raycaster.camera.matrixWorldInverse, this.matrixWorld);

    _mvPosition.setFromMatrixPosition(this.modelViewMatrix);

    if (raycaster.camera.isPerspectiveCamera && this.material.sizeAttenuation === false) {
      _worldScale.multiplyScalar(-_mvPosition.z);
    }

    var rotation = this.material.rotation;
    var sin, cos;

    if (rotation !== 0) {
      cos = Math.cos(rotation);
      sin = Math.sin(rotation);
    }

    var center = this.center;
    transformVertex(_vA.set(-0.5, -0.5, 0), _mvPosition, center, _worldScale, sin, cos);
    transformVertex(_vB.set(0.5, -0.5, 0), _mvPosition, center, _worldScale, sin, cos);
    transformVertex(_vC.set(0.5, 0.5, 0), _mvPosition, center, _worldScale, sin, cos);

    _uvA.set(0, 0);

    _uvB.set(1, 0);

    _uvC.set(1, 1); // check first triangle


    var intersect = raycaster.ray.intersectTriangle(_vA, _vB, _vC, false, _intersectPoint);

    if (intersect === null) {
      // check second triangle
      transformVertex(_vB.set(-0.5, 0.5, 0), _mvPosition, center, _worldScale, sin, cos);

      _uvB.set(0, 1);

      intersect = raycaster.ray.intersectTriangle(_vA, _vC, _vB, false, _intersectPoint);

      if (intersect === null) {
        return;
      }
    }

    var distance = raycaster.ray.origin.distanceTo(_intersectPoint);
    if (distance < raycaster.near || distance > raycaster.far) return;
    intersects.push({
      distance: distance,
      point: _intersectPoint.clone(),
      uv: _Triangle.Triangle.getUV(_intersectPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new _Vector.Vector2()),
      face: null,
      object: this
    });
  },
  clone: function clone() {
    return new this.constructor(this.material).copy(this);
  },
  copy: function copy(source) {
    _Object3D.Object3D.prototype.copy.call(this, source);

    if (source.center !== undefined) this.center.copy(source.center);
    return this;
  }
});

function transformVertex(vertexPosition, mvPosition, center, scale, sin, cos) {
  // compute position in camera space
  _alignedPosition.subVectors(vertexPosition, center).addScalar(0.5).multiply(scale); // to check if rotation is not zero


  if (sin !== undefined) {
    _rotatedPosition.x = cos * _alignedPosition.x - sin * _alignedPosition.y;
    _rotatedPosition.y = sin * _alignedPosition.x + cos * _alignedPosition.y;
  } else {
    _rotatedPosition.copy(_alignedPosition);
  }

  vertexPosition.copy(mvPosition);
  vertexPosition.x += _rotatedPosition.x;
  vertexPosition.y += _rotatedPosition.y; // transform to world space

  vertexPosition.applyMatrix4(_viewWorldMatrix);
}