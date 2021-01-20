"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingGeometry = RingGeometry;
exports.RingBufferGeometry = RingBufferGeometry;

var _Geometry = require("../core/Geometry.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Vector = require("../math/Vector2.js");

var _Vector2 = require("../math/Vector3.js");

/**
 * @author Kaleb Murphy
 * @author Mugen87 / https://github.com/Mugen87
 */
// RingGeometry
function RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {
  _Geometry.Geometry.call(this);

  this.type = 'RingGeometry';
  this.parameters = {
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    thetaSegments: thetaSegments,
    phiSegments: phiSegments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
  this.fromBufferGeometry(new RingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength));
  this.mergeVertices();
}

RingGeometry.prototype = Object.create(_Geometry.Geometry.prototype);
RingGeometry.prototype.constructor = RingGeometry; // RingBufferGeometry

function RingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {
  _BufferGeometry.BufferGeometry.call(this);

  this.type = 'RingBufferGeometry';
  this.parameters = {
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    thetaSegments: thetaSegments,
    phiSegments: phiSegments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
  innerRadius = innerRadius || 0.5;
  outerRadius = outerRadius || 1;
  thetaStart = thetaStart !== undefined ? thetaStart : 0;
  thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
  thetaSegments = thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
  phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1; // buffers

  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = []; // some helper variables

  var segment;
  var radius = innerRadius;
  var radiusStep = (outerRadius - innerRadius) / phiSegments;
  var vertex = new _Vector2.Vector3();
  var uv = new _Vector.Vector2();
  var j, i; // generate vertices, normals and uvs

  for (j = 0; j <= phiSegments; j++) {
    for (i = 0; i <= thetaSegments; i++) {
      // values are generate from the inside of the ring to the outside
      segment = thetaStart + i / thetaSegments * thetaLength; // vertex

      vertex.x = radius * Math.cos(segment);
      vertex.y = radius * Math.sin(segment);
      vertices.push(vertex.x, vertex.y, vertex.z); // normal

      normals.push(0, 0, 1); // uv

      uv.x = (vertex.x / outerRadius + 1) / 2;
      uv.y = (vertex.y / outerRadius + 1) / 2;
      uvs.push(uv.x, uv.y);
    } // increase the radius for next row of vertices


    radius += radiusStep;
  } // indices


  for (j = 0; j < phiSegments; j++) {
    var thetaSegmentLevel = j * (thetaSegments + 1);

    for (i = 0; i < thetaSegments; i++) {
      segment = i + thetaSegmentLevel;
      var a = segment;
      var b = segment + thetaSegments + 1;
      var c = segment + thetaSegments + 2;
      var d = segment + 1; // faces

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  } // build geometry


  this.setIndex(indices);
  this.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  this.setAttribute('normal', new _BufferAttribute.Float32BufferAttribute(normals, 3));
  this.setAttribute('uv', new _BufferAttribute.Float32BufferAttribute(uvs, 2));
}

RingBufferGeometry.prototype = Object.create(_BufferGeometry.BufferGeometry.prototype);
RingBufferGeometry.prototype.constructor = RingBufferGeometry;