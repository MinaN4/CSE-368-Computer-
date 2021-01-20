"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineSegments = LineSegments;

var _Line = require("./Line.js");

var _Vector = require("../math/Vector3.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
var _start = new _Vector.Vector3();

var _end = new _Vector.Vector3();

function LineSegments(geometry, material) {
  _Line.Line.call(this, geometry, material);

  this.type = 'LineSegments';
}

LineSegments.prototype = Object.assign(Object.create(_Line.Line.prototype), {
  constructor: LineSegments,
  isLineSegments: true,
  computeLineDistances: function computeLineDistances() {
    var geometry = this.geometry;

    if (geometry.isBufferGeometry) {
      // we assume non-indexed geometry
      if (geometry.index === null) {
        var positionAttribute = geometry.attributes.position;
        var lineDistances = [];

        for (var i = 0, l = positionAttribute.count; i < l; i += 2) {
          _start.fromBufferAttribute(positionAttribute, i);

          _end.fromBufferAttribute(positionAttribute, i + 1);

          lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
          lineDistances[i + 1] = lineDistances[i] + _start.distanceTo(_end);
        }

        geometry.setAttribute('lineDistance', new _BufferAttribute.Float32BufferAttribute(lineDistances, 1));
      } else {
        console.warn('THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
      }
    } else if (geometry.isGeometry) {
      var vertices = geometry.vertices;
      var lineDistances = geometry.lineDistances;

      for (var i = 0, l = vertices.length; i < l; i += 2) {
        _start.copy(vertices[i]);

        _end.copy(vertices[i + 1]);

        lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
        lineDistances[i + 1] = lineDistances[i] + _start.distanceTo(_end);
      }
    }

    return this;
  }
});