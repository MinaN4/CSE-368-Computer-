"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spherical = Spherical;

var _Math2 = require("./Math.js");

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 *
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */
function Spherical(radius, phi, theta) {
  this.radius = radius !== undefined ? radius : 1.0;
  this.phi = phi !== undefined ? phi : 0; // polar angle

  this.theta = theta !== undefined ? theta : 0; // azimuthal angle

  return this;
}

Object.assign(Spherical.prototype, {
  set: function set(radius, phi, theta) {
    this.radius = radius;
    this.phi = phi;
    this.theta = theta;
    return this;
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(other) {
    this.radius = other.radius;
    this.phi = other.phi;
    this.theta = other.theta;
    return this;
  },
  // restrict phi to be betwee EPS and PI-EPS
  makeSafe: function makeSafe() {
    var EPS = 0.000001;
    this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
    return this;
  },
  setFromVector3: function setFromVector3(v) {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  },
  setFromCartesianCoords: function setFromCartesianCoords(x, y, z) {
    this.radius = Math.sqrt(x * x + y * y + z * z);

    if (this.radius === 0) {
      this.theta = 0;
      this.phi = 0;
    } else {
      this.theta = Math.atan2(x, z);
      this.phi = Math.acos(_Math2._Math.clamp(y / this.radius, -1, 1));
    }

    return this;
  }
});