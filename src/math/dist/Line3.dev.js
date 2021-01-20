"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line3 = Line3;

var _Vector = require("./Vector3.js");

var _Math2 = require("./Math.js");

/**
 * @author bhouston / http://clara.io
 */
var _startP = new _Vector.Vector3();

var _startEnd = new _Vector.Vector3();

function Line3(start, end) {
  this.start = start !== undefined ? start : new _Vector.Vector3();
  this.end = end !== undefined ? end : new _Vector.Vector3();
}

Object.assign(Line3.prototype, {
  set: function set(start, end) {
    this.start.copy(start);
    this.end.copy(end);
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(line) {
    this.start.copy(line.start);
    this.end.copy(line.end);
    return this;
  },
  getCenter: function getCenter(target) {
    if (target === undefined) {
      console.warn('THREE.Line3: .getCenter() target is now required');
      target = new _Vector.Vector3();
    }

    return target.addVectors(this.start, this.end).multiplyScalar(0.5);
  },
  delta: function delta(target) {
    if (target === undefined) {
      console.warn('THREE.Line3: .delta() target is now required');
      target = new _Vector.Vector3();
    }

    return target.subVectors(this.end, this.start);
  },
  distanceSq: function distanceSq() {
    return this.start.distanceToSquared(this.end);
  },
  distance: function distance() {
    return this.start.distanceTo(this.end);
  },
  at: function at(t, target) {
    if (target === undefined) {
      console.warn('THREE.Line3: .at() target is now required');
      target = new _Vector.Vector3();
    }

    return this.delta(target).multiplyScalar(t).add(this.start);
  },
  closestPointToPointParameter: function closestPointToPointParameter(point, clampToLine) {
    _startP.subVectors(point, this.start);

    _startEnd.subVectors(this.end, this.start);

    var startEnd2 = _startEnd.dot(_startEnd);

    var startEnd_startP = _startEnd.dot(_startP);

    var t = startEnd_startP / startEnd2;

    if (clampToLine) {
      t = _Math2._Math.clamp(t, 0, 1);
    }

    return t;
  },
  closestPointToPoint: function closestPointToPoint(point, clampToLine, target) {
    var t = this.closestPointToPointParameter(point, clampToLine);

    if (target === undefined) {
      console.warn('THREE.Line3: .closestPointToPoint() target is now required');
      target = new _Vector.Vector3();
    }

    return this.delta(target).multiplyScalar(t).add(this.start);
  },
  applyMatrix4: function applyMatrix4(matrix) {
    this.start.applyMatrix4(matrix);
    this.end.applyMatrix4(matrix);
    return this;
  },
  equals: function equals(line) {
    return line.start.equals(this.start) && line.end.equals(this.end);
  }
});