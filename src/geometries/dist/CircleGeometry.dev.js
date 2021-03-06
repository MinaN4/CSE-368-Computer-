"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleGeometry = CircleGeometry;
exports.CircleBufferGeometry = CircleBufferGeometry;

var _Geometry = require("../core/Geometry.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Vector = require("../math/Vector3.js");

var _Vector2 = require("../math/Vector2.js");

/**
 * @author benaadams / https://twitter.com/ben_a_adams
 * @author Mugen87 / https://github.com/Mugen87
 * @author hughes
 */
// CircleGeometry
function CircleGeometry(radius, segments, thetaStart, thetaLength) {
  _Geometry.Geometry.call(this);

  this.type = 'CircleGeometry';
  this.parameters = {
    radius: radius,
    segments: segments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
  this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));
  this.mergeVertices();
}

CircleGeometry.prototype = Object.create(_Geometry.Geometry.prototype);
CircleGeometry.prototype.constructor = CircleGeometry; // CircleBufferGeometry

function CircleBufferGeometry(radius, segments, thetaStart, thetaLength) {
  _BufferGeometry.BufferGeometry.call(this);

  this.type = 'CircleBufferGeometry';
  this.parameters = {
    radius: radius,
    segments: segments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
  radius = radius || 1;
  segments = segments !== undefined ? Math.max(3, segments) : 8;
  thetaStart = thetaStart !== undefined ? thetaStart : 0;
  thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2; // buffers

  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = []; // helper variables

  var i, s;
  var vertex = new _Vector.Vector3();
  var uv = new _Vector2.Vector2(); // center point

  vertices.push(0, 0, 0);
  normals.push(0, 0, 1);
  uvs.push(0.5, 0.5);

  for (s = 0, i = 3; s <= segments; s++, i += 3) {
    var segment = thetaStart + s / segments * thetaLength; // vertex

    vertex.x = radius * Math.cos(segment);
    vertex.y = radius * Math.sin(segment);
    vertices.push(vertex.x, vertex.y, vertex.z); // normal

    normals.push(0, 0, 1); // uvs

    uv.x = (vertices[i] / radius + 1) / 2;
    uv.y = (vertices[i + 1] / radius + 1) / 2;
    uvs.push(uv.x, uv.y);
  } // indices


  for (i = 1; i <= segments; i++) {
    indices.push(i, i + 1, 0);
  } // build geometry


  this.setIndex(indices);
  this.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  this.setAttribute('normal', new _BufferAttribute.Float32BufferAttribute(normals, 3));
  this.setAttribute('uv', new _BufferAttribute.Float32BufferAttribute(uvs, 2));
}

CircleBufferGeometry.prototype = Object.create(_BufferGeometry.BufferGeometry.prototype);
CircleBufferGeometry.prototype.constructor = CircleBufferGeometry;