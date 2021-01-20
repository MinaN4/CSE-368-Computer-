"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = Sphere;

var _Box = require("./Box3.js");

var _Vector = require("./Vector3.js");

var _box = new _Box.Box3();
/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */


function Sphere(center, radius) {
  this.center = center !== undefined ? center : new _Vector.Vector3();
  this.radius = radius !== undefined ? radius : 0;
}

Object.assign(Sphere.prototype, {
  set: function set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  },
  setFromPoints: function setFromPoints(points, optionalCenter) {
    var center = this.center;

    if (optionalCenter !== undefined) {
      center.copy(optionalCenter);
    } else {
      _box.setFromPoints(points).getCenter(center);
    }

    var maxRadiusSq = 0;

    for (var i = 0, il = points.length; i < il; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    }

    this.radius = Math.sqrt(maxRadiusSq);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  },
  empty: function empty() {
    return this.radius <= 0;
  },
  containsPoint: function containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  },
  distanceToPoint: function distanceToPoint(point) {
    return point.distanceTo(this.center) - this.radius;
  },
  intersectsSphere: function intersectsSphere(sphere) {
    var radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  },
  intersectsBox: function intersectsBox(box) {
    return box.intersectsSphere(this);
  },
  intersectsPlane: function intersectsPlane(plane) {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  },
  clampPoint: function clampPoint(point, target) {
    var deltaLengthSq = this.center.distanceToSquared(point);

    if (target === undefined) {
      console.warn('THREE.Sphere: .clampPoint() target is now required');
      target = new _Vector.Vector3();
    }

    target.copy(point);

    if (deltaLengthSq > this.radius * this.radius) {
      target.sub(this.center).normalize();
      target.multiplyScalar(this.radius).add(this.center);
    }

    return target;
  },
  getBoundingBox: function getBoundingBox(target) {
    if (target === undefined) {
      console.warn('THREE.Sphere: .getBoundingBox() target is now required');
      target = new _Box.Box3();
    }

    target.set(this.center, this.center);
    target.expandByScalar(this.radius);
    return target;
  },
  applyMatrix4: function applyMatrix4(matrix) {
    this.center.applyMatrix4(matrix);
    this.radius = this.radius * matrix.getMaxScaleOnAxis();
    return this;
  },
  translate: function translate(offset) {
    this.center.add(offset);
    return this;
  },
  equals: function equals(sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
});