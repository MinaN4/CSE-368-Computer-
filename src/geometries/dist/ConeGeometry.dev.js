"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConeGeometry = ConeGeometry;
exports.ConeBufferGeometry = ConeBufferGeometry;

var _CylinderGeometry = require("./CylinderGeometry.js");

/**
 * @author abelnation / http://github.com/abelnation
 */
// ConeGeometry
function ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
  _CylinderGeometry.CylinderGeometry.call(this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);

  this.type = 'ConeGeometry';
  this.parameters = {
    radius: radius,
    height: height,
    radialSegments: radialSegments,
    heightSegments: heightSegments,
    openEnded: openEnded,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
}

ConeGeometry.prototype = Object.create(_CylinderGeometry.CylinderGeometry.prototype);
ConeGeometry.prototype.constructor = ConeGeometry; // ConeBufferGeometry

function ConeBufferGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
  _CylinderGeometry.CylinderBufferGeometry.call(this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);

  this.type = 'ConeBufferGeometry';
  this.parameters = {
    radius: radius,
    height: height,
    radialSegments: radialSegments,
    heightSegments: heightSegments,
    openEnded: openEnded,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };
}

ConeBufferGeometry.prototype = Object.create(_CylinderGeometry.CylinderBufferGeometry.prototype);
ConeBufferGeometry.prototype.constructor = ConeBufferGeometry;