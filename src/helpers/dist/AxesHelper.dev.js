"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxesHelper = AxesHelper;

var _LineSegments = require("../objects/LineSegments.js");

var _constants = require("../constants.js");

var _LineBasicMaterial = require("../materials/LineBasicMaterial.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _BufferGeometry = require("../core/BufferGeometry.js");

/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */
function AxesHelper(size) {
  size = size || 1;
  var vertices = [0, 0, 0, size, 0, 0, 0, 0, 0, 0, size, 0, 0, 0, 0, 0, 0, size];
  var colors = [1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1];
  var geometry = new _BufferGeometry.BufferGeometry();
  geometry.setAttribute('position', new _BufferAttribute.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new _BufferAttribute.Float32BufferAttribute(colors, 3));
  var material = new _LineBasicMaterial.LineBasicMaterial({
    vertexColors: _constants.VertexColors
  });

  _LineSegments.LineSegments.call(this, geometry, material);
}

AxesHelper.prototype = Object.create(_LineSegments.LineSegments.prototype);
AxesHelper.prototype.constructor = AxesHelper;