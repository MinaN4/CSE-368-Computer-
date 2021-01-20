"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cylindrical = Cylindrical;

/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Ref: https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
 *
 */
function Cylindrical(radius, theta, y) {
  this.radius = radius !== undefined ? radius : 1.0; // distance from the origin to a point in the x-z plane

  this.theta = theta !== undefined ? theta : 0; // counterclockwise angle in the x-z plane measured in radians from the positive z-axis

  this.y = y !== undefined ? y : 0; // height above the x-z plane

  return this;
}

Object.assign(Cylindrical.prototype, {
  set: function set(radius, theta, y) {
    this.radius = radius;
    this.theta = theta;
    this.y = y;
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(other) {
    this.radius = other.radius;
    this.theta = other.theta;
    this.y = other.y;
    return this;
  },
  setFromVector3: function setFromVector3(v) {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  },
  setFromCartesianCoords: function setFromCartesianCoords(x, y, z) {
    this.radius = Math.sqrt(x * x + z * z);
    this.theta = Math.atan2(x, z);
    this.y = y;
    return this;
  }
});