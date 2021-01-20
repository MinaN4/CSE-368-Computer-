"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box2 = Box2;

var _Vector = require("./Vector2.js");

/**
 * @author bhouston / http://clara.io
 */
var _vector = new _Vector.Vector2();

function Box2(min, max) {
  this.min = min !== undefined ? min : new _Vector.Vector2(+Infinity, +Infinity);
  this.max = max !== undefined ? max : new _Vector.Vector2(-Infinity, -Infinity);
}

Object.assign(Box2.prototype, {
  set: function set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  },
  setFromPoints: function setFromPoints(points) {
    this.makeEmpty();

    for (var i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }

    return this;
  },
  setFromCenterAndSize: function setFromCenterAndSize(center, size) {
    var halfSize = _vector.copy(size).multiplyScalar(0.5);

    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  },
  makeEmpty: function makeEmpty() {
    this.min.x = this.min.y = +Infinity;
    this.max.x = this.max.y = -Infinity;
    return this;
  },
  isEmpty: function isEmpty() {
    // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
    return this.max.x < this.min.x || this.max.y < this.min.y;
  },
  getCenter: function getCenter(target) {
    if (target === undefined) {
      console.warn('THREE.Box2: .getCenter() target is now required');
      target = new _Vector.Vector2();
    }

    return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  },
  getSize: function getSize(target) {
    if (target === undefined) {
      console.warn('THREE.Box2: .getSize() target is now required');
      target = new _Vector.Vector2();
    }

    return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
  },
  expandByPoint: function expandByPoint(point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  },
  expandByVector: function expandByVector(vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  },
  expandByScalar: function expandByScalar(scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  },
  containsPoint: function containsPoint(point) {
    return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y ? false : true;
  },
  containsBox: function containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
  },
  getParameter: function getParameter(point, target) {
    // This can potentially have a divide by zero if the box
    // has a size dimension of 0.
    if (target === undefined) {
      console.warn('THREE.Box2: .getParameter() target is now required');
      target = new _Vector.Vector2();
    }

    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y));
  },
  intersectsBox: function intersectsBox(box) {
    // using 4 splitting planes to rule out intersections
    return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
  },
  clampPoint: function clampPoint(point, target) {
    if (target === undefined) {
      console.warn('THREE.Box2: .clampPoint() target is now required');
      target = new _Vector.Vector2();
    }

    return target.copy(point).clamp(this.min, this.max);
  },
  distanceToPoint: function distanceToPoint(point) {
    var clampedPoint = _vector.copy(point).clamp(this.min, this.max);

    return clampedPoint.sub(point).length();
  },
  intersect: function intersect(box) {
    this.min.max(box.min);
    this.max.min(box.max);
    return this;
  },
  union: function union(box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  },
  translate: function translate(offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  },
  equals: function equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
});