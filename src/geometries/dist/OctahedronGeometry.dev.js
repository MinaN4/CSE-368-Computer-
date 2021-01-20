"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OctahedronGeometry = OctahedronGeometry;
exports.OctahedronBufferGeometry = OctahedronBufferGeometry;

var _Geometry = require("../core/Geometry.js");

var _PolyhedronGeometry = require("./PolyhedronGeometry.js");

/**
 * @author timothypratley / https://github.com/timothypratley
 * @author Mugen87 / https://github.com/Mugen87
 */
// OctahedronGeometry
function OctahedronGeometry(radius, detail) {
  _Geometry.Geometry.call(this);

  this.type = 'OctahedronGeometry';
  this.parameters = {
    radius: radius,
    detail: detail
  };
  this.fromBufferGeometry(new OctahedronBufferGeometry(radius, detail));
  this.mergeVertices();
}

OctahedronGeometry.prototype = Object.create(_Geometry.Geometry.prototype);
OctahedronGeometry.prototype.constructor = OctahedronGeometry; // OctahedronBufferGeometry

function OctahedronBufferGeometry(radius, detail) {
  var vertices = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1];
  var indices = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];

  _PolyhedronGeometry.PolyhedronBufferGeometry.call(this, vertices, indices, radius, detail);

  this.type = 'OctahedronBufferGeometry';
  this.parameters = {
    radius: radius,
    detail: detail
  };
}

OctahedronBufferGeometry.prototype = Object.create(_PolyhedronGeometry.PolyhedronBufferGeometry.prototype);
OctahedronBufferGeometry.prototype.constructor = OctahedronBufferGeometry;