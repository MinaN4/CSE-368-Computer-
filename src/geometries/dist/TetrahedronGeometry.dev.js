"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TetrahedronGeometry = TetrahedronGeometry;
exports.TetrahedronBufferGeometry = TetrahedronBufferGeometry;

var _Geometry = require("../core/Geometry.js");

var _PolyhedronGeometry = require("./PolyhedronGeometry.js");

/**
 * @author timothypratley / https://github.com/timothypratley
 * @author Mugen87 / https://github.com/Mugen87
 */
// TetrahedronGeometry
function TetrahedronGeometry(radius, detail) {
  _Geometry.Geometry.call(this);

  this.type = 'TetrahedronGeometry';
  this.parameters = {
    radius: radius,
    detail: detail
  };
  this.fromBufferGeometry(new TetrahedronBufferGeometry(radius, detail));
  this.mergeVertices();
}

TetrahedronGeometry.prototype = Object.create(_Geometry.Geometry.prototype);
TetrahedronGeometry.prototype.constructor = TetrahedronGeometry; // TetrahedronBufferGeometry

function TetrahedronBufferGeometry(radius, detail) {
  var vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];
  var indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];

  _PolyhedronGeometry.PolyhedronBufferGeometry.call(this, vertices, indices, radius, detail);

  this.type = 'TetrahedronBufferGeometry';
  this.parameters = {
    radius: radius,
    detail: detail
  };
}

TetrahedronBufferGeometry.prototype = Object.create(_PolyhedronGeometry.PolyhedronBufferGeometry.prototype);
TetrahedronBufferGeometry.prototype.constructor = TetrahedronBufferGeometry;